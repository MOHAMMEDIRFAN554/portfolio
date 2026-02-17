import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiErrorResponse {
  error: string;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/refresh') &&
          !originalRequest.url?.includes('/auth/login')
        ) {
          originalRequest._retry = true;

          try {
            // Using a new instance to avoid interceptor loop for refresh
            await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
            return this.instance(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/admin/login';
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  login(email: string, password: string) {
    return this.instance.post('/auth/login', { email, password });
  }

  logout() {
    return this.instance.post('/auth/logout');
  }

  // Projects endpoints
  getProjects() {
    return this.instance.get('/projects');
  }

  getProjectBySlug(slug: string) {
    return this.instance.get(`/projects/${slug}`);
  }

  createProject(data: any) {
    return this.instance.post('/projects', data);
  }

  updateProject(id: string, data: any) {
    return this.instance.put(`/projects/${id}`, data);
  }

  deleteProject(id: string) {
    return this.instance.delete(`/projects/${id}`);
  }

  toggleFeatured(id: string) {
    return this.instance.patch(`/projects/${id}/toggle-featured`);
  }

  uploadImages(images: string[]) {
    return this.instance.post('/projects/upload-images', { images });
  }

  // Contact endpoints
  submitContact(name: string, email: string, message: string) {
    return this.instance.post('/contact', { name, email, message });
  }

  getContactMessages() {
    return this.instance.get('/contact');
  }

  markMessageAsRead(id: string) {
    return this.instance.patch(`/contact/${id}`);
  }

  // Resume endpoints
  getResume() {
    return this.instance.get('/resume');
  }

  uploadResume(base64Data: string) {
    return this.instance.post('/resume', { base64Data });
  }

  deleteResume(id: string) {
    return this.instance.delete(`/resume/${id}`);
  }

  // Settings endpoints
  getSettings() {
    return this.instance.get('/settings');
  }

  updateSettings(settings: Record<string, string>) {
    return this.instance.post('/settings', settings);
  }
}

export const apiClient = new ApiClient();
export type { ApiErrorResponse };
