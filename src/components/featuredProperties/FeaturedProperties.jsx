import "./featuredProperties.css";

const FeaturedProperties = ({ topFeatures }) => {
  return (
    <div className="fp">
      {topFeatures &&
        topFeatures.length > 0 &&
        topFeatures.map((item, index) => {
          return (
            <div className="fpItem" key={index}>
              <img
                src={
                  item.photos[Math.trunc(Math.random() * item.photos.length)]
                }
                alt=""
                className="fpImg"
              />
              <span className="fpName">
                <a href="./hotels/0" target="_blank">
                  {item.name}
                </a>
              </span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>{item.rating > 9 ? "Excellent" : "Good"}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FeaturedProperties;
