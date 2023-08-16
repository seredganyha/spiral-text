import { Application, Container, Ticker } from 'pixi.js'
import { Tween, Group } from "tweedle.js"
import CharSpiral from './CharSpiral';
import { Viewport } from 'pixi-viewport';

const app = new Application<HTMLCanvasElement>({ width: window.innerWidth, height: window.innerHeight + 5, background: '#000000'})

const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: window.innerWidth,
    worldHeight: window.innerWidth,
    events: app.renderer.events
})

viewport.animate({scaleY: 0.1})

function makeArr(startValue: number, stopValue: number, cardinality: number) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
}

const a = 70

const texts = "Наша жизнь делится на две части: Когда мы маленькие и хотим повзрослеть, и когда уже взрослые и хотим вернуться в детство..".split('').reverse()

const container = new Container()

Ticker.shared.add(update, this);

container.width = 500;
container.height = 500;
container.x = innerWidth / 2;
container.y = innerHeight /2;

let arrs = makeArr(0,7*Math.PI, texts.length);
const charText: CharSpiral[] = texts.map(char => new CharSpiral(char, {fontFamily: 'Arial',
fontSize: 120,
fill: 0xff1010,
align: 'center',}))

charText.forEach((text, i) => {
    text.x = i * 0.008 * a * arrs[i] * Math.sin(arrs[i]);
    text.y = i * 0 + a * arrs[i] * Math.cos(arrs[i]);
    viewport.addChild(text)
});

viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

viewport.addChild(container);
container.interactive = true;
container.eventMode = 'static';

app.stage.addChild(viewport)

app.ticker.add(()=> {

    const indexes = charText.map(text => {
        return {x: text.x, y: text.y}
    });
    const tempX = charText[charText.length - 1].x;
    const tempY = charText[charText.length -1].y;
    let temp = { x: tempX, y: tempY };
    for (let i = 1; i < indexes.length; i++) {
        if (i === indexes.length - 1) {
            charText[i].x -= 15;
        }
       let tempNow = {x: charText[i].x, y: charText[i].y};
        new Tween(charText[i-1]).to( {x: indexes[i].x, y: indexes[i].y}, 200).start();
        temp = tempNow;
    }
});
document.body.appendChild(app.view);

function update(): void {
    Group.shared.update()
}
