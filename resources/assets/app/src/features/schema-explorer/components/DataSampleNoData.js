import React, {Component} from 'react';
import { connect }                from 'react-redux'
import { toast } from 'react-toastify';

import {
    Card,
    CardHeader,
    CardBody,
    Badge,
    Table,
    Button,
    Tooltip,
    TabContent, TabPane, Nav, NavItem, NavLink,
    Row,Col
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
class DataSampleNoData extends Component {

    constructor(props: Props) {
        super(props);
    }

    _reportMissingSampleData = (schemaCode)=>{
        //T.B.D - Report
        toast.success( "Đã report dữ liệu thành công. Chúng tôi sẽ cập nhật ngay.")
    }

    render() {        

        return (
            <CardBody>
                <Row>
                    <h3>Data Sample Not found.</h3>
                    <p>
                        Không thấy dữ liệu mẫu của schema <b>{this.props.schemaCode}</b>.
                        Hãy thông báo cho chúng tôi và chúng tôi sẽ cập nhật lại ngay.
                    </p>
                </Row>
                <Row>
                    <Button color='danger' onClick={this._reportMissingSampleData}>Thông báo thiếu dữ lệu</Button>
                </Row>

            </CardBody>
           
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(DataSampleNoData);
