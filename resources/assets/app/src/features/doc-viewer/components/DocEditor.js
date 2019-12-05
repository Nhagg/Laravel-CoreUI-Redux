import React, {Component} from 'react';
import { connect }                from 'react-redux';

const ReactMarkdown = require('react-markdown')
const HtmlParser    = require('html-react-parser');

import { 
    Row, Col, 
    Card, CardBody, CardHeader,
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Input, InputGroup, InputGroupAddon, InputGroupText,
    Label,
    FormGroup,
    
    Badge,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';


import classnames from 'classnames';



type Props = {
    dispatch : Dispatch<*>,

    /**
     * (content,mine)
     */
    onDocChange : Function,

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

class DocEditor extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            mineType : this.props.mine_type !=null ? this.props.mine_type : 'text/markdown',
            content  : this.props.content,
            activeTab : '1',
        }
    }

    _onMineTypeChange = (value)=>{
        this.setState( { mineType : value })
        if( this.props.onDocChange ){
            this.props.onDocChange( this.state.content, value );
        }
    }

    
    toggle = (tab)=>{
        this.setState( { activeTab: tab });
    }

    _onTextChange = (content)=>{
        this.setState( { content: content })

        if( this.props.onDocChange ){
            this.props.onDocChange( content, this.state.mineType );
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="6">
                        <FormGroup>
                            <Label htmlFor="ccmonth">MineType:&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://vi.wikipedia.org/wiki/Markdown"><i>(*markdown)</i></a></Label>
                            <Input  
                                defaultValue={this.state.mineType} type="select" id="doc-editor-mini-type" 
                                name="doc-editor-mini-type" placeholder="MineType"
                                onChange={(z)=>this._onMineTypeChange(z.target.value)}
                            >
                            <option value="text/plain">text/plain</option>
                            <option value="text/markdown">text/markdown</option>
                            <option value="text/html">text/html</option>
                        </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                    <FormGroup>
                        <Label >Content</Label>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab==='1' })} onClick={()=> { this.toggle('1'); }} >
                                    <i className="icon-book-open"></i>{'\u00A0'}Raw
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab==='2' })} onClick={()=> { this.toggle('2'); }} >
                                    <i className="icon-eye"></i>{'\u00A0'}Preview
                                </NavLink>
                            </NavItem>
                        
                        </Nav>
                        <TabContent activeTab={this.state.activeTab} style={styles.tabContent}>
                            <TabPane tabId="1">
                                <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                    onChange={(z)=>this._onTextChange(z.target.value)}
                                    placeholder="Content..."
                                    defaultValue={this.state.content}/>
                            </TabPane>
                            <TabPane tabId="2">
                                {this.state.content ? this.renderTabPreview() : this.renderEmpty() }
                            </TabPane>
                        </TabContent>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
    }

    renderTabPreview = ()=>{
        return (
            <div>
                { this.state.mineType == 'text/plain'      ? this.renderTextPlain()    : null }
                { this.state.mineType == 'text/html'       ? this.renderTextHtml()     : null }
                { this.state.mineType == 'text/markdown'   ? this.renderTextMarkdown() : null }
             </div>
        )
    }

    renderTextPlain = ()=>{
        return <div>{this.state.content}</div>
    }

    renderTextHtml = ()=>{
        return HtmlParser(
            this.state.content
        )
    }

    renderTextMarkdown = ()=>{
        return (
            <ReactMarkdown source={this.state.content}></ReactMarkdown>
        )
    }

    renderEmpty = () =>{
        return (
            <i>No content</i>
        )
    }
}

const styles = {
    tabContent : {
        hAeight : '250px'
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect( mapStateToProps )(DocEditor);