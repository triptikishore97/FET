const divEle = document.querySelector('.card-container');

function getDetails(id){
    fetch(`https://dummyjson.com/users/${id}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("id doesnt exist..");
        }
        // console.log(response);
        // console.log(response.status);
        return response.json();
    })
    .then((user) => {
       //console.log(user)
        displayUser(user,'beforeend');
    })
    .catch((err)=> {
        console.log(err);
    });

}
function displayUser(data, pos,className=''){
    const card=`<div class="user-card ${className}">
    <img src=${data.image} alt='Profile image'/>
    <h3>${data.firstName}</h3>
    <h3>${data.lastName}</h3>
    <p class='email'>${data.email}</p>
    <button class='btn'>View Profile</button>
    </div>
    `;
    divEle.insertAdjacentHTML(pos,card);
}
getDetails(4);
getDetails(41);
// getDetails(456);
// getDetails(0);