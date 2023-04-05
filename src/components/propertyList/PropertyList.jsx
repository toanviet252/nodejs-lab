import { useEffect, useState } from "react";
import { PropertyTypes } from "../../constants";
import "./propertyList.css";

const PropertyList = ({ types }) => {
  const [dataProps, setDataProps] = useState(PropertyTypes);
  useEffect(() => {
    setDataProps((pre) => {
      return pre.map((item) => {
        const count = types.filter((type) => item.key === type).length;
        return {
          ...item,
          count,
        };
      });
    });
  }, [types]);
  return (
    <div className="pList">
      {dataProps.map((item, index) => {
        return (
          <div className="pListItem" key={index}>
            <img src={item.imgUrl} alt="" className="pListImg" />
            <div className="pListTitles">
              <h1>{item.name}</h1>
              <h2>
                {item.count} {item.key + "s"}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyList;
