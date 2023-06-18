import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Contents = ({ data, load }) => {

  return (
    <Container className=" homePopular">
      <h3>Popular Restaurant</h3>

      <Row className="mt-4">
        {!load && data?.slice(0, 4).map((item) => {
          return (

            <Col >
              <div className="popularRestaurant p-3 shadow-lg" >
                <Row>
                  <Col>
                    <img src={item.image} alt="" className="imagePop" />
                  </Col>
                  <Col>
                    <p className="textPop">{item.fullname}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
  );
};

export default Contents;
