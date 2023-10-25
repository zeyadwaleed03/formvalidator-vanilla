const formEl = document.querySelector('form');
const username = document.querySelector('#Username');
const email = document.querySelector('#Email');
const password = document.querySelector('#Password');
const password2 = document.querySelector('#Password2');
function restore(arr) {
  arr.forEach((input) => {
    input.parentElement.classList.remove('success');
    input.parentElement.classList.remove('error');
  });
}
function success(input) {
  input.parentElement.classList.add('success');
}
function error(input, message) {
  input.parentElement.classList.add('error');
  const small = input.parentElement.querySelector('small');
  small.textContent = `${message}`;
}
function checkEmail(input) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    success(input);
  } else {
    error(input, `${input.id} is not valid`);
  }
}
function checkLength(user, min, max) {
  if (user.value.trim().length < min) {
    // console.log('hello');
    error(user, `${user.id} must be at least ${min} characters`);
  } else if (user.value.trim().length > max) {
    error(user, `${user.id} must be less than ${max} characters`);
  } else {
    success(user);
  }
}
function checkPasswordMatch(pass1, pass2) {
  if (pass1.value === pass2.value) {
    success(pass2);
  } else {
    error(pass2, `Passwords do not match`);
  }
}
function checkRequired(arr) {
  arr.forEach((element) => {
    if (element.value.trim() === '') {
      error(element, `${element.id} is required`);
    } else {
      success(element);
    }
  });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  restore([username, email, password, password2]);
  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkPasswordMatch(password, password2);
});
