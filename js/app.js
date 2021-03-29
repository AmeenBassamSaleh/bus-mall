'use strict';

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let leftIndex;
let rightIndex;
let midIndex;
let pastImages = [];
let noc = 0;
let votes = [];
let views = [];

const arrayImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg', 'bubblegum.jpg'];



const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const midImage = document.getElementById('mid-image');

const images = document.getElementById('images');
// const Results = document.getElementById('Results');
// const fo = document.getElementById('form');


function Img(anyImg) {
  this.anyImg = anyImg;
  this.path = `./assets/${anyImg}`;
  this.votes = 0;
  this.views = 0;


  Img.all.push(this);
}
Img.all = [];

for (let i = 0; i < arrayImg.length; i++) {
  new Img(arrayImg[i]);
}
// console.log(Img.all);


function render() {
  let currentImages= []
  do{
    leftIndex = randomNumber(0, arrayImg.length - 1);
  }while(pastImages.includes(leftIndex));

  currentImages.push(leftIndex);

  leftImage.src = Img.all[leftIndex].path; // the name of const in the first, and path in the end coz we used this in img when we col
  leftImage.alt = Img.all[leftIndex].name;
  leftImage.title = Img.all[leftIndex].name;
  // console.log(leftIndex);

  do{
    rightIndex = randomNumber(0, arrayImg.length - 1);
  }while(pastImages.includes(rightIndex) || currentImages.includes(rightIndex));
  currentImages.push(rightIndex);

  rightImage.src = Img.all[rightIndex].path;
  rightImage.alt = Img.all[rightIndex].name;
  rightImage.title = Img.all[rightIndex].name;
  // console.log(rightIndex);

  do{
    midIndex = randomNumber(0, arrayImg.length - 1);
  }while(pastImages.includes(midIndex) || currentImages.includes(midIndex));

  midImage.src = Img.all[midIndex].path;
  midImage.alt = Img.all[midIndex].name;
  midImage.title = Img.all[midIndex].name;

  pastImages = [rightIndex, leftIndex, midIndex];
  // console.log(midIndex);
};

// let imgs = document.getElementsByTagName('img');
rightImage.addEventListener('click', click);
leftImage.addEventListener('click', click);
midImage.addEventListener('click', click);

function click(event) {


  if (noc < 25) {

    if (event.target.id === rightImage.id) {
      Img.all[rightIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
    else if (event.target.id === leftImage.id) {
      Img.all[leftIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
    else {
      Img.all[midIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
    render();
  }
  else {
    let ulEl = document.getElementById('list');

    let liEl;
    for (let i = 0; i < Img.all.length; i++) {
      views.push(Img.all[i].views);
      votes.push(Img.all[i].votes);

      liEl = document.createElement('li');
      liEl.textContent = ` ${Img.all[i].anyImg}  had  ${Img.all[i].votes}  votes,    and was seen  ${Img.all[i].views}   times`;
      ulEl.appendChild(liEl);
    }
    
    rightImage.removeEventListener('click', click);
    leftImage.removeEventListener('click', click);
    midImage.removeEventListener('click', click);
    // images.removeEventListener('click', click);
    console.log('votes', votes);
    console.log('views', views);

    document.getElementById('show-results').removeAttribute("disabled");
  }

  console.table(noc);
}

render();

document.getElementById('show-results').addEventListener('click',showResults)

function showResults() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: arrayImg,
      datasets: [{
        label: 'img votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'img views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    // Configuration options go here
    options: {}
  });
}



