"use client";
import { useFormStatus } from "react-dom";
interface SubmitBttnProps {
  className?: string;
  text: string;
  pendingText: string;
}

export default function SubmitButton(props: SubmitBttnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={`${props.className}`}
    >
      {pending ? props.pendingText : props.text}
    </button>
  );
}
