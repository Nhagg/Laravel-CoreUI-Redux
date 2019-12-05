import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    CardBody,
    Row, Col, Button
} from 'reactstrap';



type Props = {
    dispatch: Dispatch<*>,

    item : Object
}
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class TabFields extends Component {

    constructor(props : Props) {
        super(props);

        this.state = {
            hideNotImportantSchema : false
        }
    }

    urlFilterBySchema = (schemaCode)=>{
        return `#/schema-explorer?sc=${schemaCode}`;
    }

    _onHideSchemaNotImportant = ()=>{
        this.setState( {
            hideNotImportantSchema : !this.state.hideNotImportantSchema
        })
    }

    _explainField = (field)=>{
        return ( 
            <i>({field.type}/
                {field.name==null? <span>
                Chưa có miêu tả
            </span> : field.name})</i>
        );
    }
    render() {

        if( this.props.item==null ){
          return <div>Item property is required!!!!</div>
        }

        return (
            <CardBody>
                <Row>
                <h3>Fields / Columns</h3>
                </Row>
                <Row>
                    Tất cả các trường dữ liệu (field/column) trong schema.
                </Row>
                <Row visible={this.state.refresh}>
                    { this.props.item.fields == null ? <div><hr/>Have no schemas</div> : 
                        <ol>
                            {this.props.item.fields.sort().map( (item, index) => (
                               
                                    <li key={index}> <a href={this.urlFilterBySchema(item.code)}>{item.code}</a>&nbsp;&nbsp;{this._explainField(item)}</li>
   
                            ))}
                        </ol>
                    }
                </Row>
            </CardBody>
        );
    }
}

const mapStateToProps = state => {
    const SCHEMA_STORE = 'features/schemas';
    return {
        schemaHiddenList : state[ SCHEMA_STORE ].schemaHiddenList
    }
}

export default connect( mapStateToProps )(TabFields);
