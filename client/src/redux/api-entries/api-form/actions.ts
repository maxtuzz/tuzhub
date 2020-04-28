import {Action, ActionCreator} from "redux";
import ApiEntry from "../../../model/ApiEntry";

export enum ApiFormActions {
    API_SUBMIT = "@@api-form/API_SUBMIT",
    API_SUBMIT_LOADING = "@@api-form/API_SUBMIT_LOADING",
}

export interface NewApiSubmitAction {
    type: ApiFormActions.API_SUBMIT,
    apiEntry: ApiEntry
}

interface SubmitLoadingAction extends Action {
    type: ApiFormActions.API_SUBMIT_LOADING,
    isSubmitting: boolean
}

export const submitNewApi: ActionCreator<NewApiSubmitAction> = (apiEntry: ApiEntry) => ({
    type: ApiFormActions.API_SUBMIT,
    apiEntry: apiEntry
});

export const setApiSubmitLoading: ActionCreator<SubmitLoadingAction> = (isSubmitting: boolean) => ({
    type: ApiFormActions.API_SUBMIT_LOADING,
    isSubmitting: isSubmitting
})

export type TApiFormActions = NewApiSubmitAction
    | SubmitLoadingAction;