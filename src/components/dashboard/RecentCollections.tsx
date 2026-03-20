import Link from "next/link";
import { Star, MoreHorizontal } from "lucide-react";
import { MOCK_COLLECTIONS, MOCK_ITEMS, MOCK_ITEM_TYPES } from "@/lib/mock-data";

// Derive which type colors appear in each collection from MOCK_ITEMS
function getCollectionTypeColors(collectionId: string): string[] {
  const typeIds = [
    ...new Set(
      MOCK_ITEMS.filter((item) => item.collectionIds.includes(collectionId)).map(
        (item) => item.itemTypeId
      )
    ),
  ];
  return typeIds
    .map((id) => MOCK_ITEM_TYPES.find((t) => t.id === id)?.color)
    .filter(Boolean) as string[];
}

const recentCollections = [...MOCK_COLLECTIONS]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 6);

export function RecentCollections() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Collections</h2>
        <Link
          href="/collections"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recentCollections.map((col) => {
          const typeColors = getCollectionTypeColors(col.id);
          return (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group rounded-lg border border-border bg-card p-4 flex flex-col gap-2 hover:border-border/80 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">{col.name}</span>
                <div className="flex items-center gap-1 shrink-0">
                  {col.isFavorite && <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />}
                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                {col.itemCount} {col.itemCount === 1 ? "item" : "items"}
              </p>

              {col.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{col.description}</p>
              )}

              {typeColors.length > 0 && (
                <div className="flex items-center gap-1 mt-auto pt-1">
                  {typeColors.map((color) => (
                    <span
                      key={color}
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
