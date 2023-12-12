import { Database } from "./database.types";

export type Lesson = Database['public']['Tables']['lessons']['Row']

export type CategoryProps = Database['public']['Tables']['advice_categories']['Row']