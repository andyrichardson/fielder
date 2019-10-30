import { createContext } from "react";
import { FormState } from "./types";

export const FormContext = createContext<FormState<any>>(null as any);
