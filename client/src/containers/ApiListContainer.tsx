import {Dispatch} from "redux";
import {fetchApis} from "../redux/api-entries/actions";
import {connect} from "react-redux";
import Button from "../components/lib/Button";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getApis: () => dispatch(fetchApis())
});

export const ApiListContainer = connect(null, mapDispatchToProps)(Button);