class Base
{
    constructor(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
        this.healthPoint = 100;
    }

    getX()
    {
        return this.posX;
    }

    getY()
    {
        return this.posY;
    }

    getHp()
    {
        return this.healthPoint;
    }

    takingDamage(damage)
    {
        this.healthPoint -= damage;
    }

    getStatus()
    {
        if(this.healthPoint <= 0)
        {
            return false;
        }
        return true;
    }
}