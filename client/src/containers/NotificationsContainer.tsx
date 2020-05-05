import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import ToastList from "../components/ToastList";
import Notification from "../model/Notification";

const mapStateToProps = ({notificationsReducer }: AppState) => {
    const notifications: Notification[] = Array.from(notificationsReducer.notifications.values());

    return ({
        notifications: notifications
    });
};

const NotificationsContainer = connect(mapStateToProps)(ToastList);

export default NotificationsContainer;