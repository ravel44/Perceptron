var p; //object of Perceptron class
var bubbles =[] ; //training set
var errorArray=[];

var train = 0; //switch to start the training
var trainingNumber =0; // to count
var maxTraining= 1000;

//vars for display
var button;
var numTrain;
var err;
var weight1;
var weight2;
var weight3;
var weight1adjusted;
var weight2adjusted;
var weight3adjusted;

var w=window.innerWidth;
var h=window.innerWidth;

var e=[];

function setup() {
  createCanvas(w, h);
  p = new Perceptron(3, 0.1); //x, y  and bias, learning rate
  // p.initWeights();
  for (var i =0; i<100; i++){ //create bubbles
    bubbles[i] = new Bubble();
  }

  createElement('p','');
  button= createButton('Train!');
  button.mousePressed(training);
  createElement('p','')
  createElement('span', 'Number of training: ');
  numTrain = createElement('span', trainingNumber);
  numTrain.style('color', 'blue');
  createElement('p','')
  createElement('span', 'Weight of input #1 (input 1 is the x coordinates of circles): ');
  weight1 = createElement('span', weight1adjusted);
  weight1.style('color', 'magenta');
  createElement('p','')
  createElement('span', 'Weight of input #2 (input 2 is the y coordinates of circles): ');
  weight2 = createElement('span', weight2adjusted);
  weight2.style('color', 'magenta');
  createElement('p','')
  createElement('span', 'Weight of input #3 (bias, so that the guess is never null): ');
  weight3 = createElement('span', weight3adjusted);
  weight3.style('color', 'magenta');
}

function draw() {
  frameRate(2);
  background(255);

  for (var i =0; i<bubbles.length; i++){
    bubbles[i].show();

    if (train == 1){
      trainingNumber++;
      numTrain.html(trainingNumber);

      var guess= p.train(bubbles[i], bubbles[i].correctClassification); //inputs, targets
      var error = abs(bubbles[i].correctClassification-guess);

      if(guess ==bubbles[i].correctClassification ){ // color coded right/wrong guess
          fill(0,255,0);
        }else{
          fill(255,0,0);
        }
        ellipse(bubbles[i].x, bubbles[i].y, 16, 16);
        weight1.html(p.weights[0].toFixed(2));
        weight2.html(p.weights[1].toFixed(2));
        weight3.html(p.weights[2].toFixed(2));

        if(trainingNumber == maxTraining){
          noLoop();
        }
    }
  }

  //drawing error
  for (var k=0; k<errorArray.length; k++){
    if (errorArray[k] !==0){
    stroke(255,0,0);
  }else {
    stroke(51, 51,255);
  }
    line(k, height, k, height-errorArray[k]*100-5 ); //red vertical lines
  }

//classification line (solution for the perceptron to figure out)
  stroke(0);
  fill(0);
  line(0,0, width, height);

//What the perceptron thinks it is y = slope*x + b
  stroke(255,0,255);
  line(0,p.guessY(0),width, -p.guessY(width));
}

//==================================================================
//the rule p has to figure out, used for training set
function sign(n){
  if (n>=0){
    return 1;
  }else{
    return -1;
  }
}

//train one by one instead of training the whole==================
function training(){
  p.initWeights();
  train =1;
  trainingNumber=0;
  errorArray=[];
  loop();
}
