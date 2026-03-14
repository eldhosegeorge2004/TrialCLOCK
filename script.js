// State Management
let settings = {
    colorMode: 'dynamic',
    manualColor: '#ffffff',
    timezone: 'local',
    font: "'Outfit', sans-serif"
};

// DOM Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const colorModeSelect = document.getElementById('color-mode');
const customColorContainer = document.getElementById('custom-color-container');
const manualColorInput = document.getElementById('manual-color');
const timezoneSelect = document.getElementById('timezone-select');
const fontSelect = document.getElementById('font-select');
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const clockCard = document.getElementById('clock-card');

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('clock-settings');
    if (saved) {
        settings = { ...settings, ...JSON.parse(saved) };
        applySettings();
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('clock-settings', JSON.stringify(settings));
}

// Apply settings to UI
function applySettings() {
    // Color Mode
    colorModeSelect.value = settings.colorMode;
    customColorContainer.classList.toggle('hidden', settings.colorMode === 'dynamic');
    if (settings.colorMode === 'custom') {
        document.documentElement.style.setProperty('--bg-gradient-start', settings.manualColor);
    }
    manualColorInput.value = settings.manualColor;

    // Timezone
    timezoneSelect.value = settings.timezone;

    // Font
    fontSelect.value = settings.font;
    clockCard.style.fontFamily = settings.font;
}

function updateClock() {
    const now = new Date();
    
    // Formatting Options
    const options = { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };

    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    if (settings.timezone !== 'local') {
        options.timeZone = settings.timezone;
        dateOptions.timeZone = settings.timezone;
    }

    const timeStr = now.toLocaleTimeString('en-US', options);
    const dateStr = now.toLocaleDateString('en-US', dateOptions);

    timeDisplay.textContent = timeStr;
    dateDisplay.textContent = dateStr;
    
    // Dynamic Color Cycle: only if in dynamic mode
    if (settings.colorMode === 'dynamic') {
        const hue = (now.getSeconds() * 6); 
        document.documentElement.style.setProperty('--bg-gradient-start', `hsl(${hue}, 70%, 50%)`);
    }
}

// Event Listeners
settingsBtn.addEventListener('click', () => settingsPanel.classList.remove('hidden'));
closeSettings.addEventListener('click', () => settingsPanel.classList.add('hidden'));

colorModeSelect.addEventListener('change', (e) => {
    settings.colorMode = e.target.value;
    applySettings();
    saveSettings();
});

manualColorInput.addEventListener('input', (e) => {
    settings.manualColor = e.target.value;
    applySettings();
    saveSettings();
});

timezoneSelect.addEventListener('change', (e) => {
    settings.timezone = e.target.value;
    saveSettings();
    updateClock();
});

fontSelect.addEventListener('change', (e) => {
    settings.font = e.target.value;
    applySettings();
    saveSettings();
});

// Tilt Effect
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
    clockCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Initialize
loadSettings();
updateClock();
setInterval(updateClock, 1000);

