import { useSearchParams } from "react-router-dom";
import styles from "../css/Pages/PublicDocs.module.css";
import { useEffect, useState } from "react";
import fetchWrapper from "../utils/fetchWrapper";
import DocumentCreator from "../features/DocumentComponents/DocumentCreator";

import Typography from "@mui/material/Typography";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PublicDocs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const doc_id = searchParams.get("doc_id"); // Correct way to extract parameter
  console.log(doc_id);
  const [document, setDocument] = useState(null);
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    if (doc_id) {
      fetch(
        `https://jams-manager-2be71439fdcd.herokuapp.com/public_doc?doc_id=${doc_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setDocument(data.document);
          setOrganization(data.organization);
        })
        .catch((error) => console.error("Error fetching document:", error));
    }

    return () => {
      setDocument(null);
    };
  }, []);

  return (
    <div className={styles.DocumentContainer}>
      <div className={styles.DocumentView}>
        {!organization ? (
          <Skeleton width={100} height={24} />
        ) : (
          <Typography variant="overline">{`Created By: ${organization.name}`}</Typography>
        )}
        <div className={styles.DocumentWindow}>
          {!document ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <DocumentCreator
              initialData={document.content}
              isOpen={true}
              noBar={true}
              readOnly={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
