import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    CardBody,
    Badge,
    Button,
    Row
} from 'reactstrap';

import { DocViewer } from '../../doc-viewer';

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
    }

    /**
     * make URI by filter datasource
     */
    uriFilterByTag = (ds)=>{
        return `#/schema-explorer?tag=${ds}`;
    }

    render() {

        console.log( "item", item );

        if( this.props.item==null ){
            return <div>Item propperty is required!!!!!</div>;
        }

        const item = this.props.item;
        const tags = item.tags != null ? item.tags : [];
        const doc  = item.doc;


        return (
            <div>
                <h3>{item.name}</h3>
                <div>
                    <span>code:&nbsp;<font color='#000099'><i>{item.code}</i></font></span>
                    </div>
                    <div>
                    {/* display tags */ }
                    <span>
                        { tags.map( (item,index)=>(
                            <a key={index} href={this.uriFilterByTag(item)}><Badge pill style={{'marginRight':'2px'}}>{item}</Badge></a>
                        ))}
                    </span>
                    </div>

                    { doc !=null ? 
                        <div>
                            <hr/>
                            <DocViewer {...doc}/> 
                        </div> : (
                        <CardBody>
                            <Row>Không có tài liệu cho phần này. Hãy giúp tôi hoàn thiện nó</Row>
                            <Row>
                                <Button color="primary"><i className="icon-book-open"></i>&nbsp; Tạo tài liệu</Button>
                            </Row>
                        </CardBody>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(TabDoc);
