import './TaskSkeleton.css';

export default function TaskSkeleton() {
  return (
    <div className="task-skeleton">
      <div className="skeleton-checkbox"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-meta">
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
        </div>
      </div>
    </div>
  );
}