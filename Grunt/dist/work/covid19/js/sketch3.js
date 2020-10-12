var S3 = function (SKW) {
    const SK2_PALLATE = ["#511845", "#900c3f", "#c70039", "#ff5733", "#ffa41b", "#3dc400", "#005082", "#00a8cc", "#00bdaa", "#f1e7b6"];

    let startSketch3 = false;
    let sk3resData, weekDataArray, weekData;
    let circles = [];
    SKW.setup = function () {
        var canvas = SKW.createCanvas(SKW.windowWidth, SKW.windowHeight);
        canvas.parent('canvas03');
        SKW.noLoop();
    };

    SKW.draw = function () {
        if (startSketch3) {
            SKW.background(150);
            SKW.angleMode(DEGREES);
            SKW.translate(0, SKW.windowHeight / 2)
            SKW.ellipse(0, 0, 50, 30);
            SKW.line(0, 0, SKW.windowWidth, 0);
            for (let i = 0; i < weekDataArray.length; i++) {
                let mc = map(i, 0, weekDataArray.length, 200, SKW.windowWidth - 200);
                //let barH = map(weekDataArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, SKW.windowHeight);
                //let barH = map(25, 100, 0, 100, SKW.windowHeight);
                //console.log(weekDataArray);

                let c = new Circle(mc, 0);
                circles.push(c);
                SKW.push()
                SKW.fill(255, 255, 255, 0.2);
                circles[i].show(i);
                SKW.pop()

            }
        } else {
            console.log("Not Loaded");
        }
    };
    //  CIRCLES
    class Circle {
        constructor(lPosX1, lPosY1, lPosX2, lPosY2) {
            this.x1 = lPosX1;
            this.y1 = lPosY1;
            this.x2 = lPosX2;
            this.y2 = lPosY2;
            this.RandC = SKW.floor(SKW.random(0, 9));
            this.randColor = SKW.random(SK2_PALLATE);
        }
        show(i) {
            // SKW.stroke(SK2_PALLATE[3]);
            // SKW.stroke(SK2_PALLATE[3]);
            // SKW.line(this.x1, this.y1, this.x2, this.y2);
            // SKW.push()
            // SKW.stroke(SK2_PALLATE[i])
            // SKW.ellipse(this.x1, this.y1, 30);
            // SKW.ellipse(this.x2, this.y2, 10);
            // SKW.pop()

            //SKW.stroke(SK2_PALLATE[i])

            //SKW.fill(SK2_PALLATE[i])
            //let cirH = map(weekDataArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, SKW.windowHeight);
            // let cirH = map(weekDataArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, 200);
            let cirH = 1000;
            //SKW.ellipse(this.x1, this.y1, weekDataArray[i].total_cases / weekDataArray[i].death_ratio);
            //SKW.ellipse(this.x1, this.y1, weekDataArray[i].tested / cirH);
            //SKW.ellipse(this.x1, this.y1, weekDataArray[i].total_cases / weekDataArray[i].recovery_ratio);
            //SKW.ellipse(this.x1, this.y1, weekDataArray[i].total_cases / cirH);

            const object = weekDataArray[i];
            const picked = (({ total_cases, tested, recovered, critical, deaths }) => ({ total_cases, tested, recovered, critical, deaths }))(object);
            //console.log(picked);
            //console.log(Object.values(picked));

            Object.size = function (obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

            //console.log(picked.length); 
            var pickedsize = Object.size(picked);
            //console.log("PICKED SIZE", pickedsize);

            Object.values(picked).forEach((value, index) => {
                //console.log("VALUSE", value);
                let nn
                SKW.stroke(this.randColor)
                if (index == 0) {
                    nn = value
                }
                let xx = map(value, 0, 2971533, 50, 200, true);
                //console.log("XX", xx);

                SKW.ellipse(this.x1, this.y1, xx);
                SKW.push();
                SKW.stroke(255, 0.5);
                SKW.ellipse(this.x1, this.y1, 50);
                SKW.ellipse(this.x1, this.y1, 200);
                SKW.pop();
            });
            //for (var i = 0; i < pickedsize; i++) {
            // for (var j = 0; j < pickedsize[i].length; j++) {
            //console.log(i.picked.total_cases);
            // } 
            //}

            // for (var i = 0; i < arr.length; i++) {}

            // for (var i = 0; i < arr.length; i++) {
            //     // i = 0, then we loop below:
            //     for (var j = 0; j < arr[i].length; j++) {
            //         //here we loop through the array which is in the main array
            //         //in the first case, i = 0, j = 1, then we loop again, i = 0, j = 1
            //         console.log(arr[i][j]);
            //         //after we finish the stuff in the 'j' loop we go back to the 'i' loop 
            //         //and here i = 1, then we go down again, i, remains at 1, and j = 0, then j = 1
            //         //....rinse and repeat, 
            //     }
            // }

            // SKW.push()
            // //SKW.stroke(0)
            // SKW.translate(this.x1, 0);
            // SKW.rotate(-90);
            // SKW.textAlign(LEFT, BOTTOM);
            // //SKW.text(weekDataArray[i].name, this.x1, this.y1);
            // //SKW.text(weekDataArray[i].total_cases, this.x2, this.y2);
            // SKW.pop()

            //if (weekDataArray[i].name == "india") {
            // SKW.text(i, this.x2, this.y2);
            // SKW.fill(SK2_PALLATE[5]);
            //SKW.ellipse(this.x2, this.y2, 900);
            //}
        }
        move(i) {
            this.animate(i)
        }
        animate(i) {
        }
        update() {
        }

        getObjSize(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
                console.log("KEY =", key);
            }
            return size;
        }

    }
    //This function for START P5
    SKW.startSketch3 = function (resData, weekData, weeksArray) {
        console.log("weekData =", weekData);
        sk3resData = window.resData;

        console.log("Loop Started", startSketch3);

        //const regionsObj = weekData.data
        //Convert objects of Obj into objects of Array
        // weekDataArray = Object.values(regionsObj)
        weekDataArray = weeksArray
        weekData = weekDataArray.length

        console.log("weekDataArray", weekDataArray);
        console.log("weekDataArray.length", weekDataArray.length);
        console.log("weekDataArray[0]", weekDataArray[1]);

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

        startSketch3 = true;
        SKW.loop();
    }
};
var sketch_3 = new p5(S3, 'p5sketch');
