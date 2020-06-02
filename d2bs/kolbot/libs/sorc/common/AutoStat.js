/**
 *   @filename   AutoStat.js
 *   @author     IMBA
 *   @desc       Automatically allocates stat points
 */

function AutoStat(statBuildOrder, save, block, bulkStat) {
    if (save === undefined) {
        save = 0; // stat points to save
    }

    if (block === undefined) {
        block = 0; // desired block chance
    }

    if (bulkStat === undefined) {
        bulkStat = true; // set true to spend multiple stat points at once, or false to spend 1 point at a time
    }

    /* statBuildOrder Settings (this is now configured as an argument used in WeimbaWalk.js)
     The script will stat in the order of precedence. You may want to stat strength or dexterity first.
     Set the stat to the desired integer value, and it will stat *hard points up to the desired value.
     You can also set to string value "all", and it will spend all the remaining points.
     Dexterity can be set to "block" and it will stat dexterity up the the desired block value (ignored in classic).

     statBuildOrder = [
     ["strength", 25], ["energy", 75], ["vitality", 75],
     ["strength", 55], ["vitality", "all"]
     ];
     */

    this.getBlock = function () {
        var shield = false,
            item = me.getItem(-1, 1);

        // make sure character has shield equipped
        if (item) {
            do {
                if ([4, 5].indexOf(item.bodylocation) > -1 && [2, 51, 69, 70].indexOf(item.itemType) > -1) {
                    shield = true;
                }
            } while (item.getNext());
        }

        if (!shield) {
            return block;
        }

        if (me.gametype === 0) { // classic
            return Math.floor(me.getStat(20) + getBaseStat(15, me.classid, 23));
        }

        return Math.min(75, Math.floor((me.getStat(20) + getBaseStat(15, me.classid, 23)) * (me.getStat(2) - 15) / (me.charlvl * 2)));
    };

    // this check may not be necessary with this.validItem(), but consider it double check
    this.verifySetStats = function (unit, type, stats) { //verify that the set bonuses are there
        var i, temp, string;

        if (type === 0) {
            string = 3473 //to strength
        } else {
            string = 3474 //to dexterity
        }

        if (unit) {
            temp = unit.description.split("\n");

            for (i = 0; i < temp.length; i += 1) {
                if (temp[i].match(getLocaleString(string), "i")) {
                    if (parseInt(temp[i].replace(/(y|ÿ)c[0-9!"+<;.*]/, ""), 10) === stats) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    this.validItem = function (item) {
        // ignore item bonuses from secondary weapon slot
        if (me.gametype === 1 && [11, 12].indexOf(item.bodylocation) > -1) {
            return false;
        }

        // some items dont have str or dex require
        if (!item.strreq) {
            item.strreq = 0;
        }

        if (!item.dexreq) {
            item.dexreq = 0;
        }

        // check if character meets str, dex, and level requirement since stat bonuses only apply when they are active
        return me.getStat(0) >= item.strreq && me.getStat(2) >= item.dexreq && me.charlvl >= item.lvlreq;
    };

    this.setBonus = function (type) { //get stats from set bonuses
        if (type === 1 || type === 3) { //set bonuses does not have energy or vitality (we can ignore this)
            return 0;
        }

        var sets = { //these are the only sets with possible stat bonuses
            "angelic": [], "artic": [], "civerb": [], "iratha": [],
            "isenhart": [], "vidala": [], "cowking": [], "disciple": [],
            "griswold": [], "mavina": [], "naj": [], "orphan": []
        };

        var i, j, setStat = 0,
            items = me.getItems();

        if (items) {
            for (i = 0; i < items.length; i += 1) {
                if (items[i].mode === 1 && items[i].quality === 5 && this.validItem(items[i])) {
                    idSwitch:
                        switch (items[i].classid) {
                            case 311: //crown
                                if (items[i].getStat(41) === 30) { //light resist
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 337: //light gauntlet
                                if (items[i].getStat(7) === 20) { //life
                                    sets.artic.push(items[i]);
                                } else if (items[i].getStat(43) === 30) { //cold resist
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 340: //heavy boots
                                if (items[i].getStat(2) === 20) { //dexterity
                                    sets.cowking.push(items[i]);
                                }

                                break;
                            case 347: //heavy belt
                                if (items[i].getStat(21) === 5) { //min damage
                                    sets.iratha.push(items[i]);
                                }

                                break;
                            case 520: //amulet
                                if (items[i].getStat(114) === 20) { //damage to mana
                                    sets.angelic.push(items[i]);
                                } else if (items[i].getStat(74) === 4) { //replenish life
                                    sets.civerb.push(items[i]);
                                } else if (items[i].getStat(110) === 75) { //poison length reduced
                                    sets.iratha.push(items[i]);
                                } else if (items[i].getStat(43) === 20) { //cold resist
                                    sets.vidala.push(items[i]);
                                } else if (items[i].getStat(43) === 18) { //cold resist
                                    sets.disciple.push(items[i]);
                                }

                                break;
                            case 522: //ring
                                if (items[i].getStat(74) === 6) { //replenish life
                                    for (j = 0; j < sets.angelic.length; j += 1) { //do not count ring twice
                                        if (sets.angelic[j].classid === items[i].classid) {
                                            break idSwitch;
                                        }
                                    }

                                    sets.angelic.push(items[i]);
                                }

                                break;
                            case 27: //sabre
                                for (j = 0; j < sets.angelic.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.angelic[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.angelic.push(items[i]);

                                break;
                            case 317: //ring mail
                                sets.angelic.push(items[i]);

                                break;
                            case 74: //short war bow
                            case 313: //quilted armor
                            case 345: //light belt
                                sets.artic.push(items[i]);

                                break;
                            case 16: //grand scepter
                                for (j = 0; j < sets.civerb.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.civerb[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.civerb.push(items[i]);

                                break;
                            case 330:
                                sets.civerb.push(items[i]);

                                break;
                            case 30: //broad sword
                                for (j = 0; j < sets.isenhart.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.isenhart[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.isenhart.push(items[i]);

                                break;
                            case 309: //full helm
                            case 320: //breast plate
                            case 333: //gothic shield
                                sets.isenhart.push(items[i]);

                                break;
                            case 73: //long battle bow
                            case 314: //leather armor
                            case 342: //light plated boots
                                sets.vidala.push(items[i]);

                                break;
                            case 316: //studded leather
                            case 352: //war hat
                                sets.cowking.push(items[i]);

                                break;
                            case 385: //demonhide boots
                            case 429: //dusk shroud
                            case 450: //bramble mitts
                            case 462: //mithril coil
                                sets.disciple.push(items[i]);

                                break;
                            case 213: //caduceus
                                for (j = 0; j < sets.griswold.length; j += 1) { //do not count twice in case of dual wield
                                    if (sets.griswold[j].classid === items[i].classid) {
                                        break idSwitch;
                                    }
                                }

                                sets.griswold.push(items[i]);

                                break;
                            case 372: //ornate plate
                            case 427: //corona
                            case 502: //vortex shield
                                sets.griswold.push(items[i]);

                                break;
                            case 302: //grand matron bow
                            case 383: //battle gauntlets
                            case 391: //sharkskin belt
                            case 421: //diadem
                            case 439: //kraken shell
                                sets.mavina.push(items[i]);

                                break;
                            case 261: //elder staff
                            case 418: //circlet
                            case 438: //hellforge plate
                                sets.naj.push(items[i]);

                                break;
                            case 356: //winged helm
                            case 375: //round shield
                            case 381: //sharkskin gloves
                            case 393: //battle belt
                                sets.orphan.push(items[i]);

                                break;
                        }
                }
            }
        }

        for (i in sets) {
            if (sets.hasOwnProperty(i)) {
                MainSwitch:
                    switch (i) {
                        case "angelic":
                            if (sets[i].length >= 2 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "artic":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 5)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 5;
                            }

                            break;
                        case "civerb":
                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            break;
                        case "iratha":
                            if (sets[i].length === 4 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            break;
                        case "isenhart":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "vidala":
                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            if (sets[i].length === 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "cowking":
                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                        case "disciple":
                            if (sets[i].length >= 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            break;
                        case "griswold":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 30)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 30;
                            }

                            break;
                        case "mavina":
                            if (sets[i].length >= 2 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            if (sets[i].length >= 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 30)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 30;
                            }

                            break;
                        case "naj":
                            if (sets[i].length === 3 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 15)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 15;
                            }

                            if (sets[i].length === 3 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                        case "orphan":
                            if (sets[i].length === 4 && type === 2) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 10)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 10;
                            }

                            if (sets[i].length === 4 && type === 0) {
                                for (j = 0; j < sets[i].length; j += 1) {
                                    if (!this.verifySetStats(sets[i][j], type, 20)) {
                                        break MainSwitch;
                                    }
                                }

                                setStat += 20;
                            }

                            break;
                    }
            }
        }

        return setStat;
    };

    this.getHardStats = function (type) { // return stat values excluding stat bonuses from sets and/or items
        var i, statID,
            addedStat = 0,
            items = me.getItems();

        switch (type) {
            case 0: // strength
                type = 0;
                statID = 220;

                break;
            case 1: // energy
                type = 1;
                statID = 222;

                break;
            case 2: // dexterity
                type = 2;
                statID = 221;

                break;
            case 3: // vitality
                type = 3;
                statID = 223;

                break;
        }

        if (items) {
            for (i = 0; i < items.length; i += 1) {
                // items equipped or charms in inventory
                if ((items[i].mode === 1 || (items[i].location === 3 && [82, 83, 84].indexOf(items[i].itemType) > -1)) && this.validItem(items[i])) {
                    // stats
                    if (items[i].getStat(type)) {
                        addedStat += items[i].getStat(type);
                    }

                    // stats per level
                    if (items[i].getStat(statID)) {
                        addedStat += Math.floor(items[i].getStat(statID) / 8 * me.charlvl);
                    }
                }
            }
        }

        return (me.getStat(type) - addedStat - this.setBonus(type));
    };

    this.requiredDex = function () {
        var i, set = false,
            inactiveDex = 0,
            items = me.getItems();

        if (items) {
            for (i = 0; i < items.length; i += 1) {
                // items equipped but inactive (these are possible dex sources unseen by me.getStat(2))
                if (items[i].mode === 1 && [11, 12].indexOf(items[i].bodylocation) === -1 && !this.validItem(items[i])) {
                    if (items[i].quality === 5) {
                        set = true;

                        break;
                    }

                    // stats
                    if (items[i].getStat(2)) {
                        inactiveDex += items[i].getStat(2);
                    }

                    // stats per level
                    if (items[i].getStat(221)) {
                        inactiveDex += Math.floor(items[i].getStat(221) / 8 * me.charlvl);
                    }
                }
            }
        }

        // just stat 1 at a time if there's set item (there could be dex bonus for currently inactive set)
        if (set) {
            return 1;
        }

        // returns amount of dexterity required to get the desired block chance
        return Math.ceil((2 * me.charlvl * block) / (me.getStat(20) + getBaseStat(15, me.classid, 23)) + 15) - me.getStat(2) - inactiveDex;
    };

    this.useStats = function (type, goal) {
        var statLeft = me.getStat(4),
            tick = getTickCount();

        if (goal === undefined) {
            goal = false;
        }

        // use 0x3a packet to spend multiple stat points at once (up to 100)
        if (bulkStat) {
            if (goal) {
                sendPacket(1, 0x3a, 1, type, 1, Math.min(me.getStat(4) - save - 1, goal - 1, 99));
            } else {
                sendPacket(1, 0x3a, 1, type, 1, Math.min(me.getStat(4) - save - 1, 99));
            }
        } else {
            useStatPoint(type);
        }

        while (getTickCount() - tick < 3000) {
            if (statLeft > me.getStat(4)) {
                return true;
            }

            delay(100);
        }

        return false;
    };

    this.addStatPoint = function () {
        var i, hardStats;

        for (i = 0; i < statBuildOrder.length; i += 1) {
            switch (statBuildOrder[i][0]) {
                case 0:
                case "strength":
                    if (typeof statBuildOrder[i][1] === "string") {
                        switch (statBuildOrder[i][1]) {
                            case "all":
                                return this.useStats(0);
                            default:
                                break;
                        }
                    } else {
                        hardStats = this.getHardStats(0);

                        if (hardStats < statBuildOrder[i][1]) {
                            return this.useStats(0, statBuildOrder[i][1] - hardStats);
                        }
                    }

                    break;
                case 1:
                case "energy":
                    if (typeof statBuildOrder[i][1] === "string") {
                        switch (statBuildOrder[i][1]) {
                            case "all":
                                return this.useStats(1);
                            default:
                                break;
                        }
                    } else {
                        hardStats = this.getHardStats(1);

                        if (hardStats < statBuildOrder[i][1]) {
                            return this.useStats(1, statBuildOrder[i][1] - hardStats);
                        }
                    }

                    break;
                case 2:
                case "dexterity":
                    if (typeof statBuildOrder[i][1] === "string") {
                        switch (statBuildOrder[i][1]) {
                            case "block":
                                if (me.gametype === 1) {
                                    if (this.getBlock() < block) {
                                        return this.useStats(2, this.requiredDex());
                                    }
                                }

                                break;
                            case "all":
                                return this.useStats(2);
                            default:
                                break;
                        }
                    } else {
                        hardStats = this.getHardStats(2);

                        if (hardStats < statBuildOrder[i][1]) {
                            return this.useStats(2, statBuildOrder[i][1] - hardStats);
                        }
                    }

                    break;
                case 3:
                case "vitality":
                    if (typeof statBuildOrder[i][1] === "string") {
                        switch (statBuildOrder[i][1]) {
                            case "all":
                                return this.useStats(3);
                            default:
                                break;
                        }
                    } else {
                        hardStats = this.getHardStats(3);

                        if (hardStats < statBuildOrder[i][1]) {
                            return this.useStats(3, statBuildOrder[i][1] - hardStats);
                        }
                    }

                    break;
            }
        }

        return false;
    };

    while (me.getStat(4) > save) {
        this.addStatPoint();

        delay(150 + me.ping); // spending single stats at a time with short delay may cause r/d
    }

    return true;
}