import {NotificationActions, TNotificationActions} from "./actions";
import Notification from "../../model/Notification";

interface INotificationState {
    readonly notifications: Notification[];
}

const initialState: INotificationState = {
    notifications: []
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
            return {notifications: [action.notification, ...state.notifications]}
        case NotificationActions.POP:
            return {notifications: state.notifications.pop()};
        default:
            return state;
    }
};