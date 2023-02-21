class ZahlenRaten {

    constructor(inputArea, maxElement, inputElement , hintElement, tryElement) {

        this.inputArea = inputArea;
        this.maxElement = maxElement;
        this.inputElement = inputElement;
        this.hintElement = hintElement;
        this.tryElement = tryElement;

        this.secret;
        this.tries;
        this.inputClosestLower = null;
        this.inputClosestHigher = null;

    }

    checkIfNumber(value) {
        return typeof value == "number";
    }

    strat() {
        this.inputArea
            .classList
            .remove("hide");

        this.secret = Math.floor(Math.random() * this.maxElement.value) + 1;
        this.tries = this.tryElement.value;

        resetButton
            .classList
            .remove("hide");

        this.disable = true;
        this.maxElement.disable = true;
        this.tryElement.disable = true;
    }

    reset() {

        this.startButton.disable = false; 
        this.maxElement.disable = false;
        this.tryElement.disable = false; 
        this.confirmButton.disable = false; 
        this.inputClosestLower = null;
        this.inputClosestHigher = null;
        this.resetButton
            .classList
            .add("hide");

        this.inputArea
            .classList
            .add("hide");
        document.getElementById("hint").innerHTML = "";
    }

    guess() {
        let input = this.inputElement.value;
        const para = document.createElement("p");

        if (input <= 0) {
            para.innerText = "You are not allowed to put charachters, 0 or negative Numbers!"
        }

        else if (this.secret == input) {
            para.innerText = "Correct!"
            this.confirmButton.disable = true;
        }

        else if (this.secret > input)  {
            this.tries = this.tries -1;
            para.innerText = "My Number is bigger than " + input +". You have " +this.tries+ " tries left."
            if (this.inputClosestLower == null || input > this.inputClosestLower) {
                this.inputClosestLower == input;
            }
        }

        else {
            this.tries = this.tries -1;
            para.innerText = "My Number is smaller than " + input +". You have " +this.tries+ " tries left."
            if (this.inputClosestHigher == null || input > this.inputClosestHigher) {
                this.inputClosestHigher == input;
            } 
        }

        if (this.tries == 0) {
            para.innerText = "Game Over! Serect Number was " + this.secret;
            this.confirmButton.disable = true;
        }

        if ((this.inputClosestHigher != null && input > this.inputClosestHigher)
        || (this.inputClosestLower != null && input < this.inputClosestLower)) {
            para.innerText = "Be Carefull you already know that my secret is between "
            + this.inputClosestLower +" and"
            + this.inputClosestHigher
        }

        document.getElementById("hint").appendChild(para);
        this.inputElement.value = "";
    }
}

let inputArea = document.getElementById("inputArea");
let maxElement = document.getElementById("mwert");
let inputElement = document.getElementById("input");
let hintElement = document.getElementById("hint");
let tryElement = document.getElementById("versuche");

let zahlenRaten = new ZahlenRaten(inputArea, maxElement, inputElement, hintElement, tryElement);

let startButton = document.getElementById("btnStart");
let resetButton = document.getElementById("restart");
let confirmButton = document.getElementById("confirm");

startButton.addEventListener("click", () => ZahlenRaten.start());
resetButton.addEventListener("click", () => ZahlenRaten.reset());
confirmButton.addEventListener("click", () => ZahlenRaten.guess());