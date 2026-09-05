"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({
  children = "Speichern",
  pendingLabel = "Wird gespeichert …",
  className,
}: {
  children?: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
