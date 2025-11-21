// js/config/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDIbu2qT53iGPqMCx5UdU6XY8wvXkb3ZF4",
    authDomain: "mudalali-mama.firebaseapp.com",
    projectId: "mudalali-mama",
    storageBucket: "mudalali-mama.firebasestorage.app",
    messagingSenderId: "296597428969",
    appId: "1:296597428969:web:684668be9c0eaeecb4ae78",
    measurementId: "G-GC1CP1LRFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Global Public Data Path
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
export const publicDataPath = `/artifacts/${appId}/public/data`;
export const usersPath = `/users`;