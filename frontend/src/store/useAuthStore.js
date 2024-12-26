import { axiosInstance } from '../lib/axios'
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        console.log("Checking auth...");
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data });
        } catch (error) {
            console.error('Error checking auth:', error.response?.data || error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({ authUser: response.data });
        } catch (error) {
            console.log('Error in sign-up:', error.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data });
        } catch (error) {
            console.log('Error in login:', error.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    
    // Additional methods for updating profile, logging out, etc. can be added here.
}));
