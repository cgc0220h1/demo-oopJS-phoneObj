const BATTERY_LEVEL = 100;
const BATTERY_CONSUME = 10;
const BATTERY_OUT = 0;

let MobilePhone = function (name) {
    this.name = name;
    this.battery = BATTERY_LEVEL;
    this.message;
    this.inbox;
    this.outbox;
    this.state = false;
    this.getBattery = function () {
        if (this.battery < 0) {
            this.battery = BATTERY_OUT;
        }
        return this.battery;
    };
    this.getState = function () {
        if (this.battery === BATTERY_OUT) {
            this.state = false;
            return this.autoTurnoff();
        }
        return this.state;
    };
    this.getMessage = function () {
        return this.message;
    };
    this.getInbox = function () {
        return this.inbox;
    };
    this.getOutbox = function () {
        return this.outbox;
    };
    this.writeMessage = function (message) {
        if (this.getState()) {
            this.message = message;
            this.battery -= BATTERY_CONSUME;
        }
    };
    this.sendMessage = function (object) {
        if (this.getState()) {
            this.outbox = this.getMessage();
            object.inbox = this.getMessage();
            this.battery -= BATTERY_CONSUME;
            object.battery -= BATTERY_CONSUME;
        }
    };
    this.turnOn = function () {
        this.state = true;
    };
    this.turnOff = function () {
        this.state = false;
    };
    this.recharge = function () {
        if (this.getBattery() < BATTERY_LEVEL) {
            return this.battery += BATTERY_CONSUME;
        }
    };
    this.autoTurnoff = function () {
        turnOff(this);
    };
};

let pixel = new MobilePhone("pixel");
let samsung = new MobilePhone("samsung");

function turnOn(object) {
    object.turnOn();
    document.getElementById(object.name + '-image').src = "img/" + object.name + "_on.png";
}

function turnOff(object) {
    object.turnOff();
    document.getElementById(object.name + '-image').src = "img/" + object.name + "_off.png";
    document.getElementById(object.name + '-text').style.display = "none";
    document.getElementById(object.name + '-send').style.display = "none";
}

function changeState(object) {
    if (object.getState()) {
        turnOff(object);
    } else {
        turnOn(object);
    }
}

function writeMessage(object) {
    if (object.getState()) {
        if (document.getElementById(object.name + '-text').style.display === "inline-block") {
            document.getElementById(object.name + '-text').style.display = "none";
            document.getElementById(object.name + '-send').style.display = "none";
        } else {
            document.getElementById(object.name + '-text').style.display = "inline-block";
            document.getElementById(object.name + '-send').style.display = "inline-block";
        }
    }
}

function sendMessage(object) {
    let message = document.getElementById(object.name + '-text').value;
    if (message !== "") {
        object.writeMessage(message);
        if (object.name === "samsung") {
            return object.sendMessage(pixel);
        }
        return object.sendMessage(samsung);

    }
}

function checkInbox(object) {
    if (object.getState()) {
        if (object.getInbox() !== undefined) {
            return alert(object.getInbox());
        }
        return alert("Hộp thư đến trống");
    }
}

function checkOutbox(object) {
    if (object.getState()) {
        if (object.getOutbox() !== undefined) {
            return alert(object.getOutbox());
        }
        return alert("Hộp thư đi trống");
    }
}

function checkBat(object) {
    alert("Phần trăm pin hiện tại: " + object.getBattery() + " %");
}

function recharge(object) {
    object.recharge();
}

