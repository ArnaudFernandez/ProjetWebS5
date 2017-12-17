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


    addUnite(idType,posX,posY)
    {
        let unite = new Unite (idType, posX, posY);
        if(this.enoughMoney(unite.getCost()))
        {
            this.unites.push(unite);
        }

        unite = null;
    }


}