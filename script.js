document.addEventListener('DOMContentLoaded', () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Simulated dynamic weather update
    updateWeather();
    setInterval(updateWeather, 600000); // Every 10 mins

    // Animate some elements for "live" feel
    startSubtleAnimations();
});

function updateDateTime() {
    const now = new Date();

    // Time
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    document.getElementById('current-time').textContent = now.toLocaleTimeString('en-US', timeOptions);

    // Date
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', dateOptions);
}

function updateWeather() {
    // In a real app, this would be a fetch('https://api.openweathermap.org/...')
    // For signage, we simulate realistic variation or just hardcode high-end data
    const temps = [71, 72, 73, 70];
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];

    document.getElementById('weather-temp').textContent = `${randomTemp}°F`;
}

function startSubtleAnimations() {
    // Add subtle scaling to the active nav item
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        activeNav.style.animation = 'pulse 3s infinite ease-in-out';
    }

    // CSS for the pulse animation if not in style.css
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: translateX(0); opacity: 1; }
            50% { transform: translateX(5px); opacity: 0.8; }
            100% { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Simulated TV Guide Auto-scrolling or refresh logic
// (Usually for signage we'd cycle content every 30 seconds)
let cycleCounter = 0;
setInterval(() => {
    cycleCounter++;
    const sections = document.querySelectorAll('.grid-card');
    // Subtle highlight effect on different sections to draw eye
    sections.forEach(s => s.style.borderColor = 'rgba(255, 255, 255, 0.1)');
    sections[cycleCounter % sections.length].style.borderColor = 'rgba(0, 183, 175, 0.4)';
}, 10000);
