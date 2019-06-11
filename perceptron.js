function Perceptron(weightsNumber, lr){
  this.weightsNumber= weightsNumber,
  this.weights =[];
  this.lr =lr;
  this.bias=1;

  this.initWeights=function(){
    for (var i=0; i<weightsNumber;i++){
      var attributedWeight =random(-1,1);
    this.weights[i] = attributedWeight;
    }
    console.log("Weights init : "+ this.weights);
  }

  this.guess = function(inputs){ //array of inputs as argument
    var inputss = [inputs.x, inputs.y, this.bias];
    var sum =0;
    for (var i=0; i<weightsNumber;i++){
      sum += this.weights[i]*inputss[i]; //weighted sum
    }
      var guess = sign(sum);
      // console.log("guess: " + guess);
      return guess;
  }

  // train
  this.train = function(inputs, correctClassification){
    var guess =p.guess(inputs);
    var error = correctClassification - guess;

    // console.log("error is: " + error);
    errorArray.push(error);
    // console.log("errorArray.length: " + errorArray.length);

    var inputss = [inputs.x, inputs.y, this.bias];
    for (var i=0; i<this.weightsNumber;i++){
      this.weights[i]+= error * inputss[i] * lr;

      // console.log("weight " + i + ' becomes :' + this.weights[i]);
    }
    return guess;
  }

  this.guessY = function(x){
      var slope = p.weights[0]/p.weights[1];
      var intercept =  p.weights[2];
      return slope * x + intercept;
  }
}
