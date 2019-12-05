import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

import classnames from 'classnames';
import TabDoc from './TabDoc';
import { setSchemaPanelMaximize, setOverviewPanelMaximize } from '../actions';
import TabFields from './TabFields';
import TabMining from './TabMining';


  
type Props = {
    dispatch: Dispatch<*>,

    /**
     * Schema object
     */
    item : Object
}

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class SchemaOverview extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab : '1'
        }
    }

    toggle = (tab)=>{
        this.setState( { activeTab: tab });
    }

    renderEmpty = ()=>{
        return (
            <p>Please select a schema</p>
        )
    }

    renderItemOverview = ()=>{
        const fields = this.props.schemaCurrent.fields==null ? [] : this.props.schemaCurrent.fields;

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab==='1' })} onClick={()=> { this.toggle('1'); }} >
                            <i className="icon-book-open"></i> <span className={ this.state.activeTab==='1' ? "" : "d-none"}>Doc</span>{'\u00A0'}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab==='2' })} onClick={()=> { this.toggle('2'); }} >
                            <i className="icon-chemistry"></i> <span>Fields</span>{'\u00A0'}
                            <Badge pill color="primary">{fields.length}</Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab==='3' })} onClick={()=> { this.toggle('3'); }} >
                            <i className="icon-rocket"></i> <span>Mining</span>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <TabDoc item={this.props.schemaCurrent}></TabDoc>
                    </TabPane>
                    <TabPane tabId="2">
                        <TabFields  item={this.props.schemaCurrent}></TabFields>
                    </TabPane>
                    <TabPane tabId="3">
                        <TabMining item={this.props.schemaCurrent}></TabMining>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    
    _onExpandClick =()=>{
        const { dispatch } = this.props;
        dispatch( setSchemaPanelMaximize(   false ));
        dispatch( setOverviewPanelMaximize( !this.props.overviewPanelMaximize ));
    }

    render() {
        const expadIcon = !this.props.overviewPanelMaximize ? "icon-size-fullscreen" : "icon-size-actual";

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>
                    <i className= { expadIcon + " float-right"} onClick={this._onExpandClick}></i> Overview
                </CardHeader>
                <CardBody>
                    { this.props.schemaCurrent == null ? this.renderEmpty() : this.renderItemOverview() }
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const SCHEMAS_STORE = 'features/schemas';
    return {
        schemaPanelMaximize   : state[ SCHEMAS_STORE ].schemaPanelMaximize,
        overviewPanelMaximize : state[ SCHEMAS_STORE ].overviewPanelMaximize,
        schemaCurrent : state[ SCHEMAS_STORE ].schemaCurrent 
    }
}

export default connect( mapStateToProps )(SchemaOverview);
