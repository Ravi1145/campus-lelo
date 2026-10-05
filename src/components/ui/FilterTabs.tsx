"use client"
import { cn } from "@/lib/utils"

interface FilterTabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
  className?: string
}

export default function FilterTabs({ tabs, active, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
            active === tab
              ? "bg-[#011B40] border-[#011B40] text-white"
              : "bg-white border-[#E5E9F0] text-[#475569] hover:border-[#011B40] hover:text-[#011B40]"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
