import React , {useState} from 'react';
//import { Menu } from 'antd';
//import "antd/dist/antd.css";
import {UserOutlined, PoweroffOutlined, HomeOutlined, PlayCircleOutlined, VideoCameraOutlined, AppstoreAddOutlined} from "@ant-design/icons/lib/icons";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import {IconContext} from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { SidebarData } from './SidebarData';





// function SideBar(){


//     // const [collapsed, setCollapsed] = useState(false);

//     // const toggleCollapsed = () => {
//     //   setCollapsed(!collapsed);
//     // };

//   const navigate = useNavigate();

//   return(
//     <div  style={{display:"flex" , flexDirection:"row"}}>
//       {/* //--
//       <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       //-- */}
//       <Menu

//         mode="inline"
//         //theme="dark"
//         //inlineCollapsed={collapsed}
//         //mode="vertical"
//         style={{ backgroundColor:"lightgray" }}
//         onClick={({key})=> {
//           if(key==="/Logout"){
//                   //todo 
//                   navigate(key);
//           }else{
//             navigate(key);
//           }
//           //navigate(key);
//         }}
//         defaultSelectedKeys={[window.location.pathname]}
//         >{[
//           {label:"Home" ,icon:<HomeOutlined/> , key:"/Home"},
//           {label:"Profile" , icon:<UserOutlined /> , key:"/Profile"},
//           {label:"Movie" , icon:<PlayCircleOutlined/> , key:"/Movie"},
//           {label:"Show", icon:<VideoCameraOutlined/>, key:"/MovieShow"},
//           {label:"Seat", icon:<AppstoreAddOutlined/>, key:"/Seat"},
//           {label:"Signout" , icon:<PoweroffOutlined/>, key:"/Logout",danger:true}
//         ].map(item => (
//           <Menu.Item key={item.key} icon={item.icon}>
//             <span style={{ marginLeft: "8px" }}>{item.label}</span>
//           </Menu.Item>
//           ))
//         }    
    
//       </Menu>
//     </div>
//   );
// }

// function Footer(){
//   return(
//     <div style={{
//       height:60,
//       backgroundColor:"lightcyan",
//       color:"black",
//       display:"flex",
//       justifyContent:"center",
//       alignItems:"center",
//       fontWeight:"bold",
//       position:"absolute",
//       bottom:0,
//       width:"100%",
      

//     }}
//     >
//       All Rights Reserved

//     </div>
//   );
// }

// function Home(){


//   const containerStyle = {
//     display: "flex",
//     flexDirection: "row",
//     flex: 1,
//     height: "100vh",
    
    
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   };

//   const contentStyle = {
//     display: "flex",
//     flexDirection: "row",
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.33)", 
//   };


//   return(
//     <div className='Home'>
//       <div style={containerStyle}>
//         <div style={contentStyle}>
//           <SideBar/>
//         </div>
//         <Footer/>
//       </div>
//     </div>
    

//   );
// }


function Navbar(){

  const [sidebar, setSidebar] = useState(false);
  const showSidebar =()=> setSidebar(!sidebar);

  return(
    <div className='Home'>
    <>
      <IconContext.Provider value={{color:"Undefined"}}>
        <div className='navbar'>
          <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className='="nav-menu-item' onClick={showSidebar}>
             <li className='navbar-toggle'>
                <Link to="#" className='menu-bar'>
                  <AiIcons.AiOutlineClose />
                </Link>
             </li>
             {SidebarData.map((item, index)=>{
              return(
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icons}
                      <span>{item.title}</span>
                    </Link>
                  </li>
              );
              }
             )}
             </ul>
             </nav>
        

      </IconContext.Provider>

    </>
    </div>
  );
}




// function SideBar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   const navigate = useNavigate();

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       {!collapsed && (
//         <div>
//           <div
//             style={{
//               backgroundColor: 'lightgray',
//               padding: '16px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <div onClick={() => navigate('/Home')}>
//               <HomeOutlined />
//               <span style={{ marginLeft: '8px' }}>Home</span>
//             </div>
//             <div onClick={() => navigate('/Profile')}>
//               <UserOutlined />
//               <span style={{ marginLeft: '8px' }}>Profile</span>
//             </div>
//             <div onClick={() => navigate('/Movie')}>
//               <PlayCircleOutlined />
//               <span style={{ marginLeft: '8px' }}>Movie</span>
//             </div>
//             <div onClick={() => navigate('/MovieShow')}>
//               <VideoCameraOutlined />
//               <span style={{ marginLeft: '8px' }}>Show</span>
//             </div>
//             <div onClick={() => navigate('/Seat')}>
//               <AppstoreAddOutlined />
//               <span style={{ marginLeft: '8px' }}>Seat</span>
//             </div>
//             <div onClick={() => navigate('/Logout')}>
//               <PoweroffOutlined />
//               <span style={{ marginLeft: '8px' }}>Signout</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





//export default Home;
export default Navbar;
