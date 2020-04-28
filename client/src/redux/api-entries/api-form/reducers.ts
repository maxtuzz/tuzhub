import {ApiFormActions, TApiFormActions} from "./actions";

interface IApiFormState {
    readonly isSubmitting: boolean;
}

const initialState: IApiFormState = {
    isSubmitting: false
};

export default function (state: IApiFormState = initialState, action: TApiFormActions) {
    if (action.type === ApiFormActions.API_SUBMIT_LOADING) {
        return {...state, isSubmitting: action.isSubmitting};
    } else {
        return state;
    }
};