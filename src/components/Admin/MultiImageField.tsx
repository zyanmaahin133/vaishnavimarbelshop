import React, { useState } from "react";
import { hashFile, readAsDataUrl, shortHash } from "@/lib/image-hash";
import { Save, Trash2, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";
import { saveImageBlob, getImageDataUrl } from "@/lib/image-store";
import { useAdminStudio } from "@/lib/admin-store";

type Props = {
  images: string[];
  imageHashes?: string[];
  ownerId?: string;
  onChange: (images: string[], imageHashes: string[]) => void;
};

export function MultiImageField({ images = [], imageHashes = [], ownerId, onChange }: Props) {
  const { findImageOwner } = useAdminStudio();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const newImages = [...images];
      const newHashes = [...(imageHashes || [])];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const digest = await hashFile(file);
        const owner = findImageOwner(digest, ownerId);
        if (owner) {
          setError(`This exact image is already used by “${owner}”. Pick a different photo.`);
          continue;
        }
        // save blob to IDB
        try {
          await saveImageBlob(digest, file);
        } catch (e) {
          // ignore save errors but continue
        }
        const dataUrl = await readAsDataUrl(file);
        newImages.push(dataUrl);
        newHashes.push(digest);
      }
      onChange(newImages, newHashes);
    } catch (e) {
      setError("Could not read that file. Try a JPG, PNG or WebP.");
    } finally {
      setBusy(false);
    }
  }

  function removeAt(idx: number) {
    const ni = images.filter((_, i) => i !== idx);
    const nh = (imageHashes || []).filter((_, i) => i !== idx);
    onChange(ni, nh);
  }

  function move(idx: number, dir: -1 | 1) {
    const ni = [...images];
    const nh = [...(imageHashes || [])];
    const next = idx + dir;
    if (next < 0 || next >= ni.length) return;
    const [img] = ni.splice(idx, 1);
    ni.splice(next, 0, img);
    const [h] = nh.splice(idx, 1);
    nh.splice(next, 0, h);
    onChange(ni, nh);
  }

  async function refreshPreviewFromHash(idx: number) {
    const hash = imageHashes?.[idx];
    if (!hash) return;
    const dataUrl = await getImageDataUrl(hash);
    if (dataUrl) {
      const ni = [...images];
      ni[idx] = dataUrl;
      onChange(ni, imageHashes || []);
    }
  }

  return (
    <div>
      <label className="block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">Images</label>
      <div className="mt-2 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 cursor-pointer rounded-sm border border-border px-3 py-2 text-xs hover:border-gold">
            <Save className="h-4 w-4" />
            {busy ? "Uploading…" : "Upload images"}
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => void handleFiles(e.target.files)} />
          </label>
          <p className="text-xs text-muted-foreground">Upload multiple images. First image will be primary.</p>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <div className="grid grid-cols-3 gap-3">
          {images?.map((img, i) => (
            <div key={i} className="relative rounded-sm border border-border overflow-hidden bg-secondary">
              <img src={img} alt={`Image ${i + 1}`} className="h-28 w-full object-cover" />
              <div className="absolute left-1 top-1 flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className="inline-flex items-center justify-center h-6 w-6 rounded-sm bg-black/20 text-white">
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button type="button" onClick={() => move(i, 1)} className="inline-flex items-center justify-center h-6 w-6 rounded-sm bg-black/20 text-white">
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="absolute right-1 top-1 flex gap-1">
                <button type="button" onClick={() => refreshPreviewFromHash(i)} title="Refresh preview" className="inline-flex items-center justify-center h-6 w-6 rounded-sm bg-black/20 text-white">
                  <ArrowLeftRight className="h-3 w-3" />
                </button>
                <button type="button" onClick={() => removeAt(i)} className="inline-flex items-center justify-center h-6 w-6 rounded-sm bg-destructive text-white">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              <div className="p-2 text-[0.65rem] text-muted-foreground">
                {imageHashes?.[i] ? `FP: ${shortHash(imageHashes[i])}…` : "no fingerprint"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiImageField;
