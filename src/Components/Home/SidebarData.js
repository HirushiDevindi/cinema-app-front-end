import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { AppstoreAddOutlined, HomeOutlined, PlayCircleOutlined, UserAddOutlined, VideoCameraAddOutlined } from "@ant-design/icons";


export const SidebarData = [
    {
        title:"Home",
        path:"/Home2",
        icons:<HomeOutlined/>,
        cName:"nav-text",
    },

    {
        title:"Profile",
        path:"/Profile",
        icons:<UserAddOutlined/>,
        cName:"nav-text",
    },
    {
        title:"Movie",
        path:"/Movie",
        icons:<PlayCircleOutlined/>,
        cName:"nav-text",
    },
    {
        title:"Show",
        path:"/MovieShow",
        icons:<VideoCameraAddOutlined/>,
        cName:"nav-text",
    },
    {
        title:"Seat",
        path:"/Seat",
        icons:<AppstoreAddOutlined/>,
        cName:"nav-text",
    },
    {
        title:"Signout",
        path:"/Logout",
        icons:<FaIcons.FaPowerOff/>,
        cName:"nav-text",
    },

];