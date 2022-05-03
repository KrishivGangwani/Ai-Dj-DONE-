song = "";
lwx = 0;
lwy = 0;

rwx = 0;
rwy = 0;
scoreLW = 0;
scoreRW = 0;

function preload(){
    song = loadSound("song1.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = "+scoreRW+     "Score Left Wrist = "+scoreLW);

        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+lwx+" left wrist y ="+ lwy);
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rwx+" right wrist y ="+ rwy);


    }
}

function modelLoaded(){
    console.log('Posenet is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    if(scoreRW > 0.2){
    circle(rwx,rwy,20);

     if(rwy > 0 && rwy <= 100){
         document.getElementById("speed").innerHTML = "Speed = 0.5x";
         song.rate(0.5);
     }

     else if(rwy > 100 && rwy <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x";
    song.rate(1);
     }

     else if(rwy > 200 && rwy <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
         }

         else if(rwy > 300 && rwy <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
             }

             else if(rwy > 400 && rwy <= 500){
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                song.rate(2.5);
                 }
                }

    if(scoreLW > 0.2)
    {
    circle(lwx, lwy, 20);
    InNolwy = floor(Number(lwy));
    volume = InNolwy/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume; 
    song.setVolume(volume);
       }


}


function  play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}

function stop(){
    song.stop();
}