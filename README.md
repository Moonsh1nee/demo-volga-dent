# Волга-Дент — демо сайта стоматологии с онлайн-записью

Демонстрационный проект студии Akimov Web. Клиника, врачи, цены и адрес вымышлены.
Бэкенда нет: запись, список «Мои записи» и занятость слотов работают на фронтенде (localStorage, детерминированный хеш).

Стек: Next.js (App Router, статический экспорт), TypeScript, Tailwind CSS v4, Motion, React Hook Form + Zod, lucide-react.

## Запуск

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # статическая сборка в out/
npm run lint
```

Макет-эталон лежит в `design/maket-2.html`.

## Страницы

`/`, `/zapis`, `/uslugi/[slug]`, `/vrachi/[id]`, `/moi-zapisi`, `/contacts`, `/privacy`.

## Деплой на GitHub Pages

1. Settings → Pages → Source: **GitHub Actions**.
2. Push в `main` запускает `.github/workflows/deploy.yml` (`NEXT_PUBLIC_BASE_PATH` берётся из имени репозитория).
3. Адрес: `https://moonsh1nee.github.io/demo-volga-dent/`.

Локальная проверка с base path: `NEXT_PUBLIC_BASE_PATH=/demo-volga-dent npm run build`.

Страницы закрыты от индексации (`noindex`). Чтобы снять, уберите `robots` в `src/app/layout.tsx`.
