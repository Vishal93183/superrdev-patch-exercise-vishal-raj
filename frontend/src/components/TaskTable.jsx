function formatStatus(status) {
  if (!status) {
    return 'Unknown';
  }

  return status
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function TaskTable({ tasks, loading, error }) {
  if (loading) {
    return <div className="state-message">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="state-message error" role="alert">
        Error: {error}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <div className="state-message">No tasks found.</div>;
  }

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Assignee</th>
        </tr>
        </thead>

        <tbody>
        {tasks.map((task) => {
          const status = task.status || 'UNKNOWN';
          const statusClass = status.toLowerCase();

          return (
            <tr key={task.id}>
              <td>{task.id}</td>

              <td>
                <div className="task-title">
                  {task.title || 'Untitled'}
                </div>

                {task.description && (
                  <div className="task-desc">
                    {task.description}
                  </div>
                )}
              </td>

              <td>
                  <span className={`status-badge ${statusClass}`}>
                    {formatStatus(status)}
                  </span>
              </td>

              <td>{task.priority || '—'}</td>

              <td>{task.assignee || '—'}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
