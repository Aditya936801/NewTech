import React from "react";

import { Button } from "@mui/material";
import "./homePage.css";
import Carousel from "./miniComponent/carousel";
import { Link } from "@mui/material";
import Tables from "./miniComponent/Tables";
import Wrapper from "../../components/Wrapper";
const HomePage = () => {
  return (
    <Wrapper>
      <div className="home-background">
      <div className="home-blur">
      <div className="home-page-content">
      <div>Leading and Best Computer Training Institutes</div>
      <Link href="#courses-offered">
      <Button variant="contained" className="home-page-content-button">
      Courses Offered
      </Button>
      </Link>
      </div>
      </div>
      </div>
      <div id="courses-offered" className="home-courses">
        <div className="home-course-heading">COURSES OFFERED</div>
        <Carousel />
        <div className="home-short-course-heading">Short Courses</div>
        <Tables />
      </div>
    </Wrapper>
  );
};

export default HomePage;
