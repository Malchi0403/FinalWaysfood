import CardWaitApprove from "../Components/CardWaitApprove";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const WaitingApprove = () => {
  return (
    <>
      <Navbar />
      <CardWaitApprove />
      <div style={{ position: "relative", top: "-1750px" }}>
        <Footer />
      </div>
    </>
  );
};
export default WaitingApprove;
