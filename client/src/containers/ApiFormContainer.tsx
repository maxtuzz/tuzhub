import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ApiForm from '../components/ApiForm';
import ApiEntry from '../model/ApiEntry';
import { submitNewApi } from '../redux/api-entries/api-form/actions';
import { AppState } from '../redux/AppStore';

const mapStateToProps = (state: AppState) => ({
  isSubmitting: state.apiFormReducer.isSubmitting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submit: (apiEntry: ApiEntry) => dispatch(submitNewApi(apiEntry)),
});

const ApiFormContainer = connect(mapStateToProps, mapDispatchToProps)(ApiForm);

export default ApiFormContainer;
