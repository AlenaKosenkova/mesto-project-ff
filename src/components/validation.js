/*Показывает элемент ошибки*/
export function showInputError(formElement, formSelector, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  formElement.classList.add(formSelector.inputErrorClass);
  errorElement.textContent = errorMessage;
}

/*Скрывает элемент ошибки*/
export function hideInputError(formElement, formSelector, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  formElement.classList.remove(formSelector.inputErrorClass);
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
export function isValid(formElement, formSelector, inputElement) {
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
export function setEventListener(formElement, formSelector) {
  const inputList = Array.from(formElement.querySelectorAll(formSelector.inputSelector));
  const buttonElement = formElement.querySelector(formSelector.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formSelector);
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