class GameEngine
{
    constructor(playerName1, playerName2, width, height, context, tileSize)
    {
        this.playerName1 = playerName1;
        this.playerName2 = playerName2;
        this.width = width;
        this.height = height;
        this.context = context;
        this.tileSize = tileSize;
        this.map = null;
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.numberTileX = this.width/this.tileSize;
        this.numberTileY = this.height/this.tileSize;
    }

    init()
    {
        //Initialize map size
        let mapInit = new Array(this.width / this.tileSize);
        for(let i = 0; i < mapInit.length; i++)
        {
            mapInit[i] = new Array(this.height/this.tileSize);
        }

        this.map = this.fillRandomMapForTest(mapInit);
    }

    /* This method build the map, at first it will be 1 map, at last, multiple map could be choosen
    *
    * Map is always 2000X2000 and one tile is 50X50
    * Map are builded by tile identifier, which are :
    * 0 = Normal grass
    * 1 = High grass
    * 2 = Mountain
    * 3 = Water
    * 4 = Base
    * */
    buildMap()
    {
        context.save();

        for(let i = 0; i < this.map.length; i++)
        {
            for(let j = 0; j < this.map[i].length; j++)
            {
                if(this.map[i][j] == 0)
                {
                    context.fillStyle = "rgb(66, 244, 95)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 1)
                {
                    context.fillStyle = "rgb(32, 160, 53)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 2)
                {
                    context.fillStyle = "rgb(173, 173, 173)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 3)
                {
                    context.fillStyle = "rgb(56, 152, 255)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 4)
                {
                    context.fillStyle = "rgb(0, 0, 0)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
            }
        }

        //Now that the map is drawn, we place the cursor
        context.fillStyle = "rgb(220, 237, 33)";
        context.fillRect(this.tileSize*this.cursorPosX, this.tileSize*this.cursorPosY, this.tileSize, this.tileSize);

        context.restore();
    }

    fillRandomMapForTest(map)
    {
        for(let i = 0; i < map.length; i++)
        {
            for(let j = 0; j < map[i].length; j++)
            {
                map[i][j] = Math.round(Math.random() * (4 - 0) + 0);
                console.log(map[i][j]);
            }
        }
        return map;
    }

    moveCursorX(whereToPush)
    {
        if(whereToPush == 0 && this.cursorPosX>0)
        {
            this.cursorPosX--;
        }
        if(whereToPush == 1 && this.cursorPosX < this.numberTileX-1)
        {
            this.cursorPosX++;
        }
    }

    moveCursorY(whereToPush)
    {
        if(whereToPush == 0 && this.cursorPosY > 0)
        {
            this.cursorPosY--;
        }
        if(whereToPush == 1 && this.cursorPosY < this.numberTileY-1)
        {
            this.cursorPosY++;
        }
    }
}