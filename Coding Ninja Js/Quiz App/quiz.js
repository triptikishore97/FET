// const questionObj = {
//     category:'maths',
//     id:'qa-1',
//     correctAnswer:'Three',
//     options : ['Two','Three','Six','Five'],
//     question:
//     'How many sides are there in triangle?'
// };   

//json 

const questionJson = [
        {
        category:'maths',
        id:'qa-1',
        correctAnswer:'Three',
        options : ['Two','Three','Six','Five'],
        question:
            'How many sides are there in triangle?'
        }, 
        {
        category:'maths',
        id:'qa-1',
        correctAnswer:'Six',
        options : ['Two','Three','Six','Five'],
        question:
            'How many sides are there in hexagon?'
        },   
        {
            category:'maths',
        id:'qa-1',
        correctAnswer:'Five',
        options : ['Two','Three','Six','Five'],
        question:
            'How many sides are there in pentagon?'
        }, 
        {
            category:'maths',
            id:'qa-1',
            correctAnswer:'Eight',
            options : ['Eight','Three','Six','Five'],
            question:
            'How many sides are there in octagon?'
        },  
         
        
        
]
let score = 0;
let currentQues=0;

const quesEl=document.getElementById('question');
const optionEl=document.getElementById('options');
const scoreEl=document.getElementById('score');

showQuestion();


//populating option div with button
//we want repeat it fo every question
function showQuestion(){
    const {correctAnswer,options,question} = questionJson[currentQues];
    quesEl.textContent = question;
    const shuffledOpt = shuffleOptions(options);
    shuffledOpt.forEach((opt)=>{
        const btn= document.createElement('button');
        btn.textContent = opt;
        optionEl.appendChild(btn);//event handling on button
    
        btn.addEventListener('click', ()=>{
            if(opt === correctAnswer){
                score++;
            }
            else{
                score=score - 0.25;
            }
            console.log(score);
            scoreEl.textContent=`Score is : ${score}`;
            nextQuestion();
        }); 
    });
    
}

//next question
function nextQuestion(){
    currentQues++;
    optionEl.textContent='';            
    if(currentQues >= questionJson.length){
        quesEl.textContent=`Quiz completed...:`;
        
    }
    else{
        showQuestion();
    }
    //console.log(currentQues);
}


//shuffle option
function shuffleOptions(options){
   // [options[3],options[0]]=[options[0],options[3]];
   for(let i=options.length-1;i>0;i--){
        const j= Math.floor(Math.random()*i+1);
        [options[i],options[j]]=[options[j],options[i]];
   }
    console.log(options);
    return options;
}
shuffleOptions([1,2,3,4,5]);

//next question
