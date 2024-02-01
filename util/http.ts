const BASE_URL = "http://localhost:4000";

const _fetch = async ({
  url,
  options,
}: {
  url: string;
  options: Record<string, unknown>;
}) => {
  const endpoint = `${BASE_URL}${url}`;
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const _get = (url: string, options?: Record<string, unknown>) => {
  const _options = {
    ...options,
    method: "GET",
    headers: {},
  };

  return _fetch({ url, options: _options });
};

const _patch = (url: string, body: {}, options?: Record<string, unknown>) => {
  const _options = {
    ...options,
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  return _fetch({ url, options: _options });
};

const http = {
  get: _get,
  patch: _patch,
};

export default http;
