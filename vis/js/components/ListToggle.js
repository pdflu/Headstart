import { connect } from "react-redux";

import ListToggleTemplate from "../templates/ListToggle";
import { toggleList } from "../actions";

// no logic required

const mapStateToProps = (state) => ({
  toggleLabel: state.list.show
    ? state.localization.hide_list
    : state.localization.show_list,
  // TODO derive this from the data
  docsNumber: state.list.docsNumber,
  docsNumberLabel: state.localization.items,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => {
    // TODO remove warn
    console.warn("*** React element 'List' click event triggered ***");
    dispatch(toggleList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListToggleTemplate);
