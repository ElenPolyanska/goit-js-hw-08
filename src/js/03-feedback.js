import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

populateTextarea();

formEl.addEventListener('input', throttle(formDataToLocalStorage, 500))
formEl.addEventListener('submit', formSubmit);

function formDataToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email: inputEl.value, message: textareaEl.value }));    
};

function formSubmit(event) {
    event.preventDefault();

    console.log(localStorage.getItem(LOCAL_STORAGE_KEY));

    event.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);    
};

function populateTextarea() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedSavedData = JSON.parse(savedData);
    
    if (savedData) {        
        inputEl.value = parsedSavedData.email;
        textareaEl.value = parsedSavedData.message;        
    };    
};