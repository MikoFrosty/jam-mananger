import React, { useState, useEffect } from "react";
import styles from "../../css/Client/ApplicationTable.module.css";

import Typography from "@mui/material/Typography";
import TableSearch from "../../components/searchbar/TableSearch";
import Checkbox from "@mui/material/Checkbox";

const ApplicationTable = ({
  type = "user",
  searchDisabled = false,
  presetSearchTerm = "",
  applications,
}) => {
  return (
    <div className={styles.ApplicationsTable}>
      <div className={styles.ApplicationsTableFilters}></div>
      <div className={styles.Applications}>
        {
          applications.map((application) => {
            return (
              <div key={application.application_id} className={styles.Application}>
                <Typography variant="h6">
                  {
                    application.applicant_email
                  }
                </Typography>
              </div>
            )
          })
        }
      </div>
      <div className={styles.Pagination}></div>
    </div>
  )
};

export default ApplicationTable;
