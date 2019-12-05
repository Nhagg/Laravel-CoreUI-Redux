import React, {Component} from 'react';
import { connect }                from 'react-redux'
import queryString from 'query-string';


import {
    Row,
    Col
} from 'reactstrap';

import { doGetAllDatasource, setSearchFilter } from '../actions';
import { searchBarRegisterClickListner, searchBarRemoveClickListner, showSearchBarInHeader } from '../../../layout';

import { paginationResponseParser } from '../../../layout/components/Pagination';
import DatasourceList from './DatasourceList';
import DatasourceOverview from './DatasourceOverview';
import DatasourceEditorModel from './DatasourceEditorModel';


var currentFilters = null;
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class DataExplorer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            pagination : null,
            items : [],
            focusItem : null
        }
    }

    // appendParamUri( uri ){
    //     queryString = par
    // }

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
        dispatch( setSearchFilter( null ));
    }

    _onLoad = ( filters )=>{
        const { dispatch } = this.props;

        currentFilters = filters;

        dispatch( doGetAllDatasource( this._onLoadSuccess, this._onLoadFailure, filters ));
    }

    _onLoadSuccess = (result)=>{
        console.log( result );

        const items      = result.data;
        const pagination = paginationResponseParser( result );

        this.setState( {
            items : items, 
            pagination: pagination 
        });
    }

    _onPaginationItemClickListener = (href)=>{
        // Load by page
        const { dispatch } = this.props;

        const pageParams = queryString.parse(href.split("?")[1]);
        const params = this.props.searchFilters;

        dispatch( doGetAllDatasource( this._onLoadSuccess, this._onLoadFailure, { ...pageParams, ...params }  ));
    }

    _onLoadFailure = (failure)=>{
        console.error("Load datasource error:", failure );
        alert( "ERROR: Cannot load data" + failure.message );
    }

    _onSearchClickListener =(text)=>{
        const { dispatch } = this.props;

        const filters = queryString.parse( text );

        dispatch( doGetAllDatasource( this._onLoadSuccess, this._onLoadFailure, filters ));
    }

    _onDatasourceItemClickListener = (item)=>{
        this.setState( { 'focusItem' : item });
    }


    _onDatasourceEditSubmit =(name,tags)=>{
        console.log(`datasource (${name}) changed`, tags)
    }

    render() {
        if( this.state.pagination==null ){
            return null;
        }

        if( currentFilters != this.props.searchFilters ){
            this._onLoad( this.props.searchFilters );
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs={this.props.datasourcePanelVisible?"8":"0"}>
                        { this.props.datasourcePanelVisible ? 
                            <DatasourceList 
                                pagination={this.state.pagination} items={this.state.items}
                                onPageClickListener={this._onPaginationItemClickListener}
                                onItemClickListener={this._onDatasourceItemClickListener}>
                            </DatasourceList>
                        : null }
                    </Col>
                    <Col style={styles.seperator} xs={this.props.datasourcePanelVisible?"4":"12"}>
                       <DatasourceOverview item={this.state.focusItem}></DatasourceOverview>
                    </Col>
                </Row>
          </div>
        );
    }
}


const styles = {
    seperator : {
        paddingLeft: "0px"
    }
}
const mapStateToProps = state => {
    const DATA_EXPLORE_STORE = 'features/datasources';

    return {
        datasourcePanelVisible : state[ DATA_EXPLORE_STORE ].datasourcePanelVisible,
        searchFilters : state[ DATA_EXPLORE_STORE ].searchFilters
    }
}

export default connect( mapStateToProps )(DataExplorer);
