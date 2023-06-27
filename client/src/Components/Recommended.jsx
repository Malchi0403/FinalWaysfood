import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../utils/context/userContext";
import { distance } from "@turf/turf";
import { useContext, useEffect, useState } from "react";
const Recommended = ({ data, load }) => {
  const calculateDistance = (startLng, startLat, endLng, endLat) => {
    const startPoint = ([startLng, startLat])
    const endPoint = ([endLng, endLat])
    const option = { units: 'kilometers' };
    const dist = distance(startPoint, endPoint, option)
    return dist
  }
  const [lngPoint, setLngPoint] = useState()
  const [latPoint, setLatPoint] = useState()
  const datas = data?.map((item) => {
    return item?.location
  })

  const [state, _] = useContext(UserContext)
  useEffect(() => {
    if (data) {
      setLatPoint(datas?.location?.split(",")[0])
      setLngPoint(datas?.location?.split(",")[1])
    }
  }, [datas, state.user])
  console.log(state)


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
                  <img src={item?.image} alt="" className="imageRes" />
                  <p className="textRes">{item?.fullname}</p>
                  <p className="textDistance">{state?.isLogin === true ? calculateDistance(item?.location?.split(",")[1], item?.location?.split(",")[0], state?.user?.location?.split(",")[1], state?.user?.location?.split(",")[0]).toFixed(2) : 0}KM</p>
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
