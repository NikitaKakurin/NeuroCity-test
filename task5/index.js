const button = document.getElementById('button');
const subjects = document.querySelectorAll('.subject');
let isVisible = false;
let startTime;

function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function showHide(){
  if(isVisible){
    subjects.forEach((el)=>{
      //  проверка времени анимации
      // startTime = Date.now();
      // ----------------
      el.classList.add('bounceOut');
      el.classList.remove('bounceIn');

    })
    isVisible = false;
  }else{
    subjects.forEach((el)=>{
      //  проверка времени анимации
      // startTime = Date.now();
      // ----------------
      el.classList.remove('bounceOut');
      el.classList.add('bounceIn')
      el.classList.add('subject-show')
      
    })
    isVisible = true;
  }
}

const handleClick = debounce(() => showHide());

//  проверка времени анимации
// subjects.forEach((el)=>{
//   el.addEventListener('animationend', handleAnimationend)
// })

// function handleAnimationend(e){
//   const finishTime=Date.now()
//   console.log((finishTime-startTime)/1000)
// }
// ---------------------------

button.addEventListener('click', handleClick)