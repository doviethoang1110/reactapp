import { combineReducers } from "redux";
import { categories } from "./categories";
import { brands } from "./brands";
import { loading} from "./loading";

export const reducers = combineReducers({
  loading,
  categories,
  brands
});
