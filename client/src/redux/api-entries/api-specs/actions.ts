import {Action} from "redux";

export enum SpecActions {
    FETCH_ACTIVE_SPEC = "@@specs/FETCH_ACTIVE_SPEC",
}


interface FetchActiveSpecAction extends Action {
    type: SpecActions.FETCH_ACTIVE_SPEC
}

export {}