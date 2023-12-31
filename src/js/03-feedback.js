import throttle from 'lodash.throttle';
//throttle(fn, timeout) — это функция высшего порядка,
//которая будет принимать аргументом функцию,
//которую надо вызывать один раз за указанное количество миллисекунд (timeout)

//отримуємо форму
const feedbackForm = document.querySelector('.feedback-form');
//створюємо ключ для локальнго сховища
const LS_KEY = 'feedback-form-state';
//змінна для збереження значеня полів форми
let feedbackFormData = {};

//функція для перезавантаження сторінки, перевіряємо чи існує відповідний ключ в сховищі
//тоді отримуємо в змінну значення із сховища і
//значенням полів форми присваюємо  відповідні значення із сховища
const reload = () => {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (!data) {
      return;
    }
    feedbackFormData = JSON.parse(data);
    Object.entries(feedbackFormData).forEach(([key, val]) => {
      feedbackForm.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};

//функція для перезавантаження сторінки
reload();

//на формі просдуховуємо дві події інпут і сабміт
feedbackForm.addEventListener('input', throttle(onInput, 500));
feedbackForm.addEventListener('submit', onSubmit);

//функція для події інпут
function onInput(event) {
  //в змінну записуємо поточні значеня полів форми
  feedbackFormData[event.target.name] = event.target.value.trim();
  localStorage.setItem(LS_KEY, JSON.stringify(feedbackFormData));
  //або через елементи форми
  //const { email, message } = feedbackForm.elements;
  //feedbackFormData = {
  //   email: email.value,
  //   message: message.value,
  // };
}

//функція при сабміті, виводить в консоль об'єкт значень полів форми
//очищує сховище і форму
function onSubmit(event) {
  event.preventDefault();
  const form = event.target;
  console.log(feedbackFormData);
  form.reset();
  localStorage.removeItem(LS_KEY);
  feedbackFormData = {};
}
