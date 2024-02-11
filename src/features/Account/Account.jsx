import { useState, useEffect } from "react";
import styles from "../../css/Account/Account.module.css";
import AccountBar from "./AccountBar";
import ProfileDetails from "./ProfileDetails";
import ProfileEditing from "./ProfileEditing";
import Team from "./Team";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOrganization } from "../../StateManagement/Actions/actions";

export default function Account() {
  const dispatch = useDispatch();
  const [view, setView] = useState("General");
  const [toggleOptions, setToggleOptions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const organization = useSelector((state) => state.app.organization)
  console.log(organization)
  const [members, setMembers] = useState(organization?.members || [])
  const [admins, setAdmins] = useState(organization?.admins || [])

  useEffect(() => {
    setIsAdmin(admins.some(admin => admin.email === user?.email))
    if (!organization) {
      dispatch(getOrganization())
    }
  }, []);

  useEffect(() => {
    if (organization) {
      setMembers(organization.members);
      setAdmins(organization.admins)
    }
  }, [organization])

  useEffect(() => {
    if (isAdmin) {
      setToggleOptions([
        "General",
        "Billing",
        "Team",
        "Settings"
      ])
    }
    else {
      setToggleOptions([
        "General",
        "Team",
        "Settings"
      ])
    }
  }, [isAdmin])

  function toggleView(view) {
    setView(view);
  }

  return (
    <div className={styles.AccountMain}>
      <AccountBar
        view={view}
        onViewToggle={toggleView}
        toggle={true}
        toggleOptions={toggleOptions}
        label={"Account Details"}
      />
      <div className={styles.AccountContent}>
        {
          view === "General" ? (
            <>
              <ProfileDetails />
              <ProfileEditing />
            </>
          ) : view === "Team" ? (
            <Team />
          ) : (
            null
          )
        }
      </div>
    </div>
  );
}
