const username = "username";
const pwd = "HCI";

const errorSound = new Audio('sounds/fail.mp3');
const startSound = new Audio('sounds/start.mp3');
const shakuhachiSound = new Audio('sounds/shakuhachi.mp3');
const suiryuSound = new Audio('sounds/suiryu.mp3');
const suimenSound = new Audio('sounds/suimen.mp3');

var fishmove = false;
var bubbleVel = 0.5;
var fishForm = document.getElementsByClassName('fishForm')[0];
var collider = document.getElementById('collider');
var fishingTools = document.getElementsByClassName("fishingTools")[0];
var colliderRect;

console.log("hello");

window.addEventListener('load', function(){
  gsap.to('.foreground', {duration: 1, y: '-100%'}); //ページ読み込み時の白前景を上に
});

/**
 * bubbly-bg.jsを用いた背景のアニメーション．
 * 引数で速度を指定することで泡の速度が変化する．
 * @param {*} bubbleVel 
 */
function bubbleEffect(bubbleVel){
  bubbly({
    blur:5,
    colorStart: '#194167',
    colorStop: '#112144',
    radiusFunc:() => 5 + Math.random() * 15,
    angleFunc:() => -Math.PI / 2,
    velocityFunc:() => Math.random() * bubbleVel,
    bubbleFunc:() => `hsla(${200 + Math.random() * 50}, 100%, 65%, .1)`,
    bubbles: 30
  });
}

bubbleEffect(0.5);

/**ページ読み込み完了時の処理 */
window.addEventListener('load', function(){
  gsap.set(".fishForm", {x: 100, opacity: 0, rotate: 10}); // おさかな初期位置
  gsap.set("#caption", {x: 100, opacity: 0}); // 説明文初期位置
  gsap.to("#caption", {duration: 1, x: 0, opacity: 1}); // 説明文フェードイン
  gsap.to(".fishForm", {delay: 0.2, duration: 1, x: 0, opacity: 1, rotate: 0}) ; // おさかなフェードイン
  gsap.to(".regButtonField", {delay: 1, duration: 1, x: -10, opacity: 1});
  fishingTools.style.left = (Math.random() * 70) + '%';
});
  
/** 入力フィールドに変化があった時に魚を振動させるアニメーション */
document.querySelectorAll(".inputField").forEach((elm) => {
  elm.addEventListener('change', function(){
    gsap.to(".fishForm", 0.2, {
      keyframes: {
        y: [3,0]
      }
    })
  });
});

/** ログインボタンが押された時の処理 */
document.getElementById('regBtn').addEventListener('click', function(){
  if((document.getElementById('uName').value) && (document.getElementById('pwdField').value)){ // 入力フィールドが両方空白でなければ 
    gsap.to(".regButtonField", {duration: 0.5, opacity: 0});
    gsap.to("#caption", {duration: 0.5, opacity: 0});
    gsap.to(".fishingTools", {duration: 1, y: 300});
    document.getElementById('errmsg').textContent = "";
    document.getElementById('regBtn').setAttribute('disabled', true);
    document.getElementById('uName').setAttribute('readonly', true);
    document.getElementById('pwdField').setAttribute('readonly', true);
    colliderRect = collider.getBoundingClientRect(); 

    var tsurareroImg = document.createElement("img");
    tsurareroImg.src = "images/tsurarero.png";
    document.getElementById("tsurarero").appendChild(tsurareroImg);
    gsap.set("#tsurarero", {scale: 3});
    gsap.to("#tsurarero", {duration: 0.5, scale: 1, opacity: 100});
    gsap.to("#tsurarero", {delay: 3, duration: 0.1, opacity: 0});

    fishmove = true; 
    shakuhachiSound.currentTime = 0;
    shakuhachiSound.volume = 0.5;
    shakuhachiSound.play();
    startSound.currentTime = 0;
    startSound.play();
    suimenSound.currentTime = 0;
    suimenSound.play();
  }else{ // 入力フィールドに未入力がある場合の処理
    errorSound.currentTime = 0;
    errorSound.play();
    document.getElementById('errmsg').textContent = "入力されていない項目があります．";
    gsap.to(".fishForm", 0.5, {
      keyframes:{
        x: [-2,2,-2,2,0] // エラー時のアニメーションのキーフレーム
      }
    });
  }
});

/** 
 * 魚のマウスストーカの処理．マウスが動くたびに呼び出されるが，
 * fishmoveフラグがfalseの間は魚は動かない．
 */
document.addEventListener('mousemove', function(e){
  if(fishmove){     
    fishForm.style.position = 'fixed'; 
    gsap.to(".fishForm", {duration: 0.3, x:(e.clientX - 10), y:(e.clientY - 510)});

    /** マウスカーソルが指定の位置(釣り針の位置)に来たときの処理(釣られる処理) */
    if(((-40 < (colliderRect.x - e.clientX) && (colliderRect.x - e.clientX) < -10) && Math.abs(300-e.clientY) < 20)){
      suimenSound.currentTime = 0;
      suimenSound.play();
      suiryuSound.currentTime = 0;
      suiryuSound.play();
      fishmove = false;
      if(!document.getElementById("effectChk").checked){
        bubbleEffect(-100);
        fishForm.style.transformOrigin = "0% 40%";
        gsap.to(".fishForm", {duration: 0.4, rotate: 80, repeat: 10, yoyo: true});
        gsap.to(".fishingTools", {duration: 0.5, y: 500, repeat:10, yoyo:true});
        gsap.to(".fishForm", {duration: 0.5, y: 0, repeat:10, yoyo:true});
        gsap.to(".foreground", {delay: 4, duration: 1, y:0});
        setTimeout(function(){
          if(document.getElementById('uName').value == username && document.getElementById('pwdField').value == pwd){
            window.location.href='mypage.html';
          }else{
            window.location.reload();
          }
        }, 5000);
      }else{
        gsap.to(".foreground", {duration: 1, y:0});
        setTimeout(function(){
          if(document.getElementById('uName').value == username && document.getElementById('pwdField').value == pwd){
            window.location.href='mypage.html';
          }else{
            window.location.reload();
          }
        }, 1000);
      }
      
    }
  }
});

//釣り針の当たり判定のウィンドウサイズ変更時に対応するための処理
window.addEventListener('resize', function(){
  colliderRect = collider.getBoundingClientRect(); 
});

//ブラウザバックされた場合の再読み込み
window.onpageshow = function(event) {
	if (event.persisted) {
		 window.location.reload();
	}
};
