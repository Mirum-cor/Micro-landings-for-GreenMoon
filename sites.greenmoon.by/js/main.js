const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.close-menu');
const menu = document.querySelector('.menu');
const closeNotification = document.querySelector('.close-notification');
const consultBtn = document.querySelector('.free-consult');
const formSendDiv = document.querySelector('.form-send');
const form = document.forms[0];

const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');

menuBtn.addEventListener('click', function () {
  menu.className = 'menu menu-open';
});

closeMenu.addEventListener('click', function () {
  menu.className = 'menu';
});

closeNotification.addEventListener('click', function () {
  formSendDiv.style.opacity = 0;
  formSendDiv.style.zIndex = '-1';
  form.reset();
  consultBtn.setAttribute('disabled', true);
});

consultBtn.addEventListener('click', function (event) {
  event.preventDefault();
  Email.send({
    SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
    To: 'project@greenmoon.by',
    From: emailInput.value,
    Subject: 'Запрос бесплатной консультации c sites.greenmoon.by',
    Body:
      '<strong>Имя:</strong> ' +
      nameInput.value +
      '<br /> <strong>Номер телефона:</strong> ' +
      phoneInput.value +
      '<br /> <strong>E-mail:</strong> ' +
      emailInput.value,
  }).then(function () {
    formSendDiv.style.opacity = 1;
    formSendDiv.style.zIndex = 5;
    if (
      navigator.userAgent.indexOf('Firefox') !== -1 ||
      navigator.userAgent.indexOf('MSIE') !== -1 ||
      !!document.documentMode === true
    ) {
      formSendDiv.style.background = 'rgba(255, 255, 255, 0.9)';
    }
  });
});

nameInput.addEventListener('input', function (event) {
  const condition = event.target.value.length < 2;
  validationBorder(event, condition);
  isFormValid();
});

nameInput.addEventListener('blur', function (event) {
  if (event.target.value === '') {
    inputBlurHandler(event);
  }
});

phoneInput.addEventListener('input', function (event) {
  const regexp = /\d/g;
  const phoneMatch = event.target.value.match(regexp);
  if (phoneMatch) {
    const phoneNumber = phoneMatch.join('');
    let condition;
    if (event.target.value[0] === '+') {
      condition = phoneNumber.length !== 12;
    } else {
      condition = phoneNumber.length !== 11;
    }
    validationBorder(event, condition);
  } else {
    event.target.style.border = '1px solid #FF8383';
  }
  isFormValid();
});

phoneInput.addEventListener('blur', function (event) {
  if (event.target.value === '') {
    inputBlurHandler(event);
  }
});

emailInput.addEventListener('input', function (event) {
  const email = event.target.value;
  const regexp = /(\w+\.)+\w+/g;
  const condition = !email.match(regexp);
  validationBorder(event, condition);
  isFormValid();
});

emailInput.addEventListener('blur', function (event) {
  if (event.target.value === '') {
    inputBlurHandler(event);
  }
});

function inputBlurHandler(event) {
  const condition = event.target.value === '';
  validationBorder(event, condition);
  isFormValid();
}

function validationBorder(event, condition) {
  if (condition) {
    event.target.style.border = '1px solid #FF8383';
  } else {
    event.target.style.border = 'none';
  }
}

function isFormValid() {
  const nameBorder =
    nameInput.style.border === 'medium none' ||
    nameInput.style.border === 'medium' ||
    nameInput.style.border === 'none' ||
    nameInput.style.border === 'currentColor';
  const phoneBorder =
    phoneInput.style.border === 'medium none' ||
    phoneInput.style.border === 'medium' ||
    phoneInput.style.border === 'none' ||
    phoneInput.style.border === 'currentColor';
  const emailBorder =
    emailInput.style.border === 'medium none' ||
    emailInput.style.border === 'medium' ||
    emailInput.style.border === 'none' ||
    emailInput.style.border === 'currentColor';
  if (nameBorder && phoneBorder && emailBorder) {
    consultBtn.removeAttribute('disabled');
  } else {
    consultBtn.setAttribute('disabled', true);
  }
}
