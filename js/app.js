const BATTERY_LEVEL = 100;
const BATTERY_CONSUME = 10;
const BATTERY_OUT = 0;

let MobilePhone = function () {
    this.battery = BATTERY_LEVEL;
    this.message;
    this.inbox;
    this.outbox;
    this.state = false;
    this.getBattery = function () {
        return this.battery;
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
    this.getState = function () {
        return this.state;
    };
    this.writeMessage = function (message) {
        this.getState();
        if (this.getState()) {
            this.message = message;
            this.battery -= BATTERY_CONSUME;
        }
    };
    this.sendMessage = function (object) {
        if (this.getState()) {
            this.outbox = this.message;
            object.inbox = this.message;
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
        return this.battery;
    };
    this.autoTurnoff = function () {
        if (this.BATTERY_LEVEL === BATTERY_OUT) {
            this.state = false;
        }
    }

};