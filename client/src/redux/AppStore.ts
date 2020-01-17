import {combineReducers, createStore} from "redux";
import apiEntriesReducer from "./apiEntries/reducers";

export type AppState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({apiEntriesReducer});

export const AppStore = createStore(rootReducer);