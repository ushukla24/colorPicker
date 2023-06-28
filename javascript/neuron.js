// Input Neuron class
class Input {

  constructor(num, pos) {
    Object.assign(this, {
      num,
      pos
    });
  }

  draw(c) {

    // Colored circle
    noStroke();
    fill(c);
    circle(
      width / 8,
      (this.pos + 0.5) / this.num * height,
      min(height / this.num / 2, height / 6)
    );

    // R:, G:, or B: before value
    textSize(20);
    textAlign(RIGHT, CENTER);
    fill(0);
    text(
      ["R:", "G:", "B:"][this.pos],
      width / 8 - min(height / this.num / 4, height / 12) - 5,
      (this.pos + 0.5) / this.num * height
    );

    // Write neuron value in center
    fill(255);
    stroke(0);
    strokeWeight(3);
    textSize(15);
    textAlign(CENTER, CENTER);
    text(
      c.levels[this.pos],
      width / 8,
      (this.pos + 0.5) / this.num * height
    );
  }

}

// Neuron subclass of Input Neuron class
class Neuron extends Input {

  constructor(num, pos, prev, layer) {
    super(num, pos);
    this.prev = prev;
    this.layer = layer;
    this.bias = random(-1, 1);
    this.weights = [];
    for (let i = 0; i < this.prev; i++) {
      this.weights.push(random(-1, 1));
    }
  }

  // Provide an output using the weights, previous neuron values, and bias
  feedforward(prevVals) {
    this.value = this.bias;
    this.weights.forEach((weight, i) => {
      this.value += weight * prevVals[i];
    });
    this.value = Math.tanh(this.value);
  }

  // Draw the neuron and its weights
  draw() {

    // Neurons
    stroke(map(this.bias, -1, 1, 200, 100));
    if (this.bias > 0) {
      stroke(0, 0, this.bias);
    } else {
      stroke(this.bias + 1, 0, 0);
    }
    strokeWeight(5);
    if (this.value > 0) {
      fill(0, 0, this.value);
    } else {
      fill(this.value + 1, 0, 0);
    }
    circle(
      width / 8 + width * 3 / 8 * this.layer,
      (this.pos + 0.5) / this.num * height,
      min(height / this.num / 2, height / 6)
    );

    // Weights
    strokeWeight(5);
    for (let i = 0; i < this.prev; i++) {
      if (this.weights[i] > 0) {
        stroke(0, 0, this.weights[i]);
      } else {
        stroke(this.weights[i] + 1, 0, 0);
      }
      line(
        width / 8 + width * 3 / 8 * this.layer - min(height / this.num / 4, height / 12),
        (this.pos + 0.5) / this.num * height,
        width / 8 + width * 3 / 8 * (this.layer - 1) + min(height / this.num / 4, height / 12),
        (i + 0.5) / this.prev * height
      );
    }

  }

}