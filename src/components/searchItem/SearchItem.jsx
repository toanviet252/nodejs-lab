import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ name, distance, tag, type, description, free_cancel, price, rate, rate_text, img_url, id }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/hotels/${id}`);
  return (
    <div className="searchItem" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={img_url[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance}km from center</span>
        <span className="siTaxiOp">{tag}</span>
        <span className="siSubtitle">{description}</span>
        <span className="siFeatures">{type}</span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rate_text}</span>
          <button>{rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;