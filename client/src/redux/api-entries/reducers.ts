import ApiEntry from "../../model/ApiEntry";
import {ApiEntryActions, TApiEntryActions} from "./actions";

interface IApiEntryState {
    readonly selectedApi: ApiEntry | undefined;
    readonly apiEntries: ApiEntry[];
    readonly isLoading: boolean;
}

const initialState: IApiEntryState = {
    selectedApi: undefined,
    apiEntries: [],
    isLoading: false
};

export default function (state: IApiEntryState = initialState, action: TApiEntryActions) {
    switch (action.type) {
        case ApiEntryActions.SET_SELECTED_API:
            return {...state, selectedApi: action.apiEntry};
        case ApiEntryActions.SET_LOADING:
            console.log("called set loading: " + action.isLoading);
            return {...state, isLoading: action.isLoading};
        case ApiEntryActions.SET_API_ENTRIES:
            return {...state, apiEntries: action.apiEntries};
        default:
            return state;
    }
};