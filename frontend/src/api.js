const API_BASE = '/api';

export async function fetchTasks({
                                   query = '',
                                   status = '',
                                   page = 1,
                                   pageSize = 10
                                 }) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set('q', query.trim());
  }

  if (status) {
    params.set('status', status);
  }

  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  const url = `${API_BASE}/tasks?${params.toString()}`;

  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(
      'Unable to connect to the server. Please check that the backend is running.'
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    // Response may not contain JSON.
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}
