import React, {Component} from 'react';
import { connect }                from 'react-redux'

const ReactMarkdown = require('react-markdown')
const HtmlParser    = require('html-react-parser');

type Props = {
    dispatch : Dispatch<*>,

    /**
     * Mine Type
     * Supported: taxt/plain | text/html | text/markdown
     */
    mine_type : String,

    /**
     * Content
     */
    content : String,

    /**
     * Last changed of document 
     */
    changed_at : Date,

    /**
     * Changed by
     */
    changed_by: String
}
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class DocViewer extends Component {

    constructor(props : Props) {
        super(props);
    }

    renderTextPlain = ()=>{
        return <div>{this.props.content}</div>
    }

    renderTextHtml = ()=>{
        return HtmlParser(
            this.props.content
        )
    }

    renderTextMarkdown = ()=>{
        return (
            <ReactMarkdown source={this.props.content}></ReactMarkdown>
        )
    }

    renderEmpty = () =>{
        return (
            <div>Have no document</div>
        )
    }

    render() {

        if( this.props.content ==null ){
            return this.renderEmpty()
        }
        return (
            <div>
                { this.props.mine_type == 'text/plain'      ? this.renderTextPlain()    : null }
                { this.props.mine_type == 'text/html'       ? this.renderTextHtml()     : null }
                { this.props.mine_type == 'text/markdown'   ? this.renderTextMarkdown() : null }

                { this.props.changed_by !=null ? (
                    <div>
                        <hr></hr>
                        <i>Changed by <a href={"mailto:" + this.props.changed_by}>{this.props.changed_by}</a>&nbsp;
                            {/* {this.props.changed_at!=null ? "(" + this.props.changed_at+ ")" : null } */}
                        </i>
                    </div>
                    ) : null 
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect( mapStateToProps )(DocViewer);
