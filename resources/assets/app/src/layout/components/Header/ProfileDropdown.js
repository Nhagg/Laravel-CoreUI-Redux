import React, {Component} from 'react';
import { connect } from 'react-redux'

import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';

import * as Users from '../../../features/users';

class ProfileDropdown extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
                ...{ 
                    dropdownOpen: false
                }
        };

        // binding function
        this.toggle   = this.toggle.bind(this);
        this.edit     = this.edit.bind(this);
        this.settings = this.settings.bind(this);
        this.logout   = this.logout.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    edit(){
      alert( 0 );

    }

    settings(){

        Users.setUserProfile( 'a', '2' );
        

    }

    logout(){

    }

    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    <img src={ this.props.user.avatarUrl ? this.props.user.avatarUrl : 'images/no_profile.png'} className="img-avatar"/>
                    <label>{this.props.user.userName}</label>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header tag="div" className="text-center"><strong>Profile</strong></DropdownItem>
                    <DropdownItem onClick={this.edit}>    <i className="fa fa-edit"></i>Edit</DropdownItem>
                    <DropdownItem onClick={this.settings}><i className="fa fa-wrench"></i>Settings</DropdownItem>
                    <DropdownItem onClick={this.logout}>  <i className="fa fa-lock"></i>Logout</DropdownItem>                    
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        const {...attributes} = this.props;
        return (
            this.dropAccnt()
        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user,
        lang : state.lang        
    }
}

export default connect( 
    mapStateToProps
)(ProfileDropdown);
