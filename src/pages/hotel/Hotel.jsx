import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelData } from "../../apis/api";
import LoadingFallback from "../../components/Suspsen/SuspsenFallback";
import Booking from "../../components/booking/booking";

const Hotel = () => {
  const { hotelId } = useParams();
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState(undefined);
  const [photos, setPhotos] = useState([]);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const fetchHotelData = async () => {
    setLoading(true);
    try {
      if (!hotelId) return;
      const res = await getHotelData(hotelId);
      setHotelData(res.data.hotel);
      setPhotos(res.data.hotel.photos);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHotelData();
  }, []);

  const [openBooking, setOpenBooking] = useState(false);
  const refBooking = useRef(null);

  const handleOpenBooking = () => {
    setOpenBooking(true);
    setTimeout(() => {
      if (refBooking.current) {
        refBooking.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <LoadingFallback />
      ) : (
        <>
          {hotelData && (
            <div className="hotelContainer">
              {open && (
                <div className="slider">
                  <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                  <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                  <div className="sliderWrapper">
                    <img src={photos[slideNumber]} alt="" className="sliderImg" />
                  </div>
                  <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                </div>
              )}
              <div className="hotelWrapper">
                <button className="bookNow" onClick={handleOpenBooking}>
                  Reserve or Book Now!
                </button>
                <h1 className="hotelTitle">{hotelData.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{hotelData.address}</span>
                </div>
                <span className="hotelDistance">Excellent location – {hotelData.distance}m from center</span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${hotelData.cheapestPrice} at this property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {photos.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">
                      Stay in the heart of {hotelData.city.charAt(0).toUpperCase() + hotelData.city.slice(1)}
                    </h1>
                    <p className="hotelDesc">{hotelData.desc}</p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a 9-night stay!</h1>
                    <span>
                      Located in the real heart of {hotelData.city}, this property has an excellent location score of{" "}
                      {hotelData.rating}!
                    </span>
                    <h2>
                      <b>${hotelData.cheapestPrice * 9}</b> (9 nights)
                    </h2>
                    <button onClick={handleOpenBooking}>Reserve or Book Now!</button>
                  </div>
                </div>
                {openBooking && (
                  <div className="booking-wrapper" ref={refBooking}>
                    <Booking hotelData={hotelData} />
                  </div>
                )}
              </div>
              <MailList />
              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Hotel;
