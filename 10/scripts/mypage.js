const fanfare = new Audio('sounds/荘厳な雰囲気.mp3'); 
const fanfare2 = new Audio('sounds/ドーン.mp3'); 
const fanfare3 = new Audio('sounds/ジャジャーン.mp3'); 
window.addEventListener('load', function(){
    gsap.to('.foreground', {duration: 1, y: '100%'});
    gsap.to('#bear_hand', {delay: 0.5, duration: 1, rotate: 20});
    gsap.to('#fishLine', {delay: 0.5, duration: 1, x: 43, y: -115});
    gsap.to('#fish', {delay: 0.5, duration: 1, x: 43, y: -115});
});

document.getElementById('youkoso').addEventListener('click', function(){
    gsap.set('#omedetou', {opacity: 0, scale: 1});
    gsap.set('#omedetou', {opacity: 100, y: 0});
    gsap.to('#omedetou', {duration: 0.1, scale: 1.3, repeat: 16, yoyo: true});
    fanfare.currentTime = 0;
    fanfare.play();
    fanfare2.currentTime = 0;
    fanfare2.play();
    fanfare3.volume = 0.3;
    fanfare3.currentTime = 0;
    fanfare3.play();
});

