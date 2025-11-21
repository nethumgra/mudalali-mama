import { db, publicDataPath } from '../config/firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function loadSiteConfig() {
    try {
        const docRef = doc(db, publicDataPath, 'siteContent', 'config');
        const docSnap = await getDoc(docRef);
        let config = {};
        if (docSnap.exists()) config = docSnap.data();
        
        const logoText = config.logoText || 'මුදලාලි මාමා';
        const logoImg = document.getElementById('logo-img');
        const mobileLogoImg = document.getElementById('mobile-logo-img');
        const logoLink = document.getElementById('logo-link');
        const mobileLogoLink = document.getElementById('mobile-logo-link');

        // Logo URL එක තිබේ නම් පෙන්වන්න
        if (config.logoImageUrl && logoImg && mobileLogoImg) {
            logoImg.src = config.logoImageUrl;
            mobileLogoImg.src = config.logoImageUrl;
        } else {
            // Logo එක නැත්නම් Text එක පෙන්වන්න
            const logoImgHasSrc = logoImg && (logoImg.getAttribute('src') && logoImg.getAttribute('src') !== '');
            const mobileLogoImgHasSrc = mobileLogoImg && (mobileLogoImg.getAttribute('src') && mobileLogoImg.getAttribute('src') !== '');

            if (!logoImgHasSrc && logoLink) {
                logoImg?.remove();
                logoLink.textContent = logoText;
            }
            if (!mobileLogoImgHasSrc && mobileLogoLink) {
                mobileLogoImg?.remove();
                mobileLogoLink.textContent = logoText;
            }
        }
        
        // Hotline Number එක පෙන්වන්න
        const hotlineEl = document.getElementById('header-hotline');
        if (hotlineEl) {
            hotlineEl.textContent = config.headerHotline || '...';
        }

    } catch (e) {
        console.error("Error loading site config: ", e);
    }
}