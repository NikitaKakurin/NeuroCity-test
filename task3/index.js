const video = document.querySelector('#player');
const time = document.querySelector('.video__time');
let interval;

const handleClickOnVideo = ()=>{
    if (video.paused){
      video.play();
      startTracking();
      video.addEventListener("ended", handleEndedVideo,{once:true});
    }else{
      video.pause();
    }
    function handleEndedVideo(){
      video.load();
      video.currentTime = 0;
    }
}

const startTracking = () => {
  interval = setInterval(() => {
    time.textContent=formatTime(video.currentTime);
  }, 1)
};

const stopTracking = () => {
  if (interval) {
    clearInterval(interval);
  }
};

function formatTime(time) { 
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  let mmm =  Math.floor((time % 1)*1000);
  if(minutes < 10) {
  minutes = '0' + minutes;
  }

  if(seconds < 10) {
  seconds = '0' + seconds;
  }

  if(mmm < 10) {
    mmm = '00' + mmm;
  } else if(mmm < 100) {
    mmm = '0' + mmm;
  }
  return minutes + ':' + seconds + ':' + mmm;
}

video.addEventListener('click',handleClickOnVideo)
video.addEventListener('play', startTracking);
video.addEventListener('pause', stopTracking);