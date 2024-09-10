import { z } from "zod";

export const checklistSchema = z.object({
  type: z.string().min(1, "Tipo é obrigatório"),
  amount_of_milk_produced: z
    .string()
    .min(1, "Quantidade de leite produzido é obrigatório"),
  farmer: z.object({
    name: z.string().min(1, "Nome do fazendeiro é obrigatório"),
    city: z.string().min(1, "Cidade do fazendeiro é obrigatório"),
  }),
  from: z.object({
    name: z.string().min(1, "Local de origem é obrigatório"),
  }),
  to: z.object({
    name: z.string().min(1, "Local de destino é obrigatório"),
  }),
  number_of_cows_head: z.string().min(1, "Quantidade de cabeças é obrigatório"),
  had_supervision: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ChecklistData = z.infer<typeof checklistSchema>;
