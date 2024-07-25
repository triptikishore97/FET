function displayArea() {
    const radius = parseFloat(
        document.getElementById('radius-input').value
    );
    // if (isNaN(radius) || radius <= 0) {
    //     document.getElementById('result').innerText = 'Please enter a valid radius.';
    //     return;
    // }
    const area = calculateArea(radius);
    document.getElementById('result').innerText = `The area is ${area.toFixed(2)}`;
}

document.getElementById('calculate-button')
    .addEventListener('click', displayArea);

console.log(PI);//reference error as the order is different
