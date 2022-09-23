import { IModel } from "./model";

export interface IMainBoard {
  boards : [
    {
      id: string;
      title: string;
      description: string;
      createdOn: Date;
    }
  ]
}
