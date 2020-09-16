import { connect } from 'react-redux';
import { AppState } from '../redux/AppStore';
import { OpenAPIV3 } from 'openapi-types';
import PropertyTable from '../components/lib/PropertyTable';

const mapStateToProps = (state: AppState, ownProps: { schema: OpenAPIV3.SchemaObject }) => ({
  schema: ownProps.schema,
  components: state.apiSpecReducer.apiSpec?.document?.components,
});

const PropertyTableContainer = connect(mapStateToProps)(PropertyTable);

export default PropertyTableContainer;
