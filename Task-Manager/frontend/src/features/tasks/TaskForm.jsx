import { useEffect, useState } from 'react';
import './TaskForm.css';
import { useTasks } from '../../context/TaskContext';
import toast from 'react-hot-toast';

export default function TaskForm() {
  const {
    selectedTask,
    setSelectedTask,
    setShowTaskForm,
    fetchTasks,
    axiosPrivate
  } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    labels: [],
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : '',
        priority: selectedTask.priority || 'medium',
        labels: selectedTask.labels || [],
      });
    }
  }, [selectedTask]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await axiosPrivate.put(`/tasks/${selectedTask._id}`, formData);
        toast.success('Task updated');
      } else {
        await axiosPrivate.post('/tasks', formData);
        toast.success('Task added');
      }
      fetchTasks();
      setShowTaskForm(false);
      setSelectedTask(null);
    } catch (err) {
      toast.error('Failed to save task');
    }
  };

  const handleClose = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  return (
    <div className="task-form-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{selectedTask ? 'Edit Task' : 'Add Task'}</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button type="submit">
          {selectedTask ? 'Update Task' : 'Add Task'}
        </button>
        <button type="button" className="cancel-btn" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
