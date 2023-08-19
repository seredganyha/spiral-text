import { Application, Container, Ticker } from 'pixi.js'
import { Tween, Group } from "tweedle.js"
import CharSpiral from './CharSpiral';
import { Viewport } from 'pixi-viewport';
import { Spiral } from './Spiral';

let text = 'слово';
let a = 5;
let twist = 7;
let xСoefficient = 0.008;
let yСoefficient = 0;
let btn = document.querySelector('button')
const inputText = document.querySelector('#input_text');
const inputA = document.querySelector('#input_a');
const inputTwist = document.querySelector('#input_twist');
const inputX = document.querySelector('#input_x');
const inputY = document.querySelector('#input_y');

inputA.addEventListener('input', (e) => {
    destroySpiral()
    a = Number((<HTMLInputElement>e.target).value);
    createSpiral(text, a) 
})

inputText.addEventListener('input', (e) => {
    destroySpiral()
    text = (<HTMLInputElement>e.target).value;
    createSpiral(text, a) 
})

inputTwist.addEventListener('input', (e) => {
    destroySpiral()
    twist = Number((<HTMLInputElement>e.target).value);
    createSpiral(text, a) 
})

inputX.addEventListener('input', (e) => {
    destroySpiral()
    xСoefficient = Number((<HTMLInputElement>e.target).value);
    createSpiral(text, a) 
})

inputY.addEventListener('input', (e) => {
    destroySpiral()
    yСoefficient = Number((<HTMLInputElement>e.target).value);
    createSpiral(text, a) 
})

btn.addEventListener('click', function(){
    if (spiral) isStart = !isStart;
})

const app = new Application<HTMLCanvasElement>({ width: window.innerWidth, height: window.innerHeight + 5, background: '#000000'})
const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerWidth,
    events: app.renderer.events
})

let isStart = false;
let spiral: Spiral;

viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

app.stage.addChild(viewport);
Ticker.shared.add(update, this);
viewport.animate({scaleY: 0.1});
document.body.appendChild(app.view);

app.ticker.add(()=> {
    if (isStart && spiral) {
        spiral.update();
    }
});

function destroySpiral() {
    viewport?.children[0]?.destroy();
}

function createSpiral(text: string, a: number) {

    const texts = text.split('').reverse()

    const charText: CharSpiral[] = texts.map(char => new CharSpiral(char, {fontFamily: 'Arial',
    fontSize: 120,
    fill: 0xff1010,
    align: 'center',}))

    spiral = new Spiral(charText, {stepSpiral: a, twistFactor: twist, xСoefficient: xСoefficient, yСoefficient: yСoefficient})

    viewport.addChild(spiral);
}

function update(): void {
    Group.shared.update()
}


