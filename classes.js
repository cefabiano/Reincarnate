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
        } else {
            document.getElementById(this.image).src = "gray.png";

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