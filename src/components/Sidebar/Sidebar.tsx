import React, { useState } from 'react';

import { Box, Button, List, Nav, Text } from 'grommet';

import styled from 'styled-components'
import { matchPath } from 'react-router-dom';
import { useViewport } from '../../hooks';
import { SidebarMenuItem, SidebarMenuItemProps } from './SidebarItem';

export interface SidebarMenuItem {
  path: string;
  icon?: any;
  label?: string;
  component?: any
}

export interface SidebarProps {
  logo?: any
  className?: string;
  user?: {
    name: string;
    email: string;
  }
  menu: SidebarMenuItem[];
  active?: any;
  onLogoClick?: () => void;
  onSelect: (item: SidebarMenuItem) => void;
}

const BaseSidebar: React.FC<SidebarProps> = (props) => {

  const { width, height, isMobile, isTablet } = useViewport();

  const defaultMinified = isTablet;

  const [ sidebarExpanded, setSidebarExpanded ] = useState();

  const getDirection = () => {
    if(isMobile){
      return 'row';
    }else{
      return 'column'
    }
  }

  return (
    <Box
      width={!isMobile ? (!defaultMinified ? '13vw' : '50px') : '100%' }
      background={{color: "brand"}}
      elevation="small"
      direction={getDirection()}>
      
      {props.logo && <Button 
        onClick={props.onLogoClick}
        icon={props.logo}
        style={{padding: '10%'}}
        className="sidebar-header-image" >
      </Button> }
      <Nav
        gap="none"
       direction={getDirection()}
        pad={'none'}

        >
        {props.menu.map((datum) => (
          <SidebarMenuItem 
            minified={defaultMinified}
            onClick={() => {
              props.onSelect(datum)
            }}
            path={datum.path}
            label={datum.label} 
            icon={datum.icon}/>

        ))}
     

      </Nav>

    </Box>
  );
}

export interface ID {
 id: number;
}

export const Sidebar = BaseSidebar

// styled<SidebarProps>(BaseSidebar)`
// @media print{
//   .sidebar{
//     display: none !important;
//   }
// }

// @media (max-width: 600px){
//   .sidebar-header-image, .sidebar-admin-option, .sidebar-footer{
//     display: none !important;
//   }

//   .sidebar{
//     width: 100% !important;
//   }

//   .sidebar-menu{
//     display: flex;
//     flex-direction: row;
//     margin-bottom: 0;
//     justify-content: space-between;
//   }
// }

// @media (min-width: 601px) and (max-width:1024px){
//   .sidebar{
//     width: 52px !important;
//   }
// }

// @media (max-width: 1025px){

//   .sidebar > .sidebar-footer > .sidebar-footer__action{
//     flex: 1;
//     justify-content: center;
//   }
//   .sidebar > .sidebar-footer > .sidebar-footer__info{
//     display: none;
//   }

//   .sidebar > .sidebar-menu {
//     margin-top: 0px;
//   }

//   .sidebar-menu > .sidebar-menu-opt{
//     font-size: 0px;
//   }

//   .sidebar > .sidebar-header-image{
//     display: none !important;
//   }

//   .sidebar-admin-option p{
//     font-size: 0px;
//   }
// }

// .sidebar-admin-option:hover{ 
//  background: rgb(230, 230, 230, 0.2); 
// }

// .sidebar-admin-option{
//   cursor: pointer;
//   display: flex;
//   color: white;
//   align-items: center;
//   height: 45px;
//   font-size: 18px;
//   padding-left: 15px;
// }

// .sidebar-header-image{
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// }

// .sidebar-footer{
//   display: flex;
//   color: white;
//   padding: 8px;
//   border-top: 1px solid #e6e6e6;
// }

// .sidebar-footer__info{
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   align-items: flex-start;
// }

// .sidebar-footer__action{
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   justify-content: flex-end;
// }

// .sidebar-footer__email > p{
//   font-size: 11px;
//   color: #e6e6e6;
// }

// &.sidebar{
//   user-select: none;
//   border-radius-top-left: 0px !important;
//   border-radius-bottom-left: 0px !important;
//   display: flex;
//   width: 155px;
//   flex-direction: column;
// }

// .sidebar-header-image{
//   height: 60px;
//   margin-top: 16px;
//   filter: invert(1);
//   padding-left: 10px;
//   padding-right: 10px;
//   margin-bottom: 15px;
// }

// .sidebar-menu{
//   padding: 0;
//   flex: 1;
//   list-style: none;
// }

// .sidebar-menu > li{
//   cursor: pointer;
//   height: 45px;
//   display: flex;
//   align-items: center;
//   font-size: 18px;
//   color: #e6e6e6;
//   padding-left: 15px;
// }

// .sidebar-menu > li > span {
//   margin-right: 15px;
// }

// .sidebar-menu > li:hover{
//  background: rgb(230, 230, 230, 0.2); 
// }

// .sidebar-menu > li.active{
//   background: rgb(230, 230, 230, 0.2);;
// }

// `

// /*
//  {user.user_type == "admin" ? (
//           <div className="sidebar-admin-option" onClick={this._settings.bind(this)}>
//             <Icon style={{marginRight: '15px'}}>supervised_user_circle</Icon>
//             <Typography className="sidebar-admin-option__text">Admin</Typography>
//           </div>
//         ) : null}
// */

// //   export default connect((state) => {
// //     return {
// //       user: state.auth.user,
// //       token: state.auth.token
// //     }
// //   }, (dispatch) => ({
// //     logout: () => dispatch(logout())
// //   }))(withRouter(styled(Sidebar)`
// //     .sidebar-header-image{
// //       background-image: url(${Logo});
// //     }
// //   `));
