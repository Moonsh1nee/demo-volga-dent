import { useSyncExternalStore } from "react";

let message = "";
let seq = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(text: string) {
  message = text;
  seq++;
  emit();
  clearTimeout(timer);
  timer = setTimeout(() => {
    message = "";
    emit();
  }, 3600);
}

export function useToast() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => message,
    () => "",
  );
}
export const toastSeq = () => seq;
