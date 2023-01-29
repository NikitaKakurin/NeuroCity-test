const form = document.getElementById('form');
const nameEl = document.getElementById('name');
const phoneEl = document.getElementById('tel');
const passEl = document.getElementById('pass');
const repeatPassEl = document.getElementById('passRepeat');

function checkName(name){
  const ru = /^[а-яё]+$/i.test(name);
  const en = /^[a-z]+$/i.test(name);
  if (! (ru ^ en) ) {
      nameEl.setCustomValidity("Используйте или кириллицу, или латиницу, только буквы");
  } else {
      nameEl.setCustomValidity("");
  }
  nameEl.reportValidity();
}

function checkPhone(phone){
  const telPattern=/\+?[0-9]{10,15}/;
  const phoneValidation = telPattern.test(phone);
  if (!phoneValidation) {
      phoneEl.setCustomValidity("от 10 до 15 символов, состоит из цифр, может начинаться с плюса");
  } else {
      phoneEl.setCustomValidity("");
  } 
  phoneEl.reportValidity(); 
}

function checkPassword(password){
  const passPattern=/(?=.*\d)(?=.*[A-Z]).*/;
  const passValidation = passPattern.test(password);
  if (!passValidation) {
      passEl.setCustomValidity("обязательно хотя бы одна заглавная буква и цифра");
  } else {
      passEl.setCustomValidity("");
  }  
  passEl.reportValidity();
}

function checkRepeat(repeatPass, pass){
  if (!(repeatPass==pass)) {
      repeatPassEl.setCustomValidity("пароли не совпадают");
  } else {
      repeatPassEl.setCustomValidity("");
  }  
  repeatPassEl.reportValidity();
}


const handleSubmit = (e) => {
  console.log('submit');
  e.preventDefault();
  const formData = new FormData(this.form);
  const data = Object.fromEntries(formData.entries());
  checkName(data.name);
  checkPhone(data.phone);
  checkPassword(data.pass);
  checkRepeat(data.passRepeat,data.pass);

  if(repeatPassEl.checkValidity()&&passEl.checkValidity()&&nameEl.checkValidity()&&phoneEl.checkValidity()){
    alert('ok!')
  }

}

form.addEventListener('submit', handleSubmit);
nameEl.addEventListener('input', ()=>nameEl.setCustomValidity(''));
phoneEl.addEventListener('input', ()=>phoneEl.setCustomValidity(''));
passEl.addEventListener('input', ()=>passEl.setCustomValidity(''));
repeatPassEl.addEventListener('input', ()=>repeatPassEl.setCustomValidity(''));


