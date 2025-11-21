import { db, publicDataPath } from '../config/firebase.js';
import { doc, getDoc, collection, onSnapshot, query, limit, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export async function loadHomeContent() {
    // මේවා එකින් එක Load කරනවා
    await loadHero();
    loadCategories();
    loadSmallBanners();
    loadNewArrivals();
    loadSellerStories();
    
    // Loader එක අයින් කරනවා
    const loader = document.getElementById('page-loader');
    if(loader) {
        loader.style.width = '100%';
        setTimeout(() => loader.classList.add('hidden'), 500);
    }
}

// 1. Hero Slider
async function loadHero() {
    const container = document.getElementById('hero-section');
    if(!container) return;
    
    const bannerIds = ['heroBanner1', 'heroBanner2', 'heroBanner3'];
    let slides = [];
    
    for (const id of bannerIds) {
        try {
            const docSnap = await getDoc(doc(db, publicDataPath, 'siteContent', id));
            if(docSnap.exists()) slides.push(docSnap.data());
        } catch(e) {}
    }

    if (slides.length === 0) {
        container.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">No banners available</div>';
        return;
    }

    let slidesHtml = '';
    let dotsHtml = '';

    slides.forEach((banner, index) => {
        const pcImg = banner.imageUrl_pc || banner.imageUrl || 'https://placehold.co/1200x400';
        const mobImg = banner.imageUrl_mob || pcImg;
        const link = banner.linkUrl || '#';
        
        slidesHtml += `
            <a href="${link}" class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <picture>
                    <source media="(min-width: 768px)" srcset="${pcImg}">
                    <img src="${mobImg}" class="w-full h-full object-cover">
                </picture>
            </a>`;
        
        dotsHtml += `<button class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>`;
    });

    container.innerHTML = `
        <div id="slider-wrapper" class="w-full h-full relative">${slidesHtml}</div>
        <button id="slider-prev" class="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 w-8 h-8 shadow-md z-20 transition-colors hidden"><i class="fa fa-chevron-left"></i></button>
        <button id="slider-next" class="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 w-8 h-8 shadow-md z-20 transition-colors hidden"><i class="fa fa-chevron-right"></i></button>
        <div id="slider-dots" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">${dotsHtml}</div>
    `;

    if(slides.length > 1) setupSliderLogic(container, slides.length);
}

function setupSliderLogic(container, count) {
    let currentIndex = 0;
    const slides = container.querySelectorAll('.hero-slide');
    const dots = container.querySelectorAll('.slider-dot');
    const prevBtn = container.querySelector('#slider-prev');
    const nextBtn = container.querySelector('#slider-next');
    
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');

    const showSlide = (idx) => {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (idx + count) % count;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    };

    let timer = setInterval(() => showSlide(currentIndex + 1), 5000);
    
    nextBtn.onclick = () => { showSlide(currentIndex + 1); clearInterval(timer); timer = setInterval(() => showSlide(currentIndex + 1), 5000); };
    prevBtn.onclick = () => { showSlide(currentIndex - 1); clearInterval(timer); timer = setInterval(() => showSlide(currentIndex + 1), 5000); };
}

// 2. Categories
function loadCategories() {
    const container = document.getElementById('categories-section');
    if(!container) return;

    onSnapshot(collection(db, publicDataPath, 'categories'), (snap) => {
        if(snap.empty) { container.innerHTML = '<p class="text-sm text-gray-500">No categories.</p>'; return; }
        container.innerHTML = '';
        snap.forEach(doc => {
            const c = doc.data();
            container.innerHTML += `
                <a href="shop.html?category=${encodeURIComponent(c.name)}" class="flex-shrink-0 w-24 flex flex-col items-center gap-2 group">
                    <div class="w-20 h-20 rounded-full shadow-md flex items-center justify-center overflow-hidden bg-white border border-gray-100 transition-transform group-hover:scale-105" style="background-color: ${c.color || '#fff'}">
                        <img src="${c.imageUrl || 'https://placehold.co/50'}" class="w-12 h-12 object-contain">
                    </div>
                    <span class="text-xs font-semibold text-gray-700 text-center group-hover:text-mudalali-green">${c.name}</span>
                </a>`;
        });
    });
}

// 3. Small Banners
async function loadSmallBanners() {
    const container = document.getElementById('small-banners-section');
    if(!container) return;

    const ids = ['smallBanner1', 'smallBanner2', 'smallBanner3'];
    container.innerHTML = '';
    
    for(const id of ids) {
        try {
            const snap = await getDoc(doc(db, publicDataPath, 'siteContent', id));
            if(snap.exists()) {
                const b = snap.data();
                container.innerHTML += `
                <a href="${b.linkUrl || '#'}" class="block rounded-lg shadow-lg overflow-hidden hover:opacity-90 w-[80vw] md:w-auto flex-shrink-0 scroll-snap-align-start aspect-[2/1]">
                    <img src="${b.imageUrl || 'https://placehold.co/400x200'}" class="w-full h-full object-cover">
                </a>`;
            }
        } catch(e){}
    }
}

// 4. New Arrivals
function loadNewArrivals() {
    const container = document.getElementById('new-arrivals-section');
    if(!container) return;

    const q = query(collection(db, publicDataPath, 'products'), orderBy('createdAt', 'desc'), limit(10));
    
    onSnapshot(q, (snap) => {
        if(snap.empty) { container.innerHTML = '<p class="col-span-full text-center text-gray-500">No products yet.</p>'; return; }
        container.innerHTML = '';
        snap.forEach(doc => {
            const p = doc.data();
            const price = parseFloat(p.price || 0).toFixed(2);
            let badge = p.saleTag ? `<span class="sale-tag">${p.saleTag}</span>` : '';
            
            container.innerHTML += `
                <div class="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                    <a href="product.html?id=${doc.id}" class="block relative w-full h-40 mb-3 overflow-hidden rounded bg-gray-50">
                        <img src="${p.imageUrl || 'https://placehold.co/150'}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                        ${badge}
                    </a>
                    <div>
                        <p class="text-[10px] text-gray-500 uppercase tracking-wide mb-1 line-clamp-1">${p.category || 'General'}</p>
                        <a href="product.html?id=${doc.id}"><h3 class="font-semibold text-sm line-clamp-2 text-gray-800 mb-1 h-10 hover:text-mudalali-green">${p.name}</h3></a>
                        <div class="flex items-baseline gap-2">
                            <p class="text-mudalali-green font-bold text-sm">Rs. ${price}</p>
                            ${p.originalPrice ? `<span class="text-xs text-gray-400 line-through">Rs. ${p.originalPrice}</span>` : ''}
                        </div>
                    </div>
                </div>`;
        });
    });
}

// 5. Seller Stories
function loadSellerStories() {
    const container = document.getElementById('seller-stories-section');
    if(!container) return;

    const q = query(collection(db, publicDataPath, 'stories'), orderBy('createdAt', 'desc'), limit(5));
    
    onSnapshot(q, (snap) => {
        if(snap.empty) { container.innerHTML = '<p class="text-sm text-gray-500 pl-2">No stories yet.</p>'; return; }
        container.innerHTML = '';
        snap.forEach(doc => {
            const s = doc.data();
            container.innerHTML += `
                <div class="w-[75vw] md:w-[30vw] lg:w-[20vw] bg-white rounded-lg shadow-md flex-shrink-0 overflow-hidden">
                    <div class="p-3 flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><img src="${s.profileUrl || 'https://placehold.co/30'}" class="w-full h-full object-cover"></div>
                        <p class="text-xs font-bold text-gray-700">${s.storeName || 'Seller'}</p>
                    </div>
                    <a href="story-detail.html?id=${doc.id}" class="block aspect-video bg-gray-100 relative">
                        <img src="${s.imageUrl || 'https://placehold.co/300x200'}" class="w-full h-full object-cover">
                    </a>
                    <div class="p-3 text-xs text-gray-500 flex justify-between">
                         <span><i class="fa fa-heart text-red-500"></i> ${s.likeCount || 0}</span>
                         <span><i class="fa fa-comment"></i> ${s.commentCount || 0}</span>
                    </div>
                </div>`;
        });
    });
}