var S2 = function (SK) {
    const SK2_PALLATE = ["#511845", "#900c3f", "#c70039", "#ff5733", "#ffa41b", "#3dc400", "#005082", "#00a8cc", "#00bdaa", "#f1e7b6"];

    let startSketch2 = false;
    let sk2resData, sk2RegionsArray, sk2RL;
    let lines = [];
    SK.setup = function () {
        var canvas = SK.createCanvas(SK.windowWidth, SK.windowHeight);
        canvas.parent('canvas02');
        SK.noLoop();

    };

    SK.draw = function () {
        // console.log("sk2resData", sk2RegionsArray);
        if (startSketch2) {
            SK.background(200);
            SK.angleMode(DEGREES);
            SK.translate(0, SK.windowHeight/1.25)
            SK.ellipse(0, 0, 30, 30);
            SK.line(0, 0, SK.windowWidth, 0);
            for (let i = 0; i < sk2RL; i++) {

                let m = map(i, 0, sk2RL, 100, SK.windowWidth - 100);
                let barH = map(sk2RegionsArray[i].total_cases, 100, -sk2resData.summary.total_cases, -100, SK.windowHeight);
                let b = new Line(m, -50, m, barH);

                lines.push(b);
                SK.push()
                lines[i].show(i);
                SK.pop()

            }
        } else {
            console.log("Not Loaded");
        }
    };
    //  BUBBLES
    class Line {
        constructor(lPosX1, lPosY1, lPosX2, lPosY2) {
            this.x1 = lPosX1;
            this.y1 = lPosY1;
            this.x2 = lPosX2;
            this.y2 = lPosY2;
            this.RandC = SK.floor(SK.random(0, 9))

        }
        show(i) {
            SK.fill(SK2_PALLATE[this.RandC]);
            // SK.stroke(SK2_PALLATE[3]);
            // SK.stroke(SK2_PALLATE[3]);
            SK.line(this.x1, this.y1, this.x2, this.y2);
            SK.push()
            SK.noStroke()
            SK.ellipse(this.x1, this.y1, 6);
            SK.ellipse(this.x2, this.y2, 3);
            SK.pop()


            SK.push()
            //SK.stroke(0)
            SK.translate(this.x1, 0);
            SK.rotate(-90);
            SK.textAlign(LEFT, BOTTOM);
            //SK.text(sk2RegionsArray[i].name, this.x1, this.y1);
            //SK.text(sk2RegionsArray[i].total_cases, this.x2, this.y2);
            SK.pop()

            if (sk2RegionsArray[i].name == "india") {
                // SK.text(i, this.x2, this.y2);
                // SK.fill(SK2_PALLATE[5]);
                SK.textAlign(CENTER, BOTTOM);
                SK.text(sk2RegionsArray[i].name, this.x1, this.y1+26);
                SK.text(sk2RegionsArray[i].total_cases, this.x2, this.y2-20);
                SK.ellipse(this.x2, this.y2, 10);
            }
        }
        move(i) {
            this.animate(i)
        }
        animate(i) {
        }
        update() {
        }
    }
    //This function for START P5
    SK.startSketch2 = function (resData) {
        console.log(resData);
        sk2resData = resData;
        startSketch2 = true;
        SK.loop();
        console.log("Loop Started", startSketch2);
        const regionsObj = resData.regions
        //Convert objects of Obj into objects of Array
        sk2RegionsArray = Object.values(regionsObj)
        window.sk2RegionsArray =sk2RegionsArray;
        sk2RL = sk2RegionsArray.length
        console.log("sk2RegionsArray.length", sk2RegionsArray.length);
        console.log("sk2RegionsArray", sk2RegionsArray[0]);

    }
};
var sketch_2 = new p5(S2, 'p5sketch');
