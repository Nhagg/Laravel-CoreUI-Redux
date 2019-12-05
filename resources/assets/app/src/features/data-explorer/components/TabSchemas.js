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
class TabSchemas extends Component {

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

    _explainSchema = (schemaCode)=>{
        return null;
    }
    render() {

        if( this.props.item==null ){
          return <div>Item property is required!!!!</div>
        }

        return (
            <CardBody>
                <Row>

                <h3>Schemas</h3>
                <Col></Col>
                <Col xs="auto">
                    <Button color="link" onClick={this._onHideSchemaNotImportant}>{this.state.hideNotImportantSchema? "(Tất cả schema)" : "(Ẩn schema ít dùng)"}</Button>
                </Col>

                </Row>
                <Row>
                    Tất cả các achema (table/collection) trong datasource.
                </Row>
                <Row visible={this.state.refresh}>
                    { this.props.item.schemas == null ? <div>Have no schemas</div> : 
                        <ol>
                            {this.props.item.schemas.sort().map( (item, index) => (
                                (this.props.schemaHiddenList.indexOf(item) == -1) || (!this.state.hideNotImportantSchema) ?
                                    <li key={index}> <a href={this.urlFilterBySchema(item)}>{item}</a>&nbsp;&nbsp;{this._explainSchema(item)}</li>
                                : null
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

export default connect( mapStateToProps )(TabSchemas);
