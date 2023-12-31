/** @format */

/** @format */

import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../config/api";

export const ModalProfile = ({ onHide, show, data }) => {
  let navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("/images/placeholder.webp");

  const [updateProfile, setUpdateProfile] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });

  async function getDataUpdateProfile() {
    const responseProfile = await API.get("user");
    if (responseProfile.data.data.image !== "") {
      setImageUrl(responseProfile.data.data.image);
    }

    setUpdateProfile({
      ...updateProfile,
      fullname: responseProfile.data.data.fullname,
      email: responseProfile.data.data.email,
      password: responseProfile.data.data.password,
      phone: responseProfile.data.data.phone,
      address: responseProfile.data.data.address,
    });
  }

  useEffect(() => {
    getDataUpdateProfile();
  }, []);

  const handleChange = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set(
        "image",
        updateProfile.image[0],
        updateProfile.image[0].name,
      );
      formData.set("name", updateProfile.fullname);
      formData.set("email", updateProfile.email);
      formData.set("password", updateProfile.password);
      formData.set("phone", updateProfile.phone);
      formData.set("address", updateProfile.address);

      // await disini berfungsi untuk menunggu sampai promise tersebut selesai dan mengembalikkan hasilnya
      const response = await API.patch("user", formData, config);
      console.log(response.data, "cekkkk");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update user Success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/Profile");
    } catch (error) {
      console.log(error);
    }
    onHide();
  });

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="px-5 pb-3">
          <p className="fs-3 fw-bold text-center " style={{ paddingTop: 50 }}>
            Update Profile
          </p>
          <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Full Name</Form.Label>
              <Form.Control
                className=""
                name="fullname"
                value={updateProfile.fullname}
                type="text"
                onChange={handleChange}
              />
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                onChange={handleChange}
                name="email"
                value={updateProfile.email}
                type="email"
              />
              <Form.Label className="fw-bold">Password</Form.Label>

              <Form.Control
                type="password"
                onChange={handleChange}
                name="password"
                value={updateProfile.password}
              />
              <Form.Label className="fw-bold">Phone</Form.Label>
              <Form.Control
                className="p-2 mb-3"
                onChange={handleChange}
                name="phone"
                value={updateProfile.phone}
                type="number"
              />
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                className=" mb-3"
                as="textarea"
                onChange={handleChange}
                name="address"
                value={updateProfile.address}
                style={{
                  height: "100px",
                  resize: "none",
                }}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="fw-bold">Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Button
              type="submit"
              className="fw-bold border-0 w-100 py-2 my-3"
              style={{ backgroundColor: "#FFAF00" }}
            >
              Update Profile
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalProfile;
