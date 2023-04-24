import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiInbox, FiLogOut, FiMessageSquare, FiPieChart, FiShoppingCart, FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
const RightNav = ({ handleRes, handleUnres, handleStatistics, clickOnInbox, clickOnprofile, clickOnResolved, handleprofile }) => {

  const logout = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  let menus = [
    { name: "Profile", link: "/user", icon: AiOutlineUser, click: clickOnprofile },
    { name: "Create Complaint", link: "/complaints", icon: FiMessageSquare },
    { name: "Registered complaints", link: "/user", icon: FiInbox, click: clickOnInbox },
    { name: "Resolved Complaints", link: "/user", icon: FiInbox, click: clickOnResolved },
    { name: "Logout", link: "/", icon: FiLogOut, margin: true, click: logout },

  ];
  const user = JSON.parse(localStorage.getItem("loginData"));
  if (user.isCreatedByAdmin) {
    menus = [
      { name: "Profile", link: "/dept", icon: AiOutlineUser, click: handleprofile },
      { name: "Resolved Complaints", link: "/dept", icon: FiThumbsUp, click: handleRes },
      { name: "Unresolved Complaints", link: "/dept", icon: FiThumbsDown, click: handleUnres },
      { name: "Statistics", link: "/dept", icon: FiPieChart, click: handleStatistics },
      { name: "Logout", link: "/", icon: FiLogOut, margin: true, click: logout },

    ]
  }

  const [open, setOpen] = useState(true);
  const screenWidth = window.innerWidth;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1050) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`border-r-2 border-gray-500  bg-[green] min-h-screen ${open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4 ${screenWidth < 640 ? "fixed bottom-0 left-0 w-full" : "relative"
        }`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            onClick={menu?.click}
            to={menu?.link}
            key={i}
            className={` ${menu?.margin && "mt-5"
              } group flex items-center text-md  gap-3.5 font-bold p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "25" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${!open &&
                "opacity-0 translate-x-28 overflow-hidden font-bold text-lg"
                }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${open && "hidden"
                } absolute left-48 bg-white font-bold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RightNav;
