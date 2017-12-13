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

    setMoney()
    {
        this.money += 15;
    }

    getBase()
    {
        return this.base;
    }

    getUnites()
    {
        return this.unites;
    }

    addUnite(uniteId, posX, posY)
    {
        let unite = new Unite(uniteId, posX, posY);

        this.unites.push(unite);
    }


}