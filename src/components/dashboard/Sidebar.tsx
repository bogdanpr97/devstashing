import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Star,
  Clock,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOCK_ITEM_TYPES,
  MOCK_COLLECTIONS,
  MOCK_USER,
  MOCK_TYPE_COUNTS,
} from "@/lib/mock-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onMobileClose }: SidebarProps) {
  const favoriteCollections = MOCK_COLLECTIONS.filter((c) => c.isFavorite);
  const recentCollections = [...MOCK_COLLECTIONS]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const initials = MOCK_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside
      className={cn(
        // Mobile: fixed overlay drawer
        "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-background border-r border-border transition-transform duration-200",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: in-flow, collapsible width
        "md:relative md:inset-auto md:z-auto md:translate-x-0 md:shrink-0 md:transition-[width]",
        collapsed ? "md:w-14" : "md:w-56"
      )}
    >
      {/* Mobile header with close button */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0 md:hidden">
        <span className="font-semibold text-sm">Menu</span>
        <button
          onClick={onMobileClose}
          className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto py-3 overflow-x-hidden">
        {/* Item Types */}
        <div className="px-2 mb-1">
          <p
            className={cn(
              "px-2 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider",
              collapsed && "md:hidden"
            )}
          >
            Items
          </p>
          <nav className="space-y-0.5">
            {MOCK_ITEM_TYPES.map((type) => {
              const Icon = ICON_MAP[type.icon] ?? File;
              const count = MOCK_TYPE_COUNTS[type.id] ?? 0;
              const route = `/items/${type.name.toLowerCase()}s`;
              return (
                <Link
                  key={type.id}
                  href={route}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                    collapsed && "md:justify-center md:px-0"
                  )}
                  title={type.name + "s"}
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: type.color }} />
                  <span className={cn("flex-1 truncate", collapsed && "md:hidden")}>
                    {type.name}s
                  </span>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      collapsed && "md:hidden"
                    )}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-border" />

        {/* Favorite Collections */}
        {favoriteCollections.length > 0 && (
          <div className="px-2 mb-1">
            <p
              className={cn(
                "px-2 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider",
                collapsed && "md:hidden"
              )}
            >
              Favorites
            </p>
            <nav className="space-y-0.5">
              {favoriteCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.id}`}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                    collapsed && "md:justify-center md:px-0"
                  )}
                  title={col.name}
                >
                  <Star className="h-3.5 w-3.5 shrink-0 text-yellow-500" />
                  <span className={cn("flex-1 truncate", collapsed && "md:hidden")}>
                    {col.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Recent Collections — hidden on desktop collapsed */}
        {recentCollections.length > 0 && (
          <div className={cn("px-2 mb-1", collapsed && "md:hidden")}>
            <p className="px-2 mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent
            </p>
            <nav className="space-y-0.5">
              {recentCollections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.id}`}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 truncate">{col.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* User avatar area */}
      <div className="border-t border-border p-3 shrink-0">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer transition-colors",
            collapsed && "md:justify-center md:px-0"
          )}
        >
          {MOCK_USER.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={MOCK_USER.image}
              alt={MOCK_USER.name}
              className="h-7 w-7 rounded-full shrink-0 object-cover"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary-foreground">{initials}</span>
            </div>
          )}
          <div className={cn("flex flex-col min-w-0", collapsed && "md:hidden")}>
            <span className="text-sm font-medium truncate">{MOCK_USER.name}</span>
            <span className="text-xs text-muted-foreground truncate">{MOCK_USER.email}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
