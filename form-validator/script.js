// SELECTORS
const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const pw = document.querySelector('#pw');
const pw2 = document.querySelector('#pw2');

//  FUNCS
const validateRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showErr(input, 'This field is required');
    } else {
      showSuccess(input);
    }
  });
};

const validateLength = (input, min, max) => {
  if (input.value.length < min) {
    showErr(input, `Must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showErr(input, `Must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.toLowerCase().trim())) {
    showSuccess(email);
  } else {
    showErr(email, 'A valid email address is required');
  }
};

const validatePwMatch = (pw, pw2) => {
  if (pw.value !== pw2.value) {
    showErr(pw, "Those passwords didn't match. Try again.");
    showErr(pw2, "Those passwords didn't match. Try again.");
  }
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const showErr = (input, msg) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control err';
  const small = formControl.querySelector('small');
  small.innerText = msg;
};

// EVENT LISTENER
form.addEventListener('submit', (e) => {
  e.preventDefault();

  validateRequired([username, email, pw, pw2]);
  validateLength(username, 3, 15);
  validateLength(pw, 4, 20);
  validateEmail(email);
  validatePwMatch(pw, pw2);
});
