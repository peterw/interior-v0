import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border border-blue-600/50 shadow-lg shadow-blue-700/20 rounded-lg",
        destructive:
          "bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-destructive-foreground border border-red-600/50 shadow-lg shadow-red-700/20 rounded-lg",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg",
        secondary:
          "bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-50 hover:to-gray-100 text-gray-800 border border-gray-300/50 shadow-lg shadow-gray-700/10 rounded-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        threeD: "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border border-blue-600/50 shadow-lg shadow-blue-700/20 rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-button-md",
        sm: "h-9 px-3 rounded-button-sm",
        lg: "h-11 px-8 rounded-button-lg",
        icon: "h-8 w-8 rounded-button-md",
        xs: "h-8 px-2 rounded-button-sm",
      },
    },
    defaultVariants: {
      variant: "threeD", // Changed default variant to threeD
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  innerShadow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, innerShadow = true, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const defaultStyle = variant !== 'outline' && variant !== 'ghost' && variant !== 'link' && innerShadow
      ? { 
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.3)',
          ...style 
        }
      : style;
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          style={defaultStyle}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={defaultStyle}
        {...props}
      >
        {variant !== 'outline' && variant !== 'ghost' && variant !== 'link' && innerShadow && (
          <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 rounded-lg pointer-events-none"></span>
        )}
        <span className="relative inline-flex items-center justify-center w-full gap-1">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
