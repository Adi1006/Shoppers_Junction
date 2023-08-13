import React, { useEffect, useState,useRef } from "react";
import styles from "../../styles/contact/contact.module.css";
import { MdPhone } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa";

import Footer from "../../common/Footer/Footer";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const linkRef = useRef(null);

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  useEffect(() => {}, []);

  const handlePhoneClick = () => {
    const phoneNumber = "+919611088593";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    const email = "aditya.kr.8593@gmail.com";
    window.location.href = `mailto:${email}`;
  };

  const handleSendClick = () => {
    // Logic to send the message

    // Clear the fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.contact_title}>Feel Free To Contact Us</div>
        <div className={styles.contact_me}>
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div
                className={`col-md-3 ${styles.contact_me_div}`}
                onClick={handlePhoneClick}
              >
                <MdPhone className={styles.contact_icons} /> +91 9102466168
              </div>
              <div
                className={`col-md-3 mx-5 ${styles.contact_me_div}`}
                onClick={handleEmailClick}
              >
                <GrMail className={styles.contact_icons} />{" "}
                adityag1006@gmail.com
              </div>
              <div
      className={`col-md-3 ${styles.contact_me_div}`}
      onClick={handleClick}
    >
      <a
        href="https://anime-website-liart.vercel.app/"
        target="_blank"
        className={`${styles.contact_website} ${styles.full_width}`}
        rel="noreferrer"
        ref={linkRef}
      >
        <FaGlobe className={styles.contact_icons} />
        https://anime-website-liart.vercel.app/
      </a>
    </div>
            </div>
          </div>
        </div>
        <div className={styles.map_box}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115133.0163412045!2d85.06064140901707!3d25.608014355326677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d4f05%3A0x831a0e05f607b270!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1691779319052!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            className={styles.map_div}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className={styles.form_box}>
          <div className={styles.form_div}>
            <input
              type="text"
              placeholder="Enter Name"
              className={styles.input_box}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email Address"
              className={styles.input_box}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className={styles.input_box}
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className={styles.send_btn} onClick={handleSendClick}>
              Send
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
