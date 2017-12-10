class Base
{
    constructor(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
        this.healthPoint = 100;
    }

    getBaseState()
    {
        if(this.healthPoint > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getX()
    {
        return this.posX;
    }

    getY()
    {
        return this.posY;
    }

}