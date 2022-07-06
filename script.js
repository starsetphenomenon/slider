const slider = document.getElementById('slides'); //slider block
const slides = document.querySelectorAll('.slide'); //slides
const prev = document.getElementById('prev'); //prev button
const next = document.getElementById('next'); //next button

let animatePrev = 'prev4'; //left arrow animation
let animateNext = 'next4'; //right arrow animation
let speed = 800; //set animation speed in ms;
let current = 0; //get index of the current slide
let length = slides.length - 1; //get amount of slides

if (length <= 0) { //hiding navigation buttons if images amount less than 2
    prev.classList.add('hide');
    next.classList.add('hide');
} else {
    prev.classList.remove('hide');
    next.classList.remove('hide');
}

const onNext = function () {
    removeEvent(); //disable swipe while animation
    next.style.pointerEvents = 'none'; //undo click until function is done
    prev.style.pointerEvents = 'none'; //undo click until function is done
    if (current === length) { //refresh all z-indexes (expect current) if the last image is current
        slides.forEach(elem => elem.style = `z-index: 0`);
        slides[length - current].style = `z-index: 1`;
        current = -1;
    }
    current++;
    slides[slides.length - current - 1].style = `z-index: ${current+1}`; //put above all images
    slides[slides.length - current - 1].style.animation = `${animateNext} ${speed}ms ease-in-out forwards`; //animate the current from right
    setTimeout(() => { //execute after some time in ms
        slides[slides.length - current - 1].style.animation = ``; //remove animation
        slides[slides.length - current - 1].style.transform = `translateX(${0}%)`; //put it back to images
        next.style.pointerEvents = 'auto'; //enable click 
        prev.style.pointerEvents = 'auto'; //enable click 
        addEvent(); //swipe on;
    }, speed);
};

const onPrev = function () {
    removeEvent(); //disable swipe while animation
    prev.style.pointerEvents = 'none'; //undo click until function is done
    next.style.pointerEvents = 'none'; //undo click until function is done
    current--;
    if (current < 0) {
        slides.forEach((elem, i, array) => elem.style = `z-index: ${array.length-i}`); //update all z-indexes (expect current) if the last image is current++
        slides[length - current - 1].style = `z-index: ${length+1}`;
        slides[length - current - 1].style.animation = `${animatePrev} 0.8s ease-in-out forwards`; //animate the current to left
        setTimeout(() => { //execute after some time in ms
            slides[length - current - 1].style.animation = ``; //remove animation
            slides[length - current - 1].style.transform = `translateX(${0}%)`; //put it back to images
            slides[length - current - 1].style = `z-index: ${1}`; //refresh position
            prev.style.pointerEvents = 'auto'; //enable click 
            next.style.pointerEvents = 'auto'; //enable click 
            current = length;
            addEvent(); //swipe on
        }, speed);
    } else {
        slides[length - current - 1].style.animation = `${animatePrev} 0.8s ease-in-out forwards`; //animate the current to left
        setTimeout(() => { //execute after some time in ms
            slides[length - current - 1].style.animation = ``; //remove animation 
            slides[length - current - 1].style.transform = `translateX(${0}%)`; //put to the all images
            slides[length - current - 1].style = `z-index: ${0}`; //refresh z-index, make it all behind
            prev.style.pointerEvents = 'auto'; //enable click 
            next.style.pointerEvents = 'auto'; //enable click 
            addEvent(); //swipe on
        }, speed);
    }
};

next.addEventListener('click', onNext);
prev.addEventListener('click', onPrev);

//Swipe functionality
let x1 = null,
    y1 = null;
let x2 = null,
    y2 = null;
let swipeDirection = null;

const getTouchXY = function (e) { //get first touch XY
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
    return [x1, y1];
};

const getMoveXY = function (e) { //get all moves XY
    x2 = e.touches[0].clientX;
    y2 = e.touches[0].clientY;
    if ((x1 < x2 && y1 > y2) || (x1 < x2 && y1 < y2)) {
        swipeDirection = 'right';
    } else {
        swipeDirection = 'left';
    }
};

const swipeOnDirection = function () { //get swipe direction
    if (x2 != null || y2 != null) {
        if (swipeDirection === 'right') {
            onPrev();
        } else {
            onNext();
        }
        x1 = null;
        y1 = null;
        x2 = null;
        y2 = null;
    }
    return [x1, x2, y1, y2];
};

const removeEvent = function () {
    slider.removeEventListener('touchstart', getTouchXY);
    slider.removeEventListener('touchmove', getMoveXY);
    slider.removeEventListener('touchend', swipeOnDirection); //get swipe last XY
};

const addEvent = function () {
    slider.addEventListener('touchstart', getTouchXY);
    slider.addEventListener('touchmove', getMoveXY);
    slider.addEventListener('touchend', swipeOnDirection);
};

addEvent();