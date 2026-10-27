import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Введите телефон полностью, не меньше 10 цифр"),
  consent: z.boolean().refine((v) => v, "Нужно согласие на обработку данных"),
});

export type ContactInput = z.input<typeof contactSchema>;
