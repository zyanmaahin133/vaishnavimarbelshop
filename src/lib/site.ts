export const SITE_URL = "https://marble-wonder-finder.lovable.app";

/** Turn a bundled asset path (or any relative path) into an absolute URL. */
export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
