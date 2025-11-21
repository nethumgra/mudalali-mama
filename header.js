export function getHeaderHTML() {
    return `
    <header class="bg-white shadow-md sticky top-0 z-40 hidden md:block">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" id="logo-link" class="text-3xl font-bold text-mudalali-green-dark">
                <img id="logo-img" src="https://i.ibb.co/1tCywvyP/logo.png" class="h-10" alt="Mudalali Mama Logo">
            </a>

            <div class="flex-grow max-w-xl mx-4">
                <form class="flex">
                    <input type="text" placeholder="Search for anything..." class="w-full px-4 py-2 border border-mm-gray-DEFAULT rounded-l-md focus:outline-none focus:ring-2 focus:ring-mudalali-green">
                    <button type="submit" class="bg-mudalali-green text-white px-4 py-2 rounded-r-md hover:bg-mudalali-green-dark">
                        <i class="fa fa-search"></i>
                    </button>
                </form>
            </div>

            <div class="flex items-center space-x-6">
                <div class="text-right">
                    <div class="text-sm font-semibold">Support Hotline</div>
                    <div id="header-hotline" class="text-lg font-bold text-mudalali-green-dark">...</div>
                </div>
                <a href="account.html" id="desktop-account-btn" class="flex flex-col items-center text-gray-600 hover:text-mudalali-green">
                    <i class="fa fa-user text-xl"></i>
                    <span class="text-xs">Account</span>
                </a>
                <a href="wishlist.html" class="relative flex flex-col items-center text-gray-600 hover:text-mudalali-green">
                    <i class="fa fa-heart text-xl"></i>
                    <span id="wishlist-count-badge" class="absolute -top-2 -right-2 bg-mudalali-red text-white text-xs rounded-full px-1.5 py-0.5">0</span>
                    <span class="text-xs">Wishlist</span>
                </a>
                <button id="desktop-cart-btn" class="flex flex-col items-center text-gray-600 hover:text-mudalali-green relative">
                    <i class="fa fa-shopping-cart text-xl"></i>
                    <span id="cart-count-badge" class="absolute -top-2 -right-2 bg-mudalali-red text-white text-xs rounded-full px-1.5 py-0.5">0</span>
                    <span class="text-xs">Cart</span>
                </button>
            </div>
        </div>
    </header>

    <nav class="bg-mudalali-bg shadow-sm hidden md:block" style="border-bottom: 1px solid #e5e5e5;">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <div id="desktop-nav-links-container" class="flex space-x-6">
                <div class="relative group">
                    <a href="#" class="flex items-center bg-mudalali-green text-white px-4 py-2.5 rounded-t-md font-bold">
                        <i class="fa fa-bars mr-2"></i>
                        Categories
                        <i class="fa fa-chevron-down text-xs ml-2"></i>
                    </a>
                    
                    <div class="dropdown-menu absolute left-0 top-full w-56 bg-white shadow-lg rounded-b-md z-40">
                    </div>
                </div>
            </div>
            <a href="#" class="bg-mudalali-green-dark text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-mudalali-green">
                Order Status
            </a>
        </div>
    </nav>

    <header class="bg-white shadow-md sticky top-0 z-40 flex md:hidden items-center justify-between p-4">
        <button id="mobile-menu-btn" class="text-2xl text-gray-700">
            <i class="fa fa-bars"></i>
        </button>
      <a href="index.html" id="mobile-logo-link" class="text-2xl font-bold text-mudalali-green-dark">
        <img id="mobile-logo-img" src="https://i.ibb.co/1tCywvyP/logo.png" class="h-8" alt="Mudalali Mama Logo">
    </a>
    <a href="account.html" id="mobile-account-btn" class="text-2xl text-gray-700 w-8 text-right">
        <i class="fa fa-user"></i>
    </a>
    </header>`;
}

export function initHeaderEvents() {
    // Event listeners for static header elements if needed
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const menuDrawer = document.getElementById('menu-drawer');
    const desktopCartBtn = document.getElementById('desktop-cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if(menuDrawer) menuDrawer.classList.add('open');
        });
    }
    if (desktopCartBtn) {
        desktopCartBtn.addEventListener('click', () => {
            if(cartDrawer) cartDrawer.classList.add('open');
        });
    }
}