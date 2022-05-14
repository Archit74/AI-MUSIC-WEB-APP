song_1 = "";
song_2 = "";

left_wrist_x = 0;
right_wrist_x = 0;

left_wrist_y = 0;
right_wrist_y = 0;

score_right_wrist = 0;
score_left_wrist = 0;

song_status = "";
song_2_status = "";

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
   canvas = createCanvas(500, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}

function modelloaded() {
    console.log("modelloaded");
}

function gotPoses(results) {

    if (results.length > 0)
     {
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;

score_left_wrist = results[0].pose.keypoints[9].score;
score_right_wrist = results[0].pose.keypoints[10].score;

    }
}

function draw()
{
    image(video, 0, 0, 500, 300);
song_status = song_1.isPlaying();
song_2_status = song_2.isPlaying();

    if(score_right_wrist>0.2)
    {
circle(right_wrist_x, right_wrist_y, 20);
song_2.stop();

if(song_status == false)
{
    song_1.play();
    document.getElementById("song").innerHTML = "playing Harry Potter";
    
}


    }

    if(score_left_wrist>0.2)
    {
circle(left_wrist_x, left_wrist_y, 20);
song_1.stop();

if(song_2_status == false)
{
    song_2.play();
    document.getElementById("song").innerHTML = "playing Peter Pan";
    
}


    }


}

function play()
{
    song.play();
}