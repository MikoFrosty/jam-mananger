import React, { useEffect, useRef } from 'react';

const LandingPage = () => {
  const invoicingRef = useRef(null);
  const clientManagementRef = useRef(null);
  const timeTrackingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 100) {
        // Load in content on scroll
        // Add your scroll loading logic here
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#f8f8f8', height: '60px' }}>
        <img src="header_logo.png" alt="Kamari Logo" style={{ height: '40px' }} />
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginRight: '20px' }}>
              <a href="/signup" style={{ textDecoration: 'none', color: '#333', fontSize: '16px', fontWeight: 'bold' }}>Sign Up</a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/pricing" style={{ textDecoration: 'none', color: '#333', fontSize: '16px', fontWeight: 'bold' }}>Pricing</a>
            </li>
            <li style={{ position: 'relative' }}>
              <span style={{ cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                Features <span style={{ marginLeft: '5px' }}>&#9662;</span>
              </span>
              <ul style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', display: 'none' }}>
                <li>
                  <a href="#invoicing" onClick={() => scrollToSection(invoicingRef)} style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>Invoicing</a>
                </li>
                <li>
                  <a href="#client-management" onClick={() => scrollToSection(clientManagementRef)} style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>Client Management</a>
                </li>
                <li>
                  <a href="#time-tracking" onClick={() => scrollToSection(timeTrackingRef)} style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>Time Tracking</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 20px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '48px', color: '#333', marginBottom: '20px' }}>Streamline Your Freelance Business with Kamari</h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
          Kamari teams is a time tracking, task management, and invoicing tool designed for freelancers. Invite clients, track time, send invoices, and manage your projects effortlessly.
        </p>
        <img src="hero_image.png" alt="Kamari Hero" style={{ maxWidth: '100%', marginBottom: '40px' }} />
        <a href="/signup" style={{ backgroundColor: '#9013FE', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>Get Started for Free</a>
      </section>

      <section ref={invoicingRef} style={{ padding: '80px 20px', backgroundColor: '#f8f8f8', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <img src="feature_invoicing.png" alt="Invoicing" style={{ width: '50%', marginRight: '40px' }} />
          <div>
            <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>Effortless Invoicing</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Create and send professional invoices to your clients with just a few clicks. Kamari teams integrates with Stripe to handle payments securely, with no platform fees.
            </p>
          </div>
        </div>
      </section>

      <section ref={clientManagementRef} style={{ padding: '80px 20px', textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>Seamless Client Management</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Invite clients to collaborate on projects, assign tasks, and keep everyone on the same page. Kamari teams simplifies client communication and project management.
            </p>
          </div>
          <img src="feature_client_management.png" alt="Client Management" style={{ width: '50%', marginLeft: '40px' }} />
        </div>
      </section>

      <section ref={timeTrackingRef} style={{ padding: '80px 20px', backgroundColor: '#f8f8f8', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <img src="feature_time_tracking.png" alt="Time Tracking" style={{ width: '50%', marginRight: '40px' }} />
          <div>
            <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>Accurate Time Tracking</h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Track time spent on tasks and projects accurately. Generate detailed reports to analyze your productivity and bill clients precisely for the work done.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '40px 20px', textAlign: 'center' }}>
        <img src="footer_logo.png" alt="Kamari Logo" style={{ height: '40px', marginBottom: '20px' }} />
        <p style={{ fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} Kamari. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;


// import React, { useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import Typography from "@mui/material/Typography";

// import styles from "../css/LandingPage.module.css";
// import LandingAppBar from "../features/AppBar/LandingAppBar";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// import taskTablePhoto from "../../public/TaskTable.png";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://kamariteams.com">
//         Kamari
//       </Link>
//       {`${new Date().getFullYear()}.`}
//     </Typography>
//   );
// }

// function Landing() {
//   const firstElementRef = useRef(null);
//   const secondElementRef = useRef(null);
//   const thirdElementRef = useRef(null);

//   const scrollToElement = (element) => {
//     if (secondElementRef.current) {
//       const this_element = element;
//       this_element.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start", // Adjust this as per your requirements
//       });
//     }
//   };

//   return (
//     <div className={styles.LandingPage}>
//       <LandingAppBar />
//       <div className={styles.Main}>
//         <div ref={firstElementRef} className={styles.ContentRowTop}>
//           <div className={styles.ContentColumn}>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h1">
//               Built for Freelancers
//             </Typography>
//             <Typography variant="h5">
//               Kamari started as a simple tool to manage quick development of
//               product. It quickly grew into so much more and still has so much
//               further to go before we feel like our mission is complete.
//             </Typography>
//             <img className={styles.ColumnImage} src={taskTablePhoto} alt="" />
//           </div>
//           <div className={styles.ContentColumnReversed}>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h4">
//               Create an Account
//             </Typography>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h4">
//               Invite Clients
//             </Typography>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h4">
//               Complete Tasks
//             </Typography>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h4">
//               Invoice Clients
//             </Typography>
//             <div onClick={() => scrollToElement(secondElementRef)} className={styles.TextWithIcon}>
//               <Typography variant="h6">And way more</Typography>
//               <KeyboardArrowDownIcon />
//             </div>
//           </div>
//         </div>
//         <div ref={secondElementRef} id="two" className={styles.ContentRowTop}>
//           <div className={styles.FullWidthContentColumn}>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h3">
//               Manage. Perform. Invoice.
//             </Typography>
//             <Typography
//               sx={{ maxWidth: "60%", width: "fit-content" }}
//               variant="body1"
//             >
//               Easily manage internal or client given tasks
//             </Typography>
//             <img className={styles.ColumnImageSmall} src={taskTablePhoto} alt="" />
//             <div onClick={() => scrollToElement(thirdElementRef)} className={styles.TextWithIcon}>
//               <Typography variant="h6">And way more</Typography>
//               <KeyboardArrowDownIcon />
//             </div>
//           </div>
//         </div>
//         <div ref={thirdElementRef} id="two" className={styles.ContentRowTop}>
//           <div className={styles.FullWidthContentColumn}>
//             <Typography color={"rgba(201, 57, 240, 0.765)"} variant="h3">
//               Manage. Perform. Invoice.
//             </Typography>
//             <Typography
//               sx={{ maxWidth: "60%", width: "fit-content" }}
//               variant="body1"
//             >
//               Easily manage internal or client given tasks
//             </Typography>
//             <div className={styles.ContentRow}>
//                 <img className={styles.RowImage} src={taskTablePhoto} alt="" />
//                 <img className={styles.RowImage} src={taskTablePhoto} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Landing;
