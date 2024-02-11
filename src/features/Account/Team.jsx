import styles from "../../css/Account/Team.module.css";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import FixedButton from "../Buttons/FloatingAction";
import HoverDropdown from "../../components/HoverDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getOrganization } from "../../StateManagement/Actions/actions";
import fetchWrapper from "../../utils/fetchWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlidingModal from "../Dashboard/SlidingModal";
import TeamCreate from "./TeamInvite";

export default function Team() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const organization = useSelector((state) => state.app.organization);
  const [members, setMembers] = useState(organization?.members || []);
  const [admins, setAdmins] = useState(organization?.admins || []);
  const isAdmin = admins.some((admin) => admin.email === user?.email);
  const [selectedMember, setSelectedMember] = useState(null);
  const permissionOptions = ["Admin", "Standard"];
  const [inviteTeam, setInviteTeam] = useState(false);

  useEffect(() => {
    if (!organization) {
      console.log("fetching org");
      dispatch(getOrganization());
    }
  }, []);

  useEffect(() => {
    if (organization) {
      setMembers(organization.members);
      setAdmins(organization.admins);
    }
  }, [organization]);

  const filteredAdmins = admins?.map((admin) => {
    return {
      name: `${admin.name.first} ${admin.name.last}`,
      type: "admin",
      email: admin.email,
      user_id: admin.user_id,
    };
  });

  const filteredMembers = members?.map((member) => {
    return {
      name: `${member.name.first} ${member.name.last}`,
      type: "standard",
      email: member.email,
      user_id: member.user_id,
    };
  });

  function notify(message) {
    console.log("notification");
    toast(message, {
      className: styles.SmallToast,
      hideProgressBar: true,
      // You can also adjust the toast duration (auto-close time) here, if needed
      autoClose: 1000,
    });
  }

  function handleTeamInvite() {
    console.log("clicked");
    setInviteTeam(true);
  }

  function toggleInviteModal() {
    setInviteTeam(false);
    dispatch(getOrganization());
  }

  function handleMemberSelect(member) {
    if (isAdmin) {
      setSelectedMember(member);
    }
  }

  function handlePermissionSelect(permission) {
    const payload = {
      user_id: selectedMember.user_id,
      new_type: permission,
    };

    if (permission === "Standard" && admins.length === 1) {
      notify("You need at least one active admin");
    } else {
      fetchWrapper("/permission", localStorage.getItem("token"), "POST", {
        ...payload,
      }).then((res) => {
        if (res.message === "User role updated successfully.") {
          console.log("fetching org");
          console.log(res);
          console.log(organization);
          dispatch(getOrganization());
          console.log(organization);
        }
      });
    }
  }

  return (
    <div className={styles.Team}>
      {inviteTeam ? (
        <SlidingModal isOpen={inviteTeam} toggleModal={toggleInviteModal}>
          <TeamCreate toggleModal={toggleInviteModal} />
        </SlidingModal>
      ) : null}
      <div className={styles.TeamInput}>
        <label className={styles.TeamLabel} htmlFor="Admins">
          Admins
        </label>
        <div className={styles.Admins}>
          {filteredAdmins.map((member) => {
            return (
              <div
                onClick={() => handleMemberSelect(member)}
                className={styles.TeamMember}
              >
                <div className={styles.TeamMemberRow}>
                  <div className={styles.TeamMemberColumn}>
                    <Typography variant="body1">{member.name}</Typography>
                    <Typography variant="caption">{member.email}</Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.TeamInput}>
        <label className={styles.TeamLabel} htmlFor="Members">
          Members
        </label>
        <div className={styles.Members}>
          {filteredMembers.map((member) => {
            return (
              <div
                onClick={() => handleMemberSelect(member)}
                className={styles.TeamMember}
              >
                <div className={styles.TeamMemberRow}>
                  <div className={styles.TeamMemberColumn}>
                    <Typography variant="body1">{member.name}</Typography>
                    <Typography variant="caption">{member.email}</Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedMember ? (
        <div className={styles.SelectedMember}>
          <div className={styles.TeamInput}>
            <label className={styles.TeamLabel} htmlFor="Members">
              Manage Teammate
            </label>
            <div className={styles.TeamMemberRow}>
              <Typography variant="h5">{selectedMember.name}</Typography>
              <HoverDropdown
                customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
                dropdownContent={
                  <>
                    {permissionOptions.map((permission, index) => {
                      return (
                        <div
                          key={`permission_${index}`}
                          onClick={() => handlePermissionSelect(permission)}
                          className={`${styles.HoverDropdownContentChildren} ${
                            permission.toLowerCase() ===
                            selectedMember.type.toLowerCase()
                              ? styles.Selected
                              : ""
                          }`}
                        >
                          <Typography variant="body1">{permission}</Typography>
                        </div>
                      );
                    })}
                  </>
                }
                buttonContent={
                  <Typography variant="body1">{selectedMember.type}</Typography>
                }
              />
            </div>
          </div>
        </div>
      ) : null}
      {!inviteTeam ? (
        <FixedButton label={"Invite Teammate"} handleClick={handleTeamInvite} />
      ) : null}
      <ToastContainer />
    </div>
  );
}
