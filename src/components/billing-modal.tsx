import { X, Zap, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan?: string;
  balance?: {
    total: number;
    free: number;
    paid: number;
    dailyRefresh: number;
    dailyRefreshMax: number;
  };
  usageHistory?: Array<{
    details: string;
    date: string;
    creditsChange: number;
  }>;
}

export function BillingModal({
  open,
  onOpenChange,
  currentPlan = "Free",
  balance = { total: 0, free: 0, paid: 0, dailyRefresh: 300, dailyRefreshMax: 300 },
  usageHistory = [
    { details: "Efficiently Fix Pull Request ...", date: "2026-01-17 08:05", creditsChange: -418 },
    { details: "Fix Build and Add Parallel S...", date: "2026-01-16 06:10", creditsChange: -482 },
    { details: "How to Add a Feature to a ...", date: "2026-01-14 10:42", creditsChange: -300 },
  ],
}: BillingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/20 backdrop-blur-sm">
      <div className="h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Usage</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
          {/* Plan Section */}
          <Card className="border-slate-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold italic">{currentPlan}</h3>
                <Button className="rounded-full bg-black text-white hover:bg-black/90 px-6">
                  Upgrade
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Credits</span>
                    <Info className="h-3 w-3 opacity-40" />
                  </div>
                  <span className="font-bold">{balance.total}</span>
                </div>
                
                <div className="pl-6 flex items-center justify-between text-slate-400 text-sm">
                  <span>Free credits</span>
                  <span>{balance.free}</span>
                </div>

                <Separator className="bg-slate-100" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="rotate-180">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Daily refresh credits</span>
                    <Info className="h-3 w-3 opacity-40" />
                  </div>
                  <span className="font-bold">{balance.dailyRefreshMax}</span>
                </div>
                <p className="text-xs text-slate-400 pl-6">
                  Refresh to {balance.dailyRefreshMax} at 00:00 every day
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Usage History Section */}
          <div className="space-y-4">
            <Button variant="ghost" className="w-full flex items-center justify-between p-0 hover:bg-transparent group">
              <div className="flex items-center gap-2 text-slate-700">
                <div className="p-1 border rounded">
                  <ChevronRight className="h-4 w-4" />
                </div>
                <span className="font-semibold">Website usage & billing</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
            </Button>

            <div className="space-y-0">
              <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold pb-2 border-b">
                <span>Details</span>
                <span className="text-center">Date</span>
                <span className="text-right">Credits change</span>
              </div>
              {usageHistory.map((item, i) => (
                <div key={i} className="grid grid-cols-3 py-3 text-sm border-b last:border-0 items-center">
                  <span className="truncate font-medium text-slate-700">{item.details}</span>
                  <span className="text-center text-slate-400 text-xs">{item.date}</span>
                  <span className="text-right font-mono font-medium text-slate-600">{item.creditsChange}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
