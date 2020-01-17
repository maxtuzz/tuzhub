import ApiEntry from "../../model/ApiEntry";
import {ApiEntriesActionType, TApiEntryActions} from "./actions";

interface IApiEntryState {
    readonly selectedApi: ApiEntry | undefined;
    readonly apiEntries: Array<ApiEntry>[];
    readonly isLoading: boolean;
}

const initialState: IApiEntryState = {
    selectedApi: undefined,
    apiEntries: [],
    isLoading: false
};

export default function(state: IApiEntryState = initialState, action: TApiEntryActions) {
    switch (action.type) {
        case ApiEntriesActionType.SET_SELECTED_API:
            return {...state, selectedApi: action.apiEntry};
        case ApiEntriesActionType.SET_LOADING:
            return {...state, isLoading: action.isLoading};
        case ApiEntriesActionType.SET_API_ENTRIES:
            return {...state, apiEntries: action.apiEntries};
        default:
            return state;
    }
};