import axios from "axios";

// Create axios instance
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        'Content-Type': 'application/json',
        'X-Origin': window.location.origin + '/threads-clone/#/auth'
    }
})

// Request interceptor
httpClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

let isRefreshing = false;  // Đang refresh hay không?
let failedQueue = [];      // Danh sách requests đang chờ


const processQueue = (error, accessToken = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);  // Refresh thất bại → reject tất cả
        } else {
            prom.resolve(accessToken);  // Refresh thành công → resolve với token mới
        }
    });
    failedQueue = [];
};

// Response interceptor
httpClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login')) {
            if (isRefreshing) {
                // Chờ request refresh đang chạy hoàn tất
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return httpClient(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_API}/auth/refresh`,
                    { refresh_token: refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const { access_token, refresh_token } = response.data.data;

                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                processQueue(null, access_token);

                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return httpClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = '#/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)

// Send request helper
const _send = async (method, path, data, config) => {
    return httpClient.request({ ...config, method, url: path, data });
};

// HTTP methods
const http = {
    get: (path, config) => _send("get", path, null, config),
    post: (path, data, config) => _send("post", path, data, config),
    put: (path, data, config) => _send("put", path, data, config),
    patch: (path, data, config) => _send("patch", path, data, config),
    del: (path, config) => _send("delete", path, null, config),
};

export { http };