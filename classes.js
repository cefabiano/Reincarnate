// JavaScript source code
class Building{
    constructor(price, price2, priceRatio, priceType, priceType2, isOpen, image, benefit, desc, flavor) {
        this.count = 0;
        this.price = price;
        this.price2 = price2;
        this.priceRatio = priceRatio;
        this.priceType = priceType;
        this.priceType2 = priceType2;
        this.isOpen = isOpen;
        this.image = image;
        this.benefit = benefit;
        this.desc = desc;
        this.flavor = flavor;
        this.isGray = true;
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
                money -= this.price2;
                break;
            case 1:
                research -= this.price2;
                break;
            case 2:
                insight -= this.price2;
                break;
            case 3:
                blood -= this.price2;
                break;
            case 4:
                thread -= this.price2;
                break;
        }
        this.count++;
        this.price = this.price * this.priceRatio;
        this.price2 = this.price2 * this.priceRatio;
    }
    gray() {
        var isWhite = 0;
        switch (this.priceType) {
            case 0:
                if (money >= this.price) {
                    isWhite++;
                }
                break;
            case 1:
                if (research >= this.price) {
                    isWhite++;
                }
                break;
            case 2:
                if (insight >= this.price) {
                    isWhite++;
                }
                break;
            case 3:
                if (blood >= this.price) {
                    isWhite++;
                }
                break;
            case 4:
                if (thread >= this.price) {
                    isWhite++;
                }
                break;
        }
        switch (this.priceType2) {
            case -1:
                isWhite++;
                break;
            case 0:
                if (money >= this.price2) {
                    isWhite++;
                }
                break;
            case 1:
                if (research >= this.price2) {
                    isWhite++;
                }
                break;
            case 2:
                if (insight >= this.price2) {
                    isWhite++;
                }
                break;
            case 3:
                if (blood >= this.price2) {
                    isWhite++;
                }
                break;
            case 4:
                if (thread >= this.price2) {
                    isWhite++;
                }
                break;
        }
        if (isWhite == 2) {
            document.getElementById(this.image).src = "square.png";
            this.isGray = false;
        } else {
            document.getElementById(this.image).src = "gray.png";
            this.isGray = true;
        }
    }
    updatePriceTime(whichPrice) {
        if (this.isGray) {
            if (whichPrice == 1) {
                var x = this.priceType;
            } else {
                var x = this.priceType2;
            }
            var y;
            switch (x) {
                case 0:
                    if (x == this.priceType) {
                        y = (this.price - money) / moneyRate;
                    } else if (x == this.priceType2) {
                        y = (this.price2 - money) / moneyRate;
                    }
                    break;
                case 1:
                    if (x == this.priceType) {
                        y = (this.price - research) / researchRate;
                    } else if (x == this.priceType2) {
                        y = (this.price2 - research) / researchRate;
                    }
                    break;
                case 2:
                    if (x == this.priceType) {
                        y = (this.price - insight) / insightRate;
                    } else if (x == this.priceType2) {
                        y = (this.price2 - insight) / insightRate;
                    }
                    break;
                case 3:
                    if (x == this.priceType) {
                        y = (this.price - blood) / bloodRate;
                    } else if (x == this.priceType2) {
                        y = (this.price2 - blood) / bloodRate;
                    }
                    break;
                case 4:
                    if (x == this.priceType) {
                        y = (this.price - thread) / threadRate;
                    } else if (x == this.priceType2) {
                        y = (this.price2 - thread) / threadRate;
                    }
                    break;
            }
            return timeCondense(y);
        } else {
            return "";
        }
    }
}

class Subject {
    constructor(name, price, price2, priceType, hasPreReq, preReq, benefit, desc, flavor) {
        this.name = name;
        this.price = price;
        this.price2 = price2;
        this.priceType = priceType;
        this.hasPreReq = hasPreReq;
        this.preReq = preReq;
        this.completed = false;
        this.benefit = benefit;
        this.desc = desc;
        this.flavor = flavor;
    }
    buy() {
        if (this.priceType == false) {
            if (research >= this.price && insight >= this.price2) {
                research -= this.price;
                insight -= this.price2;
                this.completed = true;
                applyResearch(this);
            }
        } else {
            if (insight > this.price) {
                insight -= this.price2;
                this.completed = true;
                applyResearch(this);
            }
        }
    }
    complete() {
        this.completed = true;
    }
}

class Token {
	constructor(name, price, price2, price3, priceType, priceType2, priceType3) {
        this.name = name;
        this.price = price;
        this.price2 = price2;
        this.price3 = price3;
        this.priceType = priceType;
        this.priceType2 = priceType2;
        this.priceType3 = priceType3;
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
		if (success != 1)
			return;
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
		if (success != 2)
			return;
        switch (this.priceType3) {
            case -1:
                success++;
                break;
            case 0:
                if (money >= this.price3) {
                    success++;
                }
                break;
            case 1:
                if (research >= this.price3) {
                    success++;
                }
                break;
            case 2:
                if (insight >= this.price3) {
                    success++;
                }
                break;
            case 3:
                if (blood >= this.price3) {
                    success++;
                }
                break;
            case 4:
                if (thread >= this.price3) {
                    success++;
                }
                break;
        }
        if (success == 3)
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
                money -= this.price2;
                break;
            case 1:
                research -= this.price2;
                break;
            case 2:
                insight -= this.price2;
                break;
            case 3:
                blood -= this.price2;
                break;
            case 4:
                thread -= this.price2;
                break;
        }
        switch (this.priceType3) {
            case -1:
                break;
            case 0:
                money -= this.price3;
                break;
            case 1:
                research -= this.price3;
                break;
            case 2:
                insight -= this.price3;
                break;
            case 3:
                blood -= this.price3;
                break;
            case 4:
                thread -= this.price3;
                break;
        }

    }
}