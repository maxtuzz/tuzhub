import {Action, ActionCreator} from "redux";
import ApiEntry from "../../model/ApiEntry";

export enum ApiEntriesActionType {
    FETCH_APIS = "@@api-entries/FETCH_APIS",
    SET_LOADING = "@@api-entries/SET_LOADING",
    SET_API_ENTRIES = "@@api-entries/SET_API_ENTRIES",
    SET_SELECTED_API = "@@api-entries/SET_SELECTED_API"
}

interface FetchApisAction extends Action {
    type: ApiEntriesActionType.FETCH_APIS
}

interface SetLoadingAction extends Action {
    type: ApiEntriesActionType.SET_LOADING,
    isLoading: boolean;
}

interface SetApiEntriesAction extends Action {
    type: ApiEntriesActionType.SET_API_ENTRIES,
    apiEntries: ApiEntry[];
}

interface SetSelectedApiAction extends Action {
    type: ApiEntriesActionType.SET_SELECTED_API,
    apiEntry: ApiEntry | undefined;
}

export const fetchApis: ActionCreator<FetchApisAction> =() => ({
   type: ApiEntriesActionType.FETCH_APIS
});

export const setLoading: ActionCreator<SetLoadingAction> = (isLoading: boolean) => ({
    type: ApiEntriesActionType.SET_LOADING,
    isLoading: isLoading
});

export const setApiEntries: ActionCreator<SetApiEntriesAction> = (apiEntries: ApiEntry[]) => ({
    type: ApiEntriesActionType.SET_API_ENTRIES,
    apiEntries: apiEntries
});

export const setSelectedApi: ActionCreator<SetSelectedApiAction> = (apiEntry: ApiEntry) => ({
    type: ApiEntriesActionType.SET_SELECTED_API,
    apiEntry: apiEntry
});

export type TApiEntryActions = SetLoadingAction
    | SetApiEntriesAction
    | SetSelectedApiAction;