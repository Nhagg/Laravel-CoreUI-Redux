import React, {Component} from 'react';
import { connect }                from 'react-redux'

import {
    Badge,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Button
  } from 'reactstrap';

  
/**
 * Language Picker Component
 * @prop {bool} showText : display including text or not
 * 
 */
class TagsList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            <Row  >
                <Col xs="12">
              <Button color="primary"><i className="fa fa-plus-circle"></i>{'\u00A0'} Add new</Button>
              </Col>
            </Row>

            <Row>
            <Col xs="12">
            <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Tags
            </CardHeader>
            <CardBody>
            <Table responsive>
                <thead>
                <tr>
                  <th>No.</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Samppa Nori</td>
                  <td>2012/01/01</td>
                  <td>Member</td>
                  <td>
                    <Badge color="success">Active</Badge>
                  </td>
                  <td>
                    <Button color="primary"><i className="fa fa-edit"></i>{'\u00A0'}Edit</Button>
                    <Button color="secondary"><i className="fa fa-question-circle"></i>{'\u00A0'}Detail</Button>
                    <Button color="danger"><i className="fa fa-trash"></i>{'\u00A0'}</Button>
                  </td>
                </tr>
          
                </tbody>
              </Table>
              <Pagination>
                <PaginationItem>
                  <PaginationLink previous href="#"></PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#page=1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#"></PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
          </Col>
          </Row>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect( mapStateToProps )(TagsList);
