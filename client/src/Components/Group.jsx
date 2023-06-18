import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCustomQuery } from "../config/query";
import { getTrip } from "../utils/product";
import withReactContent from "sweetalert2-react-content";

const GroupsTour = ({ searchTerm }) => {
  let { data } = useCustomQuery("data", getTrip);
  const navigate = useNavigate();

  const filteredData = data?.filter((item) => {
    if (searchTerm === "") {
      return item;
    } else if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else if (item.country.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
    return;
  });

  return (
    <Container className="positionGroup justify-content-center">
      <h1
        style={{
          fontFamily: "Avenir",
          fontWeight: "800",
        }}
        className="text-center mb-5"
      >
        Group tour
      </h1>
      <Row className="">
        {filteredData &&
          filteredData.map((tour) => {
            return (
              <Col className="d-flex justify-content-center mb-4" key={tour.id}>
                <Card style={{ width: "350px", height: "350px" }}>
                  <div>
                    <Card.Img
                      variant="top"
                      src={tour?.image}
                      className="styleImage"
                      style={{ position: "relative", left: "13px" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      width: "70px",
                      height: "30px",
                      border: "1px solid #000",

                      borderStartEndRadius: "5px",
                      backgroundColor: "#fff",
                      padding: "0",
                      right: "15px",
                      top: "11px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {tour.currentqty < tour.quota ? (
                      <p
                        style={{
                          paddingTop: "14px",
                          paddingLeft: "9px",
                          fontWeight: "700",
                          letterSpacing: "4px",
                        }}
                      >
                        {tour?.currentqty}/{tour?.quota}
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          color: "red",
                          paddingTop: "14px",
                          paddingLeft: "8px",
                        }}
                      >
                        SOLD OUT
                      </p>
                    )}
                  </div>
                  <Card.Body style={{ fontFamily: "Avenir" }}>
                    <Card.Title>
                      {" "}
                      <Link
                        to={
                          tour.currentqty < tour.quota
                            ? `/Detail/${tour.id}`
                            : "/"
                        }
                        style={{
                          textDecoration: "none",
                          color: "#000",
                        }}
                        className="linkAdmin"
                      >
                        {tour?.title}
                      </Link>{" "}
                    </Card.Title>
                    <div className="d-flex justify-content-between">
                      <Card.Text
                        className="mt-3"
                        style={{
                          fontFamily: "Avenir",
                          fontWeight: "900",
                          fontSize: "18px",
                          color: "#ffaf00",
                        }}
                      >
                        IDR {tour?.price.toLocaleString("en-ID")}
                      </Card.Text>
                      <Card.Text className="mt-3">{tour?.country}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default GroupsTour;
