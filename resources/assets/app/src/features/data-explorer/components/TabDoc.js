import React, {Component} from 'react';
import { connect }                from 'react-redux'

import { toast } from 'react-toastify';

import {
    CardBody,
    Badge,
    Button,
    Row, Col
  } from 'reactstrap';

import { doUpdateDatasourceDocByCode, setSearchFilter } from '../actions';

import { DocViewer, DocEditorSimpleModel } from '../../doc-viewer';
import DatasourceEditorModel from './DatasourceEditorModel';


type Props = {
    dispatch: Dispatch<*>,

    item : Object
}
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class TabDoc extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            openDocumentEditorDialog : false,
            openDadasourceEditorDialog : false
        }
    }

    _updateDatsource =() => {
        this.setState( { openDadasourceEditorDialog : true });
    }

    _updateDocumentDoc = ()=>{
        this.setState( { openDocumentEditorDialog : true })
    }

    _newDatasourceDocSubmit = ( content, mineType)=>{
        this.setState( { openDocumentEditorDialog : false });

        //  post to server
        const { dispatch } = this.props;
        dispatch(
            doUpdateDatasourceDocByCode( {
                code : this.props.item.code,
                mineType : mineType,
                content : content
            },
            success=> {
                toast.success("Update document success");
                
                // update content from server - T.B.D
                //dispatch( doGetDatasourceByCode )
            },
            failure=> {
                toast.error("Update document failed. Try again");
                console.error("Error update doc", failure );
            })
        )
    }

    _newDatasourceDocCancel = ()=>{
        this.setState( { openDocumentEditorDialog : false });
    }

    _onTagClick = (tag)=>{
        const { dispatch } = this.props;
        dispatch( setSearchFilter( { tags : tag } ));
    }

    render() {

        if( this.props.item==null ){
            return <div>Item propperty is required!!!!!</div>;
        }

        const item = this.props.item;
        const tags = item.tags != null ? item.tags : [];
        const doc  = item.doc;

        // console.log( "item", doc );

        return (
            <div>
                <Row>
                    <Col sm="6"><h3>{item.name}</h3></Col>
                    <Col sm="6"><Button 
                        color="link" className="float-right"
                        onClick={this._updateDatsource}><i className="fa fa-edit"></i></Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                    <span>code:&nbsp;<font color='#000099'><i>{item.code}</i></font></span>
                    </Col>
                </Row>
                <Row>
                <Col sm="12">
                    {/* display tags */ }
                    <span>
                        { tags.map( (item,index)=>(
                            <Badge key={index} pill
                                onClick={()=> this._onTagClick(item)} 
                                style={styles.tag}>{item}</Badge>
                        ))}
                    </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    { doc !=null ? 
                        <div>
                            <Button 
                                color="link" className="float-right"
                                onClick={this._updateDocumentDoc}><i className="fa fa-book"></i></Button>
                            <DocViewer {...doc}/> 
                        </div> : (
                        <CardBody>
                            <Row>Không có tài liệu cho phần này. Hãy giúp tôi hoàn thiện nó</Row>
                            <Row>
                                <Button color="primary" onClick={this._updateDocumentDoc}><i className="icon-book-open"></i>&nbsp; Tạo tài liệu</Button>
                            </Row>
                        </CardBody>
                    )}
                    
                    </Col>
                </Row>
                <Row>
                    { /* Edit data source Name & Tags */ }
                    { this.renderDatasourceEditor() }
                    
                    { /* Edit datasource doc */ }
                        { this.state.openDocumentEditorDialog ? 
                            <DocEditorSimpleModel isOpen={this.state.openDocumentEditorDialog}
                                content={doc!=null ? doc.content : null}
                                mine_type={doc !=null ? doc.mine_type : null}
                                title={"Cập nhật tài liệu : " + this.props.item.code}
                                onSubmit={this._newDatasourceDocSubmit}
                                onCancel={this._newDatasourceDocCancel} /> : null }
                </Row>

            </div>
        );
    }

    
    renderDatasourceEditor = ()=>{
        return (
                this.state.openDadasourceEditorDialog ? (
                    <DatasourceEditorModel  item={this.props.item} 
                        onCancel={()=> this.setState({ openDadasourceEditorDialog: false })}
                        onSubmit={this._onDatasourceEditSubmit}></DatasourceEditorModel>
                ) : null
            )
    }
}

const styles = {
    tag: {
        marginRight : '2px',
        cursor: 'pointer'
    },
    
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(TabDoc);
