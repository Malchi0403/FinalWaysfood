import CardWaitPayment from "../Components/CardWaitPayment";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Admin = () => {
  return (
    <>
      <Navbar />
      <CardWaitPayment />
      <div style={{ position: "relative", top: "-1750px" }}>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
