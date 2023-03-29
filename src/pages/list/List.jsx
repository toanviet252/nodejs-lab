import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { searchHotels } from "../../apis/api";
import LoadingFallback from "../../components/Suspsen/SuspsenFallback";

const List = () => {
  const location = useLocation();
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const handleSearchHotels = async () => {
    setLoading(true);
    try {
      const res = await searchHotels({ destination, date, options });
      setHotelsData(res.data.hotels);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearchHotels();
  }, []);

  const onChangeOptions = (e, key) => {
    setOptions((pre) => {
      return {
        ...pre,
        [key]: +e.target.value,
      };
    });
  };
  console.log(options);
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange onChange={(item) => setDate([item.selection])} minDate={new Date()} ranges={date} />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                    onChange={(e) => onChangeOptions(e, "adult")}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                    onChange={(e) => onChangeOptions(e, "children")}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                    onChange={(e) => onChangeOptions(e, "room")}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearchHotels}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <LoadingFallback />
            ) : (
              <>
                {hotelsData.length > 0 ? (
                  hotelsData.map((item) => (
                    <SearchItem
                      name={item.name}
                      distance={item.distance}
                      tag={null}
                      type={item.type}
                      description={item.desc}
                      free_cancel={item.featured}
                      price={item.cheapestPrice}
                      rate={item.rating}
                      img_url={item.photos}
                      rate_text={item.rating > 9 ? "Excellent" : "Good"}
                      key={item._id}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "2rem", fontWeight: "200" }}>Not found any Hotel!</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
