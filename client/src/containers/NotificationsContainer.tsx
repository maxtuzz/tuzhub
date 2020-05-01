import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import ToastList from "../components/ToastList";

const mapStateToProps = (state: AppState) => ({
    notifications: state.notificationsReducer.notifications
});

const NotificationsContainer = connect(mapStateToProps)(ToastList);

export default NotificationsContainer;