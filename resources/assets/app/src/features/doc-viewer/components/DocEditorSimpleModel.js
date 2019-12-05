import React, {Component} from 'react';
import { connect }                from 'react-redux'

import { 
    Row, Col, 
    Card, CardBody, CardHeader,
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import DocEditor from './DocEditor';


type Props = {
    dispatch : Dispatch<*>,

    onSubmit : Function,
    onCancel : Function,

    title : String,

    /**
     * Mine Type
     * Supported: taxt/plain | text/html | text/markdown
     */
    mine_type : String,

    /**
     * Content
     */
    content : String
}

class DocEditorSimpleModel extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            content      : this.props.content,
            mineType     : this.props.mine_type,
            isDataChange : false
        }
    }


    _onSubmit =( content: String, mineType: String )=>{
        if( this.props.onSubmit ){
            this.props.onSubmit( this.state.content, this.state.mineType );
        }
    }

    _onCancel = ()=>{
        if( this.props.onCancel ){
            this.props.onCancel();
        }
    }

    _onDocChange = (content, mineType)=>{
        this.setState( {
            content : content,
            mineType : mineType,
            isDataChange : true
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={'modal-lg ' + this.props.className}>
                <ModalHeader toggle={this._onCancel}><i className="fa fa-bars">&nbsp;</i>{this.props.title}</ModalHeader>
                <ModalBody>
                    <CardBody>
                        <DocEditor content={this.props.content} mine_type={this.props.mine_type} onDocChange={this._onDocChange}/>
                    </CardBody>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"   onClick={this._onCancel}>Cancel</Button>{' '}
                    <Button color="primary"  onClick={this._onSubmit} disabled={!this.state.isDataChange}>Submit</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect( mapStateToProps )(DocEditorSimpleModel);