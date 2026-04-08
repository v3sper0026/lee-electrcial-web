document.querySelectorAll('.slider').forEach(slider => {

    const afterWrap = slider.querySelector('.after-wrap');
    const line = slider.querySelector('.slider-line');
    const handle = slider.querySelector('.slider-handle')
    let isDragging = false;

    function setPos(percent) {
        percent = Math.max(0, Math.min(100, percent));
        afterWrap.style.width = percent + '%';
        line.style.left = percent + '%';
        handle.style.left = percent + '%';
    }

    function getPct(e) {
        const rect = slider.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        return ((clientX - rect.left) / rect.width) * 100;
    }

    slider.addEventListener('mousedown',(e) => { isDragging = true; setPos(getPct(e)); });
    window.addEventListener('mousemove', (e) => { if (isDragging) setPos(getPct(e)); });
    window.addEventListener('mouseup', () => isDragging = false);

    slider.addEventListener('touchstart', (e) => { isDragging = true; setPos(getPct(e)); }, { passive: true });
    window.addEventListener('touchmove', (e) => {if (isDragging) setPos(getPct(e)); }, { passive: true });
    window.addEventListener('touchend', () => isDragging = false);

    setPos(50);

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));