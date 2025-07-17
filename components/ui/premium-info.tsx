import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PremiumInfoProps {
  text: string;
}

export function PremiumInfo({ text }: PremiumInfoProps) {
  return (
    <Card className="mt-4 border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <CardContent className="flex items-center gap-3 py-4">
        <Sparkles className="size-5 text-yellow-500" />
        <span className="text-sm text-yellow-800">
          {text}
        </span>
      </CardContent>
    </Card>
  )
}
