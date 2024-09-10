import { Checklist } from "@/domain/entities/checklist.entity";

export interface CreateChecklist {
  create(params: CreateChecklist.Params[]): Promise<Checklist[]>;
}

export namespace CreateChecklist {
  export type Params = {
    _id?: string;
    type: string;
    amount_of_milk_produced: number;
    farmer: {
      name: string;
      city: string;
    };
    from: {
      name: string;
    };
    to: {
      name: string;
    };
    location?: {
      latitude: number;
      longitude: number;
    };
    number_of_cows_head: number;
    had_supervision: boolean;
    created_at: string;
    updated_at: string;
  };
}
