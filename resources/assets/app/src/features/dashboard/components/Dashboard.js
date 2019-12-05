import React, {Component} from 'react';
import { connect }                from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,

} from 'reactstrap';

const TOP_DASHBOARD_HEIGHT = '160px';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const statistics = this.props.statistics !=null ? this.props.statistics : {
        datasources  : { count : '~NA~' },
        schemas      : { count : '~NA~' },
        data_samples : { count : '~NA~' },
        tags         : { count : '~NA~' },
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary"  style={{height:TOP_DASHBOARD_HEIGHT}}>
              <CardBody className="pb-0">
               
                <h4 className="mb-0">{statistics.datasources.count}</h4>
                <p>Data Sources</p>
                <p>
                    <i>Database và các nguồn data khác từ ngoài Topica</i>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info"  style={{height:TOP_DASHBOARD_HEIGHT}}>
              <CardBody className="pb-0">
               
                <h4 className="mb-0">{statistics.schemas.count}</h4>
                <p>Schemas</p>
                <p>
                    <i>Table/Collection có tài liệu mô tả rõ ràng các trường dữ liệu</i>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning"  style={{height:TOP_DASHBOARD_HEIGHT}}>
              <CardBody className="pb-0">
               
                <h4 className="mb-0">{statistics.data_samples.count}</h4>
                <p>Data Samples</p>
                <p>
                    <i>Tổng số data mẫu trích từ hệ thống DataLake</i>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger"  style={{height:TOP_DASHBOARD_HEIGHT}}>
            <CardBody className="pb-0">
               
               <h4 className="mb-0">{statistics.tags.count}</h4>
               <p>Tags / Categories</p>
               <p>
                   <i>Dữ liệu đã được gắn thẻ phân loại</i>
               </p>
             </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
    const DASHBOARD_STORE = 'features/dashboard';

    return {
        statistics : state[ DASHBOARD_STORE ].statistics
    }
}

export default connect( mapStateToProps )(Dashboard);

