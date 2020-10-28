import React from "react";
import SearchBox from "../../components/filtersort/SearchBox";
import SortButtons from "../../components/filtersort/SortButtons";

const ButtonFilterSort = ({ displaySort }) => {
  return (
    // html template starts here
    // TODO move div back ASAP
    // <div id="explorer_options" class="row">
    <>
      <SearchBox />
      {!!displaySort && <SortButtons />}
    </>
    // html template ends here
  );
};

export default ButtonFilterSort;