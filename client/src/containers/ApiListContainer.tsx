import {Dispatch} from "redux";
import {fetchApis} from "../redux/api-entries/actions";
import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import ApiList from "../components/ApiList";

const mapStateToProps = (state: AppState) => ({
    apiEntries: state.apiEntriesReducer.apiEntries,
    isLoading: state.apiEntriesReducer.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getApis: () => dispatch(fetchApis())
});

const ApiListContainer = connect(mapStateToProps, mapDispatchToProps)(ApiList);

export default ApiListContainer;