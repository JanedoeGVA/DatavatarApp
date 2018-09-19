import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addApi } from '../actions'; // imports action creators as needed
import Subscribe from '../components/subscribe'; //imports the feature's entry component.

import { getCategoryListing } from '../selectors'; // imports selectors as needed.

const mapStateToProps = (state) => ({
  exploreData: state.exploreData,
  categoryListing: getCategoryListing(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addApi
    },
    dispatch
  );

// Connects the entry-component and makes it the default export.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
