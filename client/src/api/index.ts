import axios from 'axios';

import { FormDataProp as AuthFormData } from '../interfaces/auth';
import { FormDataProp as EventFormData } from '../interfaces/event';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req: any) => {
    const token = localStorage.getItem('HappenifyToken');
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
});

export const signup = (formData: AuthFormData) => API.post('/users/signup', formData);
export const login = (formData: AuthFormData) => API.post('/users/login', formData);
export const loginWithToken = () => API.post('/users/login-with-token');

export const createEvent = (formData: EventFormData) => API.post('/events', formData);
export const getEvents = (page: number, limit: number) => API.get(`/events?page=${page}&limit=${limit}`);
export const getUserEvents = (page: number, limit: number) => API.get(`/events/user?page=${page}&limit=${limit}`);
export const getEventById = (id: string) => API.get(`/events/${id}`);