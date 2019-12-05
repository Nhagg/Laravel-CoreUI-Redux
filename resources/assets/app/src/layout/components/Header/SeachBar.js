import React, {Component} from 'react';
import { connect }        from 'react-redux'

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

/**
 * The type of React {@code Component} props
 */
type Props = {
    searchText : String,

    searchBarClickListeners : Array,

    onFocus : Function 
}

/**
 * Search bar
 * 
 */
class SearchBar extends Component {

    constructor(props:Props) {
        super(props);

        this.state = {
            searchText : this.props.searchText != null ? this.props.searchText : ""
        }
    }

    _onTextChange = (text) => {
        this.setState( { searchText : text });
    }

    _onSearch = () => {
        const { searchBarClickListeners} = this.props;
        const query = this.state.searchText;

        searchBarClickListeners.map( callback=> callback( query ) );
    }

    render() {
        return (
            <InputGroup >
                <Input 
                    style={styles.roundedLeft} 
                    id="appendedInputButtons" 
                    size="16" type="text"  
                    onChange={(o)=>this._onTextChange(o.target.value)}
                    onFocus={this.props.onFocus}
                    placeholder="tags=a,b,c&code=a,b&doc=null"/>
                <InputGroupAddon addonType="append">
                    <Button
                        color="primary"
                        disabled={this.state.searchText==""} 
                        onClick={this._onSearch}><i className="fa fa-search"></i>
                    </Button>
                    <Button style={styles.roundedRight} color="secondary">Advance</Button>
                </InputGroupAddon>
            </InputGroup>
      )
    }
}

const mapStateToProps = state => {
    const LAYOUT_STORE = "features/layout";

    return {
        searchBarClickListeners : state[ LAYOUT_STORE ].searchBarClickListeners
    }
}


const styles = {
    roundedLeft : {
        borderTopLeftRadius    : '1rem',
        borderBottomLeftRadius : '1rem',
    },
    roundedRight : {
        borderTopRightRadius    : '1rem',
        borderBottomRightRadius : '1rem'
    }
}
export default connect( mapStateToProps )(SearchBar);
