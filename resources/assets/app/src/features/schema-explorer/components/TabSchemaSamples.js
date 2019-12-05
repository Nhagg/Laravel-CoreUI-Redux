import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

import classnames from 'classnames';
import TabDoc from './TabDoc';
import { showDatasourcePanel, doGetSchemaByCode, updateSchemaCurrent } from '../actions';
import TabFields from './TabFields';
import TabMining from './TabMining';
import { doGetSchemasOfDatasourceByCode } from '../../data-explorer';
import DataSampleNoData from './DataSampleNoData';
import SchemaNoData from './SchemaNoData';
import DataSampleList from './DataSampleList';


  
type Props = {
    dispatch: Dispatch<*>,

    /**
     * Schema object
     */
    item : Object
}

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class TabSchemaSamples extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            schemas : [],
            currentSchemaCode : null,
            schemaNotFound : false,
            schemaHasNotSamples : false,
            schemaCurrent : null
        }
    }


    _onDatasourceSelectItem = (dsCode)=>{
        console.log("Select datasource-code:",dsCode);
        const { dispatch } = this.props;

        // dsCode isnot select, use default schema
        if( dsCode=='None' ){
            if( this.props.schemaCurrent!=null ){
                this.setState( { 
                    schemas: [ this.props.schemaCurrent.code ] ,
                    schemaCurrent : this.props.schemaCurrent,
                    currentSchemaCode : this.props.schemaCurrent.code
                });

                this._onSchemaSelectItem( this.props.schemaCurrent.code )
            }
        }
        else {
            // Get all schema of datasource
            dispatch( doGetSchemasOfDatasourceByCode( dsCode, 
                    success => this._getSchemaSuccess(success),
                    failure => this._getSchemaFailure( failure)
                ));
        }
    }

    _getSchemaSuccess = (schemas)=>{
        //console.log("schema", schemas );
        const { dispatch } = this.props;

        this.setState( { 
            schemas: schemas,
            schemaCurrent : null,
            currentSchemaCode : null
        })

        dispatch( updateSchemaCurrent( null ));
    }

    _getSchemaFailure = (failure)=>{
        console.log("ERROR cannot get datasource", failure );
    }

    _onSchemaSelectItem =(schemaCode )=>{
        const { dispatch } = this.props;

        this.setState( { currentSchemaCode : schemaCode });

        dispatch( doGetSchemaByCode( schemaCode, 
            success => {
                
                // check if schema not found, display report error
                this.setState( { 
                    schemaNotFound: success==null,
                    schemaCurrent : success
                });

                dispatch( updateSchemaCurrent( success ))
            },
            failure => {
                console.error(`Schema ${schemaCode} not support document`, failure);
                dispatch( updateSchemaCurrent( null ))
            }));
    }

    render() {
        const expadIcon = this.props.datasourcePanelVisible ? "icon-size-fullscreen" : "icon-size-actual";

        console.log("this.state.schemaCurrent", this.props.schemaCurrent );
        
        const datasources = this.props.datasources!=null ? this.props.datasources : [];
        return (
            <CardBody>
        <Row>
           <FormGroup row>
                  <FormGroup>
                    <Col md="12">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary" disabled><i className="fa fa-database"></i></Button>
                        </InputGroupAddon>
                        <Input onChange={(thiz)=>this._onDatasourceSelectItem(thiz.target.value)} type="select" id="datasource-input-select"  placeholder="Select a datasource">
                            <option value='None'>None</option>
                            { datasources.sort( (a,b)=> {
                                if( a.code < b.code ) return -1;
                                else if( a.code > b.code ) return 1;
                                else return 0; 
                            }).map( (item,index)=>(
                                <option key={index} value={item.code}>{item.code}&nbsp;&nbsp;({item.name})</option>        
                            ))}
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                  <Col md="12">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary" disabled><i className="fa fa-table"></i></Button>
                        </InputGroupAddon>

                        <Input 
                            onChange = { (t)=>{ this._onSchemaSelectItem( t.target.value )}} 
                            type="select" id="input1-group2" name="input1-group2" placeholder="Select a schema">
     
                            { this.state.schemas.sort().map( (item,index)=> (
                                <option key={index} value={item}>{item}</option>
                            ))}
                            
                        </Input>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  </FormGroup>
                 
        </Row>
        <Row xs="12">
            { this.state.schemaNotFound     ? <SchemaNoData schemaCode={this.state.currentSchemaCode}/> : null }
            { this.state.schemaHasNotSamples? <DataSampleNoData schemaCode={this.state.currentSchemaCode}/> : null}
                   
        </Row>
        <Row>
            <Col xs="12">
                { this.state.schemaCurrent!=null? <DataSampleList schema={this.state.schemaCurrent}/>:null}
            </Col> 
        </Row>
        </CardBody>

        );
    }
}

const mapStateToProps = state => {
    const SCHEMAS_STORE = 'features/schemas';
    const DS_STORE      = 'features/datasources';
    return {
        schemaCurrent : state[ SCHEMAS_STORE ].schemaCurrent,
        datasources   : state[ DS_STORE ].datasources
    }
}

export default connect( mapStateToProps )(TabSchemaSamples);
