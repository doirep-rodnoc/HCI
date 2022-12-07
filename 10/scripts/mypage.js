const fanfare = new Audio('sounds/ジャジャーン.mp3'); 
window.addEventListener('load', function(){
    gsap.to('.foreground', {duration: 1, y: '100%'});
    gsap.to('#bear_hand', {delay: 0.5, duration: 1, rotate: 20});
    gsap.to('#fishLine', {delay: 0.5, duration: 1, x: 43, y: -115});
    gsap.to('#fish', {delay: 0.5, duration: 1, x: 43, y: -115});
});

document.getElementById('fish').addEventListener('click', function(){
    fanfare.currentTime = 0;
    fanfare.play();
});

