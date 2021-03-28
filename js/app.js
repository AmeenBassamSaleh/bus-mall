'use strict';

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let leftIndex;
let rightIndex;
let midIndex;

const arrayImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg', 'bubblegum.jpg'];



const leftImage = document.getElementById('left-image');
const rightImage = document.getElementById('right-image');
const midImage = document.getElementById('mid-image');

// const list = document.getElementById('list');
const Results = document.getElementById('Results');
const fo = document.getElementById('form');

let noc =0;
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
console.log(Img.all);


function render() {
  leftIndex = randomNumber(0, arrayImg.length - 1);

  leftImage.src = Img.all[leftIndex].path; // the name of const in the first, and path in the end coz we used this in img when we col
  leftImage.alt = Img.all[leftIndex].name;
  leftImage.title = Img.all[leftIndex].name;
  // console.log(leftIndex);


  rightIndex = randomNumber(0, arrayImg.length - 1);

  rightImage.src = Img.all[rightIndex].path;
  rightImage.alt = Img.all[rightIndex].name;
  rightImage.title = Img.all[rightIndex].name;
  // console.log(rightIndex);

  while (leftIndex === rightIndex) {

    rightIndex = randomNumber(0, arrayImg.length - 1);

    rightImage.src = Img.all[rightIndex].path;
    rightImage.alt = Img.all[rightIndex].name;
    rightImage.title = Img.all[rightIndex].name;
    // console.log(rightIndex);
  }

  midIndex = randomNumber(0, arrayImg.length - 1);

  midImage.src = Img.all[midIndex].path;
  midImage.alt = Img.all[midIndex].name;
  midImage.title = Img.all[midIndex].name;
  // console.log(midIndex);


  while (midIndex===leftIndex||midIndex===rightIndex) {
    midIndex = randomNumber(0, arrayImg.length - 1);

    midImage.src = Img.all[midIndex].path;
    midImage.alt = Img.all[midIndex].name;
    midImage.title = Img.all[midIndex].name;
    // console.log(midIndex);
  }
};

fo.addEventListener('click', click);

function click(event) {
  if (event.target.id !== 'images') {
    if (event.target.id === rightImage.id) {
      Img.all[rightIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
    else if(event.target.id === leftImage.id)
    {
      Img.all[leftIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
    else{
      Img.all[midIndex].votes++;
      Img.all[rightIndex].views++;
      Img.all[leftIndex].views++;
      Img.all[midIndex].views++;
      noc++;
    }
  }
  console.table(Img.all);
  render();
  // console.table(noc);
}

console.log(noc);


let listView = document.getElementById('list');
listView.addEventListener('Results',listVieww);

function listVieww (){
  const unOrderList = document.createElement('ul');
  listView.appendChild(unOrderList);
  for (let i = 0; i < assets.length; i++){
    let listItem = document.createElement('li');
    unOrderList.appendChild(listItem);
    listItem.textContent = ` ${Asset.all[i].name}  had  ${Asset.all[i].votes}  votes,    and was seen  ${Asset.all[i].views}   times`;

  }

}

render();


Results.addEventListener('Results',View);
function View() {
  if (noc===4) {
    Results.disabled = false;
    console.log(noc)
    listVieww();
  }
  
}





