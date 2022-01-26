noseX = 0;
noseY = 0;
difference = 0;
leftwristX = 0;
rightwristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550,500);
    video.position(150,180)
    canvas = createCanvas(550,450);
    canvas.position(760,240);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("posenet is initialized");
}

function gotPoses(results)
{
  if (results.length > 0)
  {
      console.log(results);
      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y;
      console.log("noseX = " + noseX + "noseY = " + noseY);

      leftwristX = results[0].pose.leftWrist.x;
      rightwristX = results[0].pose.rightWrist.x;

      difference = floor(leftwristX - rightwristX);

      console.log("leftwristX = " + leftwristX +"rightwristX = " + rightwristX + "differences = " + difference);
  }
}

function draw()
{
    document.getElementById("square_side").innerHTML = "width and hieght of the square will be =" + difference + "px";
    background('grey');
    fill('white');
    stroke('yellow');
    square(noseX,noseY,difference);
}