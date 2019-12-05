import React, {Component} from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Badge,
    Button
} from 'reactstrap';
import ProfileDropdown from './ProfileDropdown';
import LanguagePicker     from './LanguagePicker';

import SearchBar from './SeachBar';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavbarBrand href="#"></NavbarBrand>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>

                {/* <NavbarToggler className="d-md-down-none">
                    <span onClick={()=>alert("ok#1")}>TEST#1</span>
                </NavbarToggler> */}

                <Nav className="ml-auto sm-8" navbar  style={styles.searchBar}>
                    { this.props.searchBarVisible ? 
                        <SearchBar/> : null }
                </Nav>
                <Nav className="d-md-down-none" navbar>
                    <LanguagePicker showText={true}/>
                    <ProfileDropdown/>
                </Nav>
            </header>
        );
    }
}

const mapStateToProps = state => {
    const LAYOUT_STORE = 'features/layout';
    return {
        searchBarVisible : state[ LAYOUT_STORE].searchBarVisible
    }
}

const styles = {
    searchBar :{
        width : '480px'
    }
}

export default connect(mapStateToProps)( Header );
