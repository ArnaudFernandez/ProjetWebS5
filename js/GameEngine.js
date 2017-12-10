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
        this.mapLoaded = null;
        this.blinkCursor = true;
        this.timeToBlink = 0;
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

        this.mapLoaded = this.getMapFromFile("./0.map", this.numberTileX, this.numberTileY);
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
        if(this.mapLoaded != null)
        {
            this.map = this.mapLoaded;
        }


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
        if(this.timeToBlink > 30)
        {
            this.blinkCursor = !this.blinkCursor;
            this.timeToBlink = 0;
        }
        if(this.blinkCursor) {
            context.fillStyle = "rgba(220, 237, 33, 0.5)";
            context.fillRect(this.tileSize * this.cursorPosX, this.tileSize * this.cursorPosY, this.tileSize, this.tileSize);
        }
        if(!this.blinkCursor)
        {
            context.fillStyle = "rgba(220, 237, 33, 1)";
            context.fillRect(this.tileSize * this.cursorPosX, this.tileSize * this.cursorPosY, this.tileSize, this.tileSize);
        }
        this.timeToBlink++;

        context.restore();
    }

    fillRandomMapForTest(map)
    {
        for(let i = 0; i < map.length; i++)
        {
            for(let j = 0; j < map[i].length; j++)
            {
                map[i][j] = Math.round(Math.random() * (4 - 0) + 0);
            }
        }
        return map;
    }

    // GET THE MAP FROM FILE WITH ID, TO START THERE WILL BE 1 MAP NAMED 0.map
    getMapFromFile(mapToGet, numberTileX, numberTileY)
    {
        let responseToTab;
        let mapKeys;
        let map = new Array();
        let xmlhttp=new XMLHttpRequest();

        xmlhttp.open("GET","php/serveur.php?q="+mapToGet,true);


        xmlhttp.onreadystatechange=function() {
            if(xmlhttp.readyState==4 && xmlhttp.status==200) {
                mapKeys = xmlhttp.responseText;
                console.log(mapKeys);

                responseToTab = mapKeys.split(';');

                for(let i = 0; i < numberTileX; i++)
                {
                    map[i] = new Array();
                    for(let j = 0; j < numberTileY; j++)
                    {
                        map[i][j] = responseToTab[i*20+j];
                        console.log("stp");
                    }
                }
            }

        };
        xmlhttp.send();

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