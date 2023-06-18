import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Icon from "../assets/images/IconBooking.png";
import Picture from "../assets/images/Bank.png";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { UserContext } from "../utils/context/userContext";
import { useCustomMutation, useCustomQuery } from "../config/query";
import { transaction } from "../utils/transaction";
import { faMapLocation, faRecycle, faSquareMinus, faSquarePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getOrder, postOrder } from "../utils/profile";

const Orders = () => {
  const navigate = useNavigate(6)
  const order = useCustomMutation("try", postOrder)
  const pay = useCustomMutation("pay", transaction)
  let { data, isLoading, refetch } = useCustomQuery("test", getOrder)

  console.log(data)
  const total = data.map((tot) => {
    return tot.qty * tot.product.price
  })
  const subTotal = total.reduce((acc, curr) => acc + curr, 0
  )

  const totalQty = data.map((quantity) => {
    return quantity.qty
  })
  const subQty = totalQty.reduce((acc, curr) => acc + curr, 0
  )
  const handleWaitingApprove = async (e) => {
    try {
      e.preventDefault();
      const transaction = {
        buyerid: data[0].buyer.id,
        sellerid: data[0].seller?.id,
        totalPrice: Number(subTotal)
      };

      const body = JSON.stringify(transaction);
      const response = await pay.mutateAsync(body);

      console.log(response, "cek response");
      if (response) {
        const token = response?.token;
        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/Profile");
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      }
    } catch (error) {
      console.log("transaction failed : ", error);
    }
  };

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <Container style={{ marginTop: "60px" }}>
        <div>
          <h3>{!isLoading && data ? data[0]?.seller?.fullname : "cinta"}</h3>
        </div>


        <Form.Label>Delivery Location</Form.Label>
        <Form.Group className="d-flex justify-content-between mt-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            name="location"
            placeholder="Location"
            style={{ width: "75%", backgroundColor: "#fff", border: "1px solid #766C6C", height: "50px" }}
          />
          <div className="MapButton">
            <button type="button"
            >
              Select On Map <FontAwesomeIcon icon={faMapLocation} />
            </button>
          </div>
        </Form.Group>

        <h2 className="mt-5">Review Your Order</h2>

        <Row>
          <Col lg={9}>
            <div className=" mt-3">
              {!isLoading && data.sort((a, b) => a.id - b.id).map((item) => {
                return (

                  <div className="d-flex justify-content-between" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
                    <div className="d-flex">
                      <img src={item.product.image} alt="" className="imgTransaction" />
                      <div>

                        <p className="textTransaction">{item.product.title}</p>
                        <h4>
                          <span
                            className="me-3"
                            style={{
                              color: "#FFAF00",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (item.qty > 1) {

                                let datas = {
                                  qty: item?.qty - 1,
                                  buyer_Id: item?.buyer.id,
                                  seller_Id: item?.seller.id,
                                  product_Id: item?.product_id
                                }
                                order.mutate(datas, {
                                  onSuccess: () => {
                                    refetch()
                                  }
                                })
                              }
                            }}
                          >
                            <FontAwesomeIcon icon={faSquareMinus} />
                          </span>
                          {item?.qty}
                          <span
                            className="ms-3"
                            style={{
                              color: "#FFAF00",
                              borderRadius: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              let datas = {
                                qty: item.qty + 1,
                                buyer_Id: item?.buyer_id,
                                seller_Id: item?.seller_id,
                                product_Id: item?.product_id
                              }
                              order.mutate(datas, {
                                onSuccess: () => {
                                  refetch()
                                }
                              })

                            }}
                          >
                            <FontAwesomeIcon icon={faSquarePlus} />
                          </span>
                        </h4>
                      </div>
                    </div>
                    <Row className="textTransaction me-3">
                      <Col>Rp</Col>
                      <Col>{item.product.price}</Col>
                      <div className="bin">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </Row>
                  </div>
                )
              })}
            </div >
          </Col>

          <Col lg={3} className="mt-3" >
            <Row style={{ borderTop: "1px solid #000", padding: "20px 0" }}>
              <Col lg={8}>Sub Total</Col>
              <Col >Rp {subTotal} </Col>
              <Row >
                <Col lg={8}>Quantity</Col>
                <Col style={{ textAlign: "end" }}>{subQty}</Col>
              </Row>
              <Row >
                <Col lg={8}>Ongkir</Col>
                <Col style={{ textAlign: "end" }} >FREE</Col>
              </Row>
            </Row>
            <Row style={{ borderTop: "1px solid #000", padding: "20px 0" }}>
              <Col lg={8}>Total</Col>
              <Col style={{ textAlign: "end" }}>Rp </Col>
            </Row>
          </Col>
        </Row>

        <div className="transactionButton">
          <button type="button"
            onClick={(e) => handleWaitingApprove(e)}
          >
            Select On Map <FontAwesomeIcon icon={faMapLocation} />
          </button>
        </div>


      </Container>
    </>
  );
};

export default Orders;
