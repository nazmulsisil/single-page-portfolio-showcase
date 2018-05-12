import $ from "jquery";

class Reaction {
  constructor() {
    this.target = document.getElementsByClassName("target")[0];
    this.scoreDisplay = document.getElementById("reaction-time");
    this.recordDisplay = document.getElementById("reaction-record");
    this.lastRecord = 99999;
    this.turn = 0;
    this.events();
  }

  events() {
    const self = this;
    this.target.addEventListener("click", function () {
      self.htmlInjection();
      self.appearAgain();
    });
  }

  htmlInjection() {
    this.reactionTime = ((new Date() - this.reactionTime) / 1000).toFixed(2);
    this.target.innerHTML = "";
    this.scoreDisplay.innerHTML =
      this.reactionTime == "NaN" ? "" : this.reactionTime;

    this.lastRecord =
      this.lastRecord > this.reactionTime ? this.reactionTime : this.lastRecord;

    this.recordDisplay.innerHTML = this.turn == 0 ? "" : this.lastRecord;
    this.turn++;
    this.playgroundHeight = $(".reaction").height();
    this.playgroundWidth = $(".reaction").width();
  }

  appearAgain() {
    this.heightWidth = this.r(200, 50);

    let targetScopeX = this.playgroundWidth - this.heightWidth;
    let targetScopeY = this.playgroundHeight - this.heightWidth;

    this.target.style.height = this.heightWidth + "px";
    this.target.style.width = this.heightWidth + "px";
    this.target.style.top = this.r(targetScopeY) + "px";
    this.target.style.left = this.r(targetScopeX) + "px";
    this.target.style.backgroundColor = this.color();
    this.target.style.borderRadius = this.isCircle();
    this.reactionTime = new Date();
  }

  r(max = 1, min = 0, decimal = 2) {
    if (max === 1) {
      return Math.random().toFixed(decimal);
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  color() {
    let n1 = this.r(230),
      n2 = this.r(230),
      n3 = this.r(230),
      colArr = [n1, n2, n3];
    colArr = colArr.sort(function () {
      return 0.5 - Math.random();
    });
    return "rgb(" + colArr[0] + "," + colArr[1] + "," + colArr[2] + ")";
  }

  isCircle() {
    let borderRadius = "3px";
    if (this.r() < 0.5) {
      borderRadius = "50%";
    }
    return borderRadius;
  }
}

export default Reaction;
