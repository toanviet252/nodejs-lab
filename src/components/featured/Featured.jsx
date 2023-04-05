import { useEffect, useState } from "react";
import { Feature, initalOptions, initialDate } from "../../constants";
import "./featured.css";
import { useNavigate } from "react-router-dom";

const Featured = ({ dataHotels }) => {
  const [featureData, setFeatureData] = useState(Feature);
  const navigate = useNavigate();
  useEffect(() => {
    const cityArr = dataHotels.map((i) => i.city);
    setFeatureData((pre) => {
      return pre.map((item) => {
        const properties = cityArr.filter(
          (name) => item.name.toLowerCase().split(" ").join("") === name.toLowerCase().split(" ").join("")
        ).length;
        return {
          ...item,
          properties,
        };
      });
    });
  }, [dataHotels]);
  const handleSelect = (location) => {
    return navigate("/hotels", { state: { destination: location, date: initialDate, options: initalOptions } });
  };
  return (
    <div className="featured">
      {featureData.map((item, index) => {
        return (
          <div className="featuredItem" key={index} onClick={() => handleSelect(item.name)}>
            <img src={item.imgUrl} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>{item.name}</h1>
              <h2>{item.properties} properties</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Featured;
