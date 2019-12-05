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
import { showDatasourcePanel } from '../actions';
import TabSchemas from './TabSchemas';
import TabMining from './TabMining';


  
type Props = {
    dispatch: Dispatch<*>,

    /**
     * Datasource Object
     */
    item : Object
}

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class DatasourceOverview extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab : '1'
        }
    }

    _onExpandClick = ()=>{
        const { dispatch } = this.props;

        dispatch( showDatasourcePanel( !this.props.datasourcePanelVisible ));
    }

    toggle = (tab)=>{
        this.setState( { activeTab: tab });
    }


    renderEmpty = ()=>{
        return (
            <p>Please select a datasource</p>
        )
    }

    renderItemOverview = ()=>{

        const schemas = this.props.item.schemas != null ? this.props.item.schemas : [];

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
                            <i className="icon-chemistry"></i> <span>Schemas</span>{'\u00A0'}
                            <Badge pill color="primary">{schemas.length}</Badge>
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
                        <TabDoc item={this.props.item}></TabDoc>
                    </TabPane>
                    <TabPane tabId="2">
                        <TabSchemas  item={this.props.item}></TabSchemas>
                    </TabPane>
                    <TabPane tabId="3">
                        <TabMining item={this.props.item}></TabMining>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    render() {
        const expadIcon = this.props.datasourcePanelVisible ? "icon-size-fullscreen" : "icon-size-actual";


        return (
          <Card>
              <CardHeader>
                  <i className="fa fa-align-justify"></i>
                  <i className= { expadIcon + " float-right"} onClick={this._onExpandClick}></i> Overview
              </CardHeader>
              <CardBody>
                    { this.props.item==null ? this.renderEmpty() : this.renderItemOverview() }
              </CardBody>
          </Card>
        );
    }
}

const mapStateToProps = state => {
    const DATA_EXPLORE_STORE = 'features/datasources';
    return {
        datasourcePanelVisible : state[ DATA_EXPLORE_STORE ].datasourcePanelVisible 
    }
}

export default connect( mapStateToProps )(DatasourceOverview);
