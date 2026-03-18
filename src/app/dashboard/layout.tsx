import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FolderPlus } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-14 items-center gap-4 border-b border-border px-4">
        <span className="text-base font-semibold text-foreground shrink-0">
          DevStash
        </span>

        <div className="flex flex-1 items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8 h-8 bg-muted border-0 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
            <FolderPlus className="h-3.5 w-3.5" />
            New Collection
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-sm">
            <Plus className="h-3.5 w-3.5" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar placeholder */}
        <aside className="w-56 shrink-0 border-r border-border p-4">
          <h2 className="text-sm font-medium text-muted-foreground">Sidebar</h2>
        </aside>

        {/* Main area */}
        <main className="flex-1 overflow-auto p-6">
          <h2 className="text-sm font-medium text-muted-foreground">Main</h2>
          {children}
        </main>
      </div>
    </div>
  );
}
