import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Table,
    Button,
    Tooltip,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

import { 
    Pagination, paginationResponseParser, 
} from '../../../layout/components/Pagination';
import { updateSchemaCurrent, doGetSchemaDataSamples } from '../actions';


  
type Props = {
    dispatch: Dispatch<*>,

    schemaId : String,

    /**
     * Schema object
     */
    schema : Object
}

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class DataSampleList extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            pagination : null,
            samples : []
        }
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch( doGetSchemaDataSamples( this.props.schema.code,
            success=> this._onGetDataSampleSuccess(success),
            failure => this._onGetDataSampleFailure(failure) 
        ));
    }

    _onGetDataSampleSuccess =(result)=>{
        const pagination = paginationResponseParser( result );
        const samples       = result.data;
        
        console.log("samples", result );

        this.setState( {
            pagination : pagination,
            samples : samples
        })
    }

    _onGetDataSampleFailure =(failure)=>{
        console.error(`ERROR: cannot get data-samples of ${this.props.schema.code}`, failure )
    }

    _onPageClickListener = (href)=>{
        //load more
        const { dispatch } = this.props;
        dispatch( doGetSchemaDataSamples( this.props.schema.code,
            success=> this._onGetDataSampleSuccess(success),
            failure => this._onGetDataSampleFailure(failure),
            href + `&code=${this.props.schema.code}`
        ));
    }

    render() {    
        console.log("this.state.data", this.state.data ); 
        if( this.state.pagination==null ){
            return null;
        }
        const header  = this.state.samples[0].data !=null ? this.state.samples[0].data : [];
        const samples = this.state.samples !=null ? this.state.samples : [];

        return (
            <div>
                <Table hover striped responsive size="sm" className="ml-auto" >
                    <thead>
                        <tr>
                            { Object.keys(header).map( (item,index)=>(
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        { samples.map( (item,index)=>(
                            <tr key={index}>
                                { Object.values(item.data).map( (item, index)=>(
                                    <td key={index}>{item}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                { this.state.pagination !=null ? 
                    <Pagination 
                        {...this.state.pagination} 
                        onPageClickListener={this._onPageClickListener}>
                    </Pagination> : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const SCHEMAS_STORE = 'features/schemas';
    return {
        schemaCurrent : state[ SCHEMAS_STORE ].schemaCurrent,
    }
}

export default connect( mapStateToProps )(DataSampleList);
