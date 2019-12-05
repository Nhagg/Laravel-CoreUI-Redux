import {Component} from 'react';
import { connect }                from 'react-redux'

import { doGetSchemaHiddenList  } from '../../schema-explorer';
import { doGetAllDatasourceCode } from '../../data-explorer';
import { doGetStatisticsDatalake } from '../../dashboard';
  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class Startup extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch( doGetSchemaHiddenList( failure=>{
            console.error("Cannot get schema-hidden list at startup", failure );
        }))

        dispatch( doGetAllDatasourceCode( failure=>{
            console.error("Cannot get datasource list at startup", failure );
        }))

        dispatch( doGetStatisticsDatalake( failure=>{
            console.error("ERROR: Cannot read statistics of datalake", failure);
        }))
    }

    /**
     * No view
     */
    render = () => null
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(Startup);
