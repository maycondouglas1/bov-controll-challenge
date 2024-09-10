export interface DeleteChecklist {
  delete(params: DeleteChecklist.Params): Promise<void>;
}

export namespace DeleteChecklist {
  export type Params = {
    _id: string;
  };
}
