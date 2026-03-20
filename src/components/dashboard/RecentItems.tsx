import { Clock } from "lucide-react";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { ItemCard } from "./ItemCard";

const recentItems = [...MOCK_ITEMS]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 10);

export function RecentItems() {
  if (recentItems.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Recent</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recentItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
