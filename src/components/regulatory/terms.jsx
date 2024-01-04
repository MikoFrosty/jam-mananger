import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  // Function to handle back navigation
  const goBack = () => {
    navigate(-1); // Navigates back in the history stack
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={goBack}
        style={{ marginBottom: "20px", cursor: "pointer" }}
      >
        Go Back
      </button>
      <h1 style={{ textAlign: "center" }}>Terms and Conditions</h1>
      <p>
        Welcome to Our Website! These terms and conditions outline the rules and
        regulations for the use of Our Company's Website.
      </p>
      <p>
        1. Acceptance of Terms: By accessing and using this website, you agree
        to be bound by these terms and conditions. If you do not agree with any
        part of these terms, you must not use this website.
      </p>
      <p>
        2. Changes to Terms: The website owner reserves the right to change,
        modify, add or remove portions of these terms at any time. It is your
        responsibility to check these terms periodically for changes.
      </p>
      <p>
        3. Privacy Policy: Your use of this website is also governed by our
        Privacy Policy, which is incorporated into these terms by reference.
      </p>
      <p>
        4. Access and Use of the Service: You are responsible for both ensuring
        that all persons who access the website through your internet connection
        are aware of these terms and that they comply with them.
      </p>
      <p>
        5. Restrictions on Use: You may use this website only for lawful
        purposes and in accordance with these terms. You must not use the
        website in any way that breaches any applicable local, national, or
        international law or regulation.
      </p>
      <p>
        6. Intellectual Property Rights: The content on this website, including
        text, graphics, images, and software, is the property of the website
        owner and is protected by copyright and other intellectual property
        laws.
      </p>
      <p>
        7. User Contributions: The website may contain message boards, chat
        rooms, personal web pages or profiles, forums, and other interactive
        features that allow users to post, submit, publish, display, or transmit
        content or materials to the website.
      </p>
      <p>
        8. Links to Third-Party Websites: This website may contain links to
        other websites which are not operated by us. We have no control over and
        assume no responsibility for the content, privacy policies, or practices
        of any third-party websites.
      </p>
    </div>
  );
};

export default TermsAndConditions;
