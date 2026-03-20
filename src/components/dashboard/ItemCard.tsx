import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Pin,
  Star,
  type LucideIcon,
} from "lucide-react";
import { MOCK_ITEM_TYPES } from "@/lib/mock-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

interface Item {
  id: string;
  title: string;
  description?: string | null;
  language?: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  tags: string[];
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ItemCard({ item }: { item: Item }) {
  const type = MOCK_ITEM_TYPES.find((t) => t.id === item.itemTypeId);
  const Icon = type ? (ICON_MAP[type.icon] ?? File) : File;
  const color = type?.color ?? "#6b7280";

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-border/80 hover:bg-accent/20 transition-colors cursor-pointer">
      {/* Type color accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: color }} />

      <div className="pl-4 pr-4 py-3 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
            <span className="text-sm font-medium text-foreground truncate">{item.title}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-muted-foreground">
            {item.isFavorite && <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />}
            {item.isPinned && <Pin className="h-3 w-3 fill-current" />}
          </div>
        </div>

        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        )}

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {formatDate(item.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
