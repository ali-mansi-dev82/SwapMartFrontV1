import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

import { openLayout, resetAll } from "../../../features/layout/layoutSlice";
import ChevrowDown from "../../../assets/icon/chevron-down.svg";
import { log_out } from "../../../features/auth/authSlice";
import Supabase from "../../../lib/helper/ClientSupabase";

const DropItemComponent = ({
  title,
  link,
  secondary,
  className,
  onClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    return;
  },
}) => {
  const dispatch = useDispatch();

  return (
    <li
      onClick={onClick}
      className={`flex border-gray-200 text-gray-800  cursor-pointer hover:bg-gray-50 ${className}`}
    >
      {link && link !== "" ? (
        <Link
          onClick={() => dispatch(resetAll())}
          className=" w-full flex flex-col justify-start gap-1 px-3 py-3"
          to={link}
        >
          <div className="text-sm">{title}</div>
          {secondary && (
            <div className=" text-xs text-gray-400">{secondary}</div>
          )}
        </Link>
      ) : (
        <div
          className=" flex flex-col justify-start gap-1 px-3 py-3"
          onClick={onClick}
        >
          <div className="text-sm">{title}</div>
          {secondary && (
            <div className=" text-xs text-gray-400">{secondary}</div>
          )}
        </div>
      )}
    </li>
  );
};

const UserDropDown = () => {
  const { is_user_drop_down_open } = useSelector((state) => state.layout);
  const { is_authed, user_info } = useSelector((redux) => redux.auth);
  const dispatch = useDispatch();
  const toggle = () => {
    if (!is_user_drop_down_open)
      return dispatch(openLayout("is_user_drop_down_open"));
    dispatch(resetAll());
  };

  const handleLogout = () => {
    Supabase.auth.signOut({ scope: "local" });
    dispatch(log_out());
    dispatch(resetAll());
  };

  const authDropDownItems = [
    { title: "My Posts", link: `/my-panel/my-post` },
    { title: "My Notes", link: `/my-panel/notes` },
    { title: "My Saved", link: `/my-panel/saved` },
    { title: "Recently Viwed", link: `/my-panel/recent` },
  ];

  return (
    <div>
      <div className="relative">
        {is_authed ? (
          <Button
            size="small"
            className={`${is_user_drop_down_open && `!bg-gray-100`} !px-4`}
            variant="text"
            onClick={toggle}
            endIcon={
              <span className="flex ">
                <img className="w-4 h-4" src={ChevrowDown} alt="chevrow-down" />
              </span>
            }
          >
            <img
              src={user_info?.user_metadata?.avatar_url}
              onError={(e) =>
                (e.target.src = `https://fwpdokjfwfokcqrgoanf.supabase.co/storage/v1/object/public/images/person-circle-outline.svg`)
              }
              className="w-8 h-8 rounded-full border border-gray-300"
              alt="avatar_pictures"
            />
          </Button>
        ) : (
          <Button
            size="small"
            className={`${is_user_drop_down_open && `!bg-gray-100`}`}
            variant="text"
            onClick={() => dispatch(openLayout("is_auth_modal_open"))}
          >
            Sign in
          </Button>
        )}
        {is_user_drop_down_open && (
          <ul
            className="absolute bg-white border border-gray-300 rounded-md w-[170px] mt-1 overflow-hidden shadow"
            onBlur={toggle}
          >
            <DropItemComponent
              className="border-b"
              title="My Account"
              link={`/my-panel/dashboard`}
              secondary={user_info?.mobile}
            />
            {authDropDownItems.map((value, index) => {
              return <DropItemComponent key={index} {...value} />;
            })}
            <DropItemComponent
              className="border-t"
              title="Logout"
              onClick={handleLogout}
            />
          </ul>
        )}
      </div>
    </div>
  );
};
export default UserDropDown;

UserDropDown.propTypes = {
  loginFn: PropTypes.func,
  toggle_drop_down: PropTypes.func,
  isDropOpen: PropTypes.bool,
  auth: PropTypes.any,
  log_out: PropTypes.func,
};
DropItemComponent.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  secondary: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
