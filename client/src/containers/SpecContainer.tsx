import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import {fetchActiveSpec, resetSpecPage} from "../redux/api-entries/api-specs/actions";
import SpecViewer from "../components/SpecViewer";

const mapStateToProps = (state: AppState) => ({
    selectedApi: state.apiEntriesReducer.selectedApi,
    apiSpec: state.apiSpecReducer.apiSpec,
    alert: state.apiSpecReducer.alert,
    isLoading: state.apiSpecReducer.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    // By default, fetch active spec
    fetchSpec: () => dispatch(fetchActiveSpec()),
    resetSpec: () => dispatch(resetSpecPage())
});

const SpecContainer = connect(mapStateToProps, mapDispatchToProps)(SpecViewer);

export default SpecContainer;