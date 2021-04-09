var S4 = function (SKM) {
    //Random Color select
    //const PALLATE = ["#1be7ff", "#f8333c", "#8f2d56", "#6eeb83", "#e4ff1a"];
    //const PALLATE = ["#333232", "#4c5454", "#f3a712", "#db2b39", "#447604"];
    //const PALLATE = ["#30bced", "#d16014", "#e3e4db", "#23395b", "#050401"];
    const PALLATE = ["#26547c", "#ef476f", "#ffd166", "#23af82", "#fcfcfc"];
    //ORANGE SHADES
    // const PALLATE = ["#900c3f", "#c70039", "#ffd166", "#ff5733", "#ffc300"];
    // const PALLATE = ["#a0006b", "#ffb533", "#f95c41", "#9ec630", "#ff959b"];

    let w, h = 1000
    let code_start = h / 20
    let code_end = h - h / 20
    let lines_of_code = 12
    let line_sep = (code_end - code_start) / lines_of_code

    let startSketch4 = false;
    let monthDataArray;

    SKM.setup = function () {
        var canvas = SKM.createCanvas(SKM.windowWidth, SKM.windowHeight);
        canvas.parent('canvas04');
        SKM.noLoop();
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        SKM.background(32, 33, 79);
        SKM.strokeWeight(8);
        SKM.strokeCap(SKM.ROUND);
        SKM.stroke(0, 255, 255);

        line_y = code_start
        line_x = 50
        for (let i = 0; i < lines_of_code; i++) {
            line_x = 0
            SKM.stroke(SKM.random(PALLATE));

            let line_segments = SKM.random(2, 8);
            for (let j = 0; j < 30; j++) {
                let segment_length = SKM.random(0, 50);
                // let segment_length = 45;
                SKM.line(line_x, line_y, line_x + segment_length, line_y);
                line_x += segment_length + 20
                // line_x += 60
            }
            line_y += line_sep
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    };
    SKM.createVGrid = function (mx, my) {
        return SKM.createVector(mx, my)
    }
    SKM.draw = function () {
        if (startSketch4) { } else {
            console.log("Not Loaded");
        }
    };

    //This function for START P5
    SKM.startSketch4 = function (convertedJSONArray) {
        console.log("convertedJSONArray", convertedJSONArray);
        monthDataArray = convertedJSONArray
        startSketch4 = true;
        // SKM.loop();
    }
};

var sketch_4 = new p5(S4, 'p5sketch');
