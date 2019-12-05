import React, {Component} from 'react';
import { connect }        from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

import classnames from 'classnames';


import TabSchemaList from './TabSchemaList';
import TabSchemaSamples from './TabSchemaSamples';
import { setOverviewPanelMaximize, setSchemaPanelMaximize } from '../actions';



type Props = {
    dispatch: Dispatch<*>,

    onPageClickListener : Function,

    pagination : Object,

    items : Array
}
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class SchemaList extends Component {

    constructor(props : Props) {
        super(props);
        this.state = {
            focusIndex : null,
            activeTab : '1'
        }
    }

    toggle = (tab)=>{
        this.setState( { activeTab: tab });
    }

    _onExpandClick =()=>{
        const { dispatch } = this.props;
        dispatch( setSchemaPanelMaximize(   !this.props.schemaPanelMaximize ));
        dispatch( setOverviewPanelMaximize( false ));
    }

    render() {

        if( this.props.pagination==null ){
            return null;
        }
        const expadIcon = !this.props.schemaPanelMaximize ? "icon-size-fullscreen" : "icon-size-actual";

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    <i className= { expadIcon + " float-right"} onClick={this._onExpandClick}></i>
                    Schemas
                </CardHeader>
                <CardBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab==='1' })} onClick={()=> { this.toggle('1'); }} >
                                <i className="icon-chemistry"></i> <span className={ this.state.activeTab==='1' ? "" : "d-none"}>Schemas</span>{'\u00A0'}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab==='2' })} onClick={()=> { this.toggle('2'); }} >
                                <i className="icon-eye"></i> <span>Samples</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <TabSchemaList 
                                items={this.props.items} 
                                pagination={this.props.pagination}
                                onPageClickListener={this.props.onPageClickListener}></TabSchemaList>
                        </TabPane>
                        <TabPane tabId="2">
                            <TabSchemaSamples/>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
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

export default connect( mapStateToProps )(SchemaList);
