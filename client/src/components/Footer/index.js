import React from "react";
import "./index.css";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Basicfooter = () => {
  return (
    <div className="footer-container">
      <div className="footer-contact-container">
        <div className="footer-contact">
          <div className="footer-contact-heading">Contact</div>
          <div className="footer-contact-text">
            <PlaceIcon fontSize="small" sx={{ mr: "4px" }} />
            <div>Sanjay Market,First Floor Main Chauraha Khatima,U.S Nagar Uttarakhand 262308</div>
          </div>
          <div className="footer-contact-text">
            <CallIcon fontSize="small" sx={{ mr: "4px" }} />
            <div>+91 9411301453</div>
          </div>
          <div className="footer-contact-text">
            <CallIcon fontSize="small" sx={{ mr: "4px" }} />
            <div>+91 8077415796</div>
          </div>
          <div className="footer-contact-text">
            <EmailIcon fontSize="small" sx={{ mr: "4px" }} />
            <div>newtechkhatima@gmail.com</div>
          </div>
          
        </div>
        <div className="footer-contact-links">
            <FacebookIcon fontSize="large" sx={{ cursor: "pointer" ,mr: "4px"  }} />
            <InstagramIcon fontSize="large" sx={{ cursor: "pointer",ml:"4px" }} />
          </div>
      </div>
      <div className="footer-maps">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.2767451109034!2d79.96696837563377!3d28.91983307550915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a051b994dc19b5%3A0x208f2c075ddc0830!2sNewtech%20Computer!5e0!3m2!1sen!2sin!4v1689426299865!5m2!1sen!2sin"
          width="100%"
          height="300"
          loading="lazy"
          allowfullscreen=""
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Basicfooter;
