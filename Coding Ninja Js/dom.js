const heading=document.querySelector('.second')

console.log(document.querySelector("h2")); //first instance
const firstHead=document.querySelectorAll("h1"); //all instances.
console.log(firstHead);

const para=document.getElementById("para");

console.log(document.getElementsByClassName('first'));
console.log(document.getElementsByTagName("h2"));
heading.style.color='red';
para.style.backgroundColor='grey';

function changeBackgroundColor(selector){
    //Implement your function here
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
    element.style.backgroundColor = 'cyan';
  });
}

const btn=document.createElement('button');
btn.textContent="Created button";
btn.className="myBtn";

// // const mydiv=document.querySelector('div');
// // mydiv.appendChild(btn);

// //Removing element and event listener
// document.querySelector('h3').remove();

const p = document.querySelector("p");
p.addEventListener('click',
    function() {
        clickPara("hello");
    });

function clickPara(name){
    console.log(name+"...para clicked");
}
// const btnCheck=document.querySelector('#btnCheck');
// btnCheck.addEventListener('click', () => 
//     document.querySelector('h3').remove()
// );

const p1 =document.querySelector('p');
p1.addEventListener('mouseover', function(){
    p.style.backgroundColor ='blue';
});

// document
//     .querySelector('h3')
//     .addEventListener('click', () =>
//         console.log('heading is clicked')
//     );

// document.querySelector('h3').addEventListener('click', () => {
//         console.log('heading is clicked');
//       });