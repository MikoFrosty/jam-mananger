import { useState, useEffect } from "react";
import styles from "../../css/Account/Account.module.css";
import AccountBar from "./AccountBar";
import ProfileDetails from "./ProfileDetails";
import ProfileEditing from "./ProfileEditing";
import Team from "./Team";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOrganization } from "../../StateManagement/Actions/actions";
import ProfileSettings from "./Settings";
import AccountBilling from "./AccountBilling";

export default function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const organization = useSelector((state) => state.app.organization);
  const [view, setView] = useState("General");
  const [toggleOptions, setToggleOptions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(organization);
  const [members, setMembers] = useState(organization?.members || []);
  const [admins, setAdmins] = useState(organization?.admins || []);

  useEffect(() => {
    setIsAdmin(admins.some((admin) => admin.email === user?.email));
    if (!organization) {
      dispatch(getOrganization());
    }
  }, [organization]);

  console.log("Is the current user an admin", isAdmin);

  useEffect(() => {
    if (organization) {
      setMembers(organization.members);
      setAdmins(organization.admins);
    }
  }, [organization]);

  useEffect(() => {
    if (isAdmin) {
      setToggleOptions(["General", "Billing", "Team", "Settings"]);
    } else {
      setToggleOptions(["General", "Team", "Settings"]);
    }
  }, [isAdmin]);

  console.log("Org Admins ", organization?.admins);
  console.log("Current User", user);

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
        {view === "General" ? (
          <>
            <ProfileDetails />
            <ProfileEditing />
          </>
        ) : view === "Team" ? (
          <Team />
        ) : view === "Settings" ? (
          <ProfileSettings />
        ) : view === "Billing" ? (
          <AccountBilling />
        ) : null}
      </div>
    </div>
  );
}
