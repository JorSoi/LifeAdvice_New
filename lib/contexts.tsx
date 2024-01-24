import { LogoVisibilityContextType, OverlayContextType } from "@/types/home.types";
import { SavedLessonsContextType } from "@/types/home.types";
import { createContext } from "react";

export const OverlayContext = createContext<OverlayContextType | null>(null);

export const SavedLessonsContext = createContext<SavedLessonsContextType | null>(null);

export const LogoVisibilityContext = createContext<LogoVisibilityContextType | null>(null);