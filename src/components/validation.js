//import { renderLoading } from "./api";

/*Показывает элемент ошибки*/
function showInputError(formElement, validationConfig, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(validationConfig.popupError);
  inputElement.classList.add(validationConfig.inputError);
  errorElement.textContent = errorMessage;
}

/*Скрывает элемент ошибки*/
function hideInputError(formElement, validationConfig, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputError);
  errorElement.textContent = '';
}

/*Проверяем все поля, чтобы настроить статус кнопки*/
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

/*Стилизуем кнопку*/
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);

  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

/*Проверяет валидность поля, внутри вызывает showInputError или hideInputError*/
function isValid(formElement, validationConfig, inputElement) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if(!inputElement.validity.valid){
    showInputError(formElement, validationConfig, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, validationConfig, inputElement);
  }
}

/*Добавим обработчики всем полям формы*/
function setEventListener(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, validationConfig, inputElement);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

/*Добавим обработчики всем формам*/
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfig);
  })
}

export function clearValidation(form, validationConfig) {
  const spanList = Array.from(form.querySelectorAll(validationConfig.spanSelector));
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  spanList.forEach((item) => {
    item.classList.remove(validationConfig.popupError);
  })
  inputList.forEach((item) => {
    item.classList.remove(validationConfig.inputError);
  })
  toggleButtonState(inputList, buttonElement, validationConfig);
  //renderLoading(false);
}