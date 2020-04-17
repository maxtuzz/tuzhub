import {Action, ActionCreator} from "redux";
import ApiEntry from "../../model/ApiEntry";
import Alert from "../../model/Alert";

export enum ApiEntryActions {
    NEW_API_SUBMIT= "@@api-entries/NEW_API_SUBMIT",
    SET_ALERT = "@@api-entries/SET_ALERT",
    FETCH_APIS = "@@api-entries/FETCH_APIS",
    SET_LOADING = "@@api-entries/SET_LOADING",
    SET_API_ENTRIES = "@@api-entries/SET_API_ENTRIES",
    SET_SELECTED_API = "@@api-entries/SET_SELECTED_API",
    LOAD_API = "@@api-entries/LOAD_API"
}

export interface NewApiSubmitAction {
    type: ApiEntryActions.NEW_API_SUBMIT,
    apiEntry: ApiEntry
}

export interface AlertAction extends Action {
    type: ApiEntryActions.SET_ALERT,
    alert: Alert
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

export interface SetSelectedApiAction extends Action {
    type: ApiEntryActions.SET_SELECTED_API,
    apiEntry: ApiEntry | undefined
}

export interface LoadApiAction extends Action {
    type: ApiEntryActions.LOAD_API;
    apiName: string
}

export const submitNewApi: ActionCreator<NewApiSubmitAction> = (apiEntry: ApiEntry) => ({
    type: ApiEntryActions.NEW_API_SUBMIT,
    apiEntry: apiEntry
});

export const alertEntries: ActionCreator<AlertAction> = (alert: Alert) => ({
    type: ApiEntryActions.SET_ALERT,
    alert: alert
});

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

export const setSelectedApi: ActionCreator<SetSelectedApiAction> = (apiEntry: ApiEntry) => ({
    type: ApiEntryActions.SET_SELECTED_API,
    apiEntry: apiEntry
});

export const loadApi: ActionCreator<LoadApiAction> = (apiName: string) => ({
    type: ApiEntryActions.LOAD_API,
    apiName: apiName
});

export type TApiEntryActions = SetLoadingAction
    | SetApiEntriesAction
    | SetSelectedApiAction
    | LoadApiAction
    | AlertAction
    | NewApiSubmitAction;