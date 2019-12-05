import React, {Component} from 'react';
import { connect }                from 'react-redux'

import { 
    Row, Col, 
    Card, CardBody, CardHeader, Label,
    Button, ButtonGroup,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Input, InputGroup, InputGroupAddon,
    Badge
} from 'reactstrap';
import { doGetAllTags } from '../../dashboard';

type Props = {
    dispatch : Dispatch<*>,

    onSubmit : Function,
    onCancel : Function,

    /**
     * Datasource Object
     */
    item : Object
}

class DatasourceEditorModel extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            isDataChange : false,
            isOpen : this.props.isOpen || true,
            tags :   (this.props.item == null || this.props.item.tags==null) ? [] : this.props.item.tags,
            tagInputing: null ,
            name  : this.props.item.name
        }
    }

    componentDidMount(){
        const {dispatch} = this.props;

        dispatch( doGetAllTags( failure=>{
            console.error("ERROR: cannot get all tags", failure )
        }))
    }


    _onSubmit =()=>{
        if( this.props.onSubmit ){
            this.props.onSubmit( this.state.name, this.state.tags );
        }
    }

    _onCancel = ()=>{
        if( this.props.onCancel ){
            this.props.onCancel();
        }

        this.setState( { isOpen : false });
    }

    _removeTag = (tag)=>{
        this.setState( { 
            tags : this.state.tags.filter(t=>{
                return (t != tag);
            }),
            isDataChange : true
        })
    }

    _onTagChange = (tag)=>{
        this.setState( { tagInputing:tag})
    }

    _onTagKeyDown =(e)=>{
        const input = this.state.tagInputing;
        let   tags  = this.state.tags;

        console.log("tags", tags);

        if( e.key=='Enter' ){
            //add tags, if not exits
            if( (input!=null) && (input!="")&& (tags.indexOf(input)==-1) ){
                this.setState( { 
                    tags: tags.concat([ input ]),
                    tagInputing : "",
                    isDataChange : true
                })
            }
            else {
                this.setState( { tagInputing : null })
            }
        }
    }

    _onInputNameChange =(name)=>{
        this.setState( { 
            name : name,
            isDataChange : true
        })
    }

    _renderTagEnter =()=>{
        return (
            <div>
                <Input  
                    list="tag-all-list"
                    value={this.state.tagInputing||""}
                    onChange={(z)=>this._onTagChange(z.target.value)}
                    type="text" placeholder="Tags name..."
                    onKeyDown={this._onTagKeyDown}
                    />
                <datalist id="tag-all-list">
                    { this.props.allTags.map( (item,index)=>(
                        <option key={index} value={item}/>
                    ))}
                </datalist>
            </div>
        )
    }

    render() {
        if( this.props.item==null ){
            return null;
        }

        const xsLeft = 1;
        return (
            <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={'modal-lg ' + this.props.className}>
                <ModalHeader toggle={this._onCancel}><i className="fa fa-bars">&nbsp;</i>Datasource Editor</ModalHeader>
                <ModalBody>
                    <CardBody>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col sm={xsLeft}><Label>Code:</Label></Col>
                                    <Col sm={6}><Label><b>{this.props.item.code}</b></Label></Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Col md="1"><Label>Name</Label></Col>
                                    <Col>
                                        <Input 
                                            onChange={(z)=>this._onInputNameChange(z.target.value)}
                                            type="text" placeholder="Display name..." 
                                            defaultValue={this.props.item.name}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup row>
                                <Col md="1"><Label>Tags</Label><Badge pill>{this.state.tags.length}</Badge></Col>
                                <Col>
                                    <Row>
                                        <Col sm="8">
                                            { this._renderTagEnter()}
                                        </Col>
                                    </Row>
                                    <Row>
                                        { console.log("asasasasasasa", this.state.tags )}
                                        { this.state.tags.map( (item, index)=> (
                                            <Button 
                                                key={index}
                                                style={styles.tag} color="light" 
                                                size="sm">{item}&nbsp;<i className="fa fa-close" onClick={()=>this._removeTag(item)}></i></Button>
                                        )) }
                                    </Row>
                                </Col>
                            </FormGroup>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                            <Row><h4>Hãy giúp tôi khai thác dữ liệu này</h4></Row>
                                <Row>{this.renderMiningRelationships()} </Row>
                                <Row>{this.renderMiningAlternatives()} </Row>
                        </Col>
                        </Row> */}
                    </CardBody>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"   onClick={this._onCancel}>Cancel</Button>{' '}
                    <Button color="primary"  onClick={this._onSubmit} disabled={!this.state.isDataChange}>Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }

    renderMiningRelationships = ()=>{
        return (
            null
        )
    }

    renderMiningAlternatives =()=>{
        return (
            null
        )
    }
}

const mapStateToProps = state => {
    const APP_STORE = "features/dashboard";

    return {
        allTags : state[ APP_STORE ].allTags
    }
}

const styles ={
    leftCol: {
        width : "3sm"
    },
    tag :{
        borderRadius : "8px",
        margin : "2px",
        marginTop : "8px"
    },
    tagProps: {
        color : "light",
        size : "sm"
    }
}

export default connect( mapStateToProps )(DatasourceEditorModel);