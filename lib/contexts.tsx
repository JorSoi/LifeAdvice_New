import { OverlayContextType } from "@/types/home.types";
import { createContext } from "react";

export const OverlayContext = createContext<OverlayContextType | null>(null);