// JavaScript source code

//resource stats
var money = 10, moneyRate = 0, moneyCap = 100, research = 0, researchRate = 0, researchCap = 100,
    insight = 0, insightRate = 0, insightCap = 0, blood = 0, bloodRate = 0, bloodCap = 0,
    thread = 0, threadRate = 0, threadCap = 0, followers = 0, followerCap = 1;

//building stats
class Building {
    constructor(price, price2, priceRatio, priceType, priceType2, benefit, desc, flavor) {
        this.count = 0;
        this.price = price;
        this.price2 = price2;
        this.priceRatio = priceRatio;
        this.priceType = priceType;
        this.priceType2 = priceType2;
        this.benefit = benefit;
        this.desc = desc;
        this.flavor = flavor;
    }
    buy() {
        var success = 0;
        switch (this.priceType) {
            case 0:
                if (money >= this.price) {
                    success++;
                }
                break;
            case 1:
                if (research >= this.price) {
                    success++;
                }
                break;
            case 2:
                if (insight >= this.price) {
                    success++;
                }
                break;
            case 3:
                if (blood >= this.price) {
                    success++;
                }
                break;
            case 4:
                if (thread >= this.price) {
                    success++;
                }
                break;
        }
        switch (this.priceType2) {
            case -1:
                success++;
                break;
            case 0:
                if (money >= this.price2) {
                    success++;
                }
                break;
            case 1:
                if (research >= this.price2) {
                    success++;
                }
                break;
            case 2:
                if (insight >= this.price2) {
                    success++;
                }
                break;
            case 3:
                if (blood >= this.price2) {
                    success++;
                }
                break;
            case 4:
                if (thread >= this.price2) {
                    success++;
                }
                break;
        }
        if (success == 2)
            this.success();
    }
    success() {
        switch (this.priceType) {
            case 0:
                money -= this.price;
                break;
            case 1:
                research -= this.price;
                break;
            case 2:
                insight -= this.price;
                break;
            case 3:
                blood -= this.price;
                break;
            case 4:
                thread -= this.price;
                break;
        }
        switch (this.priceType2) {
            case -1:
                break;
            case 0:
                money -= this.price;
                break;
            case 1:
                research -= this.price;
                break;
            case 2:
                insight -= this.price;
                break;
            case 3:
                blood -= this.price;
                break;
            case 4:
                thread -= this.price;
                break;
        }
        this.count++;
        this.price = this.price * this.priceRatio;
    }
}
let garageSale = new Building(10, 0, 1.15, 0, -1, "+0.045/sec", "In order to get the ball rolling, you're gonna have to start selling some of your old belonings from your garage. Dont worry, none of this stuff was coming along for the ride anyways.", "There's more stuff in here than I remember");
let bank = new Building(50, 0, 1.25, 0, -1);
let ti84 = new Building(101, 0, 1.15, 0, -1);

//tick
var interval = setInterval(update, 250);
function update() {
    calculator();
    //add to resources
    money = addClamp(money, moneyRate, moneyCap);
    research = addClamp(research, researchRate, researchCap);
    //update resource text
    updateResource("money", "moneyRate", "moneyCap", money, moneyRate, moneyCap);
    updateResource("research", "researchRate", "researchCap", research, researchRate, researchCap);
    //update buttons
    document.getElementById("garageSalePrice").innerHTML = (textCondense(garageSale.price) + " Money");
    updateCount("garageSaleCount", garageSale.count);
    document.getElementById("bankPrice").innerHTML = (textCondense(bank.price) + " Money");
    updateCount("bankCount", bank.count);
    document.getElementById("ti84Price").innerHTML = (textCondense(ti84.price) + " Money");
    updateCount("ti84Count", ti84.count);
    updateBoard();
}
function updateResource(string1, string2, string3, thing, thingRate, thingCap) {
    document.getElementById(string1).innerHTML = textCondense(thing).toString();
    document.getElementById(string2).innerHTML = ("(+" + textCondense(thingRate) + "/sec)");
    document.getElementById(string3).innerHTML = "/ " + textCondense(thingCap).toString();
}
function updateCount(string, count) {
    document.getElementById(string).innerHTML = count;
    if (count == 0) {
        document.getElementById(string).style.visibility = "hidden";
    } else {
        document.getElementById(string).style.visibility = "visible";
    }
}
function updateBoard() {
    var latestButton = garageSale;
    if (garageSale.count != 0) {
        latestButton = bank;
        document.getElementById("bankCover").src = "none.png";
    }
    if (bank.count != 0) {
        latestButton = ti84;
        document.getElementById("ti84Cover").src = "none.png";
    }
    //.insertAdjacentHTML("afterend", "<p>My new paragraph</p>");
}

//text altering functions
function textCondense(x) {
    if (x > 999999) {
        var temp = x / 1000000;
        var temp2 = temp.toString() + "0000";
        var temp3 = temp2.indexOf(".");
        return (temp2.substring(0, (temp3 + 3)) + "mil");
    } else if (x > 999) {
        var temp = x / 1000;
        var temp2 = temp.toString() + "0000";
        var temp3 = temp2.indexOf(".");
        return (temp2.substring(0, (temp3 + 3)) + "K");
    } else {
        var temp = x.toString() + "0000";
        var temp2 = temp.indexOf(".");
        if (x % 1 != 0) {
            return (temp.substring(0, (temp2 + 3)));
        } else {
            return x;
        }
    }
}

//value calculators
function calculator() {
    var sum = garageSale.count * 0.045;
    moneyRate = sum;
    sum = bank.count * 100 + 100;
    moneyCap = sum;
    sum = ti84.count * 0.005;
    researchRate = sum;
    sum = 100;
    mresearchCap = sum;
}

function addClamp(x, y, cap) {
    x += y;
    if (x > cap) {
        x = cap;
    }
    return x;
}

//mouse over functions
function buttonHover(event, id) {
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("mouseOver").style.left = (x).toString() + "px";
    if (y - document.getElementById("mouseOver").clientHeight >= 0) {
        document.getElementById("mouseOver").style.top = (y - document.getElementById("mouseOver").clientHeight).toString() + "px";
    } else {
        document.getElementById("mouseOver").style.top = "0px";
    }
    document.getElementById("mouseOver").style.visibility = "visible";
    document.getElementById("mouseOver").style.zIndex = "3";
    if (id.id == "garageSaleCover") {
        document.getElementById("topSecText").innerHTML = "Hello";
    }
}
function buttonStay(event) {
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById("mouseOver").style.left = (x).toString() + "px";
    if (y - document.getElementById("mouseOver").clientHeight >= 0) {
        document.getElementById("mouseOver").style.top = (y - document.getElementById("mouseOver").clientHeight).toString() + "px";
    } else {
        document.getElementById("mouseOver").style.top = "0px";
    }
}
function noButtonHover() {
    document.getElementById("mouseOver").style.visibility = "hidden";
    document.getElementById("mouseOver").style.zIndex = "-1";
}