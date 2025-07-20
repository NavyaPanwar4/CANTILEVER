import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id || task._id} task={task} />
        ))
      )}
    </div>
  );
}
