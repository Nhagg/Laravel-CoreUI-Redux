import React, {Component} from 'react';
import { connect }                from 'react-redux'
import queryString from "query-string";

import {
    Row,
    Col,
} from 'reactstrap';

import { searchBarRegisterClickListner, searchBarRemoveClickListner, showSearchBarInHeader } from '../../../layout';

import { paginationResponseParser } from '../../../layout/components/Pagination';
import SchemaList from './SchemaList';
import SchemaOverview from './SchemaOverview';
import { doGetAllSchema } from '../actions';

  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class SchemaExplorer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pagination : null,
            items : []
        }
    }

    componentDidMount(){
        const { dispatch } = this.props;

        dispatch( showSearchBarInHeader( true ) );
        dispatch( searchBarRegisterClickListner( this._onSearchClickListener ) );
        this._onLoad();
    }

    componentWillUnmount(){
        const { dispatch } = this.props;
        dispatch( searchBarRemoveClickListner( this._onSearchClickListener ));
        dispatch( showSearchBarInHeader( false ) );
    }

    _onLoad = ()=>{
        const { dispatch } = this.props;
        dispatch( doGetAllSchema( this._onLoadSuccess, this._onLoadFailure ));
    }

    _onLoadSuccess = (result)=>{
        console.log("schema-list", result );

        const items      = result.data;
        const pagination = paginationResponseParser( result );

        this.setState( {
            items : items, 
            pagination: pagination 
        });
    }

    _onLoadFailure = (failure)=>{
        console.error("Load datasource error:", failure );
        alert( "ERROR: Cannot load data" + failure.message );
    }

    _onPaginationItemClickListener = (href)=>{
        // Load by page
        const { dispatch } = this.props;
        dispatch( doGetAllSchema( this._onLoadSuccess, this._onLoadFailure, href ));
    }

    _onSearchClickListener =(text)=>{
        alert("search:" + text );
    }

    render() {
        if( this.state.pagination==null ){
            return null;
        }

        let schemaPanelWidth = 8; 
        if( this.props.schemaPanelMaximize ){
            schemaPanelWidth = 12;
        }
        else if( this.props.overviewPanelMaximize ){
            schemaPanelWidth = 0;
        }
        else {
            schemaPanelWidth = 8;
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs={schemaPanelWidth}>
                        { schemaPanelWidth > 0 ? 
                            <SchemaList 
                                pagination={this.state.pagination} items={this.state.items}
                                onPageClickListener={this._onPaginationItemClickListener}>
                            </SchemaList>
                        : null }
                    </Col>
                    <Col xs={12 - schemaPanelWidth}>
                       { schemaPanelWidth < 12 ? <SchemaOverview/> : null }
                    </Col>
                </Row>
          </div>
        );
    }
}

const mapStateToProps = state => {
    const SCHEMA_STORE = 'features/schemas';

    return {
        schemaPanelMaximize   : state[ SCHEMA_STORE ].schemaPanelMaximize,
        overviewPanelMaximize : state[ SCHEMA_STORE ].overviewPanelMaximize,
    }
}

export default connect( mapStateToProps )(SchemaExplorer);
