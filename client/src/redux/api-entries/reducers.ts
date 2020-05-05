import ApiEntry from "../../model/ApiEntry";
import {ApiEntryActions, TApiEntryActions} from "./actions";
import Notification from "../../model/Notification";

interface IApiEntryState {
    readonly selectedApi?: ApiEntry;
    readonly apiEntries: ApiEntry[];
    readonly isLoading: boolean;
    readonly alert?: Notification;
}

const initialState: IApiEntryState = {
    selectedApi: undefined,
    apiEntries: [],
    isLoading: false,
    alert: undefined
};

export default function (state: IApiEntryState = initialState, action: TApiEntryActions) {
    switch (action.type) {
        case ApiEntryActions.SET_VIEWABLE_API:
            return {...state, selectedApi: action.apiEntry};
        case ApiEntryActions.SET_LOADING:
            console.log("called set loading: " + action.isLoading);
            return {...state, isLoading: action.isLoading};
        case ApiEntryActions.SET_API_ENTRIES:
            return {...state, apiEntries: action.apiEntries};
        default:
            return state;
    }
}