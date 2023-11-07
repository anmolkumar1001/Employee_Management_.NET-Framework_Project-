import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-info">
        <p>
          If you have any questions or inquiries, please feel free to contact
          us:
        </p>
        <ul className="contact-list">
          <li>
            <strong>Email:</strong> somecompany@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> 7549-076-943
          </li>
          <li>
            <strong>Address:</strong> RR Nagar, Bangalore, India
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.example.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
