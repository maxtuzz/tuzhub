import {Action, ActionCreator} from "redux";
import ApiEntry from "../../model/ApiEntry";

export enum ApiEntryActions {
    FETCH_APIS = "@@api-entries/FETCH_APIS",
    SET_LOADING = "@@api-entries/SET_LOADING",
    SET_API_ENTRIES = "@@api-entries/SET_API_ENTRIES",
    SET_VIEWABLE_API = "@@api-entries/SET_VIEWABLE_API",
    LOAD_API = "@@api-entries/LOAD_API"
}

interface FetchApisAction extends Action {
    type: ApiEntryActions.FETCH_APIS
}

interface SetLoadingAction extends Action {
    type: ApiEntryActions.SET_LOADING,
    isLoading: boolean
}

interface SetApiEntriesAction extends Action {
    type: ApiEntryActions.SET_API_ENTRIES,
    apiEntries: ApiEntry[]
}

export interface SetViewableApiAction extends Action {
    type: ApiEntryActions.SET_VIEWABLE_API,
    apiEntry?: ApiEntry
}

export interface LoadApiAction extends Action {
    type: ApiEntryActions.LOAD_API;
    apiName: string
}

export const fetchApis: ActionCreator<FetchApisAction> = () => ({
    type: ApiEntryActions.FETCH_APIS
});

export const setLoadingApis: ActionCreator<SetLoadingAction> = (isLoading: boolean) => ({
    type: ApiEntryActions.SET_LOADING,
    isLoading: isLoading
});

export const setApiEntries: ActionCreator<SetApiEntriesAction> = (apiEntries: ApiEntry[]) => ({
    type: ApiEntryActions.SET_API_ENTRIES,
    apiEntries: apiEntries
});

export const setViewableApi: ActionCreator<SetViewableApiAction> = (apiEntry: ApiEntry) => ({
    type: ApiEntryActions.SET_VIEWABLE_API,
    apiEntry: apiEntry
});

export const loadApi: ActionCreator<LoadApiAction> = (apiName: string) => ({
    type: ApiEntryActions.LOAD_API,
    apiName: apiName
});

export type TApiEntryActions = SetLoadingAction
    | SetApiEntriesAction
    | SetViewableApiAction
    | LoadApiAction;