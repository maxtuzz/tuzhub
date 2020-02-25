import {connect} from "react-redux";
import {AppState} from "../redux/AppStore";
import SpecNavItems from "../components/SpecNavItems";

const mapStateToProps = (state: AppState) => ({
    apiSpec: state.apiSpecReducer.apiSpec,
});

const SpecNavContainer = connect(mapStateToProps)(SpecNavItems);

export default SpecNavContainer;