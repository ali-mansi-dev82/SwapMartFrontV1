import React from "react";
import PropTypes from "prop-types";

import SideBar from "../sidebar/desktop";
import BasicLayoutDesktop from "../../../layouts/desktop/basic_layout";
import { CircularProgress } from "@mui/material";
import My_post_card from "./my_post_card/index";

const MySavedDesktop = ({ data, isLoading }) => {
  return (
    <BasicLayoutDesktop>
      <div className="flex flex-row gap-4">
        <SideBar />
        <div className="border flex flex-col gap-4 w-3/4 border-gray-300 rounded-md p-4">
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            data?.map((item, index) => (
              <My_post_card key={index} {...item?.sw_posts} />
            ))
          )}
        </div>
      </div>
    </BasicLayoutDesktop>
  );
};
MySavedDesktop.propTypes = {
  data: PropTypes.any,
  isLoading: PropTypes.bool,
};
export default MySavedDesktop;
