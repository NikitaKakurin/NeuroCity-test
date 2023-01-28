const imagesData = [
  {
    url:'./assets/img/1.jpg',
    title:'title1'
  },
  {
    url:'./assets/img/2.jpg',
    title:'title2'
  },
  {
    url:'./assets/img/3.jpg',
    title:'title3'
  },
  {
    url:'./assets/img/4.jpg',
    title:'title4'
  },
  {
    url:'./assets/img/5.jpg',
    title:'title5'
  },
  {
    url:'./assets/img/6.jpg',
    title:'title6'
  },
  {
    url:'./assets/img/7.jpg',
    title:'title7'
  },
  {
    url:'./assets/img/8.jpg',
    title:'title8'
  },
  {
    url:'./assets/img/9.jpg',
    title:'title9'
  },
];

function createOneElement(tag, classNames, content) {
  if(!Array.isArray(classNames)){
    throw new Error(`createOneElement: classNames is not array - ${classNames}`)
  }
  const el = document.createElement(tag);
  classNames.forEach((itemClass) => {
    el.classList.add(itemClass.trim());
  });
  if (content !== undefined) {
    el.innerHTML = content;
  }
  return el;
}

class Slider{
  constructor(sliderId, imagesData){
    this.slider = document.getElementById(sliderId); 
    this.isEnabled = true
    this.currentItem = 0;
    this.slidersCount = imagesData.length;
    this.initialization(imagesData);
  }

  changeCurrentItem = (n) => {
  	this.currentItem = (n + this.slidersCount) % this.slidersCount;
  }

  hideItem = (direction) => {
  	this.isEnabled = false;
  	this.sliderItems[this.currentItem].classList.add(direction);
  	this.sliderItems[this.currentItem].addEventListener('animationend', function() {
  		this.classList.remove('slider__item-active', direction);
  	});
  }

  showItem = (direction) => {
  	this.sliderItems[this.currentItem].classList.add('slider__item-next', direction);
  	this.sliderItems[this.currentItem].addEventListener('animationend', ()=>{
      const currentSlider = this.sliderItems[this.currentItem];
  		currentSlider.classList.remove('slider__item-next', direction);
  		currentSlider.classList.add('slider__item-active');
  		this.isEnabled = true;
  	});
  }

  leafToPrev = () => {
    if(!this.isEnabled) return;
    this.hideItem('to-right');
  	this.changeCurrentItem(this.currentItem - 1);
  	this.showItem('from-left');
  }

  leafToNext = () => {
    if(!this.isEnabled) return;
    this.hideItem('to-left');
  	this.changeCurrentItem(this.currentItem + 1);
  	this.showItem('from-right');
  }

  handleClick = (event) => {
    if(event.target.classList.contains('slider__icon-prev')) {
      this.leafToPrev();
      return;
    }

    if(event.target.classList.contains('slider__icon-next')) {
      this.leafToNext();
      return;
    }    
  }

  createButtons = () => {
    this.controls = createOneElement('div', ['slider__controls']);
    this.prevBtn = createOneElement('button', ['slider__arrow', 'slider__arrow-prev']);
    this.nextBtn = createOneElement('button', ['slider__arrow', 'slider__arrow-next']);
    this.prevBtn.type = 'button';
    this.nextBtn.type = 'button';
    this.prevBtn.append(createOneElement('span', ['slider__arrow_icon','slider__icon-prev']));
    this.nextBtn.append(createOneElement('span', ['slider__arrow_icon','slider__icon-next']));
    this.controls.append(this.prevBtn, this.nextBtn)
    this.controls.addEventListener('click', this.handleClick)
  }

  createImages = (imagesData) => {
    this.sliderItemsWrapper = createOneElement('div', ['slider__wrapper']);
    this.sliderItems = imagesData.map(({url, title}, index)=>{
      const el = createOneElement('div', ['slider__item'])
      if(index===0) el.classList.add('slider__item-active')
      const titleEl = createOneElement('div', ['slider__item_text'], title )
      const image = createOneElement('img', ['slider__item_img']);
      image.src = url;
      image.alt = title;
      el.append(titleEl, image)
      return el;
    })
    this.sliderItemsWrapper.append(...this.sliderItems)
  }

  swipedetect = (el) => {
	  let surface = el;
	  let startX = 0;
	  let startY = 0;
	  let distX = 0;
	  let distY = 0;
	  let startTime = 0;
	  let elapsedTime = 0;
    
	  let threshold = 50;
	  let restraint = 200;
	  let allowedTime = 500;

    const checkDirection = () => {
      if (elapsedTime <= allowedTime){
	  		if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
	  			if ((distX > 0)) {
	  					this.leafToPrev();
	  			} else {
	  					this.leafToNext();
	  			}
	  		}
	  	}
    }
    
	  surface.addEventListener('mousedown', (e)=>{
	  	startX = e.pageX;
	  	startY = e.pageY;
	  	startTime = new Date().getTime();
	  	e.preventDefault();
	  }, false);
  
	  surface.addEventListener('mouseup', (e)=>{
      if (!this.isEnabled) return;
	  	distX = e.pageX - startX;
	  	distY = e.pageY - startY;
      checkDirection();
	  	e.preventDefault();
	  }, false);
  
	  surface.addEventListener('touchstart', (e)=>{
        if (!this.isEnabled) return;
        if(e.target.classList.contains('slider__icon-prev')) {
          this.leafToPrev();
          return;
        }
      
        if(e.target.classList.contains('slider__icon-next')) {
          this.leafToNext();
          return;
        } 
	  	
	  		let touchobj = e.changedTouches[0];
	  		startX = touchobj.pageX;
	  		startY = touchobj.pageY;
	  		startTime = new Date().getTime();
	  		e.preventDefault();
	  }, false);
  
	  surface.addEventListener('touchmove', (e)=>{
	  		e.preventDefault();
	  }, false);
  
	  surface.addEventListener('touchend', (e)=>{
        if (!this.isEnabled) returnl
	  		let touchobj = e.changedTouches[0];
	  		distX = touchobj.pageX - startX;
	  		distY = touchobj.pageY - startY;
        checkDirection();
	  		e.preventDefault();
	  }, false);
  }

  initialization = (imagesData) => {
    this.createImages(imagesData);  
    this.createButtons();

    this.slider.append(this.sliderItemsWrapper, this.controls)
    this.swipedetect(this.controls)
  }
}

const slider = new Slider('slider',imagesData)