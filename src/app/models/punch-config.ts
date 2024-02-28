import { FunctionKey } from "./function-key";

export interface PunchConfig {
  "status": string;
  "logintype": number;
  "clocktype": number;
  "checklo": number;
  "closetable": number;
  "lunchlock": number;
  "lunchlen": number;
  "breaklock": number;
  "breaklen": number;
  "fk1": FunctionKey;
  "fk2": FunctionKey;
  "fk3": FunctionKey;
  "fk4": FunctionKey;
  "fk5": FunctionKey;
  "fk6": FunctionKey;
}
