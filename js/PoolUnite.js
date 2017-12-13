class PoolUnite
{

    constructor()
    {
        this.unites = this.init();
    }

    init()
    {
        let unites = new Array();

        for(let i = 0; i < 4; i++)
        {
            unites[i] = new Unite(i, 0, 0);
        }

        return unites;
    }

    getUnites()
    {
        return this.unites;
    }

    getNameById(id)
    {
        return this.unites[id].getName();
    }
}