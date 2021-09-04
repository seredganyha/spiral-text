let text = "При виде творений гениев, рождается смелость, которая в одно мгновение заменяет несколько лет опытности"
let scrolls = 0
const TOP_MIN =180
const STEP_TOP = 0.8


let arrayText = text.split('')
let wrapper = document.querySelector('.wrapper')
console.log(arrayText)

arrayText.forEach((element, index, array) => {
    let div = createDiv()
    let span = createSpan()


    div.style.zIndex = `${array.length - index}`

    div.style.transform = `rotate(${index * 7}deg)`;
    
    span.innerHTML = element
    span.style.top = `-${TOP_MIN - (STEP_TOP * index)}px`


    div.appendChild(span)
    wrapper.appendChild(div)

});

let divs = document.querySelectorAll('.container')
    divs = Array.from(divs)
let spans = Array.from(document.querySelectorAll('.inner'))

function createDiv() {
    let div = document.createElement('div')
    div.className = 'container'
    div.style.display = 'block'
    div.style.left = '0px'
    return div
}


function createSpan() {
    let span = document.createElement('span')
    span.className = 'inner'
    return span
}


function toScrollDowns() {
    

    divs.forEach((elem, i) => {
       let valueTransform = elem.style.transform.split('rotate(').join('').split('deg)')
       let valueTop = +spans[i].style.top.slice(1,-2);
       let valueLeft = +elem.style.left.slice(1, -2)
        if(+valueTransform[0]===0 && valueLeft<300){
           
            elem.style.left = `-${valueLeft + 50/3}px`
            
        }  
        
        console.log(valueLeft)
        if(valueLeft>300){
            console.log('++')
            elem.classList.add('disappearance')
        }


        if(+valueTransform[0]>6){
            elem.style.transform = `rotate(${valueTransform[0] - 7}deg)`
        }
        else{
            elem.style.transform = `rotate(0deg)`
        }

        if(+valueTop<TOP_MIN){

            if(+valueTop<TOP_MIN && (+valueTop>TOP_MIN-STEP_TOP)){
                console.log(`valueTop = ${+valueTop}`)
                spans[i].style.top = `-${valueTop+TOP_MIN-valueTop}px`
            }
            else{
                spans[i].style.top = `-${valueTop+STEP_TOP}px`
            }
            
        }


        
    })







}




window.addEventListener('scroll',()=>{
   
    toScrollDowns()
})



