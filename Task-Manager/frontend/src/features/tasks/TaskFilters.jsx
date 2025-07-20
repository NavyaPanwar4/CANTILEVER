import './TaskFilters.css';

export default function TaskFilters() {
  return (
    
    <div className="task-filters">
      <div className="filter-group">
        <label>Filter by:</label>
        <select className="filter-select">
          <option value="all">All Tasks</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Sort by:</label>
        <select className="filter-select">
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="created">Recently Added</option>
        </select>
      </div>
      
      <button className="filter-button">
        <span className="material-icons">filter_alt</span>
        Advanced
      </button>
    </div>
  );
}