import { cn } from "@/lib/utils"

interface PremiumBadgeProps {
  className?: string
  variant?: 'default' | 'corner' | 'bottom-right'
}

export function PremiumBadge({ className, variant = 'default' }: PremiumBadgeProps) {
  return (
    <div className={cn(
      "border border-[#A55A16] bg-[#FEF3C7] px-2 py-1 text-[10px] font-medium text-[#A55A16] sm:text-sm",
      // Only change the corner rounding and position based on variant
      variant === 'default' && "rounded-bl-xl rounded-tr-xl",
      variant === 'corner' && "absolute -right-px -top-px rounded-bl-xl rounded-tr-xl",
      variant === 'bottom-right' && "absolute bottom-2 right-2 rounded-bl-none rounded-tr-xl",
      className
    )}>
      Premium
    </div>
  )
}
