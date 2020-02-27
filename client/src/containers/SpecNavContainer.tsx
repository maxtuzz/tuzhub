import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import SpecNavItems from "../components/SpecNavItems";
import {Dispatch} from "redux";
import {navToResource} from "../redux/api-entries/api-specs/actions";

const mapStateToProps = (state: AppState) => ({
    apiDoc: state.apiSpecReducer.apiSpec?.document,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navToResource: (resourcePath: string) => dispatch(navToResource(resourcePath))
});

const SpecNavContainer = connect(mapStateToProps, mapDispatchToProps)(SpecNavItems);

export default SpecNavContainer;