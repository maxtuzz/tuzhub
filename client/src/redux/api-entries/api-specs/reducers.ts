import {SpecActions, TApiSpecActions} from "./actions";
import ApiSpec from "../../../model/ApiSpec";
import Alert from "../../../model/Alert";

interface IApiSpecState {
    readonly activeSpec?: ApiSpec;
    readonly alert?: Alert;
    readonly isLoading: boolean
}

const initialState: IApiSpecState = {
    activeSpec: undefined,
    isLoading: false,
    alert: undefined
};

export default function (state: IApiSpecState = initialState, action: TApiSpecActions) {
    switch (action.type) {
        case SpecActions.LOAD_ACTIVE_SPEC:
            return {...state, activeSpec: action.apiSpec};
        case SpecActions.SET_LOADING:
            return {...state, isLoading: action.isLoading};
        default:
            return state;
    }
};