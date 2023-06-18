import { useState } from "react";
import Contents from "../Components/Card";
import Jumbotron from "../Components/Jumbotron";
import Recommended from "../Components/Recommended";
import { useCustomQuery } from "../config/query";
import { Partner } from "../utils/profile";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  let { data, isLoading } = useCustomQuery("partner", Partner)


  return (
    <>

      <Jumbotron />
      <Contents data={data} load={isLoading} />
      <Recommended data={data} load={isLoading} />


    </>
  );
};

export default Home;
