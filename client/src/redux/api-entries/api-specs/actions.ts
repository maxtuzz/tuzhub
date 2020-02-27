import {Action, ActionCreator} from "redux";
import ApiSpec from "../../../model/ApiSpec";
import Alert from "../../../model/Alert";

export enum SpecActions {
    FETCH_ACTIVE_SPEC = "@@specs/FETCH_ACTIVE_SPEC",
    LOAD_SPEC = "@@specs/LOAD_ACTIVE_SPEC",
    SET_LOADING = "@@specs/SET_LOADING",
    ALERT_SPEC = "@@specs/ALERT_SPEC",
    NAV_TO_RESOURCE = "@@specs/NAV_TO_RESOURCE",
    RESET = "@@specs/RESET",
}

export interface FetchActiveSpecAction extends Action {
    // Todo: may rename this / make more generic
    type: SpecActions.FETCH_ACTIVE_SPEC
}

export interface LoadSpecAction extends Action {
    type: SpecActions.LOAD_SPEC,
    apiSpec: ApiSpec
}

interface SetLoadingAction extends Action {
    type: SpecActions.SET_LOADING,
    isLoading: boolean
}

interface AlertSpecAction extends Action {
    type: SpecActions.ALERT_SPEC,
    alert: Alert
}

interface NavToResourceAction extends Action {
    type: SpecActions.NAV_TO_RESOURCE,
    resourcePath: string
}

interface ResetSpecStateAction extends Action {
    type: SpecActions.RESET
}


/**
 * Fetch active spec infers api entry from selected api from state
 */
export const fetchActiveSpec: ActionCreator<FetchActiveSpecAction> = () => ({
    type: SpecActions.FETCH_ACTIVE_SPEC
});

export const setSpecLoading: ActionCreator<SetLoadingAction> = (isLoading: boolean) => ({
    type: SpecActions.SET_LOADING,
    isLoading: isLoading
});

export const loadSpec: ActionCreator<LoadSpecAction> = (apiSpec: ApiSpec) => ({
    type: SpecActions.LOAD_SPEC,
    apiSpec: apiSpec
});

export const alertSpec: ActionCreator<AlertSpecAction> = (alert: Alert) => ({
    type: SpecActions.ALERT_SPEC,
    alert: alert
});

export const navToResource: ActionCreator<NavToResourceAction> = (resourcePath: string) => ({
    type: SpecActions.NAV_TO_RESOURCE,
    resourcePath: resourcePath
});

export const resetSpecPage: ActionCreator<ResetSpecStateAction> = () => ({
    type: SpecActions.RESET
});

export type TApiSpecActions = FetchActiveSpecAction
    | LoadSpecAction
    | SetLoadingAction
    | AlertSpecAction
    | NavToResourceAction
    | ResetSpecStateAction;