import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
// import required modules
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Button } from "@mui/material";
import { courses } from "../../../../data/courses";
import BasicModal from "./BasicModal";

const Carousel=()=> {
  const [open,setOpen] = useState(false)
  const [detail,setDetail] = useState(null)
  return (
    <>
      <Swiper
      breakpoints={{
        // when window width is >= 640px
        300: {
          
          slidesPerView: 1,
        },
        // when window width is >= 768px
        580: {
          slidesPerView: 2,
        },
        970: {
          slidesPerView: 3,
        },
      }}
        spaceBetween={0}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {courses?.map((el) => {
          return (
            <SwiperSlide className="courses-container">
              <img src={el.image} alt="" />
              <div className="courses-content-wrapper">
                <div className="courses-heading">{el.name}</div>
                <div className="courses-tagline">{el.tagline}</div>
                <div className="courses-heading">(Rs {el.fee})</div>
                <Button
                  className="courses-button"
                  sx={{
                    backgroundColor: "#e8ac17",
                    marginTop: "5px",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#aabae5", color: "black" },
                  }}
                  onClick={()=>{
                    setDetail(el.detail)
                    setOpen(true)
                  }}
                >
                  Know More
                </Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <BasicModal open={open} setOpen={setOpen} detail={detail} />
    </>
  );
}

export default Carousel
