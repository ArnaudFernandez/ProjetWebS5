class Unite
{
    /*
    * Les unités sont identifiés par leur ID. Voici les ID correcpondants :
    * 0 = Infantrie
    * 1 = Sniper
    * 2 = Jeep d'attaque
    * 3 = Tank
    * */
    constructor(idType, posX, posY)
    {
        this.walked = false;
        this.fired = false;
        switch(idType)
        {
            case 0:
                this.id = 0;
                this.name = "Infantrie";
                this.hp = 20;
                this.power = 5;
                this.cost = 10;
                this.walkRange = 3;
                this.attackRange = 1;
                break;
            case 1:
                this.id = 1;
                this.name = "Sniper";
                this.hp = 10;
                this.power = 10;
                this.cost = 10;
                this.walkRange = 2;
                this.attackRange = 4;
                break;
            case 2:
                this.id = 2;
                this.name = "Jeep d'attaque";
                this.hp = 50;
                this.power = 15;
                this.cost = 50;
                this.walkRange = 8;
                this.attackRange = 1;
                break;
            case 3:
                this.id = 3;
                this.name = "Tank";
                this.hp = 130;
                this.power = 30;
                this.cost = 100;
                this.walkRange = 3;
                this.attackRange = 1;
                break;
            default:
                this.id = 99;
                this.name = "Default";
                this.hp = 0;
                this.power = 0;
                this.cost = 0;
                this.walkRange = 0;
                this.attackRange = 0;
                break;
        }
        this.posX = posX;
        this.posY = posY;
    }

    getId()
    {
        return this.id;
    }

    getName()
    {
        return this.name;
    }

    getHp()
    {
        return this.hp;
    }

    getPower()
    {
        return this.power;
    }

    getCost()
    {
        return this.cost;
    }

    getWalkRange()
    {
        return this.walkRange;
    }

    getAttackRange()
    {
        return this.attackRange;
    }

    takingDamage(damage)
    {
        this.hp -= damage;
    }

    getX()
    {
        return this.posX;
    }

    getY()
    {
        return this.posY;
    }

    getWalkStatus()
    {
        return this.walked;
    }

    getFireStatus()
    {
        return this.fired;
    }

    haveFired()
    {
        this.fired = true;
    }

    haveWalked()
    {
        this.walked = true;
    }

    resetStatus()
    {
        this.fired = false;
        this.walked = false;
    }

    isItAlive()
    {
        if(this.hp <= 0)
        {
            return false;
        }
        return true;
    }

    attackUnit(unitTargeted)
    {
        unitTargeted.hp -= this.power;
    }

    moveUnit(x, y)
    {
        this.posX = x;
        this.posY = y;
    }


}