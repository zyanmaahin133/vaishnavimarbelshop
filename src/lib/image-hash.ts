/**
 * Hash-based duplicate-image protection for admin uploads.
 *
 * Every uploaded file is hashed (SHA-256 over its raw bytes) before it is
 * accepted, so the same photo can never be attached to two different
 * products — even if the file was renamed.
 */

export async function hashFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  return hashBytes(bytes);
}

export async function hashBytes(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export const shortHash = (h: string) => h.slice(0, 10);
