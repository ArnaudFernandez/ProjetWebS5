class Player
{
    constructor(playerName, playerMoney, base)
    {
        this.name = playerName;
        this.money = playerMoney;
        this.base = base;
        this.unites = new Array();
    }

    getMoney()
    {
        return this.money;
    }

    getName()
    {
        return this.name;
    }

    getUnites()
    {
        return this.unites;
    }


    enoughMoney(couts)
    {
        if(this.money - couts >= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getUnitByPos(x, y)
    {
        for(let i = 0; i < this.unites.length; i++)
        {
            if(this.unites[i].getX() ===  x)
            {
                if(this.unites[i].getY() ===  y) {
                    console.log(this.unites[i]);
                    return this.unites[i];
                }
            }
        }

        return null;
    }

    addUnite(idType,posX,posY)
    {
        let unite = new Unite (idType, posX, posY);
        if(this.enoughMoney(unite.getCost()))
        {
            this.unites.push(unite);
        }

        unite = null;
    }


    getBase()
    {
        return this.base;
    }

    setMoney(money)
    {
        this.money += money;
    }

    resetAllUnits()
    {
        for(let i = 0; i < this.unites.length; i++)
        {
            this.unites[i].resetStatus();
        }
    }


}