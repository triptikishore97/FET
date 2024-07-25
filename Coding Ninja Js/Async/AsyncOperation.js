console.log('message before al\ert');
alert('time out in js');
console.log('message after alert');

// const buttonElement=document.querySelector('.button1');
// const textElement=document.querySelector('#text1');
// buttonElement.addEventListener('click',() => {
//     textElement.textContent='Button is Pressed';
// });

const request = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve("promise fullfilled");
        // console.log("promise initiated");
        reject("request has been rejected")
    },1000)
});

request.then((value)=>{
    console.log(value);
}).catch((err)=>
console.log(err)).finally(()=>
console.log('request compleetd'));
//console.log(request);

function trackFitness(exercise, duration) {
    //Implement your promise here
    return new Promise((resolve, reject) => {
    if (duration > 0) {
      console.log(`You performed ${exercise} for ${duration} minutes.`);
      setTimeout(() => {
        resolve(duration);
      }, 5000);
    } else {
      reject("Invalid duration. Please provide a positive number.");
    }
  });
}
  trackFitness("Running", 30)
    .then((duration) => {
      console.log(`Total duration: ${duration} minutes.`);
    })
    .catch((error) => {
      console.log(`Failed to track fitness: ${error}`);
    });