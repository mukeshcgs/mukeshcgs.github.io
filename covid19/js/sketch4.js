var S4 = function (SKM) {
    const SK4_PALLATE = ["#648eff", "#785ef0", "#9320a2", "#e72326", "#ffffff"];

    let startSketch4 = false;
    let sk4resData, monthDataArray, monthData;
    let dots = [];
    let vGrid = [];
    const cellSize = 50
    const cell = {
        cWidth: cellSize,
        cHeight: cellSize
    }
    const spaceBetweenCell = 50;
    SKM.setup = function () {
        var canvas = SKM.createCanvas(SKM.windowWidth, SKM.windowHeight);
        canvas.parent('canvas04');
        SKM.noLoop();
    };
    SKM.createVGrid = function (mx, my) {
        return createVector(mx, my)
    }
    SKM.draw = function () {
        if (startSketch4) {
            SKM.background(32, 33, 79);
            //SKM.angleMode(DEGREES);
            SKM.translate(200, 200)
            SKM.line(this.x1, this.y1, this.x2, this.y2);

            //SKM.ellipse(0, 0, 50, 30);
            for (let mj = 0; mj < 4; mj++) {
                for (let i = 0; i < 7; i++) {
                    const mx = i * (cell.cWidth + spaceBetweenCell)
                    const my = mj * (cell.cHeight + spaceBetweenCell + 50)
                    //SKM.createVGrid(mx,my)
                    let mc = SKM.map(i, 0, monthDataArray.length, 200, SKM.windowWidth - 200);
                    // let mc = map(mi, 0, monthDataArray.length, 200, SKM.windowWidth - 200);
                    vGrid.push(SKM.createVGrid(mx, my));
                    let c = new Dot(mx, my, mc, 0, vGrid);
                    dots.push(c);
                    SKM.ellipse(mx, my, 5, 5);
                }
            }
            for (let dd = 0; dd < monthDataArray.length; dd++) {
                SKM.push()
                // SKM.fill(SK4_PALLATE[3]);
                SKM.noFill();
                dots[dd].show(dd);
                SKM.pop()
            }

        } else {
            console.log("Not Loaded");
        }
    };
    //  CIRCLES
    class Dot {
        constructor(lPosX1, lPosY1, lPosX2, lPosY2, vGrid) {
            this.x1 = lPosX1;
            this.y1 = lPosY1;
            this.x2 = lPosX2;
            this.y2 = lPosY2;
            this.RandC = SKM.floor(SKM.random(0, 9));
            this.randColor = SKM.random(SK4_PALLATE);
            this.vGrid = vGrid;
            this.pallate = SK4_PALLATE
            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.vGrid[0].x);
        }
        show(i) {
            // SKM.stroke(SK4_PALLATE[3]);
            // SKM.stroke(SK4_PALLATE[3]);
            // SKM.line(this.x1, this.y1, this.x2, this.y2);
            SKM.push()
            // SKM.fill(SK4_PALLATE[i])
            SKM.fill(255, 0.3)
            SKM.stroke(255);
            // SKM.ellipse(this.vGrid.x, this.vGrid.y, 30);
            SKM.pop()

            //SKM.stroke(SK4_PALLATE[i])
            //SKM.fill(SK4_PALLATE[i])
            //let cirH = map(monthDataArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, SKM.windowHeight);
            // let cirH = map(monthDataArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, 200);
            //SKM.ellipse(this.x1, this.y1, monthDataArray[i].total_cases / monthDataArray[i].death_ratio);
            //SKM.ellipse(this.x1, this.y1, monthDataArray[i].tested / cirH);
            //SKM.ellipse(this.x1, this.y1, monthDataArray[i].total_cases / monthDataArray[i].recovery_ratio);
            //SKM.ellipse(this.x1, this.y1, monthDataArray[i].total_cases / cirH);

            const object = monthDataArray[i];
            const picked = (({ total_cases, tested, recovered, critical, deaths }) => ({ total_cases, tested, recovered, critical, deaths }))(object);

            Object.size = function (obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

            Object.values(picked).forEach((value, index) => {
                SKM.push();
                SKM.stroke(0);
                //SKM.ellipse(this.vGrid[i].x, this.vGrid[i].y, 50);
                //SKM.ellipse(this.vGrid[i].x, this.vGrid[i].y, 100);
                SKM.pop();
                //console.log("VALUSE", value);
                let nn
                SKM.stroke(this.pallate[index])
                SKM.fill(this.pallate[index])
                // SKM.strokeWeight(index);

                // SKM.fill('rgba(255,255,255, 0.1)')
                if (index == 0) {
                    nn = value
                }
                let xx = SKM.map(value, 10, 2971533, 10, 100, true);
                //console.log("XX", xx);

                SKM.ellipse(this.vGrid[i].x, this.vGrid[i].y, xx);
            });
            SKM.push();
            SKM.noStroke()
            SKM.fill(255)
            SKM.textAlign(CENTER);
            SKM.text(monthDataArray[i].date, this.vGrid[i].x, this.vGrid[i].y - 60);
            SKM.pop();

        }
        move(i) { }
        animate(i) { }
        update() { }

        getObjSize(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
                console.log("KEY =", key);
            }
            return size;
        }

    }
    // sketch_4.startSketch4(resData,monthData,monthArray)

    //This function for START P5
    SKM.startSketch4 = function (resData, monthData, monthArray) {
        console.log("monthData =", monthData);
        sk4resData = window.resData;

        console.log("Loop Started", startSketch4);

        //const regionsObj = monthData.data
        //Convert objects of Obj into objects of Array
        // monthDataArray = Object.values(regionsObj)
        monthDataArray = monthArray
        monthData = monthDataArray.length

        console.log("monthDataArray", monthDataArray);
        console.log("monthDataArray.length", monthDataArray.length);
        console.log("monthDataArray[0]", monthDataArray[1]);

        // Object.size = function (obj) {
        //     var size = 0, key;
        //     for (key in obj) {
        //         if (obj.hasOwnProperty(key)) size++;
        //         console.log("KEY =", key);
        //     }
        //     return size;
        // };

        // // Get the size of an object
        // var size = Object.size(regionsObj);
        // console.log("SIZE", size);

        startSketch4 = true;
        SKM.loop();
    }
};
var sketch_4 = new p5(S4, 'p5sketch');
