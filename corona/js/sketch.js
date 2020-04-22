let angle22 = 0;
let r22 = 300;
let earth22;

let allData;
let eqAllDataIndex = 0;
let angRotation = 0.001
function preload() {
    earth22 = loadImage('./images/earth4.jpg');

    // ALL COUNTRYS DATA WITH COORDINATES
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid19-data.p.rapidapi.com/geojson-ww",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid19-data.p.rapidapi.com",
            "x-rapidapi-key": "7d2d8cdad7msh4d195f980df65dfp1e065bjsn15b1cff29222"
        }
    }

    $.ajax(settings).done(function (response) {
        allData = response.features;
        console.log(allData[0]);
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}
function mouseDragged() {
    angRotation = 0;
}
function mouseReleased() {
    if (angRotation === 0) {
        angRotation = 0.001;
    } else {
        angRotation = 0;
    }
}
function draw() {
    // wait until the data is loaded
    if (!allData || !allData[eqAllDataIndex]) {
        return;
    }
    clear();

    background(255);
    //drag to move the world.
    orbitControl(1, 1, 0.5);
    // We don't need to translate here, since WEBGL mode centers the view
    rotateY(angle22);
    angle22 += angRotation;

    // lights();

    push();
    noFill(200);
    stroke(0);
    // noStroke();
    // While the video shows that this doesn't work for texturing the
    // sphere, that's only true for Processing - in p5.js, it does work.

    texture(earth22);
    sphere(r22, 100, 100);
    line(200, 500, 400, 200)

    pop();

    for (let i = 0; i < allData.length; i++) {

        let lat = allData[i].properties.latitude;
        let lon = allData[i].properties.longitude;
        let mag = allData[i].properties.confirmed;
        let name = allData[i].properties.name;

        // original version
        // let theta = radians(lat) + PI/2;

        // fix: no + PI/2 needed, since latitude is between -180 and 180 deg
        let theta = radians(lat);

        let phi = radians(lon) + PI;

        // original version
        // let x = r * sin(theta) * cos(phi);
        // let y = -r * sin(theta) * sin(phi);
        // let z = r * cos(theta);

        // fix: in OpenGL, y & z axes are flipped from math notation of spherical coordinates
        let x = r22 * cos(theta) * cos(phi);
        let y = -r22 * sin(theta);
        let z = -r22 * cos(theta) * sin(phi);

        let pos = createVector(x, y, z);

        let h = pow(100, -mag);
        let maxh = pow(10, 70);
        h = map(h, 0, maxh, 10, 100);
        let xaxis = createVector(1, 0, 0);

        // Processing's PVector.angleBetween has a range from 0 to PI,
        // while p5.js' vector.angleBetween has a range from -PI to PI.
        // This is because it includes information about which direction
        // the angle goes (that is, if the first vector is the X axis,
        // whether the angle to the second vector is upwards or downwards).
        // We don't want the direction here, just the angle itself, so we
        // take the absolute value of the returned value to get that.
        let angleb = abs(xaxis.angleBetween(pos));

        let raxis = xaxis.cross(pos);

        push();
        stroke(255, 0, 0, 0.5);
        translate(x, y, z);
        // In p5.js, the rotation axis is a vector object instead of x,y,z
        rotate(angleb, raxis);
        fill(255, 255, 0);
        // box(h, 2, 2);
        line(0, 0, 0, h, 0, 0);
        textFont('Georgia');
        textSize(216);
        textAlign(RIGHT);
        text(name, 100, 300);
        textAlign(CENTER);
        //sphere(5);
        pop();

    }
}
