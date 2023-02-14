import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const mail = document.querySelector('input');
const comment =  document.querySelector('textarea');
const form = document.querySelector('form');
const submitBtn = document.querySelector('button');

form.addEventListener('input', throttle(setData, 500));
submitBtn.addEventListener('click', onSubmitClick);

if (localStorage.getItem(STORAGE_KEY) !== null) { 
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  mail.value = storageData.emeil;
  comment.value = storageData.message;
}

function setData(e) { 
  const formFields = {
    email: `${mail.value}`,
    message: `${comment.value}`,
  };
  formFields[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formFields));
}

function onSubmitClick(e) { 
  e.preventDefault();

  if ((mail.value && comment.value) === '') { 
    return
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.clear();
  form.reset();
}