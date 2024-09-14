import type { JSX } from "solid-js"
import { twMerge } from "tailwind-merge"

export default function Input({
  class: className,
  ...props
}: JSX.IntrinsicElements["input"]) {
  return (
    <input
      class={twMerge(
        "rounded-md bg-ctp-surface1 outline-4 hover:outline focus:outline active:outline outline-ctp-text px-4 py-2",
        className
      )}
      {...props}
    />
  )
}
