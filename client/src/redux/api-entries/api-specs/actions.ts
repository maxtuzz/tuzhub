import {Action, ActionCreator} from "redux";
import ApiEntry from "../../../model/ApiEntry";

export enum SpecActions {
    FETCH_ACTIVE_SPEC = "@@specs/FETCH_ACTIVE_SPEC",
}

export interface FetchActiveSpecAction extends Action {
    type: SpecActions.FETCH_ACTIVE_SPEC
}

export const fetchActiveSpec: ActionCreator<FetchActiveSpecAction> = (apiEntry: ApiEntry) => ({
    type: SpecActions.FETCH_ACTIVE_SPEC,
    apiEntry: apiEntry
});

export type TApiSpecActions = FetchActiveSpecAction;