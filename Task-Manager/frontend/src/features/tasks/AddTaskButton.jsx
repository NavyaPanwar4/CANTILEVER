import { useState, useRef, useEffect } from "react";
import useAuth from "../../store/useAuth";
import { showToast } from "../../components/Toast";
import { useCreateTask } from "../../features/tasks/useTasks";
import "./AddTaskButton.css";

export default function AddTaskButton({ triggerShortcut }) {
  const { isAuth } = useAuth();
  const { mutate: createTask } = useCreateTask();

  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    labels: [],
  });

  const [labelInput, setLabelInput] = useState("");
  const modalRef = useRef();
  const availableLabels = ["Work", "Personal", "Shopping", "Health"];

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Open modal via keyboard shortcut
  useEffect(() => {
    if (triggerShortcut) setIsOpen(true);
  }, [triggerShortcut]);

  const handleAddLabel = () => {
    const trimmed = labelInput.trim();
    if (trimmed && !newTask.labels.includes(trimmed)) {
      setNewTask({ ...newTask, labels: [...newTask.labels, trimmed] });
      setLabelInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("Login to add a task", "error");
      handleClose();
      return;
    }

    if (!newTask.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

    createTask(newTask, {
      onSuccess: () => {
        showToast("Task created successfully!", "success");
        handleClose();
      },
      onError: (err) => {
        console.error("Error creating task:", err);
        showToast("Failed to create task", "error");
      },
    });
  };

  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      labels: [],
    });
    setLabelInput("");
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <>
      <button
        className="fab"
        onClick={() => {
          if (!isAuth) return showToast("Login to add a task", "error");
          setIsOpen(true);
        }}
      >
        <span className="material-icons">add</span>
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <div className="task-modal" ref={modalRef}>
            <button className="modal-close" onClick={handleClose}>
              <span className="material-icons">close</span>
            </button>

            <h2 className="modal-title">Create New Task</h2>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-group">
                <label className="form-label required">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>

              {/* Priority & Due Date */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-input"
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-input"
                    min={new Date().toISOString().split("T")[0]}
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Labels */}
              <div className="form-group">
                <label className="form-label">Labels</label>
                <div className="labels-input-container">
                  <div className="labels-display">
                    {newTask.labels.map((label, i) => (
                      <span key={`${label}-${i}`} className="label-tag">
                        {label}
                        <button
                          type="button"
                          className="label-remove"
                          onClick={() =>
                            setNewTask((prev) => ({
                              ...prev,
                              labels: prev.labels.filter((l) => l !== label),
                            }))
                          }
                        >
                          <span className="material-icons">close</span>
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="label-input-group">
                    <input
                      type="text"
                      className="form-input"
                      value={labelInput}
                      onChange={(e) => setLabelInput(e.target.value)}
                      placeholder="Add label..."
                      list="label-suggestions"
                    />
                    <datalist id="label-suggestions">
                      {availableLabels.map((label) => (
                        <option key={label} value={label} />
                      ))}
                    </datalist>
                    <button
                      type="button"
                      className="label-add-button"
                      onClick={handleAddLabel}
                    >
                      <span className="material-icons">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-contained"
                  disabled={!newTask.title.trim()}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
