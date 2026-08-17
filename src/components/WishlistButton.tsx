import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

export function WishlistButton({
  id,
  name,
  className = "",
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id, name);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      title={saved ? "Saved to wishlist" : "Save to wishlist"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur transition-colors hover:border-gold hover:bg-gold-soft ${className}`}
    >
      <Heart
        className={`h-4 w-4 ${saved ? "fill-gold text-gold" : "text-muted-foreground"}`}
        aria-hidden="true"
      />
    </button>
  );
}
