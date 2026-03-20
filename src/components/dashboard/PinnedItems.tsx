import { Pin } from "lucide-react";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { ItemCard } from "./ItemCard";

const pinnedItems = MOCK_ITEMS.filter((item) => item.isPinned);

export function PinnedItems() {
  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Pinned</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pinnedItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
