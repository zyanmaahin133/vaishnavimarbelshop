import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Download,
  Eye,
  EyeOff,
  ImagePlus,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, GROUPS, type GroupId } from "@/data/catalog";
import {
  AdminStudioProvider,
  useAdminStudio,
  type BrandDraft,
  type CategoryDraft,
  type ProductDraft,
} from "@/lib/admin-store";
import { useAdminAuth } from "@/lib/admin-auth";
import { hashFile, readAsDataUrl, shortHash } from "@/lib/image-hash";
import MultiImageField from "@/components/Admin/MultiImageField";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content Studio — Aarav Marble House" },
      {
        name: "description",
        content:
          "Browser-only content studio to add, edit and reorder marble products, categories, brands and images with live preview.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <AdminStudioProvider>
      <AdminGate />
    </AdminStudioProvider>
  ),
});

function AdminGate() {
  const { authenticated, ready, login, logout } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!ready) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-5 py-32 text-center text-sm text-muted-foreground">
          Loading…
        </div>
      </PageShell>
    );
  }

  if (!authenticated) {
    return (
      <PageShell>
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 sm:px-8">
          <div className="w-full rounded-sm border border-border bg-card p-8 shadow-soft">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Lock className="h-6 w-6" aria-hidden="true" />
              </span>
              <h1 className="mt-5 font-display text-3xl text-foreground">Admin Login</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the admin password to manage products, prices and images.
              </p>
            </div>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (login(password)) {
                  setError(false);
                  setPassword("");
                } else {
                  setError(true);
                }
              }}
            >
              <label className="block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-ring"
                placeholder="Admin password"
              />
              {error && (
                <p className="mt-2 text-xs text-destructive">
                  Incorrect password. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                Log in
              </button>
            </form>
          </div>
        </div>
      </PageShell>
    );
  }

  return <AdminPage onLogout={logout} />;
}

const field =
  "w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70";
const label = "block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground";
const btn =
  "inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-xs font-semibold transition-all hover:-translate-y-0.5";
const iconBtn =
  "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-gold hover:text-foreground";

type Tab = "products" | "categories" | "brands";

const emptyProduct = (): ProductDraft => ({
  id: "",
  name: "",
  group: "types",
  finish: "",
  price: 0,
  unit: "/ sq ft",
  image: "",
  custom: true,
  images: [],
  imageHashes: [],
});

function AdminPage({ onLogout }: { onLogout: () => void }) {
  const studio = useAdminStudio();
  const [tab, setTab] = useState<Tab>("products");

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Content Studio" }]} />

        <header className="mt-8 max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Server-less studio</p>
              <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Content Studio</h1>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Add, edit and reorder products, categories, brands and images with a live preview before
            you save. Everything stays in this browser — no server, no database. Export the JSON when
            you want the changes made permanent.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-sm border border-border bg-card p-4 shadow-soft">
          <div className="flex flex-wrap gap-2">
            {(["products", "categories", "brands"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`${btn} capitalize ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {studio.dirty && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gold">
                <Check className="h-3.5 w-3.5" /> Draft saved in this browser
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([studio.exportJson()], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "aarav-marble-catalogue.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className={`${btn} border border-border text-foreground hover:border-gold`}
            >
              <Download className="h-3.5 w-3.5" /> Export JSON
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Discard all local edits and restore the published catalogue?"))
                  studio.reset();
              }}
              className={`${btn} border border-border text-muted-foreground hover:border-destructive hover:text-destructive`}
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="pb-24">
          {tab === "products" && <ProductsPanel />}
          {tab === "categories" && <CategoriesPanel />}
          {tab === "brands" && <BrandsPanel />}
        </div>
      </div>
    </PageShell>
  );
}

/* ---------------- Products ---------------- */

function ProductsPanel() {
  const { products, saveProduct, deleteProduct, toggleHidden, moveProduct } = useAdminStudio();
  const [draft, setDraft] = useState<ProductDraft>(emptyProduct);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
  }, [products, query]);

  const valid = draft.name.trim().length > 1 && draft.price > 0 && Boolean(draft.images && draft.images.length);

  function submit() {
    if (!valid) return;
    const id = draft.id || `${draft.group}-${slugify(draft.name)}`;
    saveProduct({ ...draft, id, custom: draft.custom ?? true });
    setDraft(emptyProduct());
    setEditing(null);
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="rounded-sm border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-3xl">{editing ? "Edit product" : "Add a product"}</h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="p-name">
              Product name
            </label>
            <input
              id="p-name"
              className={`${field} mt-2`}
              value={draft.name}
              placeholder="Statuario Marble"
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-group">
              Category
            </label>
            <select
              id="p-group"
              className={`${field} mt-2`}
              value={draft.group}
              onChange={(e) => setDraft({ ...draft, group: e.target.value as GroupId })}
            >
              {GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="p-unit">
              Unit
            </label>
            <input
              id="p-unit"
              className={`${field} mt-2`}
              value={draft.unit}
              placeholder="/ sq ft"
              onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-price">
              Starting price (₹)
            </label>
            <input
              id="p-price"
              type="number"
              min={0}
              className={`${field} mt-2`}
              value={draft.price || ""}
              onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-finish">
              Finish / description
            </label>
            <input
              id="p-finish"
              className={`${field} mt-2`}
              value={draft.finish}
              placeholder="Mirror-polished, book-matched slabs"
              onChange={(e) => setDraft({ ...draft, finish: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <MultiImageField
              images={draft.images || []}
              imageHashes={draft.imageHashes || []}
              ownerId={draft.id}
              onChange={(imgs, hashes) => setDraft({ ...draft, images: imgs, imageHashes: hashes, image: imgs[0] || "", imageHash: hashes[0] || undefined })}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!valid}
            onClick={submit}
            className={`${btn} bg-gold text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Plus className="h-3.5 w-3.5" /> {editing ? "Save changes" : "Add to catalogue"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setDraft(emptyProduct());
                setEditing(null);
              }}
              className={`${btn} border border-border text-muted-foreground`}
            >
              Cancel
            </button>
          )}
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-2xl">Catalogue order ({products.length})</h3>
          <input
            className={`${field} max-w-56`}
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ul className="mt-5 max-h-[32rem] divide-y divide-border overflow-y-auto rounded-sm border border-border">
          {list.map((p) => (
            <li key={p.id} className="flex items-center gap-3 p-3">
              <img
                src={(p.images && p.images[0]) || p.image}
                alt=""
                aria-hidden="true"
                className="h-11 w-14 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {p.name}
                  {p.hidden && <span className="ml-2 text-xs text-muted-foreground">(hidden)</span>}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatPrice(p.price)} {p.unit}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  aria-label={`Move ${p.name} up`}
                  className={iconBtn}
                  onClick={() => moveProduct(p.id, -1)}
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={`Move ${p.name} down`}
                  className={iconBtn}
                  onClick={() => moveProduct(p.id, 1)}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  aria-label={p.hidden ? `Show ${p.name}` : `Hide ${p.name}`}
                  className={iconBtn}
                  onClick={() => toggleHidden(p.id)}
                >
                  {p.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label={`Edit ${p.name}`}
                  className={`${iconBtn} w-auto px-2 text-xs`}
                  onClick={() => {
                    setDraft({ ...p });
                    setEditing(p.id);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${p.name}`}
                  className={`${iconBtn} hover:border-destructive hover:text-destructive`}
                  onClick={() => deleteProduct(p.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Live preview</p>
        <h2 className="mt-2 font-display text-2xl">Exactly how it will look</h2>
        <div className="mt-5">
          {draft.name && draft.images && draft.images.length ? (
            <ProductCard
              item={{
                id: draft.id || "preview",
                name: draft.name,
                group: draft.group,
                finish: draft.finish || "Finish to be confirmed",
                price: draft.price,
                unit: draft.unit,
                image: draft.images[0],
              }}
            />
          ) : (
            <div className="rounded-sm border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Fill in a name, price and image to see the live product card here.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

/* ---------------- Categories and Brands remain unchanged (use existing ImageField for categories) ---------------- */

function CategoriesPanel() {
  const { categories, saveCategory, moveCategory } = useAdminStudio();
  const [draft, setDraft] = useState<CategoryDraft>({ slug: "", label: "", intro: "", image: "" });

  const valid = draft.label.trim().length > 1 && Boolean(draft.image);

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="rounded-sm border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-3xl">Categories</h2>
        <div className="mt-6 grid gap-5">
          <div>
            <label className={label} htmlFor="c-label">
              Category name
            </label>
            <input
              id="c-label"
              className={`${field} mt-2`}
              value={draft.label}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  label: e.target.value,
                  slug:
                    draft.slug ||
                    e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, ""),
                })
              }
            />
          </div>
          <div>
            <label className={label} htmlFor="c-intro">
              Intro line
            </label>
            <textarea
              id="c-intro"
              rows={3}
              className={`${field} mt-2`}
              value={draft.intro}
              onChange={(e) => setDraft({ ...draft, intro: e.target.value })}
            />
          </div>
          {/* Keep existing single-image picker for categories for now */}
          <div>
            <label className={label}>Image</label>
            <input type="file" accept="image/*" className="mt-2 block" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const dataUrl = await readAsDataUrl(file);
                setDraft({ ...draft, image: dataUrl });
              } catch {
                // ignore
              }
            }} />
          </div>
          <button
            type="button"
            disabled={!valid}
            onClick={() => {
              saveCategory(draft);
              setDraft({ slug: "", label: "", intro: "", image: "" });
            }}
            className={`${btn} self-start bg-gold text-accent-foreground disabled:opacity-40`}
          >
            <Plus className="h-3.5 w-3.5" /> Save category
          </button>
        </div>

        <ul className="mt-8 divide-y divide-border rounded-sm border border-border">
          {categories.map((c) => (
            <li key={c.slug} className="flex items-center gap-3 p-3">
              <img src={c.image} alt="" aria-hidden="true" className="h-11 w-14 rounded-sm object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{c.label}</p>
                <p className="truncate text-xs text-muted-foreground">{c.intro}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button type="button" aria-label={`Move ${c.label} up`} className={iconBtn} onClick={() => moveCategory(c.slug, -1)}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" aria-label={`Move ${c.label} down`} className={iconBtn} onClick={() => moveCategory(c.slug, 1)}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" aria-label={`Edit ${c.label}`} className={`${iconBtn} w-auto px-2 text-xs`} onClick={() => setDraft({ ...c })}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Live preview</p>
        <div className="mt-5 overflow-hidden rounded-sm border border-border bg-card shadow-soft">
          {draft.image ? (
            <img src={draft.image} alt="" aria-hidden="true" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="aspect-[4/3] w-full bg-secondary" />
          )}
          <div className="p-5">
            <h3 className="font-display text-2xl">{draft.label || "Category name"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {draft.intro || "Short intro shown on the home page."}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function BrandsPanel() {
  const { brands, saveBrand, deleteBrand, moveBrand } = useAdminStudio();
  const [draft, setDraft] = useState<BrandDraft>({ id: "", name: "", note: "" });

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="rounded-sm border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-3xl">Brands we stock</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="b-name">
              Brand name
            </label>
            <input
              id="b-name"
              className={`${field} mt-2`}
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div>
            <label className={label} htmlFor="b-note">
              Note
            </label>
            <input id="b-note" className={`${field} mt-2`} value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} />
          </div>
        </div>
        <button
          type="button"
          disabled={draft.name.trim().length < 2}
          onClick={() => {
            saveBrand({
              ...draft,
              id:
                draft.id ||
                `brand-${draft.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`,
            });
            setDraft({ id: "", name: "", note: "" });
          }}
          className={`${btn} mt-6 bg-gold text-accent-foreground disabled:opacity-40`}
        >
          <Plus className="h-3.5 w-3.5" /> Save brand
        </button>

        <ul className="mt-8 divide-y divide-border rounded-sm border border-border">
          {brands.map((b) => (
            <li key={b.id} className="flex items-center gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{b.name}</p>
                <p className="truncate text-xs text-muted-foreground">{b.note}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button type="button" aria-label={`Move ${b.name} up`} className={iconBtn} onClick={() => moveBrand(b.id, -1)}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" aria-label={`Move ${b.name} down`} className={iconBtn} onClick={() => moveBrand(b.id, 1)}>
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" aria-label={`Edit ${b.name}`} className={`${iconBtn} w-auto px-2 text-xs`} onClick={() => setDraft({ ...b })}>
                  Edit
                </button>
                <button type="button" aria-label={`Delete ${b.name}`} className={`${iconBtn} hover:border-destructive hover:text-destructive`} onClick={() => deleteBrand(b.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Live preview</p>
        <div className="mt-5 rounded-sm border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-2xl">{draft.name || "Brand name"}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{draft.note || "Short note about the range you stock."}</p>
        </div>
      </aside>
    </div>
  );
}

export default AdminPage;
