import { useEffect, useState } from "react";
import styles from "../css/Pages/Modify.module.css";
import { Typography } from "@mui/material";
import HoverDropdown from "../components/HoverDropdown";

export default function Modify({ type, user_id }) {
    const industries = [
        "Technology",
        "Healthcare",
        "Finance and Banking",
        "Retail and E-commerce",
        "Manufacturing",
        "Education",
        "Hospitality and Tourism",
        "Construction and Engineering",
        "Marketing and Advertising",
        "Transportation and Logistics",
        "Energy and Utilities",
        "Telecommunications",
        "Media and Entertainment",
        "Consulting and Professional Services",
        "Insurance",
        "Real Estate",
        "Government and Public Sector",
        "Nonprofit and Philanthropy",
        "Automotive",
        "Aerospace and Defense",
        "Agriculture and Farming",
        "Pharmaceuticals and Biotech",
        "Legal Services",
        "Fashion and Apparel",
        "Food and Beverage",
        "Other"
    ];

    const headcounts = [
        "1 - 10",
        "11 - 20",
        "21 - 50",
        "51 - 150",
        "151 - 300",
        "300+"
    ]

    const [message, setMessage] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedHeadcount, setSelectedHeadcount] = useState(null)

    useEffect(() => {
        if (!type || type === "") {
            setMessage("Something went wrong")
        } else if (type === "company") {
            setMessage("Tell us about your company!")
        } else {
            setMessage("Tell us a little more about yourself!")
        }
    }, [type])

    function handleIndustrySelect(industry) {
        if (selectedIndustry === industry) {
            setSelectedIndustry(null)
        } else {
            setSelectedIndustry(industry)
        }
    }

    function handleIndustryChange(value) {
        setSelectedIndustry(value)
    }

    function handleHeadcountSelect(headcount) {
        if (headcount === selectedHeadcount) {
            setSelectedHeadcount(null);
        } else {
            setSelectedHeadcount(headcount)
        }
    }

    return (
        <div className={styles.Modify}>
            <Typography variant="h6">
                {
                    message
                }
            </Typography>
            {
                type === "talent" ? (
                    <div className={styles.Information}>
                        <div className={styles.BrandSection}>
                            <div className={styles.BrandLogo}></div>
                            <div className={styles.BrandColors}></div>
                        </div>
                        <div className={styles.InputGroup}>
                            <label className={styles.InputLabel}>Company Name</label>
                            <input className={styles.InputField} type="text" />
                        </div>
                        <div className={styles.InputGroup}>
                            <label className={styles.InputLabel}>Describe Your Company</label>
                            <input className={styles.InputField} type="text" />
                        </div>
                        <div className={styles.InputRow}>
                        <div style={{width: "fit-content"}} className={styles.InputGroup}>
                            <label className={styles.InputLabel}>Select Your Industry</label>
                            <HoverDropdown
                                customButtonStyles={{minWidth: "200px", justifyContent: "space-between"}}
                                customStyles={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    fontSize: "20px",
                                  }}
                                  buttonContent={
                                    <Typography variant="body2">
                                      {selectedIndustry ? selectedIndustry : "Industry"}
                                    </Typography>
                                  }
                                  dropdownContent={
                                    <>
                                      {industries.map((industry, index) => {
                                        return (
                                          <div
                                            key={`timeline_${index}`}
                                            onClick={() => handleIndustrySelect(industry)}
                                            className={`${styles.HoverDropdownContentChildren} ${
                                              selectedIndustry === industry
                                                ? styles.Selected
                                                : ""
                                            }`}
                                          >
                                            <Typography variant="body2">
                                              {industry}
                                            </Typography>
                                          </div>
                                        );
                                      })}
                                    </>
                                  }
                            />
                            {
                                selectedIndustry === "other" ? (
                                    <input onChange={(e) => handleIndustryChange(e.target.value)} type="text" className={styles.InputField}/>
                                ) : null
                            }
                        </div>
                        <div style={{width: "fit-content"}} className={styles.InputGroup}>
                            <label className={styles.InputLabel}>Company Headcount</label>
                            <HoverDropdown
                                customButtonStyles={{minWidth: "200px", justifyContent: "space-between"}}
                                customStyles={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    fontSize: "20px",
                                  }}
                                  buttonContent={
                                    <Typography variant="body2">
                                      {selectedHeadcount ? selectedHeadcount : "Select Headcount"}
                                    </Typography>
                                  }
                                  dropdownContent={
                                    <>
                                      {headcounts.map((headcount, index) => {
                                        return (
                                          <div
                                            key={`timeline_${index}`}
                                            onClick={() => handleHeadcountSelect(headcount)}
                                            className={`${styles.HoverDropdownContentChildren} ${
                                              selectedHeadcount === headcount
                                                ? styles.Selected
                                                : ""
                                            }`}
                                          >
                                            <Typography variant="body2">
                                              {headcount}
                                            </Typography>
                                          </div>
                                        );
                                      })}
                                    </>
                                  }
                            />
                            {
                                selectedIndustry === "other" ? (
                                    <input onChange={(e) => handleIndustryChange(e.target.value)} type="text" className={styles.InputField}/>
                                ) : null
                            }
                        </div>
                        </div>
                    </div>
                ) : type === "company" ? (
                    <div className={styles.Information}></div>
                ) : null
            }
        </div>
    )
}