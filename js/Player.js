class Player
{
    constructor(playerName, playerMoney, posXbase, posYbase)
    {
        this.name = playerName;
        this.money = playerMoney;
        this.base = new Base(posXbase, posYbase);
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


}