import {Action, ActionCreator} from "redux";
import ApiEntry from "../../model/ApiEntry";

export enum ApiEntryActions {
    FETCH_APIS = "@@api-entries/FETCH_APIS",
    SET_LOADING = "@@api-entries/SET_LOADING",
    SET_API_ENTRIES = "@@api-entries/SET_API_ENTRIES",
    SET_SELECTED_API = "@@api-entries/SET_SELECTED_API"
}

interface FetchApisAction extends Action {
    type: ApiEntryActions.FETCH_APIS
}

interface SetLoadingAction extends Action {
    type: ApiEntryActions.SET_LOADING,
    isLoading: boolean;
}

interface SetApiEntriesAction extends Action {
    type: ApiEntryActions.SET_API_ENTRIES,
    apiEntries: ApiEntry[];
}

interface SetSelectedApiAction extends Action {
    type: ApiEntryActions.SET_SELECTED_API,
    apiEntry: ApiEntry | undefined;
}

export const fetchApis: ActionCreator<FetchApisAction> = () => ({
    type: ApiEntryActions.FETCH_APIS
});

export const setLoading: ActionCreator<SetLoadingAction> = (isLoading: boolean) => ({
    type: ApiEntryActions.SET_LOADING,
    isLoading: isLoading
});

export const setApiEntries: ActionCreator<SetApiEntriesAction> = (apiEntries: ApiEntry[]) => ({
    type: ApiEntryActions.SET_API_ENTRIES,
    apiEntries: apiEntries
});

export const setSelectedApi: ActionCreator<SetSelectedApiAction> = (apiEntry: ApiEntry) => ({
    type: ApiEntryActions.SET_SELECTED_API,
    apiEntry: apiEntry
});

export type TApiEntryActions = SetLoadingAction
    | SetApiEntriesAction
    | SetSelectedApiAction;