import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { dashboardMenuRoutes } from "@/config/routes"
interface PremiumFeatureDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureName: string
  description?: string
  isFeature?: boolean
}

export function PremiumFeatureDialog({
  open,
  onOpenChange,
  featureName,
  description = "Upgrade to premium to unlock this feature and many more!",
  isFeature = true,
}: PremiumFeatureDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="size-5 text-yellow-500" />
            <span>{isFeature ? "Premium Feature" : "Upgrade Required"}: {featureName}</span>
          </DialogTitle>
          <DialogDescription className="pt-4 text-base leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-4">
          <Button
            onClick={() => {
              onOpenChange(false)
              window.location.href = dashboardMenuRoutes.upgrade.path
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            View Premium Plans
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
