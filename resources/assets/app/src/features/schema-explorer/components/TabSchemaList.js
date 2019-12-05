import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Table,
    Button,
    Tooltip,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

import { toast } from 'react-toastify';

import { 
    Pagination, 
} from '../../../layout/components/Pagination';
import { updateSchemaCurrent, doGetSchema } from '../actions';


  
type Props = {
    dispatch: Dispatch<*>,

    onPageClickListener : Function,

    onItemClickListener : Function,

    pagination : Object,

    items : Array
}

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
  
        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }
  
    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    
  
    render() {
        return (
            <span>
                <Button className="mr-1" color={this.props.color} id={'Tooltip-' + this.props.id}>
                        <i className={this.props.classNameIcon}></i>
                        {this.props.text}
                </Button>
                <Tooltip placement='top' isOpen={this.state.tooltipOpen} target={'Tooltip-'  +  this.props.id} toggle={this.toggle}>
                    {this.props.tooltip}
                </Tooltip>
            </span>
        );
    }
  }

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class TabSchemaList extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            activeTab : '1'
        }
    }

    _onExpandClick = ()=>{
        const { dispatch } = this.props;

        //dispatch( showDatasourcePanel( !this.props.datasourcePanelVisible ));
    }

    toggle = (tab)=>{
        this.setState( { activeTab: tab });
    }

    
    _onSchemaItemClick = (item,index)=>{
        this.setState( { focusIndex : index } )
        const { dispatch } = this.props;

        dispatch( doGetSchema( item._id, failue=>{
            const msg = `ERROR: Cannot get schema (${item._id}, ${item.code})`;
            toast.error( msg );
            console.error( msg );
        } ));
    }

    render() {        
        const { per_page, current_page } = this.props.pagination;

        const focusItemCode = this.props.schemaCurrent !=null ? this.props.schemaCurrent.code : null;

        return (
            <div>
                <Table hover striped responsive size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Code</th>
                            <th>Name</th>
                            {/* <th>Datasource</th> */}
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.items.map( (item, index)=> (
                            <tr key={index} style={{'background': focusItemCode === item.code ? '#79d2a6' : null}}>
                                <td>{(current_page-1) * per_page + index + 1}</td>
                                <td><Button color="link" onClick={()=>this._onSchemaItemClick(item,index)}>{item.code}</Button></td>
                                <td>{item.name}</td>
                                {/* <td>
                                    { datasources.sort().map( (item,index)=>(
                                        <li><a href="#/data-explorer?ds=topicalms">item</a></li>
                                    ))}
                                    
                                </td> */}
                                <td>
                                    <ActionButton id={index*10+1} color="warning" classNameIcon="fa fa-table" tooltip="Data sample"/>
                                    <ActionButton id={index*10+2} color="primary" classNameIcon="fa fa-edit" tooltip="Edit schema"/>
                                    { item.doc == null ?
                                        <ActionButton id={index*10+3} color="success" classNameIcon="fa fa-book" tooltip="Thêm tài liệu mô tả"/> : null }
                                    <ActionButton id={index*10+4} color="danger" classNameIcon="fa fa-rocket" tooltip="Giúp tôi khai thác dữ liệu"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                { this.props.pagination !=null ? 
                    <Pagination 
                        {...this.props.pagination} 
                        onPageClickListener={this.props.onPageClickListener}>
                    </Pagination> : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const SCHEMAS_STORE = 'features/schemas';
    return {
        schemaCurrent : state[ SCHEMAS_STORE ].schemaCurrent,
    }
}

export default connect( mapStateToProps )(TabSchemaList);
