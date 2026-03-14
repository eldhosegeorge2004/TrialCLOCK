function updateClock() {
    const now = new Date();
    
    // Precise string formatting from snippet
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    document.getElementById('time').textContent = timeStr;
    document.getElementById('date').textContent = dateStr;
    
    // Dynamic Color Cycle: 60s loop (6 degrees per second)
    const hue = (now.getSeconds() * 6); 
    document.documentElement.style.setProperty('--bg-gradient-start', `hsl(${hue}, 70%, 50%)`);
}

// Initial call
updateClock();

// Update every second
setInterval(updateClock, 1000);

// Add subtle tilt effect on mouse move
document.addEventListener('mousemove', (e) => {
    const card = document.getElementById('clock-card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

