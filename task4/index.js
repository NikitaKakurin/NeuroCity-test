const URL =  'https://reqres.in/api/users';

const cardsContainer = document.querySelector('#users');

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
class UserCard {
  constructor({id, email, first_name, last_name, avatar}) {
    this.id = id;
    this.email = email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.avatar = avatar;
    this.fio = `${this.firstName} ${this.lastName}`;
    this.initialization();
  }

  initialization = () => {
    this.card = createOneElement('div', ['card']);
    this.title = createOneElement('h3', ['card__title'],this.fio );
    this.image = createOneElement('img', ['card__img']);
    this.image.src = this.avatar;
    this.image.alt = this.fio;
    this.emailLink = createOneElement('a', ['card__email'],'Email');
    this.emailLink.href = `mailto:${this.email}`;
    this.card.append(this.image, this.title, this.emailLink)
  }

  getCard = () => this.card;
}

class Pagination{
  constructor(elementId, page, total_pages){
    this.container = document.getElementById(elementId);
    this.currentPage = page;
    this.totalPages = total_pages;
    this.paginationItems = [];
    this.initialization();
  }

  handleClick = (e) =>{
    const target = e.target;
    if(target.classList.contains('pagination__item-active'))return;
    if(!target.classList.contains('pagination__item')) return;
    this.currentItem.classList.remove('pagination__item-active');
    target.classList.add('pagination__item-active');
    this.currentItem = target;
    getPageUsers(target.textContent, handleUsersData)
  }

  initialization = () => {
    this.container.innerHTML = '';
    for(let i=1; i<=this.totalPages; i++){
      const el = createOneElement('div', ['pagination__item'], i)
      if(i===this.currentPage) {
        el.classList.add('pagination__item-active');
        this.currentItem = el;
      }
      this.paginationItems.push(el);
    }
    this.container.append(...this.paginationItems)
    this.container.addEventListener('click',this.handleClick)
  }

}

const getPageUsers = async(page, cb) => {
  try{
    const response = await fetch(`${URL}?page=${page}`);
    if(response.ok){
      const data = await response.json();
      cb(data);
    }
  } catch(e){
    throw new Error(e?.message)
  }
}

const renderCard = (users) => {
  const cards = users.map((item)=>{
     const card = new UserCard(item)
     return card.getCard();
  })
  cardsContainer.innerHTML = "";
  cardsContainer.append(...cards)
}

const handleUsersData = ({data, page, total_pages}) => {
  const sortedUsers = data.sort((a, b)=>a.first_name > b.first_name ? 1 : -1)
  renderCard(sortedUsers);
  new Pagination('pagination', page, total_pages)
}

getPageUsers(1, handleUsersData)

