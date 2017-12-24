class GameEngine
{
    constructor(playerName1, playerName2, width, height, context, tileSize)
    {
        this.playerName1 = playerName1;
        this.playerName2 = playerName2;
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = null;
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.numberTileX = this.width/this.tileSize;
        this.numberTileY = this.height/this.tileSize;
        this.mapLoaded = null;
        this.blinkCursor = true;
        this.timeToBlink = 0;
        this.basePlayer1 = null;
        this.basePlayer2 = null;
        this.player1 = null;
        this.player2 = null;
        this.playerCreated = false;
        this.playerTurn = 1;
        this.baseMenuOpen = false;
        this.isUnitSelected = false;
        this.unitesAvaliable = new PoolUnite();
        this.unitSelected = null;
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

    gameLoop()
    {
        /* We're checking if the map is loaded. Otherwise, nothing is done */
        if(this.mapLoaded != null) {

            this.buildMap();

            /* Now that we're here, we know where the base are. We need to create them and create the players*/
            if(!this.playerCreated)
            {
                this.createPlayers();
            }

            /* If both players exists, we're ready to start main loop ! */
            if(this.playerCreated)
            {
                this.turnForPlayer(this.player1);

                this.checkGameStatus();
            }

            // If menu is open, show menu for current player
            if(this.baseMenuOpen == true)
            {
                if(this.playerTurn == 1)
                    this.buildBaseActionMenu(this.player1);
                if(this.playerTurn == 2)
                    this.buildBaseActionMenu(this.player2);
            }

            // Now we draw existings units
            this.drawUnits();
        }


    }

    checkGameStatus() {
        if (!this.player1.getBase().getStatus()) {
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(0, 0, this.width, this.height);

            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.font = "50px roboto";
            context.fillText( "Player 2 gagne !", this.width / 2 - 50, this.height/2 -25);
        }
        if (!this.player2.getBase().getStatus()) {
            context.fillStyle = "rgba(0, 0, 0, 0.5)";
            context.fillRect(0, 0, this.width, this.height);

            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.font = "50px roboto";
            context.fillText( "Player 1 gagne !", this.width / 2 - 50, this.height/2 -25);
        }
    }

    turnForPlayer(player)
    {

    }

    escapePressed()
    {
        // Si le menu est fermée, c'est que le joueur veut terminer son tour
        if(!this.baseMenuOpen && !this.isUnitSelected) {
            if (this.playerTurn == 1) {
                this.player1.resetAllUnits();
                this.playerTurn = 2;
                this.player2.setMoney(15);
            }

            else if (this.playerTurn == 2) {
                this.player2.resetAllUnits();
                this.playerTurn = 1;
                this.player1.setMoney(15);
            }
            console.log("Player turn : " + this.playerTurn);
        }
        // Ou alors qu'il veut désélectionné une unité sélectionné
        if(this.isUnitSelected == true)
        {
            this.isUnitSelected = false;
            this.unitSelected = null;
            console.log("Unité désélectionné")
        }

        // Sinon c'est juste qu'il veut fermer le menu
        else
        {
            this.baseMenuOpen = false;
        }

        this.baseMenuOpen = false;
    }

    isUnitOn()
    {
        if(this.playerTurn == 1) {
            for (let i = 0; i < this.player1.getUnites().length; i++) {
                let x = this.player1.getUnites()[i].getX();
                let y = this.player1.getUnites()[i].getY();

                if (this.cursorPosX == x && this.cursorPosY == y) {
                    return true;
                }
            }
        }

        if(this.playerTurn == 2) {
            for (let i = 0; i < this.player2.getUnites().length; i++) {
                let x = this.player2.getUnites()[i].getX();
                let y = this.player2.getUnites()[i].getY();

                if (this.cursorPosX == x && this.cursorPosY == y) {
                    return true;
                }
            }
        }
        return false;
    }

    unitSelect()
    {

        if(this.playerTurn == 1) {
            for (let i = 0; i < this.player1.getUnites().length; i++) {
                let x = this.player1.getUnites()[i].getX();
                let y = this.player1.getUnites()[i].getY();

                if (this.cursorPosX == x && this.cursorPosY == y) {
                    this.unitSelected = this.player1.getUnites()[i];
                }
            }
        }

        if(this.playerTurn == 2) {
            for (let i = 0; i < this.player2.getUnites().length; i++) {
                let x = this.player2.getUnites()[i].getX();
                let y = this.player2.getUnites()[i].getY();

                if (this.cursorPosX == x && this.cursorPosY == y) {
                    this.unitSelected = this.player2.getUnites()[i];
                }
            }
        }


    }

    /* While enter is pressed, this method is called. */
    actionOnTile()
    {
        if(this.playerTurn == 1)
        {
            // If cursor isn't on base, check if it's on a unit, if so, display range
            if(this.isUnitOn())
            {
                this.unitSelect();
            }
            // If enter is pressed while cursor is on base, pop base menu
            else if(this.basePlayer1.getX() == this.cursorPosX && this.basePlayer1.getY() == this.cursorPosY)
            {
                this.baseSelected(this.player1);
            }
            // If player want to move unit !
            else if(this.unitSelected != false)
            {
                this.attackUnit();
                this.moveUnit();
            }
            else
            {
                console.log("Nothing to be done here");
            }
        }

        if(this.playerTurn == 2)
        {
            // If cursor isn't on base, check if it's on a unit, if so, display range
            if(this.isUnitOn())
            {

                this.unitSelect();
            }
            // If enter is pressed while cursor is on base, pop base menu
            else if(this.basePlayer2.getX() == this.cursorPosX && this.basePlayer2.getY() == this.cursorPosY)
            {
                this.baseSelected(this.player2);
            }
            // If player want to move unit !
            else if(this.unitSelected != false)
            {
                this.attackUnit();
                this.moveUnit();
            }
            else
            {
                console.log("Nothing to be done here");
            }
        }

        if(this.playerTurn != 1 && this.playerTurn != 2)
        {
            console.log("Player turn is not 1 or 2, so why this message is showing up ?!");
        }
    }

    moveUnit()
    {
        let distance = 0;

        if(this.cursorPosX <= this.unitSelected.getX())
        {
            distance = this.unitSelected.getX() - this.cursorPosX;
        }
        if(this.cursorPosX >= this.unitSelected.getX())
        {
            distance = this.cursorPosX - this.unitSelected.getX();
        }
        if(this.cursorPosY >= this.unitSelected.getY())
        {
            distance += this.cursorPosY - this.unitSelected.getY();
        }
        if(this.cursorPosY <= this.unitSelected.getY())
        {
            distance += this.unitSelected.getY() - this.cursorPosY;
        }

        console.log("Distance = " + distance);

        if(distance <= this.unitSelected.getWalkRange() && !this.unitSelected.getWalkStatus())
        {
            if(!this.isTileOccupied(this.cursorPosX, this.cursorPosY)) {
                if(this.cursorPosX === this.player1.getBase().getX() && this.cursorPosY === this.player1.getBase().getY())
                {
                    console.log("Cannot move on a base");
                }
                if(this.cursorPosX === this.player2.getBase().getX() && this.cursorPosY === this.player2.getBase().getY())
                {
                    console.log("Cannot move on a base");
                }
                else {
                    this.unitSelected.moveUnit(this.cursorPosX, this.cursorPosY);
                    this.unitSelected.haveWalked();
                }
            }
        }
    }

    attackUnit()
    {

        let tempDistanceAttack = 0;
        // On regarde d'abord la différence sur l'axe X et on stock dans une variable la différence
        if(this.unitSelected.getX() <= this.cursorPosX)
        {
            tempDistanceAttack = this.cursorPosX - this.unitSelected.getX();
        }
        if(this.unitSelected.getX() >= this.cursorPosX)
        {
            tempDistanceAttack = this.unitSelected.getX() - this.cursorPosX;
        }
        // Puis sur l'axe Y
        if(this.unitSelected.getY() <= this.cursorPosY)
        {
            tempDistanceAttack += this.cursorPosY - this.unitSelected.getY();
        }
        if(this.unitSelected.getY() >= this.cursorPosY)
        {
            tempDistanceAttack += this.unitSelected.getY() - this.cursorPosY;
        }

        if(tempDistanceAttack <= this.unitSelected.getAttackRange() && !this.unitSelected.getFireStatus()) {

            if(this.playerTurn === 1  && this.player2.getUnitByPos(this.cursorPosX, this.cursorPosY) != null)
            {
                console.log("FIRING");
                this.player2.getUnitByPos(this.cursorPosX, this.cursorPosY).takingDamage(this.unitSelected.getPower());
                this.unitSelected.haveFired();
                this.checkGameStatus();
            }
            if(this.playerTurn === 2  && this.player1.getUnitByPos(this.cursorPosX, this.cursorPosY) != null)
            {
                console.log("FIRING");
                this.player1.getUnitByPos(this.cursorPosX, this.cursorPosY).takingDamage(this.unitSelected.getPower());
                this.unitSelected.haveFired();
                this.checkGameStatus();
            }

            //Attack base if is in range
            if(this.playerTurn === 1 && this.cursorPosX === this.player2.getBase().getX() && this.cursorPosY === this.player2.getBase().getY())
            {
                console.log("FIRING");
                this.basePlayer2.takingDamage(this.unitSelected.getPower());
                this.unitSelected.haveFired();
                this.checkGameStatus()
            }
            //Attack base if is in range
            if(this.playerTurn === 2 && this.cursorPosX === this.player1.getBase().getX() && this.cursorPosY === this.player1.getBase().getY())
            {
                console.log("FIRING");
                this.basePlayer1.takingDamage(this.unitSelected.getPower());
                this.unitSelected.haveFired();
                this.checkGameStatus();
            }

        }
    }

    baseSelected(player)
    {
        console.log("Player " + this.playerTurn + " // " + player.getMoney());
        this.baseMenuOpen = true;
    }

    createPlayers()
    {
        // So let's check the entire map for bases. While encourtering one, creating base
        for(let i = 0; i < this.map.length; i++)
        {
            for(let j = 0; j < this.map[i].length; j++) {
                //
                if(this.map[i][j] == 4)
                {
                    if(this.player1 != null && this.player2 != null)
                    {
                        console.log("Too many bases ! Skipping this one");
                    }

                    if(this.player2 == null && this.player1 != null)
                    {
                        this.basePlayer2 = new Base(i, j);
                        this.player2 = new Player(this.playerName2, 100, this.basePlayer2);
                        this.playerCreated = true;
                    }

                    if(this.player1 == null)
                    {
                        this.basePlayer1 = new Base(i, j);
                        this.player1 = new Player(this.playerName1, 100, this.basePlayer1);
                    }
                    console.log(this.basePlayer2);
                }
            }
        }
    }

    /* This method build the map, at first it will be 1 map, at last, multiple map could be choosen
    *
    * Map is always 1000X1000 and one tile is 50X50
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
                    let img = new Image();
                    img.src = 'img/grass.png';
                    context.drawImage(img, this.tileSize*i, this.tileSize*j);
                }
                if(this.map[i][j] == 1)
                {
                    context.fillStyle = "rgb(32, 160, 53)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 2)
                {
                    let img = new Image();
                    img.src = 'img/mountain.png';
                    context.drawImage(img, this.tileSize*i, this.tileSize*j);
                }
                if(this.map[i][j] == 3)
                {
                    context.fillStyle = "rgb(56, 152, 255)";
                    context.fillRect(this.tileSize*i, this.tileSize*j, this.tileSize, this.tileSize);
                }
                if(this.map[i][j] == 4)
                {
                    if(this.basePlayer1 != null) {
                        if (this.basePlayer1.getX() === i && this.basePlayer1.getY() === j) {
                            let img = new Image();
                            img.src = 'img/baseBlue.png';
                            context.drawImage(img, this.tileSize * i, this.tileSize * j);
                        }
                        if (this.basePlayer2.getX() === i && this.basePlayer2.getY() === j) {
                            let img = new Image();
                            img.src = 'img/baseRed.png';
                            context.drawImage(img, this.tileSize * i, this.tileSize * j);
                        }
                    }
                }
            }
        }

        //Now that the map is drawn, we place the cursor
        if(this.timeToBlink > 60)
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

    drawUnits()
    {
        if(this.player1 != null) {
            for (let i = 0; i < this.player1.getUnites().length; i++) {
                let x = this.player1.getUnites()[i].getX();
                let y = this.player1.getUnites()[i].getY();

                context.save();

                let uniteId = this.player1.getUnites()[i].getId();
                let img = new Image();

                switch(uniteId)
                {
                    case 0:

                        img.src = 'img/blueSoldier.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 1:
                        img.src = 'img/blueSniper.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 2:
                        img.src = 'img/blueJeep.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 3:
                        img.src = 'img/blueTank.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    default:
                        context.fillStyle = "rgb(255, 0, 0)";
                        context.fillRect(this.tileSize * x + 25/2, this.tileSize * y + 25/2, this.tileSize - 25, this.tileSize - 25);
                        break;
                }

                context.fillStyle = "rgba(255, 255, 255, 1)";
                context.font = "13px roboto";
                context.fillText( "Pv : " + this.player1.getUnites()[i].getHp(), this.tileSize * x +1, this.tileSize * y + this.tileSize);
                context.fillStyle = "rgba(0,0,0,1)";
                context.font = "13px roboto";
                context.fillText( "Pv : " + this.player1.getUnites()[i].getHp(), this.tileSize * x, this.tileSize * y + this.tileSize);




                context.restore();

            }
        }
        if(this.player2 != null) {
            for (let i = 0; i < this.player2.getUnites().length; i++) {
                let x = this.player2.getUnites()[i].getX();
                let y = this.player2.getUnites()[i].getY();

                context.save();

                let uniteId = this.player2.getUnites()[i].getId();
                let img = new Image();

                switch(uniteId)
                {
                    case 0:
                        img.src = 'img/redSoldier.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 1:
                        img.src = 'img/redSniper.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 2:
                        img.src = 'img/redJeep.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    case 3:
                        img.src = 'img/redTank.png';
                        context.drawImage(img, this.tileSize * x, this.tileSize * y);
                        break;
                    default:
                        context.fillStyle = "rgb(255, 0, 0)";
                        context.fillRect(this.tileSize * x + 25/2, this.tileSize * y + 25/2, this.tileSize - 25, this.tileSize - 25);
                        break;
                }

                context.fillStyle = "rgba(255, 255, 255, 1)";
                context.font = "13px roboto";
                context.fillText( "Pv : " + this.player2.getUnites()[i].getHp(), this.tileSize * x +1, this.tileSize * y + this.tileSize);
                context.fillStyle = "rgba(0,0,0,1)";
                context.font = "13px roboto";
                context.fillText( "Pv : " + this.player2.getUnites()[i].getHp(), this.tileSize * x, this.tileSize * y + this.tileSize);

                context.restore();

            }
        }

        if(this.player1 != null && this.player2 != null) {
            context.fillStyle = "rgba(255, 255, 255,0.8)";
            context.font = "13px roboto";
            context.fillText("Pv : " + this.player1.getBase().getHp(), this.tileSize * this.player1.getBase().getX(), this.tileSize * this.player1.getBase().getY() + this.tileSize);
            context.fillText("Pv : " + this.player2.getBase().getHp(), this.tileSize * this.player2.getBase().getX(), this.tileSize * this.player2.getBase().getY() + this.tileSize);
        }

        if(this.unitSelected != null)
        {

            this.isUnitSelected = true;
            console.log("Unité sélectionné");

            let tempDistanceWalk = 0;
            let tempDistanceAttack = 0;

            // Calcul et dessin de la zone de marche de l'unité sélectionné
            for(let i = 0; i < this.map.length; i++) {
                for (let j = 0; j < this.map[i].length; j++) {
                    tempDistanceWalk = 0;
                    // On regarde d'abord la différence sur l'axe X et on stock dans une variable la différence
                    if(this.unitSelected.getX() <= i)
                    {
                        tempDistanceWalk = i - this.unitSelected.getX();
                    }
                    if(this.unitSelected.getX() >= i)
                    {
                        tempDistanceWalk = this.unitSelected.getX() - i;
                    }
                    // Puis sur l'axe Y
                    if(this.unitSelected.getY() <= j)
                    {
                        tempDistanceWalk += j - this.unitSelected.getY();
                    }
                    if(this.unitSelected.getY() >= j)
                    {
                        tempDistanceWalk += this.unitSelected.getY() - j;
                    }

                    tempDistanceAttack = 0;
                    // On regarde d'abord la différence sur l'axe X et on stock dans une variable la différence
                    if(this.unitSelected.getX() <= i)
                    {
                        tempDistanceAttack = i - this.unitSelected.getX();
                    }
                    if(this.unitSelected.getX() >= i)
                    {
                        tempDistanceAttack = this.unitSelected.getX() - i;
                    }
                    // Puis sur l'axe Y
                    if(this.unitSelected.getY() <= j)
                    {
                        tempDistanceAttack += j - this.unitSelected.getY();
                    }
                    if(this.unitSelected.getY() >= j)
                    {
                        tempDistanceAttack += this.unitSelected.getY() - j;
                    }

                    // Maintenant, on doit dessiner pour le joueur les cases à porté !
                    if(tempDistanceWalk <= this.unitSelected.getWalkRange() && !this.unitSelected.getWalkStatus()) {
                        context.fillStyle = "rgba(66, 167, 244, 0.6)";
                        context.fillRect(this.tileSize * i, this.tileSize * j, this.tileSize, this.tileSize);
                    }

                    // Maintenant, on doit dessiner pour le joueur les cases à porté !
                    if(tempDistanceAttack <= this.unitSelected.getAttackRange() && !this.unitSelected.getFireStatus()) {
                        if(!this.blinkCursor)
                        {
                            context.fillStyle = "rgba(255, 48, 48, 0.4)";
                            context.fillRect(this.tileSize * i, this.tileSize * j, this.tileSize, this.tileSize);
                        }

                    }
                }
            }
        }


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

                responseToTab = mapKeys.split(';');

                for(let i = 0; i < numberTileX; i++)
                {
                    map[i] = new Array();
                    for(let j = 0; j < numberTileY; j++)
                    {
                        map[i][j] = responseToTab[i*20+j];
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

    buildBaseActionMenu(player)
    {
        context.save();

        context.fillStyle = "rgba(0,0,0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "rgba(0,0,0,1)";
        context.font = "30px roboto";
        context.fillText("Money : " + player.getMoney(), canvas.width / 2 + 1, canvas.height / 6);

        for(let i = 0; i < this.unitesAvaliable.getUnites().length; i++)
        {
            context.font = "30px roboto";
            context.fillText( i+1 + " : " + this.unitesAvaliable.getUnites()[i].getName() + " // Cost : " + this.unitesAvaliable.getUnites()[i].getCost(), canvas.width / 2 + 1, canvas.height / 6 + 30 + (i * 30));
        }

        context.restore();
    }

    isTileOccupied(posX, posY)
    {
        for(let i = 0; i < this.player1.getUnites().length; i++)
        {
            let x = this.player1.getUnites()[i].getX();
            let y = this.player1.getUnites()[i].getY();

            if(posX == x && posY == y)
            {
                return true;
            }
        }

        for(let i = 0; i < this.player2.getUnites().length; i++)
        {
            let x = this.player2.getUnites()[i].getX();
            let y = this.player2.getUnites()[i].getY();

            if(posX == x && posY == y)
            {
                return true;
            }
        }

        return false;
    }

    buy(uniteId)
    {
        if(this.baseMenuOpen)
        {
            if(this.playerTurn == 1)
            {
                if(this.isTileOccupied(this.player1.getBase().getX(), this.player1.getBase().getY()))
                {
                    console.log("Tile is occupied : Buy canceled");
                }
                else {
                    if(this.player1.enoughMoney(this.unitesAvaliable.getPriceById(uniteId))) {
                        this.player1.addUnite(uniteId, this.player1.getBase().getX(), this.player1.getBase().getY());
                        this.player1.setMoney(-this.unitesAvaliable.getPriceById(uniteId))
                    }
                    else
                    {
                        console.log("Not enough money !")
                    }
                }
            }
            if(this.playerTurn == 2)
            {
                if(this.isTileOccupied(this.player2.getBase().getX(), this.player2.getBase().getY()))
                {
                    console.log("Tile is occupied : Buy canceled");
                }
                else {
                    if(this.player2.enoughMoney(this.unitesAvaliable.getPriceById(uniteId))) {
                        this.player2.addUnite(uniteId, this.player2.getBase().getX(), this.player2.getBase().getY());
                        this.player2.setMoney(-this.unitesAvaliable.getPriceById(uniteId))
                    }
                }
            }

            this.baseMenuOpen = false;
        }
        else
        {
            console.log("Menu is not open");
        }
    }
}