"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Eye, EyeOff, HelpCircle, Building2, Clock, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CardDetector } from "./Card-detector"

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string | React.ComponentType<any>
  requiresCard?: boolean
  comingSoon?: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit or Debit Card",
    description: "Visa, Mastercard, American Express, Discover",
    icon: "/icons/visa.png",
    requiresCard: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal account",
    icon: "/icons/paypal.png",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Touch ID, Face ID, or passcode",
    icon: "/icons/apple-pay.png",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    description: "Pay with Google",
    icon: "/icons/google-pay.png",
  },
  {
    id: "ach",
    name: "ACH Direct Debit",
    description: "Pay directly from your bank account",
    icon: Building2,
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Buy now, pay later in 4 installments",
    icon: "/icons/klarna.png",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    description: "4 interest-free payments",
    icon: "/icons/afterpay.png",
  },
  {
    id: "cashapp",
    name: "Cash App Pay",
    description: "Pay with Cash App",
    icon: "/icons/cashapp.png",
  },
]

export default function PaymentAccordion() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
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

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      {paymentMethods.map((method: PaymentMethod) => (
        <Card key={method.id} className="overflow-hidden">
          <Collapsible
            open={selectedMethod === method.id}
            onOpenChange={(open: boolean) => setSelectedMethod(open ? method.id : null)}
          >
            <CollapsibleTrigger asChild>
              <div className="w-full p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-8">
                    {typeof method.icon === "string" ? (
                      <img
                        src={method.icon || "/placeholder.svg"}
                        alt={method.name}
                        className="h-8 w-12 object-contain"
                      />
                    ) : (
                      <method.icon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.id === "card" && cardNumber && <CardDetector cardNumber={cardNumber} className="h-6 w-10" />}
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform data-[state=open]:rotate-180" />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 space-y-4">
                {method.requiresCard ? (
                  <>
                    {/* Card Number */}
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
                          <CardDetector cardNumber={cardNumber} className="h-6 w-10" />
                        </div>
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div className="space-y-2">
                      <Label htmlFor="cardholder-name">Cardholder Name</Label>
                      <Input
                        id="cardholder-name"
                        placeholder="John Doe"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiration Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryChange} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="cvv">Security Code</Label>
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

                    {/* Security Info */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>
                  </>
                ) : method.id === "ach" ? (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="routing-number">Routing Number</Label>
                        <Input id="routing-number" placeholder="123456789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input id="account-number" placeholder="1234567890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-holder">Account Holder Name</Label>
                        <Input id="account-holder" placeholder="John Doe" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span>ACH payments typically take 3-5 business days to process</span>
                      </div>
                    </div>
                  </>
                ) : method.id === "klarna" || method.id === "afterpay" ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Pay in 4 installments</span>
                      </div>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• $25.50 today</p>
                        <p>• $25.50 in 2 weeks</p>
                        <p>• $25.50 in 4 weeks</p>
                        <p>• $25.50 in 6 weeks</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to {method.name} to complete your purchase.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to {method.name} to complete your purchase.
                    </p>
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}