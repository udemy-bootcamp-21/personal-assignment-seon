const clock = document.getElementById("clock");
const nameForm = document.getElementById("name-form");
const nameFormInput = document.querySelector("#name-form input");
const greetMessage = document.getElementById("greet-message");

// 시계
function getCurrentTime() {
  let date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  let minute = String(date.getMinutes()).padStart(2, "0");
  let second = String(date.getSeconds()).padStart(2, "0");

  return (clock.innerHTML = `${hour} : ${minute} : ${second}`);
}

setInterval(getCurrentTime, 1000);

// 인사
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
