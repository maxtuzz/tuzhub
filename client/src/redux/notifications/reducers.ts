import {NotificationActions, TNotificationActions} from "./actions";
import Notification from "../../model/Notification";

interface INotificationState {
    readonly notifications: Map<string, Notification>;
}

const initialState: INotificationState = {
    notifications: new Map<string, Notification>()
};

/**
 * Redux state store for managing pushing/popping notifications
 * @param state
 * @param action
 */
export default function (state: INotificationState = initialState, action: TNotificationActions) {
    switch (action.type) {
        case NotificationActions.CLEAR:
            return initialState;
        case NotificationActions.PUSH:
            return {...state, notifications: state.notifications.set(action.notification.message, action.notification)};
        case NotificationActions.DISMISS:
            state.notifications.delete(action.key);
            return {...state, notifications: state.notifications};
        default:
            return state;
    }
}