const slider = document.getElementById('slides'); //slider block
const slides = document.querySelectorAll('.slide'); //slides
const prev = document.getElementById('prev'); //prev button
const next = document.getElementById('next'); //next button

let speed = 800; //animation speed in ms;
let current = 0; //index of the current slide
let length = slides.length - 1; //amount of slides

if (length <= 0) { //hiding navigation buttons if images amount less than 2
    prev.classList.add('hide');
    next.classList.add('hide');
} else {
    prev.classList.remove('hide');
    next.classList.remove('hide');
}

const onNext = function () {
    next.style.pointerEvents = 'none'; //undo click until function is done
    prev.style.pointerEvents = 'none'; //undo click until function is done
    if (current === length) { //refresh all z-indexes (expect current) if the last image is current
        slides.forEach(elem => elem.style = `z-index: 0`);
        slides[length - current].style = `z-index: 1`;
        current = -1;
    }
    current++;
    slides[slides.length - current - 1].style = `z-index: ${current+1}`; //put above all images
    slides[slides.length - current - 1].style.transform = `translateX(${100}%)`; //put to the right to start after the animation
    slides[slides.length - current - 1].style.animation = `next ${speed}ms ease-in-out forwards`; //animate the current from right

    setTimeout(() => { //execute after some time in ms
        slides[slides.length - current - 1].style.animation = ``; //remove animation
        slides[slides.length - current - 1].style.transform = `translateX(${0}%)`; //put it back to images
        next.style.pointerEvents = 'auto'; //enable click 
        prev.style.pointerEvents = 'auto'; //enable click 
    }, speed);
};

const onPrev = function () {
    prev.style.pointerEvents = 'none'; //undo click until function is done
    next.style.pointerEvents = 'none'; //undo click until function is done
    current--;
    if (current < 0) {
        slides.forEach((elem, i, array) => elem.style = `z-index: ${array.length-i}`); //update all z-indexes (expect current) if the last image is current++
        slides[length - current - 1].style = `z-index: ${length+1}`;
        slides[length - current - 1].style.animation = `prev 0.8s ease-in-out forwards`; //animate the current to left
        setTimeout(() => { //execute after some time in ms
            slides[length - current - 1].style.animation = ``; //remove animation
            slides[length - current - 1].style.transform = `translateX(${0}%)`; //put it back to images
            slides[length - current - 1].style = `z-index: ${1}`; //refresh position
            prev.style.pointerEvents = 'auto'; //enable click 
            next.style.pointerEvents = 'auto'; //enable click 
            current = length;
        }, speed);
    } else {
        slides[length - current - 1].style.animation = `prev 0.8s ease-in-out forwards`; //animate the current to left
        setTimeout(() => { //execute after some time in ms
            slides[length - current - 1].style.animation = ``; //remove animation 
            slides[length - current - 1].style.transform = `translateX(${0}%)`; //put to the all images
            slides[length - current - 1].style = `z-index: ${0}`; //refresh z-index, make it all behind
            prev.style.pointerEvents = 'auto'; //enable click 
            next.style.pointerEvents = 'auto'; //enable click 
        }, speed);
    }
};

next.addEventListener('click', onNext);
prev.addEventListener('click', onPrev);