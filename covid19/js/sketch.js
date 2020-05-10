p5.Vector.prototype.mult = function (n) {
    if (Number.isNaN(n)) return;
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
};
//Random Color select
const PALLATE = ["#511845", "#900c3f", "#c70039", "#ff5733", "#ffa41b", "#3dc400", "#005082", "#00a8cc", "#00bdaa", "#f1e7b6"];

//This will stop P5 to exacute on load
var started = false;
// FOLLOW MOUS
let mx = 1;
let my = 1;
let easing = 0.08;
// FOLLOW MOUS
let regionTenData;
let textAngle
let spherePosX
let spherePosY
let screenPerDevide
let minScreen, maxScreen;
//BUBBLES
let bubbles = [];
let legends = [];
//BUBBLES
let vehicles = [];
let points = [{ x: 400, y: 400 }, { x: 300, y: 300 }, { x: 400, y: 300 }, { x: 300, y: 400 }];
this.maxspeed = 5;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas01');


    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }

    var breakPoint = window.matchMedia("(max-width: 768px)")
    // Call listener function at run time
    jsMediaQuery(breakPoint)
    // Attach listener function on state changes
    breakPoint.addListener(jsMediaQuery)
    lGraphics = createGraphics(100, 100);

    minScreen = min([windowWidth, windowHeight]);
    maxScreen = max([windowWidth, windowHeight]);
    noLoop();

}

// JS MEDIA QUERY FOR MOBILE VERSION
function jsMediaQuery(breakPoint) {
    if (breakPoint.matches) {
        spherePosX = windowWidth
        spherePosY = windowHeight / 2
        textAngle = -180;
        screenPerDevide = 50;
    } else {
        spherePosX = windowWidth / 2
        spherePosY = windowHeight / 2
        textAngle = 0;
        screenPerDevide = 100;
    }
}

function draw() {
    if (started) {

        background(255);
        angleMode(DEGREES);
        push();
        fill("#333333")
        textSize(20);
        textStyle(BOLD);
        textAlign(LEFT);
        text("COVID-19", 20, 40);
        pop();

        for (let i = 0; i < vehicles.length; i++) {
            var v = vehicles[i]
            v.update();
            v.show();
            v.behaviors()
        }

        let countPer, screenPer;

        regionTenData = window.regionTen;
        for (let i = 0; i < regionTenData.length; i++) {

            let total = resData.summary.total_cases;;
            let next = regionTenData[i].total_cases;
            let cName = regionTenData[i].name.toUpperCase();;
            //countPer = Math.round(next * 800 / total);
            //screenPer = Math.round((windowWidth * countPer) / screenPerDevide);

            let m = map(next, 0, total, 0, maxScreen * 3);
            screenPer = m

            //BUBBLES
            //ellipse(spherePosX, spherePosY, screenPer, screenPer);
            let b = new Bubble(spherePosX, spherePosY, screenPer, screenPer);
            bubbles.push(b);
            push()
            // let b = new Bubble(thisVertex.x, thisVertex.y, 15);
            // bubbles.push(b);
            bubbles[i].move(i)
            bubbles[i].show(i);
            pop()
            //BUBBLES

            //LEGENDS
            //const thisVertex = pointOnCircle(spherePosX, spherePosY, screenPer / 2, textAngle);
            let l = new Legends(cName, spherePosX, spherePosY, screenPer / 2, textAngle);
            legends.push(l);
            //ellipse(thisVertex.x, thisVertex.y, 10, 10);
            legends[i].move(i)
            legends[i].show(i);
            //LEGENDS
        }
        // FOLLOW MOUSE 
        // let targetX = mouseX;
        // let dx = targetX - mx;
        // mx += dx * easing;

        // let targetY = mouseY;
        // let dy = targetY - my;
        // my += dy * easing;
        // ellipse(mx, my, 10, 10);
    }
}

//This function for START P5
function start() {
    started = true;
    loop();
}

function mouseOver() {
    console.log("TEST");
    for (let i = 0; i < legends.length; i++) {
        legends[i].mOver(mouseX, mouseY, i);
    }
}

function mousePressed() {
    for (let i = 0; i < legends.length; i++) {
        legends[i].clicked(mouseX, mouseY, i);
    }
}

//  BUBBLES
class Bubble {
    constructor(bX, bY, bR) {
        this.x = bX;
        this.y = bY;
        this.rStart = 0;
        this.r = bR;
        //Angle
        this.aStart = floor(random(0, 360));
        this.ang = floor(random(0, 360));
    }
    mouseOver(px, py, i) {
        this.update(px, py, i);
    }
    clicked(px, py, i) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.r) {
            this.rStart
        }
    }
    show(i) {
        noFill();
        stroke(PALLATE[i]);
        ellipse(this.x, this.y, this.rStart);
    }
    move(i) {
        this.animate(i)
    }
    animate(i) {
        if (this.rStart <= this.r) {
            //this.rStart += 1;
            this.rStart = lerp(this.rStart, this.r, random(0, 0.1))
            // //ANIMATE WITH radius
            //this.rStart = lerp(this.rStart, 10, random(0, 0.1))

            // if (this.aStart <= this.ang) {
            //     //Animate Radius            
            //     //this.aStart = lerp(this.aStart, this.ang, 0.01)
            //     const xPos = this.x + this.rStart * cos(this.aStart)
            //     const yPos = this.y + this.rStart * sin(this.aStart)
            //     this.aStart = lerp(this.aStart, this.ang, 0.01)
            //     fill(PALLATE[i]);
            //     ellipse(xPos, yPos, 10);
            // }
        }
    }
    update() {
        let d = dist(px, py, this.x, this.y);
        if (d < this.r) {
            this.rStart
        }
    }
}
//BUBBLES

// LEGENDS
class Legends {
    constructor(cN, lX, lY, lR, lA) {
        this.x = lX;
        this.y = lY;
        // this.aStart = floor(random(0, 360));
        this.aStart = 0;
        this.rStart = 40;
        this.r = lR;
        this.a = lA;
        this.n = cN;
        this.randPosX;
        this.randPosY;
        this.ang = floor(random(0, 360));
        // this.ang = 0;
    }
    pointOnCircle(randAng) {
        if (randAng) {
            const xPos = this.x + this.r * cos(randAng)
            const yPos = this.y + this.r * sin(randAng)
            return createVector(xPos, yPos)

        } else {
            const xPos = this.x + this.r * cos(this.a)
            const yPos = this.y + this.r * sin(this.a)
            return createVector(xPos, yPos)
        }
    }

    show(i) {
        //fill(PALLATE[i]);
        //stroke(0);
        noStroke()
        //ellipse(this.x, this.y, this.rStart);
        let thisVertex = this.pointOnCircle(lerp(this.ang, 10, 0.01))

        //Ref Lines
        // let aa = this.x + this.r * cos(180)
        // let bb = this.y + this.r * sin(180)
        // line(this.x, this.y, aa, bb)

        //ellipse(thisVertex.x, thisVertex.y, this.rStart, this.rStart);

        this.randPosX = thisVertex.x;
        this.randPosY = thisVertex.y;

        fill(100)
        text(this.n, thisVertex.x + 20, thisVertex.y - 10);
        textSize(14);
        textAlign(CENTER);
        this.legends(i)
    }
    legends(i) {
        push()
        textAlign(LEFT);
        translate(25, 100); fill(PALLATE[i]);
        ellipse(0, (20 * i) - 5, 10, 10);
        text(this.n, 15, 20 * i);
        pop()
    }

    move(i) {
        this.animate(i)
    }

    animate(i) {
        if (this.rStart <= this.r) {
            //For Radius            
            this.rStart = lerp(this.rStart, 10, random(0, 0.1))

            /////////////////////////////////
            //For Angle
            // const xPos  = this.x + this.r * cos(this.ang)
            // const yPos = this.y + this.r * sin(this.ang)
            //let thisVertex = this.pointOnCircle(this.a)

            if (this.aStart <= this.ang) {
                //Animate Radius            
                //this.aStart = lerp(this.aStart, this.ang, 0.01)
                const xPos = this.x + this.r * cos(this.aStart)
                //console.log(xPos)
                const yPos = this.y + this.r * sin(this.aStart)
                // this.aStart += 1
                this.aStart = lerp(this.aStart, this.ang, 0.01)
                fill(PALLATE[i]);
                ellipse(xPos, yPos, 10);
            }

            // fill(PALLATE[i]);
            //noFill();
            //stroke(150);
            //ellipse(thisVertex.x, thisVertex.y, 20, 20)

        }
    }

    clicked(px, py, i) {
        let d = dist(px, py, this.randPosX, this.randPosY);
        if (d < this.rStart) {
            bubbles[i]
            fill(PALLATE[i]);
            console.log("Legend Clicked ID is -", i);
        }
    }
    mOver(px, py, i) {
        let mO = dist(px, py, this.randPosX, this.randPosY);
        if (mO < this.rStart) {
            console.log("Legend Mouse Over", i);
            this.rStart
        }
    }
}

// Vehicle
class Vehicle {
    constructor(vx, vy) {
        this.pos = createVector(vx, vy);
        this.target = createVector(vx, vy);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 8;
        this.maxspeed = 10;
        this.maxforce = 1
    }
    show() {
        push()
        stroke(0)
        strokeWeight(8)
        point(this.pos.x, this.pos.y)
        pop()
    }
    behaviors() {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);
        arrive.mult(1);
        flee.mult(5)
        this.applyForce(arrive);
        this.applyForce(flee);
    }
    applyForce(f) {
        this.acc.add(f);
    }
    arrive(target) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed)
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce)
        return steer;
    }
    flee(target) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce)
            return steer;
        } else {
            return createVector(0, 0);
        }
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0)
    }
}

