"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, CreditCard, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CardInputFormProps {
  paymentMethod: string
}

export default function CardInputForm({ paymentMethod }: CardInputFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [showCvv, setShowCvv] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const detectCardType = (number: string) => {
    const num = number.replace(/\s/g, "")
    if (num.startsWith("4")) return "visa"
    if (num.startsWith("5") || num.startsWith("2")) return "mastercard"
    if (num.startsWith("34") || num.startsWith("37")) return "amex"
    return "generic"
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    if (formatted.length <= 5) {
      setExpiryDate(formatted)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const maxLength = detectCardType(cardNumber) === "amex" ? 4 : 3
    if (value.length <= maxLength) {
      setCvv(value)
    }
  }

  const cardType = detectCardType(cardNumber)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardholder-name">Cardholder Name</Label>
          <Input
            id="cardholder-name"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <div className="relative">
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {cardType === "visa" && <img src="/icons/visa.png" alt="Visa" className="h-6 w-auto" />}
              {cardType === "mastercard" && <img src="/icons/mastercard.png" alt="Mastercard" className="h-6 w-auto" />}
              {cardType === "amex" && <img src="/icons/amex.png" alt="American Express" className="h-6 w-auto" />}
              {cardType === "generic" && <CreditCard className="h-5 w-5 text-muted-foreground" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input id="expiry-date" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryChange} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>3-digit code on the back of your card</p>
                    <p>(4 digits on front for Amex)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="cvv"
                type={showCvv ? "text" : "password"}
                placeholder={detectCardType(cardNumber) === "amex" ? "1234" : "123"}
                value={cvv}
                onChange={handleCvvChange}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCvv(!showCvv)}
              >
                {showCvv ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
              <img src="/icons/visa.png" alt="Visa" className="h-6 w-auto" />
              <img src="/icons/mastercard.png" alt="Mastercard" className="h-6 w-auto" />
              <img src="/icons/amex.png" alt="American Express" className="h-6 w-auto" />
            </div>
            <span>We accept all major credit cards</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
