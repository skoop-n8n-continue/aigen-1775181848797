let appData = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

async function fetchData() {
    try {
        const response = await fetch('data.json', { cache: 'no-store' });
        appData = await response.json();
        applyData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function applyData() {
    if (!appData) return;

    // Apply colors
    if (appData.colors) {
        document.documentElement.style.setProperty('--primary', appData.colors.primary);
        document.documentElement.style.setProperty('--dark', appData.colors.dark);
        document.documentElement.style.setProperty('--light', appData.colors.light);
        document.documentElement.style.setProperty('--secondary', appData.colors.secondary);
    }

    // Apply text and images
    document.getElementById('hotel-logo-text').innerHTML = appData.hotelName.replace(' ', '<br>');
    document.getElementById('guest-name').textContent = appData.guestName;
    document.getElementById('weather-location').textContent = appData.location;
    document.getElementById('background-overlay').style.backgroundImage = `url('${appData.backgroundUrl}')`;

    // Nav Items
    const navContainer = document.getElementById('nav-items');
    navContainer.innerHTML = '';
    appData.navItems.forEach(item => {
        const div = document.createElement('div');
        div.className = `nav-item ${item.active ? 'active' : ''}`;
        div.textContent = item.label;
        navContainer.appendChild(div);
    });

    // TV Guide
    document.getElementById('tv-guide-title').textContent = 'TV Guide';
    const tvList = document.getElementById('tv-list');
    tvList.innerHTML = '';
    appData.tvGuide.forEach(item => {
        const div = document.createElement('div');
        div.className = 'tv-item';
        if (item.status === 'LIVE') div.classList.add('playing');

        div.innerHTML = `
            <span class="channel">${item.channel}</span>
            <span class="show">${item.show}</span>
            <span class="${item.status === 'LIVE' ? 'time-status' : 'time'}">${item.status || item.time}</span>
        `;
        tvList.appendChild(div);
    });

    // Attraction
    document.getElementById('attraction-title').textContent = appData.attraction.title;
    document.getElementById('attraction-img').src = appData.attraction.imageUrl;
    document.getElementById('attraction-name').textContent = appData.attraction.name;
    document.getElementById('attraction-desc').textContent = appData.attraction.description;

    // Restaurant
    document.getElementById('restaurant-title').textContent = appData.restaurant.title;
    document.getElementById('restaurant-img').src = appData.restaurant.imageUrl;
    document.getElementById('restaurant-name').textContent = appData.restaurant.name;
    document.getElementById('restaurant-desc').textContent = appData.restaurant.description;

    // Room Service
    document.getElementById('room-service-title').textContent = appData.roomService.title;
    document.getElementById('room-service-img').src = appData.roomService.imageUrl;
    document.getElementById('room-service-desc').textContent = appData.roomService.description;
    document.getElementById('room-service-button').textContent = appData.roomService.buttonLabel;

    // Initialize animations and dynamic elements
    updateWeather();
    setInterval(updateWeather, 600000);
    startSubtleAnimations();
    startCycleHighlight();
}

function updateDateTime() {
    const now = new Date();
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', timeOptions);
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
}

function updateWeather() {
    const temps = [71, 72, 73, 70];
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];
    const unit = appData ? appData.weatherUnit : 'F';
    document.getElementById('weather-temp').textContent = `${randomTemp}°${unit}`;
    document.getElementById('weather-desc').textContent = 'Partly Cloudy';
}

function startSubtleAnimations() {
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        activeNav.style.animation = 'pulse 3s infinite ease-in-out';
    }
    if (!document.getElementById('pulse-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-style';
        style.innerHTML = `
            @keyframes pulse {
                0% { transform: translateX(0); opacity: 1; }
                50% { transform: translateX(5px); opacity: 0.8; }
                100% { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function startCycleHighlight() {
    let cycleCounter = 0;
    setInterval(() => {
        cycleCounter++;
        const sections = document.querySelectorAll('.grid-card');
        sections.forEach(s => s.style.borderColor = 'rgba(255, 255, 255, 0.1)');
        sections[cycleCounter % sections.length].style.borderColor = 'rgba(0, 183, 175, 0.4)';
    }, 10000);
}
