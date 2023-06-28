class HtmlHandler {

  constructor() {
    this.networkContainer = $("#network-container");
    this.text = $(".text");
    this.showHide = this.networkContainer.find("#show-hide-network");
    this.compChoice = $("#comp-choice");
    this.editText = $("#edit-text");

    this.canv = createCanvas(400, 200);
    this.canv.parent("#network-container");

    this.networkShowed = true;

    this.eventListeners();
  }

  eventListeners() {
    this.showHideNetwork();
    this.changeText();
    this.chooseText();
  }

  chooseText() {
    this.text.on("click", async function() {
      const textColor = this.id.slice(0, 5);
      if (network.checking) {
        if (network.checking["text color"] == textColor) {
          await database.authData(network.checking.id);
        } else {
          await database.delData(network.checking.id);
        }
      } else {
        await database.addColor(network.color, textColor);
      }
      network.newColor();
    });
  }

  blackOrWhite(white) {
    if (white) {
      this.compChoice.css("left", "25%");
      this.compChoice.css("color", "white");
      this.compChoice.css("background", "black");
    } else {
      this.compChoice.css("left", "75%");
      this.compChoice.css("color", "black");
      this.compChoice.css("background", "white");
    }
    this.compChoice.css("visibility", "visible");
  }

  changeColor(c) {
    this.text.css("background", `rgb(${c[0]}, ${c[1]}, ${c[2]})`);
  }

  showHideNetwork() {
    this.showHide.on("click", () => {
      this.networkShowed = !this.networkShowed;
      if (this.networkShowed) {
        this.networkContainer.css("transform", "translate(-50%,-200px)");
        this.showHide.css("transform", "translate(-50%, -25px) rotate(90deg) scaleX(-1)");
      } else {
        this.networkContainer.css("transform", "translate(-50%,0)");
        this.showHide.css("transform", "translate(-50%, -25px) rotate(90deg)");
      }
    });
  }

  changeText() {
    this.editText.on("input", () => {
      this.text.text(this.editText.text());
    });
  }

}