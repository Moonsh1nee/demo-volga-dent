export type Doctor = {
  id: string;
  name: string;
  role: string;
  years: number;
  expLabel: string;
  color: string;
  services: string[];
  bio: string;
};

export const DOCTORS: Doctor[] = [
  {
    id: "orlova",
    name: "Анна Орлова",
    role: "Терапевт, гигиенист",
    years: 9,
    expLabel: "9 лет опыта",
    color: "#2a8f8b",
    services: ["konsultatsiya", "gigiena", "kariyes", "otbelivanie"],
    bio: "Лечит кариес, проводит гигиену и отбеливание. Любит объяснять каждый шаг, поэтому у неё часто лечатся те, кто давно откладывал визит.",
  },
  {
    id: "savelev",
    name: "Игорь Савельев",
    role: "Хирург-имплантолог",
    years: 14,
    expLabel: "14 лет опыта",
    color: "#0f4f5a",
    services: ["konsultatsiya", "implantatsiya"],
    bio: "Ведёт имплантацию от планирования по 3D-снимку до установки коронки. Заранее показывает план и итоговую сумму.",
  },
  {
    id: "mart",
    name: "Елена Март",
    role: "Ортодонт",
    years: 11,
    expLabel: "11 лет опыта",
    color: "#5fa89a",
    services: ["konsultatsiya", "brekety"],
    bio: "Подбирает брекеты и элайнеры, работает со взрослыми и подростками. Показывает предполагаемый результат ещё до начала лечения.",
  },
  {
    id: "kim",
    name: "Денис Ким",
    role: "Терапевт",
    years: 6,
    expLabel: "6 лет опыта",
    color: "#3b7f9a",
    services: ["konsultatsiya", "kariyes", "gigiena"],
    bio: "Лечит кариес и проводит гигиену. Принимает в том числе детей старше семи лет.",
  },
];

export const doctorById = (id: string) => DOCTORS.find((d) => d.id === id);
export const doctorsForService = (slug: string) => DOCTORS.filter((d) => d.services.includes(slug));
export const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");
