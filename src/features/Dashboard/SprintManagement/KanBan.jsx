import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../../css/SprintManagement/CreateSprint.module.css";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import HoverDropdown from "../../../components/HoverDropdown";
import SlidingModal from "../SlidingModal";
import TaskCreate from "./CreateTaskForm";
import {
  // fetchSprints,
  fetchTasks,
  getUser,
  setSelectedMemberTasks,
  updateMemberTaskOptimistically,
} from "../../../StateManagement/Actions/actions";

import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

import fetchWrapper from "../../../utils/fetchWrapper";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function KanBan() {
  const dispatch = useDispatch();
  // const sprints = useSelector((state) => state.app.sprints);
  const organization = useSelector((state) => state.app.organization);
  const user = useSelector((state) => state.app.user);
  const memberTasks = useSelector((state) => state.app.memberTasks);
  const selectedMember = useSelector((state) => state.app.selectedMember_Tasks)
  console.log(memberTasks);

  const startPosition = useRef({ x: 0, y: 0 });
  // const [selectedSprint, setSelectedSprint] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [draggedItem, setDraggedItem] = useState(null); // Track the currently dragged item

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (user && !selectedMember) {
      dispatch(setSelectedMemberTasks(user));
    }
  }, [user]);

  useEffect(() => {
    if (selectedMember) {
      dispatch(fetchTasks({ email: selectedMember.email }));
    }
  }, [selectedMember]);

  // useEffect(() => {
  //   if (user) {
  //     console.log("Setting Selected Member", user)
  //     setSelectedMember(user);
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (selectedMember && memberTasks) {
  //     console.log("Selected Member", selectedMember)
  //     console.log("Member Tasks", memberTasks)
  //   }
  // }, [memberTasks])

  // useEffect(() => {
  //   if (!sprints) {
  //     dispatch(fetchSprints());
  //   } else {
  //     setSelectedSprint(
  //       sprints.filter((sprint) => sprint.status === "Active")[0]
  //     );
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     setSelectedMember(user);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (selectedTask) {
  //     setCreateTask(true);
  //   }
  // }, [selectedTask]);

  // useEffect(() => {
  //   if (selectedMember) {
  //     console.log("FETCHING TASKS FOR SIGNED IN USER")
  //     console.log(selectedMember.email)
  //     fetchTasks({
  //       email: selectedMember.email,
  //     });
  //     console.log(memberTasks)
  //   }
  // }, [selectedMember]);

  // useEffect(() => {
  //   if (selectedSprint) {
  //     dispatch(
  //       fetchTasks({
  //         email: selectedMember.email,
  //         sprint_id: selectedSprint.sprint_id,
  //       })
  //     );
  //   }
  // }, [selectedSprint]);

  function handleMemberSelect(member) {
    dispatch(setSelectedMemberTasks(member))
    if (member.user_id === "all") {
      dispatch(
        fetchTasks({
          email: "All",
          // ...{
          //   sprint_id: `${selectedSprint ? selectedSprint.sprint_id : null}`,
          // },
        })
      );
    } else {
      dispatch(
        fetchTasks({
          email: member.email,
          // ...{
          //   sprint_id: `${selectedSprint ? selectedSprint.sprint_id : null}`,
          // },
        })
      );
    }
  }

  // function handleSprintSelect(sprint) {
  //   setSelectedSprint(sprint);
  // }

  function toggleTaskCreateModal(status = null) {
    if (createTask) {
      setCreateTask(false);
      setSelectedTask(null);
      setSelectedTaskStatus(null);
    } else {
      if (status) {
        setSelectedTaskStatus(status);
      }
    }
  }

  useEffect(() => {
    if (selectedTaskStatus) {
      console.log(selectedTaskStatus);
      setCreateTask(true);
    }
  }, [selectedTaskStatus]);

  function DroppableColumn({ children, status, onDrop }) {
    const { setNodeRef } = useDroppable({
      id: status,
    });

    return (
      <div ref={setNodeRef} className={styles.KanBanColumn}>
        {children}
      </div>
    );
  }

  function DraggableTask({ task }) {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: task.task_id.toString(),
    });

    function handleUp(event) {
      console.log("pointer up", event);
      const lastStartPosition = startPosition.current;
      const endPosition = { x: event.pageX, y: event.pageY };
      if (
        Math.abs(lastStartPosition.x - endPosition.x) < 5 &&
        Math.abs(lastStartPosition.y - endPosition.y) < 5
      ) {
        // This was more of a click than a drag, so call your click handler
        handleTaskCreateToggleWithExisting(task);
      }
    }

    function handleDown(event) {
      startPosition.current = { x: event.pageX, y: event.pageY };
      listeners.onPointerDown(event);
    }

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onPointerUp={(event) => handleUp(event)}
        onPointerDown={(event) => handleDown(event)}
        // onPointerDown={handlePointerDown}
        // onPointerUp={handlePointerUp}
        className={styles.KanBanCard}
      >
        <div className={styles.KanBanCardTextRow}>
          <Typography variant="body1">{task.title}</Typography>
          <Typography variant="caption">{task.client?.client_name}</Typography>
        </div>
        <Typography
          sx={{
            backgroundColor: task.escalation.softerColor,
            color: task.escalation.color,
            padding: "5px",
            borderRadius: "5px",
          }}
          variant="caption"
        ></Typography>
      </div>
    );
  }

  function handleDragStart(event) {
    console.log("Drag Started");
    const { active } = event;
    const item = memberTasks.find(
      (task) => task.task_id.toString() === active.id
    );
    console.log(item);
    setDraggedItem(item);
  }

  const handleDragEnd = (event) => {
    console.log("Drag Ended");
    const { active, over } = event;

    // Find the task by ID without directly modifying it
    const existing_task = memberTasks.find(
      (task) => task.task_id === active.id
    );

    if (existing_task) {
      // Create a new object with the updated status
      console.log("Existing Task", existing_task);
      const updatedTask = {
        ...existing_task,
        status: { status_title: over.id },
      };
      console.log("Updated Task", updatedTask);

      dispatch(updateMemberTaskOptimistically(active.id, updatedTask));

      const payload = {
        task_id: active.id,
        task: {
          title: updatedTask.title,
          assignees: updatedTask.assignees,
          description: updatedTask.description,
          client: updatedTask.client,
          status: updatedTask.status,
          escalation: updatedTask.escalation,
        },
      };

      fetchWrapper("/tasks", localStorage.getItem("token"), "PUT", {
        ...payload,
      })
        .then((res) => {
          console.log(res);
          dispatch(updateMemberTaskOptimistically(res.task.task_id, res.task));
        })
        .catch((error) => {
          console.error("Error saving task:", error);
        });
    }
  };

  function handleTaskCreateToggleWithExisting(task) {
    setSelectedTask(task);
  }

  return (
    <div className={styles.KanBanMain}>
      <div className={styles.KanBanBar}>
        <HoverDropdown
          id={"TaskMemberSelect"}
          customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
          buttonContent={
            selectedMember ? (
              <Typography variant="body1">{selectedMember.email}</Typography>
            ) : (
              <Skeleton width="100%" height="100%" />
            )
          }
          dropdownContent={
            <>
              <div
                key="all_members_option"
                onClick={() =>
                  handleMemberSelect({ email: "All", user_id: "all" })
                }
                className={`${styles.HoverDropdownContentChildren} ${
                  selectedMember?.user_id === "all" ? styles.Selected : ""
                }`}
              >
                <Typography variant="body1">All Members</Typography>
              </div>
              {organization ? (
                organization.members.map((member, index) => {
                  return (
                    <div
                      key={`member_${index}`}
                      onClick={() => handleMemberSelect(member)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        member?.user_id === selectedMember?.user_id
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body1">{`${member.name.first} ${member.name.last}`}</Typography>
                      <Typography color={"#a1a1a1"} variant="caption">
                        {member.email}
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body1">Fetching Team..</Typography>
                  <Typography color={"#a1a1a1"} variant="caption">
                    We are gathering your teammates!
                  </Typography>
                </div>
              )}
            </>
          }
        />
        {/* <HoverDropdown
          id={"SprintSelect"}
          customStyles={{ maxHeight: "300px", overflowY: "scroll" }}
          buttonContent={
            selectedSprint ? (
              <Typography variant="body1">{selectedSprint.title}</Typography>
            ) : (
              <Skeleton width={100} height={24} />
            )
          }
          dropdownContent={
            <>
              <div
                key="all_sprints_option"
                onClick={() =>
                  handleSprintSelect({ sprint_id: "All", title: "All Sprints" })
                }
                className={`${styles.HoverDropdownContentChildren} ${
                  selectedSprint?.sprint_id === "All" ? styles.Selected : ""
                }`}
              >
                <Typography variant="body1">All Sprints</Typography>
              </div>
              {sprints ? (
                sprints.map((sprint, index) => {
                  return (
                    <div
                      style={
                        sprint.status === "Active"
                          ? { backgroundColor: "rgba(46, 196, 182, 0.3)" }
                          : {}
                      }
                      key={`sprint_${index}`}
                      onClick={() => handleSprintSelect(sprint)}
                      className={`${styles.HoverDropdownContentChildren} ${
                        sprint.status === "Active" ? styles.ActiveSprint : ""
                      } ${
                        sprint.sprint_id === selectedSprint?.sprint_id
                          ? styles.Selected
                          : ""
                      }`}
                    >
                      <Typography variant="body1">{sprint.title}</Typography>
                    </div>
                  );
                })
              ) : (
                <div className={styles.HoverDropdownContentChildren}>
                  <Typography variant="body1">Fetching Sprints..</Typography>
                  <Typography color={"#a1a1a1"} variant="caption">
                    We are gathering your sprints!
                  </Typography>
                </div>
              )}
            </>
          }
        /> */}
      </div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className={styles.KanBan}>
          <DroppableColumn status="Backlog">
            <label className={styles.SprintLabel} htmlFor="BacklogColumn">
              Backlog
            </label>
            <div className={styles.KanBanCard}>
              <AddIcon
                className={styles.Icon}
                onClick={() =>
                  toggleTaskCreateModal({ status_title: "Backlog" })
                }
              />
            </div>
            {memberTasks ? (
              memberTasks.map((task, index) => {
                if (task?.status?.status_title === "Backlog" && task.task_id) {
                  return <DraggableTask key={`backlog_${index}`} task={task} />;
                }
                return null; // Ensure tasks not matching the condition are handled properly
              })
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </DroppableColumn>
          <DroppableColumn status="To Do">
            <label className={styles.SprintLabel} htmlFor="BacklogColumn">
              To Do
            </label>
            <div className={styles.KanBanCard}>
              <AddIcon
                className={styles.Icon}
                onClick={() => toggleTaskCreateModal({ status_title: "To Do" })}
              />
            </div>
            {memberTasks ? (
              memberTasks.map((task, index) => {
                if (task?.status?.status_title === "To Do" && task.task_id) {
                  return <DraggableTask key={`to_do_${index}`} task={task} />;
                }
                return null; // Ensure tasks not matching the condition are handled properly
              })
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </DroppableColumn>
          <DroppableColumn status="In Progress">
            <label className={styles.SprintLabel} htmlFor="BacklogColumn">
              In Progress
            </label>
            <div className={styles.KanBanCard}>
              <AddIcon
                className={styles.Icon}
                onClick={() =>
                  toggleTaskCreateModal({ status_title: "In Progress" })
                }
              />
            </div>
            {memberTasks ? (
              memberTasks.map((task, index) => {
                if (
                  task?.status?.status_title === "In Progress" &&
                  task.task_id
                ) {
                  return (
                    <DraggableTask key={`in_progress_${index}`} task={task} />
                  );
                }
                return null; // Ensure tasks not matching the condition are handled properly
              })
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </DroppableColumn>
          <DroppableColumn status="Done">
            <label className={styles.SprintLabel} htmlFor="BacklogColumn">
              Done
            </label>
            <div className={styles.KanBanCard}>
              <AddIcon
                className={styles.Icon}
                onClick={() => toggleTaskCreateModal({ status_title: "Done" })}
              />
            </div>
            {memberTasks ? (
              memberTasks.map((task, index) => {
                if (task?.status?.status_title === "Done" && task.task_id) {
                  return <DraggableTask key={`done_${index}`} task={task} />;
                }
                return null; // Ensure tasks not matching the condition are handled properly
              })
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </DroppableColumn>
        </div>
        <DragOverlay>
          {draggedItem && (
            <div className={styles.KanBanCard}>
              <div className={styles.KanBanCardTextRow}>
                <Typography variant="body1">{draggedItem.title}</Typography>
                <Typography variant="caption">
                  {draggedItem.client?.client_name}
                </Typography>
              </div>
              <Typography
                sx={{
                  backgroundColor: draggedItem.escalation.softerColor,
                  color: draggedItem.escalation.color,
                  padding: "5px",
                  borderRadius: "5px",
                }}
                variant="caption"
              ></Typography>
            </div>
          )}
        </DragOverlay>
      </DndContext>
      {createTask ? (
        <SlidingModal isOpen={createTask} toggleModal={toggleTaskCreateModal}>
          <TaskCreate
            toggleModal={toggleTaskCreateModal}
            taskStatus={selectedTaskStatus}
            selectedMember={selectedMember}
            isOpen={createTask}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            // selectedSprint={
            //   !selectedSprint || (selectedSprint.sprint_id === "All" && sprints)
            //     ? sprints?.filter((sprint) => sprint.status === "Active")[0]
            //     : selectedSprint
            // }
          />
        </SlidingModal>
      ) : null}
    </div>
  );
}
