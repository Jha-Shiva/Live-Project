const barSection = document.querySelector('.bar-section');
const barProgress = document.querySelector('.bar');
const barValue = document.querySelector('.value');
const progressValue = document.querySelector('.progress-value');
const barText = document.querySelector('.bar-text');
const errorMessage = document.querySelector('#error-message');
const task = document.querySelector('.task');
const checkboxList = document.querySelectorAll('.checkbox');
const inputList = document.querySelectorAll('.goal-input');



const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
let goalCount = Object.values(allGoals).length

progressValue.style.width= `${completedGoalsCount/goalCount *100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalCount} completed`
barValue.innerText = allQuotes[completedGoalsCount]

checkboxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',()=>{
        const inputFilled = [...inputList].map((inputfield) => {
            return inputfield.value
        })
        
        const inputTrue = inputFilled.every(input => typeof input === 'string' && input !== '')
        if(inputTrue){
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

            progressValue.style.width= `${completedGoalsCount/goalCount *100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${goalCount} completed`
            barValue.innerText = allQuotes[completedGoalsCount]

            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else{
            errorMessage.style.display = 'block'
            setTimeout(()=>{
                errorMessage.style.display = 'none'
            },2000)
        }
        
    })
})


inputList.forEach((input) => {

    if(allGoals[input.id]){
        input.value = allGoals[input.id].name

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
    }
    }

    input.addEventListener('input', (e) => {
        if (allGoals[input.id] && allGoals[input.id].completed) {
            e.target.value = allGoals[input.id].name
            return
        }
        if(allGoals[input.id]){
            allGoals[input.id].name = input.value
        }else{
            allGoals[input.id] = {
                name: input.value,
                completed: false
            }
        }
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})


