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
  fetchPartners,
  fetchTasks,
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
import AccountBar from "../../Account/AccountBar";
import TaskTable from "./TaskTable";

export default function KanBan({ type = "user" }) {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.app.organization);
  const user = useSelector((state) => state.app.user);
  const memberTasks = useSelector((state) => state.app.memberTasks);
  const selectedMember = useSelector((state) => state.app.selectedMember_Tasks);
  const clientPartner = useSelector((state) => state.app.client_partner);

  const [tasksFetched, setTasksFetched] = useState(false);

  const startPosition = useRef({ x: 0, y: 0 });
  // const [selectedSprint, setSelectedSprint] = useState(null);
  const [createTask, setCreateTask] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState("KanBan");

  const [draggedItem, setDraggedItem] = useState(null); // Track the currently dragged item

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if ((user && !selectedMember) || (user && selectedMember.email === "All")) {
      dispatch(setSelectedMemberTasks(user));
    }
  }, [user]);

  useEffect(() => {
    if (!clientPartner) {
      dispatch(fetchPartners());
    }
  }, [clientPartner]);

  useEffect(() => {
    if (selectedMember && !tasksFetched) {
      dispatch(fetchTasks({ email: selectedMember.email }));
      setTasksFetched(true);
    } else if (!tasksFetched) {
      dispatch(setSelectedMemberTasks({ email: "All", user_id: "all" }));
      setTasksFetched(true);
    }
  }, [selectedMember]);

  function handleMemberSelect(member) {
    dispatch(setSelectedMemberTasks(member));
    if (member.user_id === "all") {
      dispatch(
        fetchTasks({
          email: "All",
        })
      );
    } else {
      dispatch(
        fetchTasks({
          email: member.email,
        })
      );
    }
  }

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
    const { active } = event;
    const item = memberTasks.find(
      (task) => task.task_id.toString() === active.id
    );
    setDraggedItem(item);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Find the task by ID without directly modifying it
    const existingTaskIndex = memberTasks.findIndex(
      (task) => task.task_id === active.id
    );

    if (existingTaskIndex !== -1) {
      // Create a new array with the updated task
      const updatedTasks = [...memberTasks];
      const updatedTask = {
        ...updatedTasks[existingTaskIndex],
        status: { status_title: over.id },
      };

      updatedTasks[existingTaskIndex] = updatedTask;

      dispatch(updateMemberTaskOptimistically(active.id, updatedTask));

      const payload = {
        task_id: active.id,
        task: {
          ...updatedTask, // Spread the updated task object
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
    setCreateTask(true);
  }

  function toggleView(view) {
    setView(view);
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
              {organization && type === "user" ? (
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
              ) : clientPartner && type === "client" ? (
                clientPartner.members.map((member, index) => {
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
        <AccountBar
          view={view}
          onViewToggle={toggleView}
          toggle={true}
          toggleOptions={["KanBan", "Table"]}
        />
      </div>
      {view === "KanBan" ? (
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
                  if (
                    task?.status?.status_title === "Backlog" &&
                    task.task_id
                  ) {
                    return (
                      <DraggableTask key={`backlog_${index}`} task={task} />
                    );
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
                  onClick={() =>
                    toggleTaskCreateModal({ status_title: "To Do" })
                  }
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
                  onClick={() =>
                    toggleTaskCreateModal({ status_title: "Done" })
                  }
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
      ) : (
        <TaskTable
          type={"user"}
          tasks={memberTasks}
          handleTaskSelect={handleTaskCreateToggleWithExisting}
          hasClient={true}
          hasTimer={true}
        />
      )}
      {createTask ? (
        <SlidingModal isOpen={createTask} toggleModal={toggleTaskCreateModal}>
          <TaskCreate
            toggleModal={toggleTaskCreateModal}
            taskStatus={selectedTaskStatus}
            selectedMember={selectedMember}
            isOpen={createTask}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            type={type}
          />
        </SlidingModal>
      ) : null}
    </div>
  );
}
