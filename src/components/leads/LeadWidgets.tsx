"use client"
import dynamic from "next/dynamic"

const WhatsAppCTA         = dynamic(() => import("./WhatsAppCTA"),         { ssr: false })
const ExitPopup           = dynamic(() => import("./ExitPopup"),           { ssr: false })
const StickyConversionBar = dynamic(() => import("./StickyConversionBar"), { ssr: false })

export default function LeadWidgets() {
  return (
    <>
      <WhatsAppCTA />
      <ExitPopup />
      <StickyConversionBar />
    </>
  )
}
