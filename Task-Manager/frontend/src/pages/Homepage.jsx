import Sidebar from "../components/Sidebar/Sidebar";
import TaskList from "../features/tasks/taskList";
import AddTaskButton from "../features/tasks/AddTaskButton";
import TaskFilters from "../features/tasks/TaskFilters";
import { useTasks } from "../features/tasks/useTasks";
import { useParams, useNavigate } from 'react-router-dom';
import "./HomePage.css";

export default function HomePage() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const { section = "inbox" } = useParams();
  const navigate = useNavigate();

  const validSections = ["inbox", "today", "upcoming", "important"];
  if (!validSections.includes(section)) {
    navigate("/tasks/inbox", { replace: true });
    return null;
  }

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Failed to load tasks</p>;

  const now = new Date();
  const today = now.toDateString();

  const filteredTasks = tasks.filter((task) => {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;

    switch (section) {
      case "today":
        return dueDate && dueDate.toDateString() === today;
      case "upcoming":
        return dueDate && dueDate > now;
      case "important":
        return task.priority === "high" || task.labels?.includes("important");
      case "inbox":
      default:
        return true;
    }
  });

  const pageTitle = section === "today"
    ? "Today's Tasks"
    : section.charAt(0).toUpperCase() + section.slice(1) + " Tasks";

  return (
    <div className="home-page" style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "1rem" }}>
        <h1 className="page-title">{pageTitle}</h1>
        <TaskFilters />
        <TaskList tasks={filteredTasks} />
        <AddTaskButton />
      </div>
    </div>
  );
}
