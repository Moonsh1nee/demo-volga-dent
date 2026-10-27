type Kind = "local" | "session";

function area(kind: Kind): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function readJSON<T>(key: string, fallback: T, kind: Kind = "local"): T {
  try {
    const raw = area(kind)?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown, kind: Kind = "local") {
  try {
    area(kind)?.setItem(key, JSON.stringify(value));
  } catch {
    /* хранилище недоступно: демо продолжает работать в памяти */
  }
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
