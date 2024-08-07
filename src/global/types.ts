import { Action } from "./enums";

export type InquirerAnswers = {
  action: Action;
};

export interface User {
  name: string;
  age: number;
}
