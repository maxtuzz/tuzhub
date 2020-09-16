import { SpecActions, TApiSpecActions } from './actions';
import ApiSpec from '../../../model/ApiSpec';
import Notification from '../../../model/Notification';

interface IApiSpecState {
  readonly apiSpec?: ApiSpec;
  readonly alert?: Notification;
  readonly isLoading: boolean;
  readonly navPath?: string;
}

const initialState: IApiSpecState = {
  apiSpec: undefined,
  isLoading: false,
  alert: undefined,
  navPath: undefined,
};

export default function (state: IApiSpecState = initialState, action: TApiSpecActions) {
  switch (action.type) {
    case SpecActions.LOAD_SPEC:
      return { ...state, apiSpec: action.apiSpec };
    case SpecActions.SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SpecActions.ALERT_SPEC:
      return { ...state, alert: action.alert };
    case SpecActions.SCROLL_TO_SECTION:
      return { ...state, navPath: action.navPath };
    case SpecActions.RESET:
      return initialState;
    default:
      return state;
  }
}
