import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export const useSearch = () => {
  return useContext(SearchContext);
};