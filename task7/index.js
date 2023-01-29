const container = document.querySelector('.container');

const getRandomNumber=()=> Math.floor(Math.random()*90 + 10);
const getRandomColor=()=> `#${Math.floor(Math.random()*16777215).toString(16)}`;

const count = getRandomNumber();
const squares = []

for (let index = 0; index < count; index++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = getRandomColor();
  squares.push(square)
}
container.append(...squares)