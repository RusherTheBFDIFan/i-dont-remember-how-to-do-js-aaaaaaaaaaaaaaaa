video = "";
status = "";
objects = [];

function preload(){
    video = createVideo(VIDEO);
    video.hide();
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
        objectDetector.detect(video, VIDEO);
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby...";
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML =  "Status: Baby Detected!";
        document.getElementById("numberofobjects").innerHTML = "Number of objects detected are: " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}