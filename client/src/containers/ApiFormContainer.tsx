import {Dispatch} from "redux";
import {submitNewApi} from "../redux/api-entries/actions";
import {connect} from "react-redux";
import ApiForm from "../components/ApiForm";
import ApiEntry from "../model/ApiEntry";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    submit: (apiEntry: ApiEntry) => dispatch(submitNewApi(apiEntry))
});

const ApiFormContainer = connect(null, mapDispatchToProps)(ApiForm);

export default ApiFormContainer;