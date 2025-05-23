import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status} ${res.statusText}`);
    error.status = res.status;
    throw error;
  }
}

export async function apiRequest(method, path, body) {
  const config = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(path, config);
  await throwIfResNotOk(response);
  return response;
}

export const getQueryFn = (options) => {
  const { on401 } = options;
  
  return async ({ queryKey }) => {
    try {
      const response = await fetch(queryKey[0]);
      
      if (response.status === 401) {
        if (on401 === "returnNull") {
          return null;
        }
        throw new Error("Unauthorized");
      }
      
      await throwIfResNotOk(response);
      return response.json();
    } catch (error) {
      if (on401 === "returnNull" && error.status === 401) {
        return null;
      }
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        if (error?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});