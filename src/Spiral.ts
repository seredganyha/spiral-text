import { Container } from "pixi.js";
import { Tween } from "tweedle.js";
import CharSpiral from "./CharSpiral";
import { makeArr } from "./helpers";

interface Options {
    stepSpiral: number;
    twistFactor: number;
    xСoefficient?: number;
    yСoefficient?: number;
}

export class Spiral extends Container {
    private elements: CharSpiral[] = [];
    private options: Options = {
        stepSpiral: 20,
        twistFactor: 7,
        xСoefficient: 0.008,
        yСoefficient: 0,
    }

    constructor(elements: CharSpiral[], options: Options) {
        super();
        this.elements = elements;
        this.options = {...this.options, ...options};
        this.rankingElements()
        this.addChild(...this.elements);
        debugger
    }
    private rankingElements () {
        const coordRankingElements = makeArr(0, this.options.twistFactor * Math.PI, this.elements.length)

        this.elements.forEach((elem, i) => {
            elem.x = i * this.options.xСoefficient * this.options.stepSpiral * coordRankingElements[i] * Math.sin(coordRankingElements[i]);
            elem.y = i * this.options.yСoefficient + this.options.stepSpiral * coordRankingElements[i] * Math.cos(coordRankingElements[i]);
        })
    }
    public update() {
        const indexes = this.elements.map(text => {
            return {x: text.x, y: text.y}
        });

        const tempX = this.elements[this.elements.length - 1].x;
        const tempY = this.elements[this.elements.length -1].y;
        let temp = { x: tempX, y: tempY };

        for (let i = 1; i < indexes.length; i++) {
            if (i === indexes.length - 1) {
                this.elements[i].x -= 15;
            }
            let tempNow = {x: this.elements[i].x, y: this.elements[i].y};
            new Tween(this.elements[i-1]).to( {x: indexes[i].x, y: indexes[i].y}, 200).start();
            temp = tempNow;
        }
    }
}