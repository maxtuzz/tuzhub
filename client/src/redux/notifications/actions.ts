import { Action, ActionCreator } from 'redux';
import Notification from '../../model/Notification';

export enum NotificationActions {
  PUSH = '@@notifications/PUSH',
  POP = '@@notifications/POP',
  DISMISS = '@@notifications/DISMISS',
  CLEAR = '@@notifications/CLEAR',
}

export interface PushAction extends Action {
  type: NotificationActions.PUSH;
  notification: Notification;
}

export interface DismissAction extends Action {
  type: NotificationActions.DISMISS;
  key: string;
}

export interface PopAction extends Action {
  type: NotificationActions.POP;
}

export interface ClearAction extends Action {
  type: NotificationActions.CLEAR;
}

export const pushNotification: ActionCreator<PushAction> = (notification: Notification) => ({
  type: NotificationActions.PUSH,
  notification: notification,
});

export const popNotification: ActionCreator<PopAction> = () => ({
  type: NotificationActions.POP,
});

export const dismissNotification: ActionCreator<DismissAction> = (key: string) => ({
  type: NotificationActions.DISMISS,
  key: key,
});

export type TNotificationActions = PopAction | ClearAction | PushAction | DismissAction;
