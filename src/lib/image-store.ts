import { idbSaveImage, idbGetImage, idbDeleteImage } from "./storage-indexeddb";

export async function saveImageBlob(hash: string, blob: Blob) {
  return idbSaveImage(hash, blob);
}

export async function getImageDataUrl(hash: string): Promise<string | null> {
  const blob = await idbGetImage(hash);
  if (!blob) return null;
  return await blobToDataUrl(blob);
}

export async function deleteImage(hash: string) {
  return idbDeleteImage(hash);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}
