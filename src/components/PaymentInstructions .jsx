import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentInstructions.css";
import gpayIcon from "../assets/gpay.png";
import phonepeIcon from "../assets/phonepe.png";
import paytmIcon from "../assets/paytm.webp";
import { QRCode } from "react-qrcode-logo";

const PaymentInstructions = () => {
  const location = useLocation();
  const passedCategory = location.state?.category;

  const categoryFees = {
    "Battle of Bands": {
      registration: 5999,
      lateFee: 1000,
    },
    "Battle of Rappers": {
      registration: 1699,
      lateFee: 500,
    },
    "Battle of Singer-Songwriters": {
      registration: 2499,
      lateFee: 500,
    },
    "Battle of Musicians": {
      registration: 1699,
      lateFee: 500,
    },
  };

  const [category] = useState(
    passedCategory && categoryFees[passedCategory]
      ? passedCategory
      : "Battle of Singer-Songwriters"
  );

  const [showQR, setShowQR] = useState(false);

  const { registration, lateFee } = categoryFees[category];
  const upiID = "7811092672-1@okbizaxis";

  const cleanNote =
    category.replace(/[^a-zA-Z0-9 ]/g, "") + " Registration";

  const upiLink = `upi://pay?pa=${upiID}&pn=theOne11show&am=${registration}&cu=INR&tn=${encodeURIComponent(
    cleanNote
  )}`;

  const copyUPI = () => {
    navigator.clipboard.writeText(upiID);
    alert("UPI ID copied to clipboard!");
  };

  const handleUPIClick = () => {
    if (window.innerWidth > 768) {
      setShowQR(true);
    } else {
      window.location.href = upiLink;
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">THE ONE11 SHOW – NEXT ROUND REGISTRATION INSTRUCTIONS</h2>

      <div className="payment-section">
        <h3 className="section-heading green">
          CONGRATULATIONS! YOU’RE SELECTED FOR THE NEXT ROUND!
        </h3>
        <p>To confirm your entry, follow the steps below:</p>
      </div>

      <div className="payment-section">
        <h3 className="section-heading blue">STEP 1: PAY YOUR REGISTRATION FEE</h3>
        <ul>
          <li><strong>Selected Category:</strong> {category}</li>
          <li><strong>Amount:</strong> ₹{registration.toLocaleString()}</li>
          <li>
            <strong>UPI ID:</strong>{" "}
            <code onClick={copyUPI} className="upi-code">{upiID}</code>{" "}
            <button className="copy-button" onClick={copyUPI}>Copy</button>
          </li>
        </ul>

        <div className="upi-buttons">
          <h4>Pay Using:</h4>
          <div className="upi-apps">
            {[gpayIcon, phonepeIcon, paytmIcon].map((icon, index) => (
              <button className="upi-button" onClick={handleUPIClick} key={index}>
                <img src={icon} alt="UPI App" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="payment-section">
        <h3 className="section-heading blue">STEP 2: SEND US THE CONFIRMATION VIA WHATSAPP</h3>
        <pre className="payment-format">
<strong>Full Name:</strong> [Your Name]{"\n"}
<strong>Stage Name:</strong> [Your Stage Name]{"\n"}
<strong>Mobile Number:</strong> [Your Mobile]{"\n"}
<strong>Category:</strong> {category}{"\n"}
<strong>Transaction ID:</strong> [Your UPI/Transaction ID]{"\n"}
<strong>Screenshot:</strong> [Send Your Payment Screenshot]
        </pre>
        <p>
          <strong>WhatsApp:</strong>{" "}
          <a href="https://wa.me/917277785294" target="_blank" rel="noopener noreferrer">
            +91-7477785294
          </a>
        </p>
      </div>

      <div className="payment-section">
        <h3 className="section-heading red">⚠ IMPORTANT NOTES:</h3>
        <ul>
          <li>Payments are <strong>non-refundable</strong>.</li>
          <li>Wrong or missing details will <strong>not be accepted</strong>.</li>
          <li>Confirmation is <strong>only after manual verification</strong>. Kindly be patient.</li>
          <li>You will receive a payment confirmation shortly after completing the payment.</li>
          <li>The last date to register will be 20 June</li>
          <li>Late submission of your fees will incur fine i.e,. Rs {lateFee}</li>
        </ul>
      </div>

      <div className="payment-section">
        <h3 className="section-heading purple">NEED HELP?</h3>
        <p>
          Call / WhatsApp: +91-7477785294<br />
          Email: <a href="mailto:one11show@gmail.com">team@theone11.show</a><br />
          Instagram: @theone11.show
        </p>
      </div>

      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <h3>Scan to Pay</h3>
            <QRCode value={upiLink} size={180} />
            <p>{upiID}</p>
            <button className="copy-button" onClick={copyUPI}>Copy UPI ID</button>
            <button className="close-button" onClick={() => setShowQR(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInstructions;
