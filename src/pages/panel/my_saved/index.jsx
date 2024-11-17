import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

import BasicLayoutDesktop from "../../../layouts/desktop/basic_layout";
import My_post_card from "./my_post_card";
import { find_my_saved } from "./query";
import SideBar from "../side_bar";

const MyBookmark = () => {
  const { user_info } = useSelector((redux) => redux.auth);
  const { data, isLoading } = useQuery(
    "my_saved",
    find_my_saved.bind(this, user_info?.id)
  );
  return (
    <BasicLayoutDesktop>
      <div className="flex flex-row gap-4">
        <SideBar />
        <div className="border flex flex-col gap-4 w-3/4 border-gray-300 rounded-md p-4">
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            data?.map((item, index) => <My_post_card key={index} {...item.sw_posts} />)
          )}
        </div>
      </div>
    </BasicLayoutDesktop>
  );
};

export default MyBookmark;