import React from "react";

import { useSearchParams } from "react-router-dom";

import styles from "../../css/"

export default function Reviews() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email")

  return (

  )
}
