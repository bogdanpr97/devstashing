import { LayoutGrid, Star, Bookmark, Hash } from "lucide-react";
import { MOCK_ITEMS, MOCK_COLLECTIONS, MOCK_TYPE_COUNTS } from "@/lib/mock-data";

const totalItems = Object.values(MOCK_TYPE_COUNTS).reduce((a, b) => a + b, 0);
const totalCollections = MOCK_COLLECTIONS.length;
const favoriteItems = MOCK_ITEMS.filter((i) => i.isFavorite).length;
const favoriteCollections = MOCK_COLLECTIONS.filter((c) => c.isFavorite).length;

const STATS = [
  { label: "Total Items", value: totalItems, icon: Hash },
  { label: "Collections", value: totalCollections, icon: LayoutGrid },
  { label: "Favorite Items", value: favoriteItems, icon: Star },
  { label: "Favorite Collections", value: favoriteCollections, icon: Bookmark },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STATS.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{label}</span>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="text-2xl font-semibold text-foreground tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  );
}
