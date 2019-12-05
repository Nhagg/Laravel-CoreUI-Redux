import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Jumbotron, Button, Container
} from 'reactstrap';

class NewsCard extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Jumbotron>
              <h3 className="display-5">Hello, Customer!</h3>
              <p className="lead">Phiên bản của bạn là phiên bản đang trong giai đoạn Beta, 
              vì vậy có thể vẫn tồn tại một vài lỗi nhỏ.
              <a href="#">Hãy thông báo cho chúng tôi nếu bạn thấy lỗi nhé</a>
              </p>
              <hr className="my-2"/>
              <p>Thông tin chi tiết theo link dưới.</p>
              <p className="lead">
                <Button color="primary">More</Button>
              </p>
            </Jumbotron>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default NewsCard;