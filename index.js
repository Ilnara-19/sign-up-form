let inputState = document.querySelectorAll('.input__state');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('repeatPassword');
let birthday = document.getElementById('birthday');
let submit = document.getElementById('submit');

let eventClick = new MouseEvent('eventclick', {
  view: window,
  bubbles: true,
  cancelable: true
});
birthday.dispatchEvent(eventClick);

document.getElementById('checkboxPassword').addEventListener('click', () => {
  password.type === 'password' ? (password.type = 'text') : (password.type = 'password');
});

document.getElementById('checkboxRepeatPassword').addEventListener('click', () => {
  repeatPassword.type === 'password'
    ? (repeatPassword.type = 'text')
    : (repeatPassword.type = 'password');
});

document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault();
  isEmpty();
});

inputState.forEach(function(item) {
  item.addEventListener('change', () => {
    item.closest('.input').classList.remove('error', 'error-valid');

    item.value === '' ? item.closest('.input').classList.add('error') : validateInputs(item);
  });
});

function isEmpty() {
  inputState.forEach(function(item) {
    item.value === '' ? item.closest('.input').classList.add('error') : false;
  });
}

function validateInputs(input) {
  if (input.id === 'email') {
    if(!validateEmail(input.value)){
		 input.closest('.input').classList.add('error-valid');
         submit.classList.add('error-valid');		 
	}else {
		submit.classList.remove('error-valid');
	}
  }

  if (input.id === 'name') {
    if(!validateText(input.value)){
		 input.closest('.input').classList.add('error-valid');
         submit.classList.add('error-valid')		 
	}else {
		submit.classList.remove('error-valid');
	}
  }

  if (input.id === 'surname') {
	  if(!validateText(input.value)){
		 input.closest('.input').classList.add('error-valid');
         submit.classList.add('error-valid')		 
	  }else {
		  submit.classList.remove('error-valid');
	  }
    }

  if (input.id === 'password') {
    if (!validatePassword(input.value)) {
      input.closest('.input').classList.add('error-valid');
      submit.classList.add('error-valid');
	}
	
		if (input.value !== repeatPassword.value) {
          input.addEventListener('change', () => {
          repeatPassword.closest('.input').classList.add('error-valid');
        });
      }
    }

  if (input.id === 'repeatPassword') {
    if(password.value !== input.value){
	input.closest('.input').classList.add('error-valid');	
	submit.classList.add('error-valid');
	} else {
		submit.classList.remove('error-valid');
	}
  }

  if (input.id === 'birthday') {
    if(validateBirthday(input.value) < 18){
		input.closest('.input').classList.add('error-valid');
		submit.classList.add('error-valid')
	}else {
		input.closest('.input').classList.remove('error-valid');
		submit.classList.remove('error-valid');
	}
  }
}

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return re.test(String(email).toLowerCase());
}

function validateText(text) {
  let re2 = /^([А-Я]{1}[а-я]{1,50}|[A-Z]{1}[a-z]{1,50})$/;
  return re2.test(text);
}

function validatePassword(passwordValue) {
  let re1 = /^((?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,})$/;
  return re1.test(passwordValue);
}

function validateBirthday(birthday) {
  let currentDate = new Date();
  let birthdayValue = new Date(birthday);
  let year = currentDate.getFullYear() - birthdayValue.getFullYear();
  if (
    currentDate.getMonth() < birthdayValue.getMonth() ||
    (currentDate.getMonth() === birthdayValue.getMonth() &&
      currentDate.getDate() < birthdayValue.getDate())
  ) {
    year--;
  }

  return year;
}