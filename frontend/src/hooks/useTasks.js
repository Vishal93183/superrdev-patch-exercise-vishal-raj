import { useEffect, useState } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadTasks() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTasks({
          query,
          status,
          page,
          pageSize,
          signal: controller.signal
        });

        if (!active) {
          return;
        }

        setTasks(Array.isArray(data.items) ? data.items : []);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }

        if (!active) {
          return;
        }

        setTasks([]);
        setTotal(0);
        setError(err.message || 'Failed to load tasks.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      active = false;
      controller.abort();
    };
  }, [query, status, page, pageSize]);

  return {
    tasks,
    total,
    loading,
    error
  };
}
