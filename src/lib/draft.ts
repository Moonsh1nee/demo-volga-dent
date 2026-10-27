import { useSyncExternalStore } from "react";
import { readJSON, writeJSON } from "./storage";

const KEY = "volgadent-draft";

export type Draft = {
  step: number;
  service: string | null;
  doctor: string | null;
  day: string | null;
  time: string | null;
  name: string;
  phone: string;
  consent: boolean;
  lastId: string | null;
};

export const EMPTY_DRAFT: Draft = {
  step: 0,
  service: null,
  doctor: null,
  day: null,
  time: null,
  name: "",
  phone: "",
  consent: false,
  lastId: null,
};

let state: Draft = EMPTY_DRAFT;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  state = { ...EMPTY_DRAFT, ...readJSON<Partial<Draft>>(KEY, {}, "session") };
}

export function setDraft(patch: Partial<Draft>) {
  load();
  state = { ...state, ...patch };
  writeJSON(KEY, state, "session");
  listeners.forEach((l) => l());
}

export const resetDraft = () => setDraft({ ...EMPTY_DRAFT });

export function useDraft(): Draft {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      load();
      return state;
    },
    () => EMPTY_DRAFT,
  );
}
