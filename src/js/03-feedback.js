import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');
const inputEl = document.querySelector('input');

formEl.addEventListener('input', throttle(onFormInput, 1000));
formEl.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';

const formObj = {};
let saveMessage = {};

updateFormData();

function onFormInput(event) {
  formObj[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formObj));
}

function onFormSubmit(event) {
  event.preventDefault();
  getSaveMessages();
  if (saveMessage) {
    console.log(saveMessage);
    localStorage.removeItem(STORAGE_KEY);
    formEl.reset();
  }
}

function getSaveMessages() {
  saveMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function updateFormData() {
  getSaveMessages();
  if (saveMessage) {
    textareaEl.value = saveMessage.message;
    inputEl.value = saveMessage.email;
  }
}