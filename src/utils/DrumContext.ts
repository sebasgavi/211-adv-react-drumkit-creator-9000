import React from "react";
import { DrumType } from "./DrumType";

export const DrumContext = React.createContext({
  drums: [] as DrumType[],
});