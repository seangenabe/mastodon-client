import type { JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "default" | "danger" | "primary" | "link"
}

function getVariantClasses(variant: ButtonProps["variant"]) {
  if (variant === "primary") {
    return "bg-ctp-blue text-ctp-base hover:opacity-95 active:opacity-95 focus:opacity-95"
  }
  if (variant === "danger") {
    return "bg-ctp-red text-ctp-base hover:opacity-95 active:opacity-95 focus:opacity-95"
  }
  if (variant === "link") {
    return ""
  }
  return "bg-ctp-surface0 hover:bg-ctp-surface1 active:bg-ctp-surface1 focus:bg-ctp-surface1"
}

export default function Button({
  variant = "default",
  class: className,
  ...props
}: ButtonProps) {
  return (
    <button
      class={twMerge(
        "rounded-lg px-4 py-2 hover:outline active:outline focus:outline outline-4 outline-ctp-text",
        getVariantClasses(variant),
        className
      )}
      {...props}
    />
  )
}
