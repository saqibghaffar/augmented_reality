let video;
let bodypix;
let options;
let poses = [];

function setup() {
  let videoWidth = window.innerWidth/2.8;
  let videoHeight = window.innerWidth/2.8;
  const canvas = createCanvas(videoWidth, videoHeight);
  canvas.parent('videoContainer');

  // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);


  var posenetoptions = {
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minPoseConfidence: 0.25,
    minPartConfidence: 0.5,
    maxPoseDetections: 1, //detect only single pose
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: 'single', //detect only single pose
    multiplier: 0.75,
  };
  // poseNet = ml5.poseNet(video, posenetoptions, 'single', modelReady);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, posenetoptions, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}





function draw() {
  image(video, 0, 0, width, height);
  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  drawSkeleton();
}

function modelReady(){
  console.log('Model Loaded!');

}


// A function to draw the skeletons
function drawSkeleton() {



  if (poses.length > 0) {

    let pose = poses[0].pose;
    let nose = pose.keypoints[0].position;
    let leftEye = pose.keypoints[1].position;
    let rightEye = pose.keypoints[2].position;
    let leftEar = pose.keypoints[3].position;
    let rightEar = pose.keypoints[4].position;
    let leftShoulder = pose.keypoints[5].position;
    let rightShoulder = pose.keypoints[6].position;

    console.log(pose.score)
    console.log("leftEar           ----------")

    // head start
    var head0 = "assets/1.png"
    let headPaths = [head0];
    let heads = [];
    headPaths.forEach((path) => {
     let img = new Image();
     img.src = path;
     heads.push(img);
   });
    var context = canvas.getContext("2d");
    //context.drawImage(heads[0],nose.x,nose.y);

    // if (leftEar.score ){
     let headWidth = getDistance(leftEar,rightEar);
     let headHeight = getDistance(leftEye,rightEye);

     context.drawImage(   heads[0],nose.x - headWidth / 2,leftEye.y - headHeight / 2,headWidth,headHeight);
    // }
    // head end

    // left arm start
    if (pose.keypoints.length > 10) {
      let leftElbow = pose.keypoints[7].position;
      let rightElbow = pose.keypoints[8].position;
      let leftWrist = pose.keypoints[9].position;
      let rightWrist = pose.keypoints[10].position;
      let leftHip = pose.keypoints[11].position;
      let rightHip = pose.keypoints[12].position;
      let leftKnee = pose.keypoints[13].position;
      let rightKnee = pose.keypoints[14].position;
      let leftAnkle = pose.keypoints[15].position;
      let rightAnkle = pose.keypoints[16].position;
      leftForearm0 =  'assets/leftForearm/1.png';
      let leftForearmPaths = [leftForearm0];
      let leftForearms = [];
      leftForearmPaths.forEach((path) => {let img = new Image();img.src = path;leftForearms.push(img);});
        // multiPoseDetection: {
        //   maxPoseDetections: 5,
        //   minPoseConfidence: 0.15,
        //   minPartConfidence: 0.1,
        //   nmsRadius: 30.0
        // }
        var context = canvas.getContext("2d");
        minPoseConfidence = 0.25;
        minPartConfidence = 0.5;
        drawLimb(leftElbow, leftWrist,minPartConfidence,leftForearms[0],context);
        leftUpperarm0 = 'assets/leftUpperarm/1.png';
        let leftUpperarmPaths = [leftUpperarm0];
        let leftUpperarms = [];
        leftUpperarmPaths.forEach((path) => {let img = new Image();img.src = path;leftUpperarms.push(img);});
        drawLimb(leftShoulder,leftElbow,minPartConfidence,leftUpperarms[0],context);
        // left arm end
        rightForearm0 = 'assets/rightForearm/1.png';
        let rightForearmPaths = [rightForearm0];
        let rightForearms = [];
        rightForearmPaths.forEach((path) => {let img = new Image();img.src = path;rightForearms.push(img);});
        // Right arm
        drawLimb(rightElbow,rightWrist,minPartConfidence,rightForearms[0],context);
        rightUpperarm0 = 'assets/rightUpperarm/1.png';
        let rightUpperarmPaths = [rightUpperarm0];
        let rightUpperarms = [];
        rightUpperarmPaths.forEach((path) => {let img = new Image();img.src = path;rightUpperarms.push(img);});
        drawLimb(rightShoulder,rightElbow,minPartConfidence,rightUpperarms[0],context);
        // Left leg
        leftShin0 = 'assets/leftShin/1.png';
        let leftShinPaths = [leftShin0];
        let leftShins = [];
        leftShinPaths.forEach((path) => {let img = new Image();img.src = path;leftShins.push(img);});
        drawLimb(leftKnee,leftAnkle,minPartConfidence,leftShins[0],context);
        leftThigh0 = 'assets/leftThigh/1.png';
        let leftThighPaths = [leftThigh0];
        let leftThighs = [];
        leftThighPaths.forEach((path) => {
          let img = new Image();
          img.src = path;
          leftThighs.push(img);
        });
        drawLimb(leftHip,leftKnee,minPartConfidence, leftThighs[0],context);
        // Right leg
        rightShin0 = 'assets/rightShin/1.png';
        let rightShinPaths = [rightShin0];
        let rightShins = [];
        rightShinPaths.forEach((path) => {let img = new Image();img.src = path;rightShins.push(img);});
        drawLimb(rightKnee,rightAnkle,minPartConfidence,rightShins[0],context);

        rightThigh0 = 'assets/rightThigh/1.png';
        let rightThighPaths = [rightThigh0];
        let rightThighs = [];
        rightThighPaths.forEach((path) => {
          let img = new Image();
          img.src = path;
          rightThighs.push(img);
        });

        drawLimb(rightHip,rightKnee,minPartConfidence,rightThighs[0],context);
        //
        torso0 = 'assets/hiclipart.com-id_ilswg.png';
        let torsoPaths = [torso0];
        let torsos = [];
        torsoPaths.forEach((path) => {let img = new Image();img.src = path;torsos.push(img);});
        let torsoImage = torsos[0];


        if (pose.score > 0.80 ){
         context.drawImage(torsoImage,rightShoulder.x /1.2,rightShoulder.y /1.2 ,(getDistance(leftShoulder , rightShoulder )*2),getDistance(leftShoulder,leftHip) *1.3 );
       }
     }

     function drawLimb(part1, part2, minPartConfidence, theImage, ctx) {
       let pos1 = part1;
       let pos2 = part2;



       if (poses[0].pose.score > 10.1 && poses[0].pose.score > minPartConfidence) {

         let img = theImage;
         let c = getDistance(pos1, pos2);
         let d = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y + c - pos2.y, 2)     );
         let rotation = Math.acos(1 - Math.pow(d, 2) / (2 * Math.pow(c, 2)));
         if (pos2.x > pos1.x) {
          rotation *= -1;
        }
        let w = (img.width * c) / img.height;
        ctx.save();
        ctx.translate(pos1.x, pos1.y);
        ctx.rotate(rotation);
        ctx.drawImage(img, 0, 0, w, c);
        ctx.restore();
      }
    }
  }
  function  getDistance(a, b) {
    const distX = a.x - b.x;
    const distY = a.y - b.y;
    return Math.sqrt(distX ** 2 + distY ** 2);
  }

}
