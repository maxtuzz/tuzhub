import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import ToastList from "../components/ToastList";
import {Dispatch} from "redux";
import {dismissNotification} from "../redux/notifications/actions";

const mapStateToProps = ({notificationsReducer}: AppState) => ({
    notifications: Array.from(notificationsReducer.notifications.values())
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    notificationClicked: (key: string) => dispatch(dismissNotification(key))
});

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(ToastList);

export default NotificationsContainer;