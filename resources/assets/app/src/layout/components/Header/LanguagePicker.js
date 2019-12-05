import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    DropdownToggle,
    Dropdown
} from 'reactstrap';

import { showSearchBarInHeader} from '../../../layout';

const SUPPORT_LANGS = [
    { code : "VN", icon : "images/flags/vi.svg" },
    { code : "EN", icon : "images/flags/us.svg" },
]

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class LanguagePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            languagePos : 0,
            showDropdown : false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const { dispatch } = this.props;

        let pos = this.state.languagePos;

        pos ++;
        pos %= SUPPORT_LANGS.length;

        this.setState( { languagePos: pos });
    }

    dropAccnt() {
        return (
            <Dropdown nav isOpen={false} toggle={this.toggle}>
                <DropdownToggle nav>
                    <img src={SUPPORT_LANGS[ this.state.languagePos ].icon} className="avatar avatar-xs"/>
                    <label>{SUPPORT_LANGS[ this.state.languagePos ].code}</label>
                </DropdownToggle>
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
    }
}

export default connect( mapStateToProps )(LanguagePicker);
