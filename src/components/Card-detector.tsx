"use client"

import { CreditCard } from "lucide-react"

interface CardDetectorProps {
  cardNumber: string
  className?: string
}

export function CardDetector({ cardNumber, className = "h-8 w-12" }: CardDetectorProps) {
  const detectCardType = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.startsWith("4")) return { type: "visa", icon: "/icons/visa.png" }
    if (num.startsWith("5") || (num.startsWith("2") && num.length > 1))
      return { type: "mastercard", icon: "/icons/mastercard.png" }
    if (num.startsWith("34") || num.startsWith("37")) return { type: "amex", icon: "/icons/amex.png" }
    if (num.startsWith("6")) return { type: "discover", icon: "/icons/discover.png" }
    return { type: "generic", icon: null }
  }

  const cardInfo = detectCardType(cardNumber)

  if (cardInfo.icon) {
    return (
      <img src={cardInfo.icon || "/placeholder.svg"} alt={cardInfo.type} className={`${className} object-contain`} />
    )
  }

  return <CreditCard className={`${className} text-muted-foreground`} />
}
