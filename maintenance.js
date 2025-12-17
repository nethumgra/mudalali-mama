// maintenance.js - Final Stable Version
// ------------------------------------------------------------------
// This script listens to the 'config/platform_settings' document in Firestore.
// If 'isMaintenanceMode' becomes true, it immediately locks the screen.
// It reuses the 'db' connection from your existing firebase.js to prevent errors.
// ------------------------------------------------------------------

import { db } from "./firebase.js"; 
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const configRef = doc(db, 'config', 'platform_settings');

// Real-time listener for maintenance status
onSnapshot(configRef, (docSnap) => {
    if (docSnap.exists() && docSnap.data().isMaintenanceMode) {
        
        // 1. Get the custom message (or use default)
        const msg = docSnap.data().maintenanceMessage || "We are currently performing scheduled maintenance. Please check back later.";

        // 2. Replace the entire body content with the Maintenance Screen
        document.body.innerHTML = `
            <div id="maintenance-overlay" style="
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: #f8fafc; 
                z-index: 2147483647; /* Maximum Z-Index to cover everything */
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                text-align: center; 
                font-family: 'Poppins', sans-serif, system-ui;
                color: #334155;
            ">
                <div style="font-size: 60px; margin-bottom: 20px; animation: bounce 2s infinite;">🚧</div>
                
                <h1 style="
                    font-size: 28px; 
                    font-weight: 700; 
                    margin-bottom: 15px; 
                    padding: 0 20px;
                    color: #1e293b;
                ">Site Temporarily Unavailable</h1>
                
                <div style="
                    background: white; 
                    padding: 30px; 
                    border-radius: 16px; 
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); 
                    max-width: 500px; 
                    margin: 0 20px; 
                    width: 90%;
                    border: 1px solid #e2e8f0;
                ">
                    <p style="
                        color: #475569; 
                        font-size: 16px; 
                        line-height: 1.6; 
                        font-weight: 500;
                        margin: 0;
                    ">${msg}</p>
                </div>
                
                <div style="margin-top: 40px; text-align: center;">
                    <p style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                        Protected by Mudalali Mama Security
                    </p>
                </div>
                
                <style>
                    @keyframes bounce { 
                        0%, 100% { transform: translateY(0); } 
                        50% { transform: translateY(-10px); } 
                    }
                    body { overflow: hidden; margin: 0; }
                </style>
            </div>
        `;
    } else {
        // 3. If Maintenance Mode is turned OFF while the user is staring at the screen,
        // automatically reload the page to bring them back to the site.
        if (document.getElementById('maintenance-overlay')) {
            window.location.reload();
        }
    }
}, (error) => {
    // Silent fail (don't alert users if permission is denied initially)
    console.warn("Maintenance check listener warning:", error.message);
});