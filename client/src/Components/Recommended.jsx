import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Recommended = ({ data, load }) => {


  return (
    <>
      <Container className=" homePopular">
        <h3>Restaurant Near You</h3>

        <Row className="mt-4">
          {!load && data?.slice(0, 4).map((item, i) => {
            const handleClick = () => {
              window.location.href = `/Product/${item.id}`
            }
            return (
              <Col key={i} onClick={handleClick}>
                <div className="recommended">
                  <img src={item.image} alt="" className="imageRes" />
                  <p className="textRes">{item.fullname}</p>
                  <p className="textDistance">1.6KM</p>
                </div>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  );
};

export default Recommended;
