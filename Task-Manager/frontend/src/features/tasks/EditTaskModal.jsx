import { useState } from 'react';
import { useUpdateTask } from './useTasks';
import './EditTaskModal.css'; // Optional: add styles
import { toast } from 'react-hot-toast';

export default function EditTaskModal({ isOpen, task, onClose }) {
  const { mutate: updateTask } = useUpdateTask();

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority || "medium",
    dueDate: task.dueDate?.split("T")[0] || "",
    labels: task.labels || [],
  });

  const [labelInput, setLabelInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTask({
      id: task._id,
      body: formData,
    }, {
      onSuccess: () => {
        toast.success("Task updated!");
        onClose();
      },
      onError: () => toast.error("Failed to update task"),
    });
  };

  const handleAddLabel = () => {
    if (labelInput && !formData.labels.includes(labelInput)) {
      setFormData({ ...formData, labels: [...formData.labels, labelInput] });
      setLabelInput("");
    }
  };

  return isOpen ? (
    <div className="modal-backdrop">
      <div className="task-modal">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />

          <label>Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="labels">
            <label>Labels</label>
            {formData.labels.map((label, i) => (
              <span key={`${task._id}-${label}-${i}`} className="label-tag">
                {label}
                <button onClick={() =>
                  setFormData({ ...formData, labels: formData.labels.filter(l => l !== label) })
                }>
                  &times;
                </button>
              </span>
            ))}
            <input
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              placeholder="Add label..."
            />
            <button type="button" onClick={handleAddLabel}>Add</button>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
