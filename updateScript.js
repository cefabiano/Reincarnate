// JavaScript source code
var hyperMode = 1;
var saveDataString = '{ "buildings" : [{ "count": 0}, { "count": 0}, { "count": 0}, { "count": 0}, { "count": 0}, { "count": 0}], ' +
    '"subjects" : [{ "completed": false}, { "completed": false}, { "completed": false}, { "completed": false}], ' +
    '"resources" : [{"amount": 0}, { "amount": 10}, { "amount": 0}, { "amount": 0}, { "amount": 0}, { "amount": 0}] }';
var saveData = JSON.parse(saveDataString);
var saveReset = 0;
var clearReset = 0;


//resource stats
var money = 10, moneyRate = 0, moneyCap = 100, research = 0, researchRate = 0, researchCap = 10,
    insight = 0, insightRate = 0, insightCap = 500, blood = 0, bloodRate = 0, bloodCap = 2000,
    thread = 0, threadRate = 0, threadCap = 0, followers = 1, followersCap = 1;
var followersDesc = "These are the people who are working towards a bright future, yourself included. Followers will grant benefits to the assimilation of certain resources among other things.";
var followersFlavor = "A man is never weaker than when he has no one to scratch his back";
var moneyDesc = "Currency sits at the center of progress. <span style=\"color: #19c910\">Money</span> can be traded to gain in all areas of life and afterlife.";
var moneyFlavor = "\"I like money\" ~ Eugene Krabs";
var researchDesc = "In order to grow, one must know how. <span style=\"color: #5abfe8\">Research</span> is the discovery of new concepts and schools of thought through rigerous experimentation. When applied, <span style=\"color: #5abfe8\">research</span> points can be used to learn new subjects.";
var researchFlavor = "Gallileo was once a shunned man as well, you know";
var insightDesc = "Humans are not equipped to learn everything there is to know on their own. Thankfully there are powers above us that can grant <span style=\"color: #f411bb\">insight</span> towards new ideas. <span style=\"color: #f411bb\">Insight</span> points can be used to learn new subjects.";
var insightFlavor = "";
var bloodDesc = "When seeking a donation from otherworldly powers, it is important to share a part of you. <span style=\"color: #7f0303\">Blood</span> is used to access mystical objects and powers. <span style=\"color: #7f0303\">Blood</span> gain scales linearly with followers.";
var bloodFlavor = "How humorous";
var threadDesc = "As the fates weave the thread of time, those bold enough try to cut pieces out for themselves. Thread is a rare resource used to craft new worlds and timelines.";
var threadFlavor = "";

//building stats
let garageSale = new Building(10, 0, 1.13, 0, -1, true, "garageSaleImg", "+0.18 <span style=\"color: #19c910\">Money</span>/sec", "In order to get the ball rolling, you're gonna have to start selling some of your old belonings from your garage. Dont worry, none of this stuff was coming along for the ride anyways.", "There's more stuff in here than I remember");
let wallet = new Building(50, 0, 1.25, 0, -1, false, "walletImg", "150 max <span style=\"color: #19c910\">Money</span>", "A wallet you found on the ground. Used to store more money.", "Can store just about anything, really");
let ti84 = new Building(101, 0, 1.13, 0, -1, false, "ti84Img", "+0.006 <span style=\"color: #5abfe8\">Research</span>/sec", "Top of the line calculator from Staples. It specializes in converting equations into line graphs.", "2318008");
let microscope = new Building(600, 4, 1.2 , 0, 1, false, "microscopeImg", "+0.008 <span style=\"color: #5abfe8\">Research</span>/sec<br>+12 max <span style=\"color: #5abfe8\">Research</span>", "A powerful microscope you allegedly stole from the high school you TA\'ed at for a year. Enhances sight drastically, allowing for deeper investigation.", "Sight beyond sight");
let laundromat = new Building(1500, 0, 1.15, 0, -1, false, "laundromatImg", "+1.92 <span style=\"color: #19c910\">Money</span>/sec", "Alright. It's time to start getting serious with money. Opening a small busniess should help you accelerate your funds to the next level.", "What do you mean that's not what money laundering means?");
let tarotDeck = new Building(1500, 30, 1.85, 0, 1, false, "tarotDeckImg", "+0.04<span style=\"color: #f411bb\">Insight</span>", "A decorative deck of pretty cards in the hands of a layman, a powerful predicatve tool in the hads of a practiced individual. These decks are used to forsee the future and stay on the correct path.", "Ever play spit with God?");
var buildings = [garageSale, wallet, ti84, microscope, laundromat, tarotDeck];
var isOrb = false;

//subject stats
let def = new Subject("Default", 999999, 999999, false, false, null, "you shouldn't be seeing this", "you shouldn't be seeing this", "you shouldn't be seeing this");
let curiosity = new Subject("Curiosity", 1, 0, false, false, null, "Allows for further research to be conducted", "All research begins with the spark of curiosity. To indulge this curiosity is to bring forth progress and unlock what cannot be found through inaction.", "curiosity kills only cats that fear the dark");
let businessOwnership = new Subject("Business Ownership", 10, 0, false, true, curiosity, "Opens up a new button", "The basics of business management. With this knowledge you can start your own fledgeling operation to rake in a few extra dollars.", "Sign here to agree that you can be arrested for unionizing");
let tarot = new Subject("Tarot", 35, 0, false, true, curiosity, "Grants access to <span style=\"color: #f411bb\">insight</span>", "The common mystical art of tarot cards. These cards can be used to recieve messages from forces that lie beyond human perception. It requires much skill to interpret how the cards are seemingly randomly dealt", "The 7 of spades, this doesn't bode well");
let bloodLetting = new Subject("Blood Letting", 40, 100, true, true, tarot, "Grants <span style=\"color: #7f0303\">blood</span> based on amount of followers", "Blood is an essential tool in trading with the higher powers. You and your followers must donate some regularly for the greater good.", "Don't worry, these leeches were raised free range");
var subjects = [curiosity, businessOwnership, tarot, bloodLetting];
var scryArray = [];

//tick * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
var interval = setInterval(update, 250);
function update() {
    calculator();
    //add to resources
    money = addClamp(money, moneyRate, moneyCap);
    research = addClamp(research, researchRate, researchCap);
    insight = addClamp(insight, insightRate, insightCap);
    blood = addClamp(blood, bloodRate, bloodCap);
    //update resource text
    updateResource("money", "moneyRate", "moneyCap", money, moneyRate, moneyCap);
    updateResource("research", "researchRate", "researchCap", research, researchRate, researchCap);
    updateResource("insight", "insightRate", "insightCap", insight, insightRate, insightCap);
    updateResource("blood", "bloodRate", "bloodCap", blood, bloodRate, bloodCap);
    //update buttons
    updateBoard();
    buildings.forEach(grayOut);
    document.getElementById("garageSalePrice").innerHTML = (textCondense(garageSale.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + garageSale.updatePriceTime(1) + "</span>");
    updateCount("garageSaleCount", garageSale.count);
    document.getElementById("walletPrice").innerHTML = (textCondense(wallet.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + wallet.updatePriceTime(1) + "</span>");
    updateCount("walletCount", wallet.count);
    document.getElementById("ti84Price").innerHTML = (textCondense(ti84.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + ti84.updatePriceTime(1) + "</span>");
    updateCount("ti84Count", ti84.count);
    document.getElementById("microscopePrice").innerHTML = (textCondense(microscope.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + microscope.updatePriceTime(1) + "</span>");
    document.getElementById("microscopePrice2").innerHTML = (textCondense(microscope.price2) + " <span style=\"color: #5abfe8\">Research</span> <span style=\"color: #3a3a3a\">" + microscope.updatePriceTime(2) + "</span>");
    updateCount("microscopeCount", microscope.count);
    document.getElementById("laundromatPrice").innerHTML = (textCondense(laundromat.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + laundromat.updatePriceTime(1) + "</span>");
    updateCount("laundromatCount", laundromat.count);
    document.getElementById("tarotDeckPrice").innerHTML = (textCondense(tarotDeck.price) + " <span style=\"color: #19c910\">Money</span> <span style=\"color: #3a3a3a\">" + tarotDeck.updatePriceTime(1) + "</span>");
    document.getElementById("tarotDeckPrice2").innerHTML = (textCondense(tarotDeck.price2) + " <span style=\"color: #5abfe8\">Research</span> <span style=\"color: #3a3a3a\">" + tarotDeck.updatePriceTime(2) + "</span>");
    updateCount("tarotDeckCount", tarotDeck.count);
    if (saveReset > 0) {
        saveReset--;
    } else {
        document.getElementById("saveText").innerHTML = "Save";
    }
    if (clearReset > 0) {
        clearReset--;
    } else {
        document.getElementById("clearText").innerHTML = "Clear Save";
    }
}
function updateResource(string1, string2, string3, thing, thingRate, thingCap) {
    document.getElementById(string1).innerHTML = textCondense(thing).toString();
    document.getElementById(string2).innerHTML = ("(+" + textCondense(thingRate * 4) + "/sec)");
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
        document.getElementById("microscopeDiv").style.height = "50px";
        document.getElementById("microscopeDiv").style.marginBottom = "35px";
        document.getElementById("microscopeDiv").style.visibility = "visible";
        document.getElementById("tarotDeckDiv").style.height = "50px";
        document.getElementById("tarotDeckDiv").style.marginBottom = "35px";
        document.getElementById("tarotDeckDiv").style.visibility = "visible";
    }
    if (research >= 1) {
        document.getElementById("orbCover").src = "none.png";
        isOrb = true;
    }
    if (curiosity.completed) {
        latestButton = microscope;
        document.getElementById("microscopeCover").src = "none.png";
        microscope.isOpen = true;
        document.getElementById("laundromatDiv").style.height = "50px";
        document.getElementById("laundromatDiv").style.marginBottom = "35px";
        document.getElementById("laundromatDiv").style.visibility = "visible";
    }
    if (businessOwnership.completed) {
        latestButton = laundromat;
        document.getElementById("laundromatCover").src = "none.png";
        laundromat.isOpen = true;
    }
    if (tarot.completed) {
        latestButton = tarotDeck;
        document.getElementById("tarotDeckCover").src = "none.png";
        tarotDeck.isOpen = true;
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
    } else if (x >= 0.01) {
        var temp = x.toString() + "0000";
        var temp2 = temp.indexOf(".");
        if (!Number.isInteger(x)) {
            return (temp.substring(0, (temp2 + 3)));
        } else {
            return x;
        }
    } else if (x < 0.01) {
        var temp = x.toString() + "0000";
        var temp2 = temp.indexOf(".");
        if (!Number.isInteger(x)) {
            return (temp.substring(0, (temp2 + 4)));
        } else {
            return x;
        }
    }
}
function timeCondense(y) {
    if (y > 345600) {
        if ((y % 345600) > 14400) {
            return "(" + decimalCut(y / 345600) + "d " + decimalCut((y % 345600) / 14400) + "h)";
        } else {
            return "(" + decimalCut(y / 345600) + "d)";
        }
    } else if (y > 14400) {
        if ((y % 14400) > 240) {
            return "(" + decimalCut(y / 14400) + "h " + decimalCut((y % 14400) / 240) + "m)";
        } else {
            return "(" + decimalCut(y / 14400) + "h)";
        }
    } else if (y > 240) {
        if ((y % 240) > 4) {
            return "(" + decimalCut(y / 240) + "m " + decimalCut((y % 240) / 4) + "s)";
        } else {
            return "(" + decimalCut(y / 240) + "m)";
        }
    } else if (y > 4) {
        return "(" + decimalCut(y / 4) + "s)";
    } else {
        return "";
    }
}
function decimalCut(x) {
    var temp = x.toString();
    var temp2 = temp.indexOf(".");
    if (!Number.isInteger(x)) {
        return (temp.substring(0, (temp2)));
    } else {
        return x;
    }
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//value calculators * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function calculator() {
    moneyRate = (garageSale.count * 0.045 + laundromat.count * 0.48) * hyperMode;
    moneyCap = (100 + wallet.count * 150) * hyperMode;
    researchRate = (ti84.count * 0.0015 + microscope.count * 0.002) * hyperMode;
    researchCap = (10 + microscope.count * 12) * hyperMode;
    insightRate = (tarotDeck.count * 0.01) * hyperMode;
    if (bloodLetting.completed) {
        sum = followers * 77;
        bloodRate = sum;
    }
}
function calcPrice(building) {
    for (var i = 1; i <= building.count; i++) {
        building.price *= building.priceRatio;
        building.price2 *= building.priceRatio;
    }
}
function addClamp(x, y, cap) {
    x += y;
    if (x > cap) {
        x = cap;
    }
    return x;
}
function printSubs(subs) {
    var x = "";
    for (var i = 0; i < subs.length; i++) {
        x = x + subs[i].name;
    }
    return x;
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//

//scrying functions * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function openScry() {
    document.getElementById("scryDiv").style.visibility = "visible";
}
function updateScryText() {
    document.getElementById("scryLink").setAttribute("onclick", "");
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
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varieties of research. This subject constitutes your future, do not shy away.";
    } else if (scryArray.length == 2 || scryArray.length == 1) {
        document.getElementById("subDiv1").style.visibility = "visible";
        document.getElementById("subText1").innerHTML = scryArray[0].name;
        document.getElementById("subDiv2").style.visibility = "visible";
        document.getElementById("subText2").innerHTML = scryArray[1].name;
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varietes of research. Select a subject to grace with your attention:";
    } else if (scryArray.length == 3) {
        document.getElementById("subDiv1").style.visibility = "visible";
        document.getElementById("subText1").innerHTML = scryArray[0].name;
        document.getElementById("subDiv2").style.visibility = "visible";
        document.getElementById("subText2").innerHTML = scryArray[1].name;
        document.getElementById("subDiv3").style.visibility = "visible";
        document.getElementById("subText3").innerHTML = scryArray[2].name;
        document.getElementById("scryTextDiv").style.overflow = "auto";
        document.getElementById("scryText").innerHTML = "Embrace newfound knowledge! You have learned enough to delve into deeper varieties of research. Select a subject to grace with your attention:";
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
            document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. There is more to gaining new knowledge than personal effort. Sometimes some <span style=\"color: #f411bb\">insight</span> granted by greater powers is needed to move forward. " + distanceEval(lowest, true);
        } else {
            if (lowest.price > research) {
                document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. Persistence is key to <span style=\"color: #5abfe8\">research</span>. " + distanceEval(lowest, false);
            } else {
                document.getElementById("scryText").innerHTML = "Seek further inspiration. It seems that you are not ready to delve into any new subjects. There is more to gaining new knowledge than personal research. Sometimes some <span style=\"color: #f411bb\">insight</span> granted by greater powers is needed to move forward. " + distanceEval(lowest, false);
            }
        }
    }
}
function distanceEval(goal, type) {
    if (type) {
        if (insight < goal.price / 2) {
            return "You've got quite a way to go.";
        } else if (insight < goal.price / 1.5) {
            return "You seem to be steadily appraching your goal.";
        } else if (insight < goal.price / 1.1) {
            return "You're closing in on something. Keep it up.";
        }
    } else {
        if (research > goal.price) {
            if (insight < goal.price2 / 2) {
                return "You've got quite a way to go.";
            } else if (insight < goal.price2 / 1.5) {
                return "You seem to be steadily appraching your goal.";
            } else if (insight < goal.price2 / 1.1) {
                return "You're closing in on something. Keep it up.";
            }
        } else {
            if (research < goal.price / 2) {
                return "You've got quite a way to go.";
            } else if (research < goal.price / 1.5) {
                return "You seem to be steadily appraching your goal.";
            } else if (research < goal.price / 1.1) {
                return "You're closing in on something. Keep it up.";
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
                subjects[i] = arr1[i];
            }
            for (var i = 0; i < arr2.length; i++) {
                subjects[arr1.length + i] = arr2[i];
            }
            //document.getElementById("followers").innerHTML = printSubs(subjects);
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
    document.getElementById("scryTextDiv").style.overflow = "hidden";
    document.getElementById("scryTextDiv").scrollTop = "0px";
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
    document.getElementById("scryTextDiv").style.overflow = "hidden";
    document.getElementById("scryTextDiv").scrollTop = "0px";
}
function applyResearch(subject) {
    //curiosity,business ownership, tarot are done in updateBoard()
    //bloodLetting is done in calculator()
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
    } else if (id.id == "microscopeLink" && microscope.isOpen) {
        updateHover(microscope);
    } else if (id.id == "laundromatLink" && laundromat.isOpen) {
        updateHover(laundromat);
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
    } else if (id.id == "followerTitle") {
        document.getElementById("topSecText").innerHTML = followersDesc;
        document.getElementById("midSecText").innerHTML = "";
        document.getElementById("midSecText2").innerHTML = "";
        document.getElementById("midSecText3").innerHTML = "";
        document.getElementById("botSecText").innerHTML = followersFlavor
    } else if (id.id == "moneyTitle") {
        updateHoverResource(moneyDesc, moneyFlavor, money, moneyRate, moneyCap);
    } else if (id.id == "researchTitle") {
        updateHoverResource(researchDesc, researchFlavor, research, researchRate, researchCap);
    } else if (id.id == "insightTitle") {
        updateHoverResource(insightDesc, insightFlavor, insight, insightRate, insightCap);
    } else if (id.id == "bloodTitle") {
        updateHoverResource(bloodDesc, bloodFlavor, blood, bloodRate, bloodCap);
    } else if (id.id == "threadTitle") {
        updateHoverResource(threadDesc, threadFlavor, thread, threadRate, threadCap);
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
        document.getElementById("midSecText2").innerHTML = "<span style=\"color: #f411bb\">Insight</span>: " + subject.price;
        document.getElementById("midSecText3").innerHTML = "";
    } else {
        document.getElementById("midSecText2").innerHTML = "<span style=\"color: #5abfe8\">Research</span>: " + subject.price;
        if (subject.price2 != 0) {
            document.getElementById("midSecText3").innerHTML = "<span style=\"color: #f411bb\">Insight</span>: " + subject.price2;
        } else {
            document.getElementById("midSecText3").innerHTML = "";
        }
    }
    document.getElementById("botSecText").innerHTML = subject.flavor;
}
function updateHoverResource(desc, flavor, thing, thingRate, thingCap) {
    document.getElementById("topSecText").innerHTML = desc;
    if (thingCap > thing && thingRate != 0) {
        document.getElementById("midSecText").innerHTML = "to cap: " + timeCondense((thingCap - thing) / thingRate);
    } else {
        document.getElementById("midSecText").innerHTML = "";
    }
    document.getElementById("midSecText2").innerHTML = "";
    document.getElementById("midSecText3").innerHTML = "";
    document.getElementById("botSecText").innerHTML = flavor;
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

//saving * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\\
function saveGame() {
    saveData.buildings[0].count = garageSale.count;
    saveData.buildings[1].count = wallet.count;
    saveData.buildings[2].count = ti84.count;
    saveData.buildings[3].count = microscope.count;
    saveData.buildings[4].count = laundromat.count;
    saveData.buildings[5].count = tarotDeck.count;
    saveData.subjects[0].completed = curiosity.completed;
    saveData.subjects[1].completed = businessOwnership.completed;
    saveData.subjects[2].completed = tarot.completed;
    saveData.subjects[3].completed = bloodLetting.completed;
    saveData.resources[0].amount = followers;
    saveData.resources[1].amount = money;
    saveData.resources[2].amount = research;
    saveData.resources[3].amount = insight;
    saveData.resources[4].amount = blood;
    saveData.resources[5].amount = thread;
    var savePack = JSON.stringify(saveData);
    localStorage.setItem("ReincarnateSave", savePack);
    document.getElementById("saveText").innerHTML = "Saved!";
    saveReset = 4;
}
function resetSaveText() {
}
function loadGame() {
    if (localStorage.hasOwnProperty("ReincarnateSave")) {
        saveData = JSON.parse(localStorage.getItem("ReincarnateSave"));
    }
    garageSale.count = saveData.buildings[0].count;
    calcPrice(garageSale);
    wallet.count = saveData.buildings[1].count;
    calcPrice(wallet);
    ti84.count = saveData.buildings[2].count;
    calcPrice(ti84);
    microscope.count = saveData.buildings[3].count;
    calcPrice(microscope);
    laundromat.count = saveData.buildings[4].count;
    calcPrice(laundromat);
    tarotDeck.count = saveData.buildings[5].count;
    calcPrice(tarotDeck);
    curiosity.completed = saveData.subjects[0].completed;
    businessOwnership.completed = saveData.subjects[1].completed;
    tarot.completed = saveData.subjects[2].completed;
    bloodLetting.completed = saveData.subjects[3].completed;
    followers = saveData.resources[0].amount;
    money = saveData.resources[1].amount;
    research = saveData.resources[2].amount;
    insight = saveData.resources[3].amount;
    blood = saveData.resources[4].amount;
    thread = saveData.resources[5].amount;
    clearSubjects(subjects.length);
    update();
}
function clearSubjects(x) {
    for (var j = 0; j < x; j++) {
        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].completed) {
                var arr1 = subjects.slice(0, i);
                var arr2 = subjects.slice(i + 1, subjects.length);
                var lengths = arr1.length + arr2.length;
                subjects = new Array(lengths);
                for (var i = 0; i < arr1.length; i++) {
                    subjects[i] = arr1[i];
                }
                for (var i = 0; i < arr2.length; i++) {
                    subjects[arr1.length + i] = arr2[i];
                }
                break;
            }
        }
    }
}
function clearSave() {
    if (confirm("Are you sure you want to clear your save?")) {
        localStorage.setItem("ReincarnateSave", saveDataString);
        document.getElementById("clearText").innerHTML = "Cleared!";
        clearReset = 4;
    }
}
//saving * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *//