import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import type { CategoryImage } from "@/data/category-product-images";

const OWNER = process.env.GITHUB_OWNER || "abbasmolla311";
const REPO = process.env.GITHUB_REPO || "vaishnavimarbelbusness";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FILE_PATH = process.env.CATEGORY_IMAGES_PATH || "data/category-images.json"; // path in the repo

async function githubGetFile(path: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function githubPutFile(path: string, contentBase64: string, message: string, sha?: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not set");
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const body: any = { message, content: contentBase64, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export const Route = createFileRoute("/api/category-images")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const file = await githubGetFile(FILE_PATH);
          if (!file) {
            // return empty defaults
            return new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } });
          }
          const content = file.content ? Buffer.from(file.content, "base64").toString("utf-8") : "";
          const data = content ? JSON.parse(content) : {};
          return new Response(JSON.stringify({ data }), { status: 200, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
      },

      POST: async ({ request }) => {
        // Expect body: { data: Record<string, CategoryImage[]> , commitMessage?: string }
        try {
          const body = await request.json();
          const data = body.data ?? {};
          const commitMessage = body.commitMessage || "Update category images via admin";

          const existing = await githubGetFile(FILE_PATH);
          const contentStr = JSON.stringify(data, null, 2);
          const contentBase64 = Buffer.from(contentStr, "utf8").toString("base64");
          const sha = existing ? existing.sha : undefined;
          const result = await githubPutFile(FILE_PATH, contentBase64, commitMessage, sha);
          return new Response(JSON.stringify({ ok: true, result }), { status: 200, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
      },

      DELETE: async ({ request }) => {
        // Expect query params ?category=...&id=...
        try {
          const url = new URL(request.url);
          const category = url.searchParams.get("category");
          const id = url.searchParams.get("id");
          if (!category || !id) return new Response(JSON.stringify({ error: "category and id required" }), { status: 400, headers: { "Content-Type": "application/json" } });

          const existing = await githubGetFile(FILE_PATH);
          const content = existing && existing.content ? Buffer.from(existing.content, "base64").toString("utf-8") : "";
          const current = content ? JSON.parse(content) : {};
          if (!current[category]) return new Response(JSON.stringify({ ok: true, data: current }), { status: 200, headers: { "Content-Type": "application/json" } });
          current[category] = current[category].filter((it: CategoryImage) => it.id !== id);

          const contentStr = JSON.stringify(current, null, 2);
          const contentBase64 = Buffer.from(contentStr, "utf8").toString("base64");
          const sha = existing ? existing.sha : undefined;
          const result = await githubPutFile(FILE_PATH, contentBase64, `Delete image ${id} from ${category}`, sha);
          return new Response(JSON.stringify({ ok: true, result }), { status: 200, headers: { "Content-Type": "application/json" } });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { "Content-Type": "application/json" } });
        }
      },
    },
  },
});
