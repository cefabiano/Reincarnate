// JavaScript source code

//resource stats
var money = 10, moneyRate = 0, moneyCap = 100, research = 0, researchRate = 0, researchCap = 2,
    insight = 0, insightRate = 0, insightCap = 0, blood = 0, bloodRate = 0, bloodCap = 0,
    thread = 0, threadRate = 0, threadCap = 0, followers = 0, followerCap = 1;

//building stats
let garageSale = new Building(10, 0, 1.15, 0, -1, true, "garageSaleImg", "+0.045 Money/sec", "In order to get the ball rolling, you're gonna have to start selling some of your old belonings from your garage. Dont worry, none of this stuff was coming along for the ride anyways.", "There's more stuff in here than I remember");
let wallet = new Building(50, 0, 1.25, 0, -1, false, "walletImg", "100 max Money", "A wallet you found on the ground. Used to store more money.", "can store just about anything, really");
let ti84 = new Building(101, 0, 1.15, 0, -1, false, "ti84Img", "+0.005 Research/sec", "Top of the line calculator from Staples. It specializes in converting equations into line graphs.", "2318008");
var buildings = [garageSale, wallet, ti84];
var isOrb = false;

//subject stats
let def = new Subject("Default", 999999, 999999, false, false, null, "you shouldn't be seeing this", "you shouldn't be seeing this", "you shouldn't be seeing this");
let curiosity = new Subject("Curiosity", 1, 0, false, false, null, "Allows for further research to be conducted", "All research begins with the spark of curiosity. To indulge this curiosity is to bring forth progress and unlock what cannot be found through inaction.", "curiosity kills only cats that fear the dark");
let sample = new Subject("Sample", 2, 0, false, true, curiosity, "sample", "sample", "sample");
var subjects = [curiosity, sample];
var scryArray = [];

//tick * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
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
    document.getElementById("walletPrice").innerHTML = (textCondense(wallet.price) + " Money");
    updateCount("walletCount", wallet.count);
    document.getElementById("ti84Price").innerHTML = (textCondense(ti84.price) + " Money");
    updateCount("ti84Count", ti84.count);
    updateBoard();
    buildings.forEach(grayOut);
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
        latestButton = wallet;
        document.getElementById("walletCover").src = "none.png";
        wallet.isOpen = true;
    }
    if (wallet.count != 0) {
        latestButton = ti84;
        document.getElementById("ti84Cover").src = "none.png";
        ti84.isOpen = true;
    }
    if (research >= 1) {
        document.getElementById("orbCover").src = "none.png";
        isOrb = true;
    }
    if (curiosity.competed) {

    }
    //.insertAdjacentHTML("afterend", "<p>My new paragraph</p>");
}
function grayOut(item) {
    item.gray();
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//text altering functions * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
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
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//value calculators * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function calculator() {
    var sum = garageSale.count * 0.045;
    moneyRate = sum;
    sum = wallet.count * 100 + 100;
    moneyCap = sum;
    sum = ti84.count * 0.005;
    researchRate = sum;
    sum = 2;
    mresearchCap = sum;
}

function addClamp(x, y, cap) {
    x += y;
    if (x > cap) {
        x = cap;
    }
    return x;
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//scrying functions * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function openScry() {
    document.getElementById("scryDiv").style.visibility = "visible";
}
function updateScryText() {
    for (var i = 0; i < subjects.length && scryArray.length < 3; i++) {
        if (subjects[i].hasPreReq) {
            if (!subjects[i].priceType) {
                if (subjects[i].price <= research && subjects[i].price2 <= insight && subjects[i].preReq.completed) {
                    scryArray.push(subjects[i]);
                }
            } else {
                if (subjects[i].price2 <= insight && subjects[i].preReq.completed) {
                    scryArray.push(subjects[i]);
                }
            }
        } else {
            if (!subjects[i].priceType) {
                if (subjects[i].price <= research && subjects[i].price2 <= insight) {
                    scryArray.push(subjects[i]);
                }
            } else {
                if (subjects[i].price2 <= insight) {
                    scryArray.push(subjects[i]);
                }
            }
        }
    }
    if (scryArray.length == 0) {
        lowestResult();
        document.getElementById("scryLink").setAttribute("onclick", "closeScry()");
        document.getElementById("scryButtonText").innerHTML = "Close";
    } else if (scryArray.length == 1) {
        document.getElementById("subDiv1").style.visibility = "visible";
        document.getElementById("subText1").innerHTML = scryArray[0].name;
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varietys of research. This subject constitutes your future, do not shy away.";
    } else if (scryArray.length == 2) {
        document.getElementById("subDiv1").style.visibility = "visible";
        document.getElementById("subText1").innerHTML = scryArray[0].name;
        document.getElementById("subDiv2").style.visibility = "visible";
        document.getElementById("subText2").innerHTML = scryArray[1].name;
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varietys of research. Select a subject to grace with your attention:";
    } else if (scryArray.length == 3) {
        document.getElementById("subDiv1").style.visibility = "visible";
        document.getElementById("subText1").innerHTML = scryArray[0].name;
        document.getElementById("subDiv2").style.visibility = "visible";
        document.getElementById("subText2").innerHTML = scryArray[1].name;
        document.getElementById("subDiv3").style.visibility = "visible";
        document.getElementById("subText3").innerHTML = scryArray[2].name;
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varietys of research. Select a subject to grace with your attention:";
    }
}
function lowestResult() {
    if (subjects.length == 0) {
        document.getElementById("scryText").innerHTML = "Seek naught but the contents of your own mind! You have mastered all relevant subjects to your quest for a better future."
    } else {
        var lowest = def;
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].price + subjects[i].price2 < lowest.price + lowest.price2) {
                lowest = subjects[i];
            }
        }
        if (lowest.priceType) {
            document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. There is more to gaining new knowledge than personal research. Sometimes some <span style=\"color: #cf50d8\">insight</span> granted by greater powers is needed to move forward.";
        } else {
            if (lowest.price > research) {
                document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. Persistence is key to <span style=\"color: #5abfe8\">research</span>";
            } else {
                document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. There is more to gaining new knowledge than personal research. Sometimes some <span style=\"color: #cf50d8\">insight</span> granted by greater powers is needed to move forward.";
            }
        }
    }
}
function updateScryButtonText(cover) {
    document.getElementById("scryButtonText").innerHTML = "Learn";
    document.getElementById("subButton1").src = "subGray.png";
    document.getElementById("subButton2").src = "subGray.png";
    document.getElementById("subButton3").src = "subGray.png";
    if (cover.id == "subLink1") {
        document.getElementById("subButton1").src = "square.png";
        document.getElementById("scryLink").setAttribute("onclick", "finalizeScry(0)");
    } else if (cover.id == "subLink2") {
        document.getElementById("subButton2").src = "square.png";
        document.getElementById("scryLink").setAttribute("onclick", "finalizeScry(1)");
    } else if (cover.id == "subLink3") {
        document.getElementById("subButton3").src = "square.png";
        document.getElementById("scryLink").setAttribute("onclick", "finalizeScry(2)");
    }
}
function finalizeScry(x) {
    scryArray[x].buy();
    for (var i = 0; i < subjects.length; i++) {
        if (subjects[i].name == scryArray[x].name) {
            var arr1 = subjects.slice(0, i);
            var arr2 = subjects.slice(i + 1, subjects.length);
            var lengths = arr1.length + arr2.length;
            subjects = new Array(lengths);
            for (var i = 0; i < arr1.length; i++) {
                subjects[0] = arr1[i];
            }
            for (var i = 0; i < arr2.length; i++) {
                subjects[0] = arr2[arr1.length + i];
            }
            break;
        }
    }
    document.getElementById("scryDiv").style.visibility = "hidden";
    document.getElementById("subDiv1").style.visibility = "hidden";
    document.getElementById("subDiv2").style.visibility = "hidden";
    document.getElementById("subDiv3").style.visibility = "hidden";
    document.getElementById("subButton1").src = "subGray.png";
    document.getElementById("subButton2").src = "subGray.png";
    document.getElementById("subButton3").src = "subGray.png";
    document.getElementById("scryLink").setAttribute("onclick", "updateScryText()");
    document.getElementById("scryButtonText").innerHTML = "Next";
    for (var i = 0; i < 3; i++) {
        scryArray.pop();
    }
    document.getElementById("scryText").innerHTML = "You peer into the ethereal depths of your scrying orb. In its burdening truths you can see parts of what lie ahead of you. In a careful motion your eyes perform an elegant dance with the future, careful not to get lost in the labyrinth of information.After a short time you begin to see an answer take form.You urge the vision to tell you what to do next.As it becomes clearer you can see that the orb is telling you to...";
}
function closeScry() {
    document.getElementById("scryDiv").style.visibility = "hidden";
    document.getElementById("subDiv1").style.visibility = "hidden";
    document.getElementById("subDiv2").style.visibility = "hidden";
    document.getElementById("subDiv3").style.visibility = "hidden";
    document.getElementById("scryText").innerHTML = "You peer into the ethereal depths of your scrying orb. In its burdening truths you can see parts of what lie ahead of you. In a careful motion your eyes perform an elegant dance with the future, careful not to get lost in the labyrinth of information.After a short time you begin to see an answer take form.You urge the vision to tell you what to do next.As it becomes clearer you can see that the orb is telling you to...";
    document.getElementById("scryLink").setAttribute("onclick", "updateScryText()");
    document.getElementById("scryButtonText").innerHTML = "Next";
}
function applyResearch(subject) {
    //curiosity is done in updateBoard()
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//mouse over functions * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function buttonHover(event, id) {
    var x = event.clientX;
    var y = event.clientY;
    if (id.id == "garageSaleLink") {
        updateHover(garageSale);
    } else if (id.id == "walletLink" && wallet.isOpen) {
        updateHover(wallet);
    } else if (id.id == "ti84Link" && ti84.isOpen) {
        updateHover(ti84);
    } else if (id.id == "orbLink" && isOrb) {
        document.getElementById("topSecText").innerHTML = "Call upon the mystical forces of your scrying orb to guide your research. May its enigmatic nature bring you to the correct path.";
        document.getElementById("midSecText").innerHTML = "";
        document.getElementById("midSecText2").innerHTML = "";
        document.getElementById("midSecText3").innerHTML = "";
        document.getElementById("botSecText").innerHTML = "The glassy walls of the orb of vision bounce with a rainbow of colors, giving off an air of a mysterious, yet positive future.";
    } else if (id.id == "subLink1") {
        updateHoverSub(scryArray[0]);
    } else if (id.id == "subLink2") {
        updateHoverSub(scryArray[1]);
    } else if (id.id == "subLink3") {
        updateHoverSub(scryArray[2]);
    } else {
        return;
    }
    document.getElementById("mouseOver").style.left = (x).toString() + "px";
    if (y - document.getElementById("mouseOver").clientHeight >= 0) {
        document.getElementById("mouseOver").style.top = (y - document.getElementById("mouseOver").clientHeight).toString() + "px";
    } else {
        document.getElementById("mouseOver").style.top = "0px";
    }
    document.getElementById("mouseOver").style.visibility = "visible";
    document.getElementById("mouseOver").style.zIndex = "20";
}
function updateHover(building) {
    document.getElementById("topSecText").innerHTML = building.desc;
    document.getElementById("midSecText").innerHTML = building.benefit;
    document.getElementById("midSecText2").innerHTML = "Price Ratio: " + building.priceRatio;
    document.getElementById("midSecText3").innerHTML = "";
    document.getElementById("botSecText").innerHTML = building.flavor;
}
function updateHoverSub(subject) {
    document.getElementById("topSecText").innerHTML = subject.desc;
    document.getElementById("midSecText").innerHTML = subject.benefit;
    if (subject.pricType) {
        document.getElementById("midSecText2").innerHTML = "<span style=\"color: #cf50d8\">Insight</span>: " + subject.price;
        document.getElementById("midSecText3").innerHTML = "";
    } else {
        document.getElementById("midSecText2").innerHTML = "<span style=\"color: #5abfe8\">Research</span>: " + subject.price;
        if (subject.price2 != 0) {
            document.getElementById("midSecText3").innerHTML = "<span style=\"color: #cf50d8\">Insight</span>: " + subject.price2;
        } else {
            document.getElementById("midSecText3").innerHTML = "";
        }
    }
    document.getElementById("botSecText").innerHTML = subject.flavor;
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
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//