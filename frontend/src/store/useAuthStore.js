import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios'
import {create} from 'zustand';
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        
        try {
            const response = await axiosInstance.get('/auth/check');
            set({ authUser: response.data });
            get().connectSocket();
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
            set({ authUser: "Logged" });
            toast.success("Account created successfully")
            get().connectSocket()
           
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('Error in sign-up:', error.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    Login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({ authUser: response.data });
            toast.success("Logged in successfully")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('Error in login:', error.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () =>{
        try {
           await axiosInstance.post('/auth/logout');
           set({authUser: null})
           toast.success("Logout successfully")
           get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },

    updateProfile: async (data) =>{
        set({ isUpdatingProfile: true });
        console.log("hello world")
        console.log(axiosInstance)
        try {
            const response = await axiosInstance.put('/auth/update-profile',data);
            set({authUser: response.data});
            toast.success("profile updated successfully")
        } catch (error) {
            console.log("error in update profile", error)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile: false})
        }
    },

    connectSocket: async () =>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();
        set({socket: socket})

        socket.on("getOnlineUsers", (userIds)=>{
            set({onlineUsers: userIds})
        })
    },
    disconnectSocket: async () =>{
        if(get().socket?.connected) get().socket.disconnect();
    }

    
    // Additional methods for updating profile, logging out, etc. can be added here.
}));
