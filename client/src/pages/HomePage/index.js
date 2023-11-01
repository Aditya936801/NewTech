import React, { useRef } from "react";

import { Button } from "@mui/material";
import "./homePage.css";
import Carousel from "./miniComponent/carousel";
import Tables from "./miniComponent/Tables";
import Wrapper from "../../components/Wrapper";

const HomePage = () => {
  const coursesRef = useRef();
  const handleScroll = () => {
    window.scrollTo({top:findPosition(coursesRef.current),behavior:"smooth"});
  };
  function findPosition(obj) {
    let currenttop = 0;
    if (obj.offsetParent) {
      do {
        console.log(currenttop)
        currenttop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
    currenttop=currenttop-70
      return [currenttop];
    }
  }
  return (
    <Wrapper>
      <div className="home-background" >
        <div className="home-blur">
          <div className="home-page-content">
            <div>Leading and Best Computer Training Institutes</div>

            <Button
              variant="contained"
              onClick={handleScroll}
              className="home-page-content-button"
            >
              Courses Offered
            </Button>
          </div>
        </div>
      </div>
      <div ref={coursesRef} className="home-courses" >
        <div className="home-course-heading">COURSES OFFERED</div>
        <Carousel />
        <div className="home-short-course-heading">Short Courses</div>
        <Tables />
      </div>
    </Wrapper>
  );
};

export default HomePage;
