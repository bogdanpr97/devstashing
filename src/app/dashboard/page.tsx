import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentCollections } from "@/components/dashboard/RecentCollections";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your developer knowledge hub</p>
      </div>

      <StatsCards />
      <RecentCollections />
      <PinnedItems />
      <RecentItems />
    </div>
  );
}
