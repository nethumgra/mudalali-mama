import { doc, getDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { publicDataPath } from "./firebase.js";

export function getFooterHTML() {
    return `
    <footer class="bg-gray-800 text-gray-300 pt-16 pb-8 hidden md:block">
        <div id="footer-container" class="container mx-auto px-4">
            <div class="bg-gray-700 p-8 rounded-lg -mt-28 mb-16 relative z-10 shadow-xl flex items-center justify-between">
                <div>
                    <h3 class="text-2xl font-bold text-white mb-2">SUBSCRIBE TO US</h3>
                    <p class="text-gray-300">Get the first look at exclusive offers, promotions, and more.</p>
                </div>
                <form class="flex w-full max-w-md">
                    <input type="email" placeholder="Email Address" class="w-full px-4 py-3 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-mudalali-green">
                    <button type="submit" class="bg-mudalali-green text-white px-6 py-3 rounded-r-md font-bold hover:bg-mudalali-green-dark">
                        SUBSCRIBE
                    </button>
                </form>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                <div>
                    <h4 class="font-bold text-white mb-4">මුදලාලි මාමා</h4>
                    <ul id="footer-col-tsmgroup" class="space-y-2"><li>Loading...</li></ul>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-4">INFO</h4>
                    <ul id="footer-col-info" class="space-y-2"><li>Loading...</li></ul>
                </div>
                <div>
                    <h4 class="font-bold text-white mb-4">QUICK LINKS</h4>
                    <ul id="footer-col-quicklinks" class="space-y-2"><li>Loading...</li></ul>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h4 class="font-bold text-white mb-4">COLOMBO HEAD OFFICE</h4>
                    <address id="footer-address" class="not-italic">Loading...</address>
                    <p class="mt-2">Email: <a id="footer-email" href="#" class="hover:text-white">...</a></p>
                    <p>Hotline: <a id="footer-hotline" href="#" class="hover:text-white">...</a></p>
                </div>
                <div class="col-span-2 md:col-span-1">
                    <h4 class="font-bold text-white mb-4">KEEP IN TOUCH</h4>
                    <div id="footer-socials" class="flex space-x-4 mb-4"></div>
                    <h4 class="font-bold text-white mb-4 mt-6">PAYMENTS</h4>
                    <div class="flex space-x-2">
                        <img src="https://i.ibb.co/fDYrL3g/visa.png" alt="Visa" class="h-6">
                        <img src="https://i.ibb.co/7rmXz4F/mastercard.png" alt="Mastercard" class="h-6">
                        <img src="https://i.ibb.co/C0W2LFr/amex.png" alt="Amex" class="h-6">
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-700 pt-6 text-sm text-center md:flex justify-between">
                <p>&copy; 2025 Mudalali Mama. All Rights reserved.</p>
                <div class="space-x-4 mt-4 md:mt-0">
                    <a href="#" class="hover:text-white">TERMS & CONDITIONS</a>
                    <span>|</span>
                    <a href="#" class="hover:text-white">PRIVACY POLICY</a>
                </div>
            </div>
        </div>
    </footer>

    <nav class="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center z-40 md:hidden">
        <a href="index.html" class="mobile-nav-link active flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-mudalali-green text-xs">
            <i class="fa fa-store text-xl"></i>
            <span class="mt-1">Shop</span>
        </a>
        <a href="stories.html" class="mobile-nav-link flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-mudalali-green text-xs">
            <i class="fa fa-book-open text-xl"></i>
            <span class="mt-1">Stories</span>
        </a>
        <a href="wishlist.html" class="mobile-nav-link flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-mudalali-green text-xs relative">
            <div class="relative">
                <i class="fa fa-heart text-xl"></i>
                <span id="mobile-wishlist-badge" class="absolute -top-1 -right-2.5 bg-mudalali-red text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </div>
            <span class="mt-1">Wishlist</span>
        </a>
        <button id="mobile-cart-btn" class="mobile-nav-link flex-1 flex flex-col items-center justify-center text-gray-600 hover:text-mudalali-green text-xs relative">
            <div class="relative">
                <i class="fa fa-shopping-bag text-xl"></i>
                <span id="mobile-cart-badge" class="absolute -top-1 -right-2.5 bg-mudalali-red text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </div>
            <span class="mt-1">Cart</span>
        </button>
    </nav>`;
}

export async function loadFooterData(db) {
    // Footer loading logic moved here
    try {
        const contactRef = doc(db, publicDataPath, 'siteContent', 'footerContact');
        const contactSnap = await getDoc(contactRef);
        if (contactSnap.exists()) {
            const data = contactSnap.data();
            if(document.getElementById('footer-address')) document.getElementById('footer-address').textContent = data.address || '...';
            const emailEl = document.getElementById('footer-email');
            if(emailEl) { emailEl.textContent = data.email || '...'; emailEl.href = `mailto:${data.email}`; }
            const hotlineEl = document.getElementById('footer-hotline');
            if(hotlineEl) { hotlineEl.textContent = data.hotline || '...'; hotlineEl.href = `tel:${data.hotline}`; }
            
            const socialsContainer = document.getElementById('footer-socials');
            if(socialsContainer) {
                socialsContainer.innerHTML = '';
                if (data.facebookUrl) socialsContainer.innerHTML += `<a href="${data.facebookUrl}" target="_blank" class="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full text-xl hover:bg-mudalali-green"><i class="fab fa-facebook-f"></i></a>`;
                if (data.youtubeUrl) socialsContainer.innerHTML += `<a href="${data.youtubeUrl}" target="_blank" class="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full text-xl hover:bg-mudalali-green"><i class="fab fa-youtube"></i></a>`;
                if (data.instagramUrl) socialsContainer.innerHTML += `<a href="${data.instagramUrl}" target="_blank" class="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full text-xl hover:bg-mudalali-green"><i class="fab fa-instagram"></i></a>`;
            }
        }
    } catch(e) { console.error("Error loading footer contact", e); }
    
    const linksRef = collection(db, publicDataPath, 'footerLinks');
    onSnapshot(linksRef, (querySnapshot) => {
        const lists = {
            col_tsmgroup: document.getElementById('footer-col-tsmgroup'),
            col_info: document.getElementById('footer-col-info'),
            col_quicklinks: document.getElementById('footer-col-quicklinks')
        };
        Object.values(lists).forEach(list => { if(list) list.innerHTML = ''; }); 
        querySnapshot.forEach((doc) => {
            const link = doc.data();
            if (lists[link.column]) lists[link.column].innerHTML += `<li><a href="${link.url}" class="hover:text-white">${link.text}</a></li>`;
        });
    });
}