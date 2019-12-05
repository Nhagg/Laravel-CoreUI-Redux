import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Button,
    Tooltip,
    ButtonGroup,
    ButtonToolbar
  } from 'reactstrap';

import { 
    Pagination, 
} from '../../../layout/components/Pagination';
import { DocEditorSimpleModel } from '../../doc-viewer';
import { doUpdateDatasourceDocByCode } from '../actions';
import { toast } from 'react-toastify';


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
                <Button className="mr-1" color="link" id={'Tooltip-' + this.props.id} onClick={this.props.onClick}>
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
class DatasourceList extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            'focusIndex' : null,
            datasourceCurrent : null,
            openDatasourceEditorDialog : false
        }
    }

    _onDatasourceItemClick = (item,index)=>{
        if( this.props.onItemClickListener!=null ){
            this.props.onItemClickListener( item );
        }

        this.setState( { 'focusIndex' : index });
    }

    _newDatasourceDoc = (item)=>{

        this.setState( {
            datasourceCurrent : item,
            openDatasourceEditorDialog : true
        })

    }

    _newDatasourceDocSubmit = ( content, mineType)=>{
        this.setState( { openDatasourceEditorDialog : false });

        //  post to server
        const { dispatch } = this.props;
        dispatch(
            doUpdateDatasourceDocByCode( {
                code : this.state.datasourceCurrent.code,
                mineType : mineType,
                content : content
            },
            success=> {
                toast.success("Update document success");
            },
            failure=> {
                toast.error("Update document failed. Try again");
                console.error("Error update doc", failure );
            })
        )
    }

    _newDatasourceDocCancel = ()=>{
        this.setState( { openDatasourceEditorDialog : false });
    }

    render() {

        if( this.props.pagination==null ){
            return null;
        }

        const { per_page, current_page } = this.props.pagination;
        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i>Data Sources
                </CardHeader>
                <CardBody>
                    <Table hover striped responsive size="sm">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.props.items.map( (item, index)=> (
                                <tr key={index} style={{'background': this.state.focusIndex == index ? '#79d2a6' : null}}>
                                    <td>{(current_page-1) * per_page + index + 1}</td>
                                    <td><Button color="link" onClick={()=>this._onDatasourceItemClick(item,index)}>{item.code}</Button></td>
                                    <td>{item.name}</td>
                                    <td>
                                    <ButtonToolbar className="justify-content-between float-right">
                                        <ButtonGroup>
                                        <ActionButton id={index*10+1} color="primary" classNameIcon="fa fa-edit" tooltip="Edit datasource"/>
                                        { item.doc == null ?
                                            <ActionButton onClick={()=>this._newDatasourceDoc(item)} id={index*10+2} color="success" classNameIcon="fa fa-book" tooltip="Thêm tài liệu mô tả"/> : null }
                                        <ActionButton id={index*10+3} color="danger" classNameIcon="fa fa-rocket" tooltip="Giúp tôi khai thác dữ liệu"/>
                                        </ButtonGroup>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    { /* Edit datasource doc */ }
                    { this.state.openDatasourceEditorDialog ? 
                        <DocEditorSimpleModel isOpen={this.state.openDatasourceEditorDialog}
                            {...this.state.datasourceCurrent}
                            title={"Cập nhật tài liệu : " + this.state.datasourceCurrent.code}
                            onSubmit={this._newDatasourceDocSubmit}
                            onCancel={this._newDatasourceDocCancel} /> : null }

                    { this.props.pagination !=null ? 
                        <Pagination 
                            {...this.props.pagination} 
                            onPageClickListener={this.props.onPageClickListener}>
                        </Pagination> : null }
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(DatasourceList);
