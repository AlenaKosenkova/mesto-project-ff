/*Показывает элемент ошибки*/
function showInputError(formElement, formSelector, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(formSelector.errorClass);
  inputElement.classList.add(formSelector.inputErrorClass);
  errorElement.textContent = errorMessage;
}

/*Скрывает элемент ошибки*/
function hideInputError(formElement, formSelector, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSelector.inputErrorClass);
  errorElement.textContent = '';
}

/*Проверяем все поля, чтобы настроить статус кнопки*/
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

/*Стилизуем кнопку*/
function toggleButtonState(inputList, buttonElement, formSelector) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formSelector.inactiveButtonClass);

  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formSelector.inactiveButtonClass);
  }
}

/*Проверяет валидность поля, внутри вызывает showInputError или hideInputError*/
function isValid(formElement, formSelector, inputElement) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid){
    showInputError(formElement, formSelector, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, formSelector, inputElement);
  }
}

/*Добавим обработчики всем полям формы*/
function setEventListener(formElement, formSelector) {
  const inputList = Array.from(formElement.querySelectorAll(formSelector.inputSelector));
  const buttonElement = formElement.querySelector(formSelector.submitButtonSelector);
  //toggleButtonState(inputList, buttonElement, formSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, formSelector, inputElement);
      toggleButtonState(inputList, buttonElement, formSelector);
    })
  })
}

/*Добавим обработчики всем формам*/
export function enableValidation(formSelector) {
  const formList = Array.from(document.querySelectorAll(formSelector.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, formSelector);
  })
}

export function clearValidation(profileForm, validationConfig/*, validationConfig*/) {
  //const errorSpanList = Array.from(profileForm.querySelectorAll('.popup__span'));
  const spanList = Array.from(profileForm.querySelectorAll(validationConfig.spanSelector));
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  spanList.forEach((item) => {
    item.classList.remove(validationConfig.popupError);
  })
  inputList.forEach((item) => {
    item.classList.remove(validationConfig.inputError);
  })
  toggleButtonState(inputList, buttonElement, validationConfig);
}