import React, {Component} from 'react';
import { connect }                from 'react-redux'
import { toast } from 'react-toastify';

import {
    CardBody,
    Button,
    Row
} from 'reactstrap';
  
type Props = {
    dispatch: Dispatch<*>,

    schemaCode : String,
}

/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class SchemaNoData extends Component {

    constructor(props: Props) {
        super(props);
    }

    _reportMissingSchemaData = (schemaCode)=>{
        //T.B.D - Report
        toast.success( "Đã report dữ liệu thành công. Chúng tôi sẽ cập nhật ngay.")
    }

    render() {        

        return (
            <CardBody>
                <Row>
                    <h3>Schema Not Found.</h3>
                    <p>
                        Không có thông tin về schema bạn đang tìm  <b>{this.props.schemaCode}</b>.
                        Hãy thông báo cho chúng tôi và chúng tôi sẽ cập nhật lại ngay.
                    </p>
                </Row>
                <Row>
                    <Button color='danger' onClick={this._reportMissingSchemaData}>Thông báo thiếu dữ lệu</Button>
                </Row>

            </CardBody>
           
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(SchemaNoData);
