import { useEffect, useState } from "react";
import { getAllHotels } from "../../apis/api";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  const [dataHotels, setDataHotels] = useState([]);
  const fetchData = async () => {
    const res = await getAllHotels();
    setDataHotels(res.data.hotels);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured dataHotels={dataHotels} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList types={dataHotels.map((i) => i?.type)} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties topFeatures={dataHotels.slice(0, 3)} />
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default Home;
