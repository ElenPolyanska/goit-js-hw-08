import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const input =  document.querySelector('.feedback-form input');
const textArea = document.querySelector('.feedback-form textarea');
let email;
let message;
let data;

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 250));

function onFormSubmit (event) {
    event.preventDefault();
    
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(data);
};

function createDataObject (email, message) {
    const valueObject = {
        email,
        message
    };
    return valueObject;
}
function onMessageInput (event) {
    if(event.target.name === "email"){
        email = event.target.value;
    }
    if(event.target.name === "message"){
        message = event.target.value;
    }

    data = createDataObject(email, message);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};


function onRefreshPage () {   
    const savedMessegeParse = JSON.parse(localStorage.getItem(STORAGE_KEY));

    data = savedMessegeParse;
    email = savedMessegeParse.email;
    message = savedMessegeParse.message;

    input.value = savedMessegeParse.hasOwnProperty("email") ? savedMessegeParse.email : "";
    textArea.value = savedMessegeParse.hasOwnProperty("message") ? savedMessegeParse.message : "";
};

onRefreshPage();