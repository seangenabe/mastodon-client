import Button, { type ButtonProps } from "@/components/common/Button";

export type CloseButtonProps = ButtonProps;

export default function CloseButton(props: CloseButtonProps) {
  return (
    <Button aria-label="Close" {...props}>
      <span class="icon-[fe--close]"></span>
    </Button>
  );
}
