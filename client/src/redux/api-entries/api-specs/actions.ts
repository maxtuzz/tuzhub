import {Action, ActionCreator} from "redux";
import ApiSpec from "../../../model/ApiSpec";

export enum SpecActions {
    FETCH_ACTIVE_SPEC = "@@specs/FETCH_ACTIVE_SPEC",
    LOAD_ACTIVE_SPEC = "@@specs/LOAD_ACTIVE_SPEC",
    SET_LOADING = "@@specs/SET_LOADING",
}

export interface FetchActiveSpecAction extends Action {
    type: SpecActions.FETCH_ACTIVE_SPEC
}

export interface LoadSpecAction extends Action {
    type: SpecActions.LOAD_ACTIVE_SPEC,
    apiSpec: ApiSpec
}

interface SetLoadingAction extends Action {
    type: SpecActions.SET_LOADING,
    isLoading: boolean
}

/**
 * Fetch active spec infers api entry from selected api from state
 */
export const fetchActiveSpec: ActionCreator<FetchActiveSpecAction> = () => ({
    type: SpecActions.FETCH_ACTIVE_SPEC
});

export const loadActiveSpec: ActionCreator<LoadSpecAction> = (apiSpec: ApiSpec) => ({
   type: SpecActions.LOAD_ACTIVE_SPEC,
   apiSpec: apiSpec
});

export type TApiSpecActions = FetchActiveSpecAction
    | LoadSpecAction
    | SetLoadingAction;