import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import SpecNavItems from "../components/SpecNavItems";

const mapStateToProps = (state: AppState) => ({
    apiDoc: state.apiSpecReducer.apiSpec?.document,
});

const SpecNavContainer = connect(mapStateToProps)(SpecNavItems);

export default SpecNavContainer;