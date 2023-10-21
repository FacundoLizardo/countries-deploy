import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducer/reducer";
import thunk from "redux-thunk";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);
export default store;
