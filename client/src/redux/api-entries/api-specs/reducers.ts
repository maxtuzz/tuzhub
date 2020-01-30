import {SpecActions, TApiSpecActions} from "./actions";
import ApiSpec from "../../../model/ApiSpec";
import Alert from "../../../model/Alert";

interface IApiSpecState {
    readonly apiSpec?: ApiSpec;
    readonly alert?: Alert;
    readonly isLoading: boolean
}

const initialState: IApiSpecState = {
    apiSpec: undefined,
    isLoading: false,
    alert: undefined
};

export default function (state: IApiSpecState = initialState, action: TApiSpecActions) {
    switch (action.type) {
        case SpecActions.LOAD_SPEC:
            return {...state, apiSpec: action.apiSpec};
        case SpecActions.SET_LOADING:
            return {...state, isLoading: action.isLoading};
        case SpecActions.ALERT_SPEC:
            return {...state, alert: action.alert};
        case SpecActions.RESET:
            return initialState;
        default:
            return state;
    }
};