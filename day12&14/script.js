// 시계
const clock = document.getElementById("clock");
function getCurrentTime() {
  let date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  let minute = String(date.getMinutes()).padStart(2, "0");
  let second = String(date.getSeconds()).padStart(2, "0");

  return (clock.innerHTML = `${hour} : ${minute} : ${second}`);
}

setInterval(getCurrentTime, 1000);

// 인사
const nameForm = document.getElementById("name-form");
const nameFormInput = document.querySelector("#name-form input");
const greetMessage = document.getElementById("greet-message");

function getName(event) {
  event.preventDefault();

  const name = nameFormInput.value;

  nameForm.classList.add("hidden");
  greetMessage.classList.remove("hidden");
  greetMessage.innerHTML = `${name}님 안녕하세요! :)`;
}

nameForm.addEventListener("submit", getName);

// 랜덤 배경
const imageURL = [
  "https://cdn.pixabay.com/photo/2019/10/04/18/36/milky-way-4526277_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/06/08/05/47/stars-7249785_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/04/16/16/16/sunset-3325080_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/18/09/54/lago-di-limides-3025780_1280.jpg",
];

function getRandomNumber() {
  return Math.floor(Math.floor(Math.random() * 10) % 5);
}

document.body.style.backgroundImage = `url(${imageURL[getRandomNumber()]})`;
document.body.style.backgroundSize = "cover";

// 날씨
const weather = document.querySelector(".weather h1:first-child");
const city = document.querySelector(".weather h1:last-child");
const API_KEY = "발급 받은 날씨 요청 API를 입력해주세요.";

function getCurrentWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}C°`;
    });
}

navigator.geolocation.getCurrentPosition(getCurrentWeather, () => window.alert("현재 날씨를 조회할 수 없습니다."));

// to-do
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDo();
}

function setToDoItem(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const span = document.createElement("span");
  span.innerText = newTodo.todoText;

  const button = document.createElement("button");
  button.innerText = "x";

  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    todoText: newTodo,
    id: Date.now(),
  };

  toDos.push(newTodoObj);
  setToDoItem(newTodoObj);

  saveToDo();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;

  parsedToDos.forEach(setToDoItem);
}
