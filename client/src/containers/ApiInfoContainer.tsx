import {Dispatch} from "redux";
import {loadApi} from "../redux/api-entries/actions";
import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import ApiInfo from "../components/ApiInfo";

const mapStateToProps = (state: AppState) => ({
    apiEntry: state.apiEntriesReducer.selectedApi,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: { apiName: string }) => ({
    loadApi: () => dispatch(loadApi(ownProps.apiName))
});

const ApiInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ApiInfo);

export default ApiInfoContainer;