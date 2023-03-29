import { useEffect, useState } from "react";
import { Feature } from "../../constants";
import "./featured.css";

const Featured = ({ dataHotels }) => {
  const [featureData, setFeatureData] = useState(Feature);
  useEffect(() => {
    const cityArr = dataHotels.map((i) => i.city);

    setFeatureData((pre) => {
      return pre.map((item) => {
        const properties = cityArr.filter(
          (name) => item.name.toLowerCase().split(" ").join("") === name
        ).length;
        return {
          ...item,
          properties,
        };
      });
    });
  }, [dataHotels]);

  return (
    <div className="featured">
      {featureData.map((item, index) => {
        return (
          <div className="featuredItem" key={index}>
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
