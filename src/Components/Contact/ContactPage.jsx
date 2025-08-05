import React, { useState } from "react";
import { translations } from "../../translations/Mongolian";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${name} таныг бидэнд холбогдохтой баярлалаа. Бид танд хамгийн сүүлд хариулах болно.\n\nТаны И-мэйл: ${email}.\nТаны үгс: ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>{translations.contactUs}</h2>
        <div className="contactMap">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d940.184357826445!2d106.88312678043765!3d47.91119037397526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693f9c13f404d%3A0x853c8dfc8c0cad06!2sKACC.MN%20Kassiin%20mashinii%20hudaldaa!5e1!3m2!1sen!2smn!4v1751004878641!5m2!1sen!2smn"
    width="800"
    height="600"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="kaccmap"
  ></iframe>
</div>

        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>London дэх дүк</h3>
              <p>
                1418 River Drive, Suite 35 Cottonhall, CA 9622
                <br /> United Kingdom
              </p>
              <p>
                admin@dummymail.com
                <br />
                +44 20 7123 4567
              </p>
            </div>
            <div className="address">
              <h3>Store in India</h3>
              <p>
                A-791, A-791, Bandra Reclamation Rd, Mumbai
                <br /> Maharashtra
              </p>
              <p>
                contact@dummymail.com
                <br />
                +44 20 7123 4567
              </p>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default ContactPage;
