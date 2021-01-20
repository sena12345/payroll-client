import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SideBarData';
import RegisterUser from './RegisterUser';
import ViewUsers from './ViewUsers';
import './Home.css'

function Home({ path }) {
  const [ sidebar, setSidebar ] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);

  return (
        <div className="container-fluid">
          <div className="overlay-scrollbar">
              <div className="navbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="#" className="nav-link" onClick={showSidebar}>
                      <div className="orange">
                        <i className="fas fa-bars" ></i>
                      </div> 
                    </Link>
                  </li>
                </ul>

                <form className="navbar-search">
                  <input type="text" className="navbar-search-input" placeholder="Search..." />
                  <i className="fas fa-search"></i>
                </form>
                <div className="nav-link">
                  <span><b>xxxxxx</b></span>
                </div>

                <ul className="navbar-nav nav-right">                
                  <li className="nav-item mode">
                    <Link className="nav-link" href="#">ss
                    </Link>
                  </li>

                  <li className="nav-item avt-wrapper">
                    <div className="avt dropdown">
                      <img src="img/usr.png" className="dropdown-toggle" data-toggle="user-menu" />
                      <ul id="user-menu" className="dropdown-menu">
                        <li className="dropdown-menu-item">
                          <Link className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-user-tie"></i>
                            </div>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li className="dropdown-menu-item">
                          <a href="#" className="dropdown-menu-link">
                            <div>
                              <i className="far fa-check-circle"></i>
                            </div>
                            <span>Change Password</span>
                          </a>
                        </li>

                        <li className="dropdown-menu-item">
                          <Link className="dropdown-menu-link">
                            <div>
                              <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>                
              </div>

              <div className="sidebar">
                <ul className="sidebar-nav">
                  {SidebarData.map((item, index) => {
                    return (
                        <li key={ index} className={item.cName}>
                          <Link to={ item.path} className="sidebar-nav-link">
                            <div>
                                  <i className={item.icon}></i>
                            </div>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                    );
                  })}
                
                 
                </ul>
              </div>
            </div>
            <div className="wrapper">
                <RegisterUser/>                
            </div>				
        </div>
 );
}
    
export default Home;