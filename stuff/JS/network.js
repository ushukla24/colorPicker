class Network {

  constructor(numNeurons) {
    this.numNeurons = numNeurons;
    this.neurons = [
      [...Array(3)].map((e, i) => new Input(3, i)),
      [...Array(this.numNeurons)].map((e, i) => new Neuron(this.numNeurons, i, 3, 1)),
      [...Array(2)].map((e, i) => new Neuron(2, i, this.numNeurons, 2))
    ];
    this.newColor();
  }

  draw() {
    background(238, 226, 223);
    for (let input of this.neurons[0]) {
      input.draw(this.color);
    }
    for (let i = 1; i < 3; i++) {
      for (let neuron of this.neurons[i]) {
        neuron.draw();
      }
    }
  }

  async newColor() {
    this.checking = await database.getNewColor();
    console.log(this.checking);
    if (this.checking) {
      this.color = color(this.checking.color);
    } else {
      this.color = color(random(), random(), random());
    }

    this.neurons[0].forEach((input, i) => {
      input.value = this.color._array[i];
    });
    htmlHandler.changeColor(this.color.levels);
    this.feedforward();
    this.draw();
  }

  trainColor() {

  }

  feedforward() {
    for (let i = 0; i < 2; i++) {
      for (let neuron of this.neurons[i + 1]) {
        neuron.feedforward(this.neurons[i].map(prevn => prevn.value));
      }
    }
    // 1 = white, 0 = black
    htmlHandler.blackOrWhite(this.neurons[2][1].value > this.neurons[2][0].value);
  }

  async train() {
    const dataArr = await database.useArchiveData();

    for (let data of dataArr) {
      this.trainColor(color(data.color));
    }

    database.setNetwork(
      network.neurons.map(layer => layer.map(neuron => neuron.bias)).slice(1),
      network.neurons.map(layer => layer.map(neuron => neuron.weights))[1],
      network.neurons.map(layer => layer.map(neuron => neuron.weights))[2]
    );
    console.log("Done!");
  }

}