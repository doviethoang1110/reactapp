import { combineReducers } from "redux";
import { categories } from "./categories";
import { brands } from "./brands";
import { loading} from "./loading";
import { auth } from "./auth";

export const reducers = combineReducers({
  loading,
  categories,
  brands,
  auth
});
