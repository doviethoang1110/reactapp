import { combineReducers } from "redux";
import { categories } from "./categories";
import { loading} from "./loading";

export const reducers = combineReducers({
  loading,
  categories,
});
