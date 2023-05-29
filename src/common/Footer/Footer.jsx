import React from "react";
import styles from "../../styles/footer/footer.module.css";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.first_div}>
        <div className={styles.first_div_box}>
          <p>Ready to get Started? Talk to us</p>
          {/* <button className={styles.btn_common}>Get Started</button> */}
          <Link to="/contact" className={styles.btn_common}>
            Get Started
          </Link>
        </div>
      </div>
      <div className={styles.second_div}>
        <div className={styles.second_box}>
          <div className={styles.follow_box}>
            <div className={styles.follow_us_div}>Follow Us</div>
            <div className={styles.social_media_wrapper}>
              <a
                target="_blank"
                className={styles.social_media_link}
                href="https://www.facebook.com/"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                target="_blank"
                className={styles.social_media_link}
                href="https://www.instagram.com/aditya_86886/"
                rel="noreferrer"
              >
                <AiFillInstagram />
              </a>
              <a
                target="_blank"
                className={styles.social_media_link}
                href="https://www.linkedin.com/in/aditya-kumar-6ba878214/"
                rel="noreferrer"
              >
                <AiFillLinkedin />
              </a>
            </div>
          </div>
          <div className={styles.subscribe_box}>
            <p className={styles.subscribe_title}>
              Subscribe to get important updates
            </p>
            <form onSubmit="submitForm(event)">
              <input
                type="email"
                placeholder="Enter Email"
                className={styles.email_box}
              />
              <button type="submit" className={styles.btn_common}>Subscribe</button>
            </form>
          </div>
          <div className={styles.call_div}>
            <p>Call us</p>
            <p>+91 9611088593</p>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.footer_title}> ⓒ 2023 All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
