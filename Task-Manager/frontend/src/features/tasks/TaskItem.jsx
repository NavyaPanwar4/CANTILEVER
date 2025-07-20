import { useState } from 'react';
import './TaskItem.css';
import { toast } from 'react-hot-toast';
import { useDeleteTask, useUpdateTask } from './useTasks';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import EditTaskModal from './EditTaskModal'; // 🔥 You'll create this next

export default function TaskItem({ task }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const priorityColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  };

  const handleDelete = () => {
    deleteTask(task._id, {
      onSuccess: () => toast.success("Task deleted!"),
      onError: () => toast.error("Failed to delete task"),
    });
    setShowConfirmDelete(false);
  };

  const handleToggleComplete = () => {
    updateTask({ id: task._id, body: { completed: !task.completed } }, {
      onSuccess: () => toast.success("Task updated"),
      onError: () => toast.error("Failed to update"),
    });
  };

  return (
    <>
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
        />

        <div className="task-content">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            {task.dueDate && (
              <span className="task-chip due-date">
                <span className="material-icons">event</span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}

            {task.priority && (
              <span className={`task-chip priority-${task.priority}`}>
                <span className="material-icons">
                  {task.priority === "high" ? "priority_high" : "low_priority"}
                </span>
                {task.priority} priority
              </span>
            )}

            {task.labels && task.labels.length > 0 && task.labels.map((label, i) => (
              <span key={`${task._id}-${i}`} className="task-chip label">
              <span className="material-icons">label</span>
              {label}
              </span>
            ))}
          </div>
        </div>

        <div className="task-actions">
          <button
            className="task-menu-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className="material-icons">more_vert</span>
          </button>

          {isMenuOpen && (
            <div className="task-menu">
              <button className="menu-item" onClick={() => setIsEditing(true)}>
                <span className="material-icons">edit</span>
                Edit
              </button>
              <button className="menu-item" onClick={() => setShowConfirmDelete(true)}>
                <span className="material-icons">delete</span>
                Delete
              </button>
              <button className="menu-item" onClick={() => toast("Coming soon!")}>
                <span className="material-icons">flag</span>
                Change Priority
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmDelete(false)}
      />

      {isEditing && (
        <EditTaskModal
          isOpen={isEditing}
          task={task}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
