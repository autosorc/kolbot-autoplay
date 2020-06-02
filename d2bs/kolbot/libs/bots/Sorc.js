/**
 *		@filename		Sorc.js
 *		@desc			ingame script for sorc
 *		@version		May 2020
 */


function runSequence(sor1, sor2) {
    return sor1['every'](function (sor10) {
        let sor11 = Account['get']();
        if (me['getQuest'](1, 0) && !me['getQuest'](41, 0) && me['charlvl'] >= sor11['respec1'] && sor11['build2'] && (me['diff'] === 0) && me['getQuest'](18, 0)) {
            Quest['respec']();
        }
        if (me['getQuest'](1, 0) && !me['getQuest'](41, 0) && (me['charlvl'] >= sor11['respec2']) && sor11['build3'] && me['diff'] === 2) {
            if (Quest['respec']()) {
                scriptBroadcast('quit');
                delay(1000);
            }
        }
        General['initConfig']();
        if (!me['classic'] && Pather['accessToAct'](2)) {
            if (me['normal']) {
                General['hireMerc'](2, 'Prayer');
                if (Pather['accessToAct'](5)) {
                    let sor12 = me['getMerc']();
                    if (sor12 && sor12['charlvl'] < 25 && me['charlvl'] >= 28 && General['validMerc']) {
                        General['hireMerc'](2, 'Prayer', true, 25);
                    }
                }
            }
            if (me['nightmare']) {
                General['hireMerc'](2, 'Holy Freeze');
            }
        }
        return global[sor10](sor2, General['shouldClearPath'](sor10));
    }, this);
}

function den(sor13, sor14) {
    if (Packet['checkQuest'](1, 1)) {
        Packet['entityAction']('akara');
    }
    if (Packet['checkQuest'](1, 0)) {
        if (('BxwRk' !== 'rval1')) {
            return true;
        } else {
            Pather['moveToExit']([2, 1], true, sor14);
        }
    }
    me['overhead']('starting den');
    Town['doChores']();
    Town['goToTown'](1);
    if (!Pather['moveToExit']([2, 8], true, sor14)) {
        return false;
    }
    if ((me['diff'] === 2)) {
        Config['TeleStomp'] = true;
    }
    for (let sor22 = 0; sor22 < 3; sor22 += 1) {
        if (me['area'] == 8) {
            Attack['clearLevel']();
            if (Packet['checkQuest'](1, 1) || Packet['checkQuest'](1, 0)) {
                try {
                    if ('ODYNy' === 'PGkXs') {
                        Quest['talkTo']('akara', 'akara');
                    } else {
                        Town['goToTown']();
                    }
                } catch (sor23) {
                    Pather['moveToExit']([2, 1], true, sor14);
                }
                if ((me['area'] == 1)) {
                    Quest['talkTo']('akara', 'akara');
                }
                Config['TeleStomp'] = false;
                return true;
            }
        }
    }
    Config['TeleStomp'] = false;
    return false;
}

function raven(sor24, sor25) {
    if (Packet['checkQuest'](2, 1)) {
        Quest['talkTo']('kashya', 'kashya');
        Town['initNPC']('Merc', 'getMerc');
    }
    if (!Packet['checkQuest'](2, 0) && sor24) {
        if (('gbodR' !== 'rval2')) {
            return false;
        } else {
            Pather['getWP'](3, sor25);
        }
    }
    if (Packet['checkQuest'](2, 0) && !sor24) {
        return true;
    }
    me['overhead']('starting raven');
    Town['doChores']();
    if (!Pather['checkWP'](3)) {
        Pather['getWP'](3, sor25);
    } else {
        Pather['useWaypoint'](3);
    }
    Pather['moveToExit'](17, true, sor25);
    Pather['moveToPreset'](me['area'], 1, 805, 0, 0, sor25);
    const sor31 = !Packet['checkQuest'](2, 0);
    Attack['clear'](15, 0, getLocaleString(3111));
    Pickit['pickItems']();
    if (sor31) {
        Pather['makePortal'](true);
        if (!Packet['checkQuest'](2, 0)) {
            Quest['talkTo']('kashya', 'kashya');
            Town['initNPC']('Merc', 'getMerc');
        }
    }
    return true;
}

function mausoleum(sor32, sor33) {
    me['overhead']('starting mausoleum');
    Town['doChores']();
    if (!Pather['checkWP'](3)) {
        Pather['getWP'](3, false);
    } else {
        if (('rval3' === 'rval3')) {
            Pather['useWaypoint'](3);
        } else {
            Pather['moveToPreset'](17, 1, 805, 0, 0, false, true);
            Attack['kill'](getLocaleString(3111));
            Pickit['pickItems']();
        }
    }
    if (!Pather['moveToExit'](17, true)) {
        throw new Error('Failed to move to Burial Grounds');
    }
    if (true) {
        if (('rval4' === 'rval4')) {
            Pather['moveToPreset'](17, 1, 805, 0, 0, false, true);
            Attack['kill'](getLocaleString(3111));
            Pickit['pickItems']();
        } else {
            if (!(Pather['moveToExit'](17, true) && Pather['moveToPreset'](17, 5, 6, 5, 0) && Pather['moveToExit'](18, true))) {
                return false;
            }
            Attack['clearLevel'](Config['ClearType']);
        }
    }
    if (!Pather['moveToExit'](19, true)) {
        if (('rval5' !== 'rval6')) {
            return false;
        } else {
            throw new Error('Failed to move to Burial Grounds');
        }
    }
    Attack['clearLevel'](Config['ClearType']);
    if (true) {
        if (!(Pather['moveToExit'](17, true) && Pather['moveToPreset'](17, 5, 6, 5, 0) && Pather['moveToExit'](18, true))) {
            return false;
        }
        Attack['clearLevel'](Config['ClearType']);
    }
    return true;
}

function cave(sor43, sor44) {
    let sor48 = function () {
        switch (me['diff']) {
        case 0:
            return 7;
        case 1:
            return 30;
        default:
            return 1;
        }
    };
    if (me['charlvl'] >= sor48()) {
        return true;
    }
    me['overhead']('starting cave');
    Town['doChores']();
    if (!Pather['checkWP'](3)) {
        Pather['getWP'](3, true);
    } else {
        Pather['useWaypoint'](3);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToExit']([9, 13], true, sor44)) {
        return false;
    }
    if ((me['area'] === 13)) {
        let sor49 = [{
            'x': 7549,
            'y': 12554,
            'radius': 10
        }, {
            'x': 7560,
            'y': 12551,
            'radius': 10
        }, {
            'x': 7573,
            'y': 12550,
            'radius': 10
        }, {
            'x': 7576,
            'y': 12563,
            'radius': 10
        }, {
            'x': 7586,
            'y': 12564,
            'radius': 10
        }, {
            'x': 7596,
            'y': 12567,
            'radius': 10
        }, {
            'x': 7596,
            'y': 12578,
            'radius': 10
        }, {
            'x': 7606,
            'y': 12559,
            'radius': 10
        }, {
            'x': 7612,
            'y': 12549,
            'radius': 10
        }, {
            'x': 7611,
            'y': 12540,
            'radius': 10
        }, {
            'x': 7608,
            'y': 12528,
            'radius': 10
        }, {
            'x': 7595,
            'y': 12529,
            'radius': 10
        }, {
            'x': 7588,
            'y': 12519,
            'radius': 10
        }, {
            'x': 7574,
            'y': 12520,
            'radius': 10
        }, {
            'x': 7564,
            'y': 12523,
            'radius': 10
        }, {
            'x': 7568,
            'y': 12567,
            'radius': 10
        }, {
            'x': 7565,
            'y': 12574,
            'radius': 10
        }, {
            'x': 7560,
            'y': 12583,
            'radius': 10
        }, {
            'x': 7554,
            'y': 12578,
            'radius': 10
        }, {
            'x': 7546,
            'y': 12573,
            'radius': 10
        }, {
            'x': 7537,
            'y': 12573,
            'radius': 10
        }, {
            'x': 7528,
            'y': 12574,
            'radius': 10
        }, {
            'x': 7519,
            'y': 12575,
            'radius': 10
        }, {
            'x': 7510,
            'y': 12566,
            'radius': 10
        }, {
            'x': 7510,
            'y': 12584,
            'radius': 10
        }, {
            'x': 7514,
            'y': 12593,
            'radius': 10
        }, {
            'x': 7521,
            'y': 12595,
            'radius': 10
        }, {
            'x': 7526,
            'y': 12600,
            'radius': 10
        }, {
            'x': 7525,
            'y': 12606,
            'radius': 10
        }, {
            'x': 7535,
            'y': 12596,
            'radius': 10
        }, {
            'x': 7543,
            'y': 12596,
            'radius': 10
        }, {
            'x': 7550,
            'y': 12596,
            'radius': 10
        }, {
            'x': 7557,
            'y': 12595,
            'radius': 10
        }, {
            'x': 7556,
            'y': 12605,
            'radius': 10
        }, {
            'x': 7556,
            'y': 12611,
            'radius': 10
        }, {
            'x': 7566,
            'y': 12608,
            'radius': 10
        }, {
            'x': 7580,
            'y': 12613,
            'radius': 10
        }, {
            'x': 7589,
            'y': 12610,
            'radius': 10
        }, {
            'x': 7594,
            'y': 12601,
            'radius': 10
        }, {
            'x': 7600,
            'y': 12601,
            'radius': 10
        }];
        Attack['clearCoordList'](sor49, 10);
        return true;
    }
    return false;
}

function tree() {
    if (Packet['checkQuest'](4, 4)) {
        return true;
    }
    if (me['getItem'](524) || me['getItem'](525)) {
        return true;
    }
    me['overhead']('starting tree');
    Town['doChores']();
    if (!Pather['checkWP'](5)) {
        if (('rval7' === 'rval7')) {
            Pather['getWP'](5, true);
        } else {
            Pather['getWP'](5, true);
        }
    } else {
        Pather['useWaypoint'](5);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToPreset'](me['area'], 1, 738, 0, 0, true)) {
        if (('rval8' !== 'rval8')) {
            return true;
        } else {
            return false;
        }
    }
    Attack['clear'](20);
    return Quest['getItem'](524, 30);
}

function cain() {
    if (Packet['checkQuest'](4, 1)) {
        Quest['talkTo']('akara', 'akara');
    }
    if (Packet['checkQuest'](4, 0)) {
        return true;
    }
    me['overhead']('starting cain');
    Town['doChores']();
    if (me['getItem'](524)) {
        Quest['talkTo']('akara', 'akara');
    }
    if (!Pather['checkWP'](4)) {
        Pather['getWP'](4, true);
    } else {
        if (('rval9' !== 'rval9')) {
            Quest['talkTo']('akara', 'akara');
        } else {
            Pather['useWaypoint'](4);
        }
    }
    if (!Pather['moveToPreset'](me['area'], 1, 737, 20, 0, true)) {
        return false;
    }
    try {
        Attack['clear'](15, 0, getLocaleString(2872));
    } catch (sor81) {
        Attack['clear'](20);
    }
    if (me['getItem'](525)) {
        if (('rval10' === 'rval10')) {
            let sor82;
            for (let sor83 = 0; sor83 < 5; sor83 += 1) {
                for (let sor84 = 17; (sor84 < 22); sor84 += 1) {
                    if (('rval11' === 'rval11')) {
                        sor82 = getUnit(2, sor84);
                        if (sor82) {
                            if ('rval12' === 'rval12') {
                                Misc['openChest'](sor82);
                                Attack['clear'](10);
                            } else {
                                Quest['talkTo']('akara', 'akara');
                            }
                        }
                    } else {
                        return false;
                    }
                }
            }
        } else {
            let sor85 = [{
                'x': 25166,
                'y': 5108,
                'radius': 10
            }, {
                'x': 25164,
                'y': 5115,
                'radius': 10
            }, {
                'x': 25163,
                'y': 5121,
                'radius': 10
            }, {
                'x': 25158,
                'y': 5126,
                'radius': 10
            }, {
                'x': 25151,
                'y': 5125,
                'radius': 10
            }, {
                'x': 25145,
                'y': 5129,
                'radius': 10
            }, {
                'x': 25142,
                'y': 5135,
                'radius': 10
            }];
            Attack['clearCoordList'](sor85);
            let sor86 = getUnit(2, 26);
            if (sor86 && Misc['openChest'](sor86)) {
                Town['goToTown']();
                if (Packet['checkQuest'](4, 1)) {
                    Quest['talkTo']('akara', 'akara');
                }
            }
        }
    }
    let sor87 = getTickCount();
    while (!Pather['getPortal'](38) && getTickCount() - sor87 < 40000) {
        Attack['clear'](10);
        delay(50);
    }
    if (!Pather['getPortal'](38)) {
        return false;
    }
    for (let sor83 = 0; (sor83 < 10); sor83 += 1) {
        if (('rval13' === 'rval14')) {
            Pather['getWP'](4, true);
        } else {
            if (Pather['usePortal'](38)) {
                if (('rval15' !== 'rval15')) {
                    Quest['talkTo']('akara', 'akara');
                } else {
                    break;
                }
            }
            delay(100);
        }
    }
    if (me['area'] === 38) {
        let sor88 = [{
            'x': 25166,
            'y': 5108,
            'radius': 10
        }, {
            'x': 25164,
            'y': 5115,
            'radius': 10
        }, {
            'x': 25163,
            'y': 5121,
            'radius': 10
        }, {
            'x': 25158,
            'y': 5126,
            'radius': 10
        }, {
            'x': 25151,
            'y': 5125,
            'radius': 10
        }, {
            'x': 25145,
            'y': 5129,
            'radius': 10
        }, {
            'x': 25142,
            'y': 5135,
            'radius': 10
        }];
        Attack['clearCoordList'](sor88);
        let sor89 = getUnit(2, 26);
        if (sor89 && Misc['openChest'](sor89)) {
            Town['goToTown']();
            if (Packet['checkQuest'](4, 1)) {
                Quest['talkTo']('akara', 'akara');
            }
        }
    }
    return Packet['checkQuest'](4, 0);
}

function trist(sor90, sor91) {
    var sor92 = {};
    sor92['lut128'] = function (sor93, sor94) {
        return sor93 >= sor94;
    };
    let sor105 = function () {
        switch (me['diff']) {
        case 0:
            return 15;
        case 1:
            return 37;
        default:
            return 1;
        }
    };
    if (sor92['lut128'](me['charlvl'], sor105())) {
        if ('rval16' !== 'rval16') {
            Attack['clear'](20);
        } else {
            return true;
        }
    }
    me['overhead']('starting trist');
    Town['doChores']();
    if ((me['act'] == 1)) {
        if ('rval17' === 'rval17') {
            if (Pather['getPortal'](38)) {
                Pather['usePortal'](38, me['name']);
            }
        } else {
            switch (me['diff']) {
            case 0:
                return 15;
            case 1:
                return 37;
            default:
                return 1;
            }
        }
    }
    if ((me['area'] != 38)) {
        if (!Pather['checkWP'](4)) {
            Pather['getWP'](4, true);
        } else {
            if (('rval18' === 'rval18')) {
                Pather['useWaypoint'](4);
            } else {
                if (Pather['getPortal'](38)) {
                    Pather['usePortal'](38, me['name']);
                }
            }
        }
        if (!Pather['moveToPreset'](me['area'], 1, 737, 0, 0, sor91)) {
            return false;
        }
        try {
            Attack['clear'](15, 0, getLocaleString(2872));
        } catch (sor106) {
            if (('wOaKI' !== 'rval19')) {
                Attack['clear'](20);
            } else {
                Pather['useWaypoint'](4);
            }
        }
        Pather['usePortal'](38);
    }
    if (me['area'] === 38) {
        if (('Lfrep' !== 'rval20')) {
            let sor107 = [{
                'x': 25176,
                'y': 5128,
                'radius': 20
            }, {
                'x': 25175,
                'y': 5145,
                'radius': 20
            }, {
                'x': 25171,
                'y': 5159,
                'radius': 20
            }, {
                'x': 25166,
                'y': 5178,
                'radius': 20
            }, {
                'x': 25173,
                'y': 5192,
                'radius': 20
            }, {
                'x': 25153,
                'y': 5198,
                'radius': 20
            }, {
                'x': 25136,
                'y': 5189,
                'radius': 20
            }, {
                'x': 25127,
                'y': 5167,
                'radius': 20
            }, {
                'x': 25120,
                'y': 5148,
                'radius': 20
            }, {
                'x': 25101,
                'y': 5136,
                'radius': 20
            }, {
                'x': 25119,
                'y': 5106,
                'radius': 20
            }, {
                'x': 25121,
                'y': 5080,
                'radius': 20
            }, {
                'x': 25119,
                'y': 5061,
                'radius': 20
            }, {
                'x': 4933,
                'y': 4363,
                'radius': 20
            }];
            Attack['clearCoordList'](sor107);
        } else {
            return true;
        }
    }
    return true;
}

function countess(sor108, sor109) {
    let sor118 = function () {
        switch (me['diff']) {
        case 0:
            return 15;
        case 1:
            return 37;
        default:
            return 1;
        }
    };
    if (me['charlvl'] >= sor118() && sor108) {
        return true;
    }
    if (Packet['checkQuest'](5, 0) && !sor108 && (me['diff'] !== 1)) {
        return true;
    }
    me['overhead']('starting countess');
    Town['doChores']();
    if (!Pather['checkWP'](6)) {
        Pather['getWP'](6, sor109);
    } else {
        Pather['useWaypoint'](6);
    }
    Pather['moveToExit']([20, 21, 22, 23, 24, 25], true, sor109);
    Pather['moveToPreset'](me['area'], 2, 580, 0, 0, sor109);
    try {
        if (('rval21' !== 'rval21')) {
            switch (me['diff']) {
            case 0:
                return 15;
            case 1:
                return 37;
            default:
                return 1;
            }
        } else {
            Attack['clear'](20, 0, getLocaleString(2875));
        }
    } catch (sor119) {}
    Pickit['pickItems']();
    return true;
}

function andariel(sor120, sor121) {
    if (Packet['checkQuest'](6, 1)) {
        Quest['talkTo']('warriv', 'warriv');
        Quest['changeAct'](2);
    }
    if (!Pather['accessToAct'](2) && sor120) {
        return false;
    }
    if (Pather['accessToAct'](2) && !sor120) {
        if ('rval22' !== 'bJBqQ') {
            return true;
        } else {
            Pather['moveTo'](22563, 9556);
        }
    }
    me['overhead']('starting andariel');
    Town['doChores']();
    if (!Pather['checkWP'](35)) {
        Pather['getWP'](35, sor121);
    } else {
        if ('rval23' !== 'icsxP') {
            Pather['useWaypoint'](35);
        } else {
            Town['stackPotions'](514);
        }
    }
    Precast['doPrecast'](true);
    Pather['moveToExit']([36, 37], true, sor121);
    if (!sor120) {
        Town['stackPotions'](514);
    }
    if (sor121) {
        let sor129 = [{
            'x': 22592,
            'y': 9640,
            'radius': 20
        }, {
            'x': 22567,
            'y': 9631,
            'radius': 20
        }, {
            'x': 22528,
            'y': 9639,
            'radius': 20
        }, {
            'x': 22566,
            'y': 9587,
            'radius': 20
        }, {
            'x': 22547,
            'y': 9577,
            'radius': 20
        }];
        Attack['clearCoordList'](sor129, 10);
    } else {
        Pather['moveTo'](22563, 9556);
    }
    try {
        if (('rval24' === 'rval24')) {
            Attack['kill'](156);
        } else {
            Pather['getWP'](35, sor121);
        }
    } catch (sor130) {
        if (('oRONo' === 'oRONo')) {
            Attack['clear'](30);
        } else {
            Attack['kill'](156);
        }
    }
    Pickit['pickItems']();
    Town['goToTown']();
    if (!sor120) {
        if (('rval25' === 'rval25')) {
            var sor131 = '2|1|0|4|3'['split']('|'),
                sor132 = 0;
            while (true) {
                switch (sor131[sor132++]) {
                case '0':
                    delay(2000);
                    continue;
                case '1':
                    Quest['changeAct'](2);
                    continue;
                case '2':
                    Quest['talkTo']('warriv', 'warriv');
                    continue;
                case '3':
                    delay(5000);
                    continue;
                case '4':
                    scriptBroadcast('quit');
                    continue;
                }
                break;
            }
        } else {
            return true;
        }
    }
    return Pather['accessToAct'](2);
}

function radament(sor133, sor134) {
    if (Packet['checkQuest'](9, 1)) {
        Town['goToTown'](2);
        Quest['talkTo']('atma', 'atma');
        return true;
    }
    if (Packet['checkQuest'](9, 0)) {
        if (('RUAys' === 'RUAys')) {
            return true;
        } else {
            Town['goToTown']();
        }
    }
    me['overhead']('starting radament');
    Town['doChores']();
    if (!Pather['checkWP'](48)) {
        if (('rval26' !== 'rval27')) {
            Pather['getWP'](48, sor134);
        } else {
            Pather['getWP'](48, sor134);
        }
    } else {
        Pather['useWaypoint'](48);
    }
    if (!Pather['moveToExit'](49, true, sor134)) return false;
    if (!Pather['moveToPreset'](49, 2, 355, 5, 0, sor134)) {
        return false;
    }
    if (!Attack['canAttack'](getUnit(1, 229))) {
        return true;
    }
    try {
        Attack['clear'](15, 0, 229);
    } catch (sor142) {
        Attack['clear'](20);
    }
    Pickit['pickItems']();
    Quest['useItem'](552);
    if (!me['inTown']) {
        Town['goToTown']();
    }
    Quest['talkTo']('atma', 'atma');
    delay((me['ping'] + 1000));
    return Packet['checkQuest'](9, 0);
}

function cube() {
    if (me['getItem'](549)) {
        return true;
    }
    me['overhead']('starting cube');
    Town['doChores']();
    if (!Pather['checkWP'](57)) {
        Pather['getWP'](57, true);
    } else {
        Pather['useWaypoint'](57);
    }
    Pather['moveToExit'](60, true, true);
    Pather['moveToPreset'](me['area'], 2, 354, 0, 0, true);
    Attack['clear'](20);
    Quest['getItem'](549, 354);
    Quest['stashItem'](549);
    return me['getItem'](549);
}

function tunnels() {
    Config['TeleStomp'] = false;
    me['overhead']('starting tunnels');
    Town['doChores']();
    if (!Pather['checkWP'](44)) {
        Pather['getWP'](44);
    } else {
        Pather['useWaypoint'](44);
    }
    Precast['doPrecast'](true);
    if (!Pather['journeyTo'](65, false)) {
        return true;
    }
    Attack['clearLevel']();
    Pather['moveToPreset'](me['area'], 2, 397);
    Misc['openChest'](getUnit(2, 397));
    Pickit['pickItems']();
    return true;
}

function amulet(sor148, sor149) {
    if (Packet['checkQuest'](10, 0) && Packet['checkQuest'](13, 0)) {
        if (('rval28' !== 'rval28')) {
            if (sor149) {
                let sor157 = [{
                    'x': 15041,
                    'y': 14020,
                    'radius': 40
                }, {
                    'x': 15045,
                    'y': 14031,
                    'radius': 40
                }, {
                    'x': 15052,
                    'y': 14033,
                    'radius': 40
                }, {
                    'x': 15061,
                    'y': 14034,
                    'radius': 40
                }, {
                    'x': 15067,
                    'y': 14043,
                    'radius': 40
                }, {
                    'x': 15069,
                    'y': 14053,
                    'radius': 40
                }, {
                    'x': 15068,
                    'y': 14064,
                    'radius': 40
                }, {
                    'x': 15059,
                    'y': 14069,
                    'radius': 40
                }, {
                    'x': 15049,
                    'y': 14071,
                    'radius': 40
                }, {
                    'x': 15051,
                    'y': 14061,
                    'radius': 40
                }, {
                    'x': 15046,
                    'y': 14055,
                    'radius': 40
                }];
                Skill['usePvpRange'] = true;
                Attack['clearCoordList'](sor157);
            }
            if (!Quest['getItem'](521, 149) || !Town['goToTown']()) {
                return false;
            }
            Quest['stashItem'](521);
            Quest['talkTo']('drognan', 'drognan');
        } else {
            return true;
        }
    }
    if (me['getItem'](521) || me['getItem'](91) || Packet['checkQuest'](10, 0)) {
        return true;
    }
    me['overhead']('starting amulet');
    Town['doChores']();
    Pather['teleport'] = !!me['getSkill'](54, 0);
    if (!Pather['checkWP'](44)) {
        if (('rval29' === 'rval30')) {
            let sor158 = [{
                'x': 15041,
                'y': 14020,
                'radius': 40
            }, {
                'x': 15045,
                'y': 14031,
                'radius': 40
            }, {
                'x': 15052,
                'y': 14033,
                'radius': 40
            }, {
                'x': 15061,
                'y': 14034,
                'radius': 40
            }, {
                'x': 15067,
                'y': 14043,
                'radius': 40
            }, {
                'x': 15069,
                'y': 14053,
                'radius': 40
            }, {
                'x': 15068,
                'y': 14064,
                'radius': 40
            }, {
                'x': 15059,
                'y': 14069,
                'radius': 40
            }, {
                'x': 15049,
                'y': 14071,
                'radius': 40
            }, {
                'x': 15051,
                'y': 14061,
                'radius': 40
            }, {
                'x': 15046,
                'y': 14055,
                'radius': 40
            }];
            Skill['usePvpRange'] = true;
            Attack['clearCoordList'](sor158);
        } else {
            Pather['getWP'](44, sor149);
        }
    } else {
        Pather['useWaypoint'](44);
    }
    if (me['area'] === 44) {
        Pather['moveToExit']([45, 58, 61], true, sor149);
        if ((me['area'] === 61)) {
            if (('rval31' !== 'rval32')) {
                if (sor149) {
                    if (('rval33' !== 'rval33')) {
                        Pather['moveToExit']([45, 58, 61], true, sor149);
                        if ((me['area'] === 61)) {
                            if (sor149) {
                                let sor159 = [{
                                    'x': 15041,
                                    'y': 14020,
                                    'radius': 40
                                }, {
                                    'x': 15045,
                                    'y': 14031,
                                    'radius': 40
                                }, {
                                    'x': 15052,
                                    'y': 14033,
                                    'radius': 40
                                }, {
                                    'x': 15061,
                                    'y': 14034,
                                    'radius': 40
                                }, {
                                    'x': 15067,
                                    'y': 14043,
                                    'radius': 40
                                }, {
                                    'x': 15069,
                                    'y': 14053,
                                    'radius': 40
                                }, {
                                    'x': 15068,
                                    'y': 14064,
                                    'radius': 40
                                }, {
                                    'x': 15059,
                                    'y': 14069,
                                    'radius': 40
                                }, {
                                    'x': 15049,
                                    'y': 14071,
                                    'radius': 40
                                }, {
                                    'x': 15051,
                                    'y': 14061,
                                    'radius': 40
                                }, {
                                    'x': 15046,
                                    'y': 14055,
                                    'radius': 40
                                }];
                                Skill['usePvpRange'] = true;
                                Attack['clearCoordList'](sor159);
                            }
                            if (!Quest['getItem'](521, 149) || !Town['goToTown']()) {
                                return false;
                            }
                            Quest['stashItem'](521);
                            Quest['talkTo']('drognan', 'drognan');
                        }
                    } else {
                        let sor160 = [{
                            'x': 15041,
                            'y': 14020,
                            'radius': 40
                        }, {
                            'x': 15045,
                            'y': 14031,
                            'radius': 40
                        }, {
                            'x': 15052,
                            'y': 14033,
                            'radius': 40
                        }, {
                            'x': 15061,
                            'y': 14034,
                            'radius': 40
                        }, {
                            'x': 15067,
                            'y': 14043,
                            'radius': 40
                        }, {
                            'x': 15069,
                            'y': 14053,
                            'radius': 40
                        }, {
                            'x': 15068,
                            'y': 14064,
                            'radius': 40
                        }, {
                            'x': 15059,
                            'y': 14069,
                            'radius': 40
                        }, {
                            'x': 15049,
                            'y': 14071,
                            'radius': 40
                        }, {
                            'x': 15051,
                            'y': 14061,
                            'radius': 40
                        }, {
                            'x': 15046,
                            'y': 14055,
                            'radius': 40
                        }];
                        Skill['usePvpRange'] = true;
                        Attack['clearCoordList'](sor160);
                    }
                }
                if (!Quest['getItem'](521, 149) || !Town['goToTown']()) {
                    return false;
                }
                Quest['stashItem'](521);
                Quest['talkTo']('drognan', 'drognan');
            } else {
                Pather['useWaypoint'](44);
            }
        }
    }
    return me['getItem'](521);
}

function summoner(sor161, sor162) {
    var sor163 = {};
    sor163['lut244'] = function (sor164, sor165) {
        return sor164 === sor165;
    };
    sor163['lut249'] = function (sor178, sor179) {
        return sor178 + sor179;
    };
    if (Packet['checkQuest'](13, 0) && Pather['checkWP'](46) && !sor161) {
        return true;
    }
    if (!Packet['checkQuest'](13, 0) && sor161) {
        return false;
    }
    if (!me['getItem'](521) && !me['getItem'](91)) return false;
    me['overhead']('starting summoner');
    Town['doChores']();
    let sor191 = me['getSkill'](54, 0);
    if (sor191) {
        Pather['teleport'] = true;
    }
    if (!Pather['checkWP'](52)) {
        Pather['getWP'](52, sor162);
    }
    if (!Pather['checkWP'](74)) {
        if (me['area'] != 52) {
            if (('rval34' === 'rval35')) {
                return false;
            } else {
                Pather['useWaypoint'](52);
            }
        }
        Pather['moveTo'](10099, 6722, 3, sor162);
        Pather['moveTo'](10119, 6739, 3, sor162);
        Pather['getWP'](74, sor162);
    } else {
        Pather['useWaypoint'](74);
    }
    if (me['area'] === 74) {
        let sor192 = getPresetUnit(me['area'], 2, 357);
        if (me['normal'] && !Pather['teleport']) {
            if (sor163['lut244'](getPath(me['area'], me['x'], me['y'], sor192['roomx'] * 5 + sor192['x'], sor163['lut249']((sor192['roomy'] * 5), sor192['y']), 0, 10)['length'], 0)) {
                print('Looking for a better telepad layout');
                return false;
            }
        }
        let sor193 = {};
        if (!Pather['teleport']) {
            switch (sor192['roomx'] * 5 + sor192['x']) {
            case 25011:
                sor193 = {};
                sor193['x'] = 25081;
                sor193['y'] = 5446;
                break;
            case 25866:
                sor193 = {};
                sor193['x'] = 25830;
                sor193['y'] = 5447;
                break;
            case 25431:
                switch ((sor192['roomy'] * 5 + sor192['y'])) {
                case 5011:
                    sor193 = {};
                    sor193['x'] = 25449;
                    sor193['y'] = 5081;
                    break;
                case 5861:
                    sor193 = {};
                    sor193['x'] = 25458;
                    sor193['y'] = 5841;
                    break;
                }
                break;
            }
        } else {
            if ('rval36' !== 'rval36') {
                Pather['useWaypoint'](74);
            } else {
                sor193 = sor192;
            }
        }
        Pather['moveToUnit'](sor193, 0, 0, sor162);
        Skill['usePvpRange'] = true;
        try {
            if ('kIDlA' !== 'CRXGw') {
                Attack['kill'](250);
            } else {
                Pather['useWaypoint'](52);
            }
        } catch (sor194) {
            Attack['clear'](20);
        }
        Skill['usePvpRange'] = false;
        Pather['moveToPreset'](me['area'], 2, 357, 0, 0, true);
        Pickit['pickItems']();
        if (!sor161) {
            let sor195 = getUnit(2, 357);
            for (let sor196 = 0; sor196 < 5; sor196 += 1) {
                Pather['moveToUnit'](sor195);
                sor195['interact']();
                delay(2000);
                me['cancel']();
                if (Pather['getPortal'](46)) {
                    if ('rval37' === 'vjEUH') {
                        Pather['getWP'](52, sor162);
                    } else {
                        break;
                    }
                }
            }
            Pather['usePortal'](46);
            if ((me['area'] === 46)) {
                if (('rval38' !== 'rval38')) {
                    return true;
                } else {
                    Pather['getWP'](46, true);
                    Pather['useWaypoint'](40);
                }
            }
        }
    }
    return true;
}

function tomb() {
    if ((me['charlvl'] >= 24)) {
        return true;
    }
    me['overhead']('starting tomb');
    Town['doChores']();
    let sor218 = [66, 67, 68, 69, 70, 71, 72];
    sor218['some'](function (sor219) {
        if (!me['inTown']) {
            Town['doChores']();
        }
        Pather['teleport'] = (me['gold'] > 40000) && (me['charlvl'] >= 18);
        if (!Config['OpenChests'] && (me['charlvl'] >= 19)) {
            Config['OpenChests'] = true;
            Misc['updateConfig']();
        }
        Pather['useWaypoint'](46);
        Pather['moveToExit'](sor219, true, true);
        if ((me['area'] == sor219)) {
            for (let sor220 = 0; (sor220 < 6); sor220 += 1) {
                try {
                    let sor221 = getPresetUnit(me['area'], 2, 397);
                    let sor222 = getPresetUnit(me['area'], 2, 152);
                    if (sor221) {
                        if (Pather['moveToPreset'](me['area'], 2, 397, 0, 0, true)) {
                            break;
                        }
                    } else if (sor222) {
                        if (Pather['moveToPreset'](me['area'], 2, 152, 0, 0, true)) {
                            break;
                        }
                    }
                } catch (sor223) {}
            }
            Attack['clear'](50);
            Pickit['pickItems']();
            Town['doChores']();
        }
        return (me['charlvl'] >= 24);
    });
    return (me['charlvl'] >= 24);
}

function shaft(sor224, sor225) {
    if (Packet['checkQuest'](10, 0) || me['getItem'](92) || me['getItem'](91)) {
        if (('rval39' !== 'rval39')) {
            Quest['stashItem'](521);
        } else {
            return true;
        }
    }
    me['overhead']('starting shaft');
    Town['doChores']();
    Pather['teleport'] = !!me['getSkill'](54, 0);
    if (!Pather['checkWP'](43)) {
        Pather['getWP'](43, sor225);
    } else {
        if ('RlECA' === 'rval40') {
            Pather['useWaypoint'](43);
        } else {
            Pather['useWaypoint'](43);
        }
    }
    Pather['moveToExit']([62, 63, 64], true, sor225);
    if ((me['area'] === 64)) {
        Pather['moveToPreset'](me['area'], 2, 356, 0, 0, sor225);
        if (Quest['getItem'](92, 356)) {
            Quest['stashItem'](521);
        }
    }
    return me['getItem'](92);
}

function duriel(sor231, sor232) {
    var sor233 = {};
    sor233['lut315'] = function (sor240, sor241) {
        return sor240 <= sor241;
    };
    sor233['lut319'] = function (sor247, sor248) {
        return sor247 + sor248;
    };
    sor233['lut323'] = function (sor255, sor256) {
        return sor255 < sor256;
    };
    sor233['lut324'] = function (sor257, sor258) {
        return sor257 - sor258;
    };
    sor233['lut326'] = function (sor261, sor262) {
        return sor261 < sor262;
    };
    sor233['lut342'] = function (sor273, sor274) {
        return sor273 > sor274;
    };
    sor233['lut348'] = function (sor280, sor281) {
        return sor280 < sor281;
    };
    let sor306 = function () {
        var sor307, sor308;
        for (sor307 = 0; (sor307 < 3); sor307 += 1) {
            sor308 = getUnit(1, 211);
            if (sor308) {
                if (('rval41' !== 'rval42')) {
                    break;
                } else {
                    throw new Error('Failed to move to duriels tomb');
                }
            }
            delay(500);
        }
        if (!sor308) {
            throw new Error('Duriel not found.');
        }
        for (sor307 = 0; (sor307 < 900); sor307 += 1) {
            Misc['townCheck']();
            ClassAttack['doCast'](sor308, Config['AttackSkill'][1], Config['AttackSkill'][2]);
            if (sor308['dead']) {
                return true;
            }
            if (sor233['lut315'](getDistance(me, sor308), 10)) {
                if (('rval43' === 'rval43')) {
                    Pather['moveTo'](22638, me['y'] < sor308['y'] ? 15722 : 15693);
                } else {
                    if (me['act'] !== 2) Town['goToTown'](2);
                    Quest['talkTo']('meshif', 'meshif');
                    return Quest['changeAct'](3);
                }
            }
        }
        return sor308['dead'];
    };
    if (Packet['checkQuest'](14, 0) && !Pather['accessToAct'](3)) {
        if ((me['act'] !== 2)) Town['goToTown'](2);
        Quest['talkTo']('meshif', 'meshif');
        return Quest['changeAct'](3);
    }
    if (!Packet['checkQuest'](14, 0) && sor231) {
        if (('rval44' === 'rval44')) {
            return false;
        } else {
            if (me['act'] !== 2) Town['goToTown'](2);
            Quest['talkTo']('jerhyn', 'jerhyn');
        }
    }
    if (Packet['checkQuest'](14, 0) && !sor231) {
        return true;
    }
    me['overhead']('starting duriel');
    Town['doChores']();
    if (!Packet['checkQuest'](10, 0) && !me['getItem'](91)) {
        if ('rval45' !== 'rval45') {
            Pather['moveTo'](22638, me['y'] < target['y'] ? 15722 : 15693);
        } else {
            if (!Quest['transmuteItems'](91, 92, 521)) {
                return false;
            }
        }
    }
    if (Packet['checkQuest'](14, 3)) {
        if (('rval46' === 'rval47')) {
            Pather['usePortal'](null);
            delay(sor233['lut319'](100, (me['ping'] * 2)));
        } else {
            if ((me['act'] !== 2)) Town['goToTown'](2);
            Quest['talkTo']('jerhyn', 'jerhyn');
        }
    }
    if (Packet['checkQuest'](14, 4)) {
        if ('rval48' === 'rval49') {
            delay(500);
        } else {
            if ((me['act'] !== 2)) Town['goToTown'](2);
            Quest['talkTo']('meshif', 'meshif');
            return Quest['changeAct'](3);
        }
    }
    if (me['charlvl'] < 18) {
        if (('rval50' !== 'rval50')) {
            if (!Quest['transmuteItems'](91, 92, 521)) {
                return false;
            }
        } else {
            return true;
        }
    }
    Pather['useWaypoint'](46);
    Pather['teleport'] = (me['gold'] > 50000) && me['charlvl'] >= 18;
    let sor309 = getRoom()['correcttomb'];
    if (!Pather['moveToExit'](sor309, true, sor232)) {
        throw new Error('Failed to move to duriels tomb');
    }
    if ((me['area'] === sor309)) {
        Pather['moveToPreset'](me['area'], 2, 152, 0, 0, sor232);
        if (!sor231) {
            Attack['clear'](20);
            Pather['moveToPreset'](me['area'], 2, 152);
            if (Quest['insertStaff']()) {
                if (('rval51' === 'rval51')) {
                    if (!getUnit(2, 100)) {
                        if (Town['goToTown']()) {
                            if ('rval52' !== 'rval52') {
                                return false;
                            } else {
                                let sor310 = getTickCount();
                                Town['doChores']();
                                Town['stackPotions'](517);
                                while (sor233['lut348'](sor233['lut324'](getTickCount(), sor310), 15000)) {
                                    delay(500);
                                }
                            }
                        }
                    }
                } else {
                    if (!getUnit(2, 100)) {
                        if (Town['goToTown']()) {
                            let sor311 = getTickCount();
                            Town['doChores']();
                            Town['stackPotions'](517);
                            while (sor233['lut323'](sor233['lut324'](getTickCount(), sor311), 15000)) {
                                delay(500);
                            }
                        }
                    }
                }
            }
        }
        if ((me['area'] != sor309)) {
            if (('rval53' === 'rval53')) {
                Pather['usePortal'](sor309, me['name']);
            } else {
                Attack['clear'](10);
                Pather['useUnit'](2, 100, 73);
            }
        }
        for (let sor312 = 0; sor312 < 20; sor312 += 1) {
            if (getUnit(2, 100)) {
                break;
            }
            delay(200);
        }
        let sor313 = getUnit(2, 100);
        if (sor313) {
            if (('rval54' === 'rval54')) {
                for (let sor312 = 0; sor312 < 5; sor312 += 1) {
                    if ('rval55' !== 'rval56') {
                        if ((me['area'] == sor313['area'])) {
                            if (('rval57' === 'rval57')) {
                                Skill['cast'](43, 0, sor313);
                            } else {
                                if (Town['goToTown']()) {
                                    let sor314 = getTickCount();
                                    Town['doChores']();
                                    Town['stackPotions'](517);
                                    while (sor233['lut326'](getTickCount() - sor314, 15000)) {
                                        delay(500);
                                    }
                                }
                            }
                        }
                        if (me['area'] === 73) {
                            break;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return true;
            }
        }
        if (me['area'] !== 73 && !Pather['useUnit'](2, 100, 73)) {
            Attack['clear'](10);
            Pather['useUnit'](2, 100, 73);
        }
        if (me['area'] === 73) {
            if (('rval58' !== 'uhoUv')) {
                Pather['teleport'] = true;
                if (!sor231) {
                    if (('BLnuf' === 'BLnuf')) {
                        Config['Dodge'] = true;
                        Config['DodgeRange'] = 15;
                        Config['DodgeHP'] = 100;
                        sor306();
                        Pickit['pickItems']();
                        Pather['teleport'] = false;
                        Pather['moveTo'](22609, 15706);
                        Pather['moveTo'](22579, 15706);
                        Pather['moveTo'](22577, 15649);
                        sor315: for (let sor312 = 0; sor312 < 3; sor312 += 1) {
                            let sor316 = getUnit(1, getLocaleString(1013));
                            if (sor316) {
                                for (let sor317 = 0; sor317 < 5; sor317 += 1) {
                                    if (sor233['lut342'](getDistance(me, sor316), 3)) {
                                        Pather['moveToUnit'](sor316);
                                    }
                                    sor316['interact']();
                                    delay((1000 + me['ping']));
                                    me['cancel']();
                                    if (Pather['getPortal'](null)) {
                                        if (('NlNlA' === 'NlNlA')) {
                                            break sor315;
                                        } else {
                                            throw new Error('Duriel not found.');
                                        }
                                    }
                                }
                                break;
                            }
                            delay(500);
                        }
                        if ((me['area'] === 73) && Pather['getPortal'](null)) {
                            Pather['usePortal'](null);
                            delay(sor233['lut319'](100, (me['ping'] * 2)));
                        }
                        delay(1000);
                        if (me['inTown']) {
                            if (!Quest['talkTo']('jerhyn', 'palace')) throw new Error('failed to talk to jerhyn');
                            if (!Quest['talkTo']('meshif', 'meshif')) throw new Error('failed to talk to meshif');
                            if (!Quest['changeAct'](3)) {
                                throw new Error('failed to move to act 3');
                            }
                        }
                    } else {
                        throw new Error('failed to move to act 3');
                    }
                } else {
                    sor306();
                    Pickit['pickItems']();
                }
            } else {
                return true;
            }
        }
    }
    return Pather['accessToAct'](3);
}

function lamessen() {
    return true;
    if (Packet['checkQuest'](17, 0)) {
        return true;
    }
    me['overhead']('starting lamessen');
    Town['doChores']();
    if (me['area'] != 75) {
        Town['goToTown'](3);
    }
    Quest['talkTo']('alkor', 'alkor');
    return true;
}

function eye(sor319, sor320) {
    if (me['getItem'](553) || me['getItem'](174) || Packet['checkQuest'](18, 0)) {
        return true;
    }
    me['overhead']('starting eye');
    Town['doChores']();
    Pather['journeyTo'](85, sor320);
    Pather['moveToPreset'](85, 2, 407, 0, 0, sor320);
    if (Quest['getItem'](553, 407)) {
        Quest['stashItem'](553);
    }
    if (me['getItem'](553)) return true;
    return false;
}

function brain(sor322, sor323) {
    if (me['getItem'](555) || me['getItem'](174) || me['getQuest'](18, 0)) {
        return true;
    }
    me['overhead']('starting brain');
    Town['doChores']();
    if (!Pather['checkWP'](78)) {
        Pather['getWP'](78, sor323);
    } else {
        Pather['useWaypoint'](78);
    }
    Pather['moveToExit'](88, true, sor323);
    Pather['journeyTo'](91);
    Pather['moveToPreset'](me['area'], 2, 406);
    if (Quest['getItem'](555, 406)) {
        Quest['stashItem'](555);
    }
    if (me['getItem'](555)) return true;
    return false;
}

function heart(sor325, sor326) {
    if (me['getItem'](554) || me['getItem'](174) || me['getQuest'](18, 0)) {
        return true;
    }
    me['overhead']('starting heart');
    Town['doChores']();
    if (!Pather['checkWP'](80)) {
        Pather['getWP'](80, sor326);
    } else {
        Pather['useWaypoint'](80);
    }
    Pather['journeyTo'](93, sor326);
    Pather['moveToPreset'](me['area'], 2, 405, 0, 0, false);
    if (Quest['getItem'](554, 405)) {
        Quest['stashItem'](554);
    }
    return me['getItem'](554);
}

function travincal() {
    if (Packet['checkQuest'](18, 0)) {
        return true;
    }
    me['overhead']('starting travincal');
    Town['doChores']();
    if (!me['getItem'](174) && !me['getItem'](173)) {
        if (!Pather['checkWP'](83)) {
            Pather['getWP'](83, false);
        } else {
            if (('rval59' === 'rval59')) {
                Pather['useWaypoint'](83);
            } else {
                return false;
            }
        }
        let sor340 = {};
        sor340['x'] = (me.x + 76);
        sor340['y'] = (me.y - 67);
        Pather['moveToUnit'](sor340);
        if (me['hell'] && !me['classic']) {
            let sor341 = getUnit(1, 'Ismail Vilehand');
            if (sor341 && !Attack['canAttack'](sor341)) {
                if (('rval60' !== 'uWuDv')) {
                    return false;
                } else {
                    Attack['clear'](30);
                }
            }
            Config['UseMerc'] = false;
            Attack['kill'](sor341);
        } else {
            if (('rval61' !== 'GoaWq')) {
                Attack['clear'](30);
            } else {
                Pather['getWP'](83, false);
            }
        }
        Pickit['pickItems']();
        Pather['moveToUnit'](sor340);
        Pickit['pickItems']();
    }
    if (!Quest['transmuteItems'](174, 553, 554, 555, 173) || !Quest['smashCompellingOrb']()) {
        return false;
    }
    if (!me['inTown']) {
        Town['goToTown']();
    }
    Quest['talkTo']('cain', 'cain');
    return Packet['checkQuest'](18, 0, 2000);
}

function mephisto(sor342) {
    var sor343 = {};
    sor343['lut489'] = function (sor349, sor350) {
        return sor349 * sor350;
    };
    sor343['lut493'] = function (sor357, sor358) {
        return sor357 / sor358;
    };
    sor343['lut494'] = function (sor359, sor360) {
        return sor359 + sor360;
    };
    sor343['lut495'] = function (sor361, sor362) {
        return sor361 * sor362;
    };
    sor343['lut500'] = function (sor369, sor370) {
        return sor369 < sor370;
    };
    sor343['lut509'] = function (sor385, sor386) {
        return sor385 < sor386;
    };
    sor343['lut514'] = function (sor394, sor395) {
        return sor394 !== sor395;
    };
    if (!Pather['accessToAct'](4) && sor342) {
        return false;
    }
    if (Pather['accessToAct'](4) && !sor342) {
        return true;
    }
    let sor402 = function () {
        var sor403, sor404, sor405, sor406 = {},
            sor407 = 0,
            sor408 = getUnit(1, 242);
        if (!sor408) {
            if ('rval62' !== 'rval62') {
                return true;
            } else {
                throw new Error('Mephisto not found!');
            }
        }
        while ((sor407 < 300) && Attack['checkMonster'](sor408)) {
            if (sor408['mode'] === 5) {
                sor404 = Math['round'](sor343['lut489'](Math['atan2']((me['y'] - sor408['y']), (me['x'] - sor408['x'])), 180) / Math['PI']);
                sor405 = (me['y'] > sor408['y']) ? [-30, -60, -90] : [30, 60, 90];
                for (sor403 = 0; sor403 < sor405['length']; sor403 += 1) {
                    sor406['dist'] = 18;
                    sor406['x'] = Math['round'](sor343['lut489'](Math['cos'](sor343['lut493']((sor404 + sor405[sor403]) * Math['PI'], 180)), sor406['dist']) + sor408['x']);
                    sor406['y'] = Math['round'](sor343['lut494'](sor343['lut495'](Math['sin'](sor343['lut493'](sor343['lut495'](sor404 + sor405[sor403], Math['PI']), 180)), sor406['dist']), sor408['y']));
                    if (Attack['validSpot'](sor406['x'], sor406['y'])) {
                        if ('HEdhZ' === 'Gzxsv') {
                            Attack['kill'](242);
                        } else {
                            me['overhead']('move, bitch!');
                            Pather['moveTo'](sor406['x'], sor406['y']);
                            break;
                        }
                    }
                }
            }
            if (ClassAttack['doAttack'](sor408) < 2) {
                break;
            }
            sor407 += 1;
        }
        return (sor408['mode'] === 0) || (sor408['mode'] === 12);
    };
    let sor409 = function () {
        let sor410 = getUnit(1);
        if (sor410) {
            do {
                if (!sor410['getParent'] && (sor410['classid'] != 242) && sor343['lut500'](getDistance(me, sor410), 15)) {
                    return sor410;
                }
            } while (sor410['getNext']());
        }
        return false;
    };
    let sor411 = function () {
        Pather['teleport'] = false;
        delay(350);
        Pather['moveTo'](17567, 8070);
        let sor412 = getUnit(1, 242);
        if (!sor412) {
            throw new Error('Mephisto not found.');
        }
        delay(350);
        Pather['moveTo'](17577, 8074);
        delay(550);
        Pather['moveTo'](17584, 8080);
        delay(550);
        Pather['moveTo'](17588, 8089);
        delay(550);
        Pather['teleport'] = true;
        Pather['moveTo'](17600, 8089);
        delay(500);
        Pather['moveTo'](17610, 8094);
        Attack['clear'](10);
        delay(500);
        Pather['moveTo'](17610, 8094);
        let sor413 = getDistance(me, sor412);
        let sor414 = 0;
        while (sor413 > 35) {
            sor414 += 1;
            Pather['moveTo'](17600, 8095);
            delay(150);
            Pather['moveTo'](17584, 8091);
            delay(150);
            Pather['moveTo'](17575, 8086);
            delay(150);
            Pather['moveTo'](17563, 8072);
            delay(350);
            Pather['moveTo'](17575, 8086);
            delay(350);
            Pather['moveTo'](17584, 8091);
            delay(1200);
            Pather['moveTo'](17600, 8095);
            delay(550);
            Pather['moveTo'](17610, 8094);
            delay(2500);
            Attack['clear'](10);
            Pather['moveTo'](17610, 8094);
            sor413 = getDistance(me, sor412);
            if ((sor414 >= 5)) {
                if ('rval63' !== 'rval63') {
                    throw new Error('Mephisto not found!');
                } else {
                    return false;
                }
            }
        }
        return true;
    };
    let sor415 = function () {
        let sor416;
        let sor417 = 0;
        let sor418 = 0;
        let sor419 = getUnit(1, 242);
        Config['UseMerc'] = false;
        Skill['usePvpRange'] = true;
        let sor420 = Config['AttackSkill'][2];
        Config['AttackSkill'][2] = -1;
        while ((sor418 < 300) && Attack['checkMonster'](sor419) && Attack['skipCheck'](sor419)) {
            Misc['townCheck']();
            if (!sor419 || !copyUnit(sor419)['x']) {
                sor419 = getUnit(1, 242);
                if (!sor419) {
                    break;
                }
            }
            sor416 = sor409();
            if (sor416) {
                if (me['hell'] && !Attack['canAttack'](sor416) && !me['classic']) {
                    return false;
                }
            }
            Attack['clear'](15);
            if (getDistance(me, 17610, 8094) > 5) {
                Pather['moveTo'](17610, 8094);
                sor417 += 1;
            }
            if (sor418 > 0 && (sor418 % 15) === 0 && sor343['lut509'](Skill['getRange'](Config['AttackSkill'][1]), 4)) {
                if ('ZTOOw' === 'PbgOW') {
                    return monster;
                } else {
                    Packet['flash'](me['gid']);
                }
            }
            if ((sor417 > 3)) {
                break;
            }
            if (!ClassAttack['doAttack'](sor419, sor418 % 15 === 0)) {
                break;
            }
            sor418 += 1;
        }
        Skill['usePvpRange'] = false;
        Config['AttackSkill'][2] = sor420;
        ClassAttack['afterAttack']();
        Config['UseMerc'] = true;
        if (!sor419 || !copyUnit(sor419)['x']) {
            return true;
        }
        return sor419['hp'] > 0 && (sor419['mode'] !== 0) && sor419['mode'] !== 12;
    };
    me['overhead']('starting mephisto');
    Town['doChores']();
    if (!Pather['checkWP'](101)) {
        Pather['getWP'](101, false);
    } else {
        Pather['useWaypoint'](101);
    }
    Precast['doPrecast']();
    Pather['moveToExit'](102, true);
    Config['OpenChests'] = false;
    Pather['moveTo'](17566, 8069);
    delay(350);
    Config['UseMerc'] = false;
    Misc['updateConfig']();
    if ((me['charlvl'] >= 80) || (!sor411() || !sor415())) {
        Attack['kill'](242);
    }
    Pickit['pickItems']();
    Pather['moveTo'](17590, 8068);
    let sor421 = getTickCount(),
        sor422 = 0;
    while (sor343['lut514'](getCollision(me['area'], 17601, 8070, 17590, 8068), 0) && (sor422 = getTickCount() - sor421) < 2000) {
        Pather['moveTo'](17590, 8068);
        delay(3);
    }
    if (sor422 < 2000 && Pather['moveTo'](17601, 8070)) {
        Pather['usePortal'](null);
    }
    Config['OpenChests'] = true;
    Config['UseMerc'] = true;
    Misc['updateConfig']();
    if (me['act'] == 4) {
        return true;
    }
    return false;
}

function izual(sor423, sor424) {
    var sor425 = {};
    sor425['lut557'] = function (sor426, sor427) {
        return sor426 > sor427;
    };
    sor425['lut558'] = function (sor428, sor429) {
        return sor428 === sor429;
    };
    sor425['lut560'] = function (sor432, sor433) {
        return sor432 < sor433;
    };
    if (Packet['checkQuest'](25, 1)) {
        if (Town['goToTown'](4)) {
            Quest['talkTo']('tyrael', 'tyrael');
        }
    }
    if (!Packet['checkQuest'](25, 0) && (sor423 || (me['lightningResist'] < 75) && (me['charlvl'] < 80 && me['hell']))) {
        return false;
    }
    if (Packet['checkQuest'](25, 0) && !sor423) {
        if ('rval65' === 'rval66') {
            Pather['useWaypoint'](106);
        } else {
            return true;
        }
    }
    let sor449 = function () {
        let sor450 = 0;
        let sor451 = getUnit(1, 256);
        while (sor450 < 600 && Attack['checkMonster'](sor451) && Attack['skipCheck'](sor451)) {
            Misc['townCheck']();
            if (!sor451 || !copyUnit(sor451)['x']) {
                break;
            }
            if ((sor450 > 0) && sor425['lut558']((sor450 % 15), 0) && sor425['lut560'](Skill['getRange'](Config['AttackSkill'][1]), 4)) {
                Packet['flash'](me['gid']);
            }
            if (!ClassAttack['doAttack'](sor451, (sor450 % 15) === 0)) {
                break;
            }
            if (sor425['lut557'](Attack['getMonsterCount'](me['x'], me['y'], 15, Attack['buildMonsterList']()), 1)) {
                me['overhead']('clearing!');
                Attack['clear'](15);
            }
            sor450 += 1;
        }
        ClassAttack['afterAttack']();
        if (!sor451 || !copyUnit(sor451)['x']) {
            return true;
        }
        if ((sor451['hp'] > 0) && (sor451['mode'] !== 0) && sor451['mode'] !== 12) {
            if (('rval64' !== 'rval64')) {
                me['overhead']('clearing!');
                Attack['clear'](15);
            } else {
                throw new Error(('Failed to kill ' + sor451['name']));
            }
        }
        return true;
    };
    me['overhead']('starting izual');
    Town['doChores']();
    if (sor424 && me['normal']) {
        Pather['teleport'] = false;
    }
    if (!Pather['checkWP'](106)) {
        if (('rval67' === 'rval68')) {
            Pather['teleport'] = false;
        } else {
            Pather['getWP'](106, sor424);
        }
    } else {
        Pather['useWaypoint'](106);
    }
    Pather['moveToPreset'](105, 1, 256, 20, 0, sor424);
    if (!me['hell']) {
        Attack['deploy'](getUnit(1, 256), 35, 5, 9);
        Attack['clear'](30);
        Pather['moveToPreset'](105, 1, 256, 20, 0, sor424);
    }
    try {
        Attack['kill'](256);
    } catch (sor452) {}
    Pickit['pickItems']();
    if (!Packet['checkQuest'](25, 0)) {
        if (('rval69' !== 'rval70')) {
            Town['goToTown']();
            Quest['talkTo']('tyrael', 'tyrael');
        } else {
            return true;
        }
    }
    return true;
}

function Sorc() {
    var sor453 = {};
    sor453['lut622'] = function (sor469, sor470) {
        return sor469 > sor470;
    };
    sor453['lut625'] = function (sor475, sor476) {
        return sor475 + sor476;
    };
    include('sorc/build/addRunewords.js');
    var sor494 = {};
    sor494['line'] = 1;
    sor494['file'] = 'General.js';
    sor494['string'] = '';
    for (let sor495 = 0; Config['AutoEquip'] && (sor495 < addRunewords['length']); sor495++) {
        if (me['diff'] !== 2 || !Config['MakeRunewords']) continue;
        if (sor453['lut622'](Item['getEquippedItem'](addRunewords[sor495]['slot'])['tier'], addRunewords[sor495]['tier'])) continue;
        sor494['string'] = addRunewords[sor495]['pickit'];
        stringArray['push'](sor494);
        NTIP_CheckList['push'](NTIP['ParseLineInt'](sor494['string'], sor494));
        NTIP_CheckListNoTier['push'](NTIP['ParseLineInt'](sor494['string'], sor494));
        for (let sor496 = 0; sor496 < addRunewords[sor495]['make']['length']; sor496++) {
            Config['Runewords']['push'](addRunewords[sor495]['make'][sor496]);
        }
        for (let sor497 = 0; (sor497 < addRunewords[sor495]['keep']['length']); sor497++) {
            Config['KeepRunewords']['push'](addRunewords[sor495]['keep'][sor497]);
        }
        print(sor453['lut625'](('Added ' + addRunewords[sor495]['name']), ' to runewords'));
    }
    while (me['getStat'](5)) {
        delay(1000);
    }
    if ((me['gold'] < 5000) && (me['charlvl'] > 10)) {
        D2Bot['printToConsole']('Out of gold');
    }
    Runewords['init']();
    Runewords['buildLists']();
    var sor498 = me['findItem'](375, -1, 1, 7);
    if (sor498 && (sor498['itemcount'] < 2)) {
        Misc['socketItems'](sor498, [586, 586]);
    }
    if (!Storage['Stash']['CanFit']({
            'sizex': 2,
            'sizey': 4,
            'gid': 666666
        })) {
        Town['clearStash']();
        Storage['Stash']['SortItems']();
    }
    if (General['timeToFarm']()) {
        if (('rval76' === 'rval76')) {
            print('Time to farm');
            runSequence(Sequences['magicfind'][me['gametype']][me['diff']], true);
        } else {
            Misc['socketItems'](sor498, [586, 586]);
        }
    }
    return runSequence(Sequences['quest'][me['gametype']][me['diff']]);
}

function vizier() {
    var sor499 = {};
    sor499['lut674'] = function (sor503, sor504) {
        return sor503 < sor504;
    };
    sor499['lut677'] = function (sor509, sor510) {
        return sor509 - sor510;
    };
    sor499['lut686'] = function (sor518, sor519) {
        return sor518 < sor519;
    };
    sor499['lut700'] = function (sor535, sor536) {
        return sor535 < sor536;
    };
    if (!Pather['accessToAct'](4)) {
        if ('rval82' === 'rval82') {
            return true;
        } else {
            if (getDistance(me, sor540) < 5) {
                Skill['cast'](44, 0);
            }
            ClassAttack['doAttack'](sor540);
        }
    }
    if (me['hell'] && (me['charlvl'] < 70) && me['fireResist'] < 85) {
        return true;
    }
    let sor541 = function (sor542) {
        let sor544;
        let sor545;
        for (let sor546 = 0; (sor546 < 5); sor546 += 1) {
            Pather['moveToPreset'](108, 2, sor542, sor542 === 394 ? 5 : 2, sor542 === 394 ? 5 : 0);
            if (sor546 > 3) {
                Attack['clear'](10);
            }
            sor544 = getUnit(2, sor542);
            sor545 = getTickCount();
            while (sor499['lut674'](sor499['lut677'](getTickCount(), sor545), 5000)) {
                if (('MBYSe' === 'rval77')) {
                    return true;
                } else {
                    if (sor544) {
                        break;
                    }
                    delay(50);
                }
            }
            if (!sor544) {
                if ('rval78' !== 'rval79') {
                    throw new Error(('Failed to open seal: ' + sor542));
                } else {
                    Skill['cast'](44, 0);
                }
            }
            sor545 = getTickCount();
            while (sor499['lut686'](getTickCount() - sor545, 1000)) {
                if (('rval80' !== 'rval81')) {
                    sendPacket(1, 19, 4, 2, 4, sor544['gid']);
                    if (sor544['mode']) {
                        return true;
                    }
                    delay(50);
                } else {
                    Attack['kill']('Grand Vizier of Chaos');
                }
            }
        }
        return false;
    };
    me['overhead']('starting vizier');
    Town['doChores']();
    if (!Pather['checkWP'](107)) {
        if (('ixLgR' !== 'ENWuS')) {
            Pather['getWP'](107);
        } else {
            return true;
        }
    } else {
        if (('rval83' !== 'rval83')) {
            Skill['cast'](Config['AttackSkill'][1], 0);
        } else {
            Pather['useWaypoint'](107);
        }
    }
    Precast['doPrecast'](true);
    if (!sor541(396)) {
        return true;
    }
    let sor547 = getTickCount();
    let sor540;
    let sor548;
    while (sor499['lut686'](getTickCount() - sor547, 5000)) {
        if (('rval84' === 'YumBp')) {
            return true;
        } else {
            sor548 = getUnit(1, 'Grand Vizier of Chaos');
            if (sor548) {
                break;
            }
            sor540 = Attack['getNearestMonster']();
            if (sor540) {
                if ('rval85' !== 'rval85') {
                    Attack['clear'](10);
                } else {
                    if (sor499['lut700'](getDistance(me, sor540), 5)) {
                        Skill['cast'](44, 0);
                    }
                    ClassAttack['doAttack'](sor540);
                }
            } else {
                Skill['cast'](Config['AttackSkill'][1], 0);
            }
            delay(50);
        }
    }
    try {
        if (('rval86' === 'rval86')) {
            Attack['kill']('Grand Vizier of Chaos');
        } else {
            return true;
        }
    } catch (sor549) {}
    Pickit['pickItems']();
    return true;
}

function diablo(sor550) {
    var sor551 = {};
    sor551['lut748'] = function (sor552, sor553) {
        return sor552 + sor553;
    };
    sor551['lut749'] = function (sor554, sor555) {
        return sor554 === sor555;
    };
    sor551['lut750'] = function (sor556, sor557) {
        return sor556 * sor557;
    };
    sor551['lut756'] = function (sor562, sor563) {
        return sor562 == sor563;
    };
    sor551['lut758'] = function (sor567, sor568) {
        return sor567 < sor568;
    };
    sor551['lut761'] = function (sor573, sor574) {
        return sor573 - sor574;
    };
    sor551['lut764'] = function (sor578, sor579) {
        return sor578 == sor579;
    };
    sor551['lut769'] = function (sor583, sor584) {
        return sor583 >= sor584;
    };
    sor551['lut772'] = function (sor587, sor588) {
        return sor587 > sor588;
    };
    sor551['lut778'] = function (sor591, sor592) {
        return sor591 == sor592;
    };
    sor551['lut786'] = function (sor606, sor607) {
        return sor606 == sor607;
    };
    sor551['lut787'] = function (sor608, sor609) {
        return sor608 / sor609;
    };
    sor551['lut788'] = function (sor610, sor611) {
        return sor610 / sor611;
    };
    sor551['lut791'] = function (sor618, sor619) {
        return sor618 <= sor619;
    };
    sor551['lut795'] = function (sor625, sor626) {
        return sor625 < sor626;
    };
    sor551['lut799'] = function (sor634, sor635) {
        return sor634 < sor635;
    };
    sor551['lut805'] = function (sor643, sor644) {
        return sor643 < sor644;
    };
    if (me['diff'] !== 2 && General['goToNextDifficulty']()) {
        Account['update']('difficulty', Misc['difficultyString'][me['diff'] + 1]);
        return false;
    }
    if (!Packet['checkQuest'](26, 0) && sor550) {
        if ('pAddR' !== 'rval93') {
            return false;
        } else {
            let sor649 = getPresetUnit(108, 2, seal);
            if (!seal) {
                throw new Error('Seal preset not found');
            }
            if ((sor649['roomy'] * 5 + sor649['y']) === value || sor551['lut749']((sor649['roomx'] * 5) + sor649['x'], value)) {
                return 1;
            }
            return 2;
        }
    }
    if (Packet['checkQuest'](26, 0) && !sor550) {
        return true;
    }
    if ((me['diff'] === 2)) {
        if ((me['gold'] < 500000)) return false;
        if (me['charlvl'] < 84) return false;
        if (sor551['lut805'](Misc['mercPower'](), 60000)) return false;
    }
    Config['ScanShrines'] = [];
    const sor650 = ['Grand Vizier of Chaos', 'Infector of Souls', 'Lord De Seis'];
    let sor651 = function (sor652, sor653) {
        let sor654 = getPresetUnit(108, 2, sor652);
        if (!sor652) {
            throw new Error('Seal preset not found');
        }
        if (sor551['lut748']((sor654['roomy'] * 5), sor654['y']) === sor653 || (sor654['roomx'] * 5 + sor654['x'] === sor653)) {
            if (('rval87' === 'ZtFgn')) {
                return 1;
            } else {
                return 1;
            }
        }
        return 2;
    };
    let sor655 = sor656 => {
        switch (sor656) {
        case 'Grand Vizier of Chaos':
            return [395, 396];
        case 'Lord De Seis':
            return [394];
        case 'Infector of Souls':
            return [393, 392];
        default:
            return false;
        }
    };
    let sor657 = sor658 => {
        switch (sor658) {
        case 'Grand Vizier of Chaos':
            if (sor651(396, 5275) == 1) {
                return {
                    'x': 7680,
                    'y': 5276
                };
            }
            break;
        case 'Infector of Souls':
            if (sor551['lut756'](sor651(392, 7893), 1)) {
                return {
                    'x': 7872,
                    'y': 5298
                };
            }
            break;
        }
        return {
            'x': me['x'],
            'y': me['y']
        };
    };
    let sor659 = sor660 => {
        let sor661;
        let sor662;
        for (let sor663 = 0; sor663 < 10; sor663 += 1) {
            var sor664 = '5|7|2|1|4|3|6|0'['split']('|'),
                sor665 = 0;
            while (true) {
                switch (sor664[sor665++]) {
                case '0':
                    while (sor551['lut758'](getTickCount() - sor662, 1000)) {
                        Pather['walkTo'](sor661['x'], sor661['y'], 15);
                        if (sor663 <= 5) {
                            Skill['cast'](43, 0, sor661);
                        } else {
                            sendPacket(1, 19, 4, 2, 4, sor661['gid']);
                        }
                        if (sor661['mode']) {
                            return true;
                        }
                        Pather['moveToPreset'](108, 2, sor660, [-5, -5, 5, 5][rand(0, 3)], [-5, -5, 5, 5][rand(0, 3)]);
                        delay(100);
                    }
                    continue;
                case '1':
                    sor662 = getTickCount();
                    continue;
                case '2':
                    sor661 = getUnit(2, sor660);
                    continue;
                case '3':
                    if (!sor661) {
                        throw new Error('Failed to open seal: ' + sor660);
                    }
                    continue;
                case '4':
                    while (sor551['lut761'](getTickCount(), sor662) < 5000) {
                        if (sor661) {
                            break;
                        }
                        delay(50);
                    }
                    continue;
                case '5':
                    Pather['moveToPreset'](108, 2, sor660, sor660 === 394 ? 5 : 2, sor660 === 394 ? 5 : 0);
                    continue;
                case '6':
                    sor662 = getTickCount();
                    continue;
                case '7':
                    Attack['clear'](20);
                    continue;
                }
                break;
            }
        }
        return false;
    };
    let sor666 = sor667 => {
        let sor668;
        let sor669 = getTickCount();
        let sor670 = (sor667 == 'Diablo') ? 60000 : 5000;
        while (sor551['lut758'](getTickCount() - sor669, sor670)) {
            if (('rval88' === 'rval88')) {
                sor668 = getUnit(1, sor667);
                if (sor668) {
                    break;
                }
                delay(50);
            } else {
                Attack['deploy'](target, 40, 5, 50);
            }
        }
        if (!Attack['canAttack'](sor668)) {
            Config['TeleStomp'] = true;
            Attack['clear'](20, 0, sor667);
        }
        return Attack['kill'](sor668);
    };
    let sor671 = () => {
        let sor672 = getTickCount();
        while (sor551['lut758'](getTickCount() - sor672, 30000)) {
            if (sor551['lut769'](sor551['lut761'](getTickCount(), sor672), 8000)) {
                if (('rval89' !== 'rval89')) {
                    return [{
                        'x': 7781,
                        'y': 5292,
                        'radius': 40
                    }, {
                        'x': 7771,
                        'y': 5288,
                        'radius': 40
                    }, {
                        'x': 7763,
                        'y': 5299,
                        'radius': 40
                    }, {
                        'x': 7754,
                        'y': 5298,
                        'radius': 40
                    }, {
                        'x': 7743,
                        'y': 5295,
                        'radius': 40
                    }, {
                        'x': 7732,
                        'y': 5294,
                        'radius': 40
                    }, {
                        'x': 7727,
                        'y': 5290,
                        'radius': 40
                    }, {
                        'x': 7726,
                        'y': 5315,
                        'radius': 40
                    }, {
                        'x': 7714,
                        'y': 5315,
                        'radius': 40
                    }, {
                        'x': 7699,
                        'y': 5317,
                        'radius': 40
                    }, {
                        'x': 7688,
                        'y': 5317,
                        'radius': 40
                    }, {
                        'x': 7676,
                        'y': 5316,
                        'radius': 40
                    }, {
                        'x': 7663,
                        'y': 5309,
                        'radius': 40
                    }, {
                        'x': 7655,
                        'y': 5296,
                        'radius': 40
                    }];
                } else {
                    if (sor551['lut772']([56, 59, 64]['indexOf'](Config['AttackSkill'][1]), -1)) {
                        if (me['getState'](121)) {
                            if (('rval90' === 'ZoQkK')) {
                                return false;
                            } else {
                                delay(500);
                            }
                        } else {
                            Skill['cast'](Config['AttackSkill'][1], 0, 7793, 5293);
                        }
                    }
                }
            }
            if (getUnit(1, 243)) {
                return true;
            }
            delay(150);
        }
        throw new Error('Diablo not found');
    };
    let sor673 = sor674 => {
        switch (sor674) {
        case 'Grand Vizier of Chaos':
            if (sor651(396, 5275) == 1) {
                if ('rval91' === 'DrVWJ') {
                    Config['Dodge'] = false;
                    Config['DodgeRange'] = 15;
                } else {
                    return [{
                        'x': 7778,
                        'y': 5290,
                        'radius': 40
                    }, {
                        'x': 7765,
                        'y': 5287,
                        'radius': 40
                    }, {
                        'x': 7756,
                        'y': 5295,
                        'radius': 40
                    }, {
                        'x': 7742,
                        'y': 5295,
                        'radius': 40
                    }, {
                        'x': 7731,
                        'y': 5296,
                        'radius': 40
                    }, {
                        'x': 7722,
                        'y': 5301,
                        'radius': 40
                    }, {
                        'x': 7702,
                        'y': 5296,
                        'radius': 40
                    }, {
                        'x': 7683,
                        'y': 5293,
                        'radius': 40
                    }];
                }
            } else {
                return [{
                    'x': 7781,
                    'y': 5292,
                    'radius': 40
                }, {
                    'x': 7771,
                    'y': 5288,
                    'radius': 40
                }, {
                    'x': 7763,
                    'y': 5299,
                    'radius': 40
                }, {
                    'x': 7754,
                    'y': 5298,
                    'radius': 40
                }, {
                    'x': 7743,
                    'y': 5295,
                    'radius': 40
                }, {
                    'x': 7732,
                    'y': 5294,
                    'radius': 40
                }, {
                    'x': 7727,
                    'y': 5290,
                    'radius': 40
                }, {
                    'x': 7726,
                    'y': 5315,
                    'radius': 40
                }, {
                    'x': 7714,
                    'y': 5315,
                    'radius': 40
                }, {
                    'x': 7699,
                    'y': 5317,
                    'radius': 40
                }, {
                    'x': 7688,
                    'y': 5317,
                    'radius': 40
                }, {
                    'x': 7676,
                    'y': 5316,
                    'radius': 40
                }, {
                    'x': 7663,
                    'y': 5309,
                    'radius': 40
                }, {
                    'x': 7655,
                    'y': 5296,
                    'radius': 40
                }];
            }
            case 'Infector of Souls':
                if (sor551['lut764'](sor651(392, 7893), 1)) {
                    return [{
                        'x': 7802,
                        'y': 5271,
                        'radius': 40
                    }, {
                        'x': 7813,
                        'y': 5280,
                        'radius': 40
                    }, {
                        'x': 7820,
                        'y': 5293,
                        'radius': 40
                    }, {
                        'x': 7829,
                        'y': 5294,
                        'radius': 40
                    }, {
                        'x': 7838,
                        'y': 5296,
                        'radius': 40
                    }, {
                        'x': 7846,
                        'y': 5282,
                        'radius': 40
                    }, {
                        'x': 7857,
                        'y': 5300,
                        'radius': 40
                    }, {
                        'x': 7866,
                        'y': 5300,
                        'radius': 40
                    }, {
                        'x': 7879,
                        'y': 5299,
                        'radius': 40
                    }, {
                        'x': 7889,
                        'y': 5304,
                        'radius': 40
                    }, {
                        'x': 7900,
                        'y': 5305,
                        'radius': 40
                    }, {
                        'x': 7910,
                        'y': 5301,
                        'radius': 40
                    }];
                } else {
                    return [{
                        'x': 7816,
                        'y': 5278,
                        'radius': 40
                    }, {
                        'x': 7825,
                        'y': 5288,
                        'radius': 40
                    }, {
                        'x': 7834,
                        'y': 5294,
                        'radius': 40
                    }, {
                        'x': 7846,
                        'y': 5298,
                        'radius': 40
                    }, {
                        'x': 7855,
                        'y': 5297,
                        'radius': 40
                    }, {
                        'x': 7863,
                        'y': 5289,
                        'radius': 40
                    }, {
                        'x': 7867,
                        'y': 5285,
                        'radius': 40
                    }, {
                        'x': 7873,
                        'y': 5278,
                        'radius': 40
                    }, {
                        'x': 7884,
                        'y': 5278,
                        'radius': 40
                    }, {
                        'x': 7894,
                        'y': 5278,
                        'radius': 40
                    }, {
                        'x': 7903,
                        'y': 5275,
                        'radius': 40
                    }, {
                        'x': 7910,
                        'y': 5276,
                        'radius': 40
                    }, {
                        'x': 7920,
                        'y': 5271,
                        'radius': 40
                    }, {
                        'x': 7928,
                        'y': 5274,
                        'radius': 40
                    }, {
                        'x': 7937,
                        'y': 5279,
                        'radius': 40
                    }, {
                        'x': 7940,
                        'y': 5288,
                        'radius': 40
                    }, {
                        'x': 7940,
                        'y': 5297,
                        'radius': 40
                    }, {
                        'x': 7940,
                        'y': 5307,
                        'radius': 40
                    }, {
                        'x': 7938,
                        'y': 5315,
                        'radius': 40
                    }, {
                        'x': 7931,
                        'y': 5319,
                        'radius': 40
                    }, {
                        'x': 7923,
                        'y': 5321,
                        'radius': 40
                    }];
                }
                case 'Lord De Seis':
                    if (sor551['lut778'](sor651(394, 7773), 1)) {
                        return [{
                            'x': 7787,
                            'y': 5285,
                            'radius': 40
                        }, {
                            'x': 7787,
                            'y': 5270,
                            'radius': 40
                        }, {
                            'x': 7789,
                            'y': 5259,
                            'radius': 40
                        }, {
                            'x': 7790,
                            'y': 5249,
                            'radius': 40
                        }, {
                            'x': 7783,
                            'y': 5242,
                            'radius': 40
                        }, {
                            'x': 7770,
                            'y': 5235,
                            'radius': 40
                        }, {
                            'x': 7769,
                            'y': 5204,
                            'radius': 40
                        }, {
                            'x': 7786,
                            'y': 5196,
                            'radius': 40
                        }, {
                            'x': 7808,
                            'y': 5200,
                            'radius': 40
                        }, {
                            'x': 7818,
                            'y': 5192,
                            'radius': 40
                        }, {
                            'x': 7821,
                            'y': 5182,
                            'radius': 40
                        }, {
                            'x': 7819,
                            'y': 5156,
                            'radius': 40
                        }, {
                            'x': 7801,
                            'y': 5154,
                            'radius': 40
                        }];
                    } else {
                        return [{
                            'x': 7784,
                            'y': 5270,
                            'radius': 40
                        }, {
                            'x': 7787,
                            'y': 5257,
                            'radius': 40
                        }, {
                            'x': 7790,
                            'y': 5250,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5241,
                            'radius': 40
                        }, {
                            'x': 7803,
                            'y': 5230,
                            'radius': 40
                        }, {
                            'x': 7810,
                            'y': 5217,
                            'radius': 40
                        }, {
                            'x': 7811,
                            'y': 5204,
                            'radius': 40
                        }, {
                            'x': 7797,
                            'y': 5201,
                            'radius': 40
                        }, {
                            'x': 7774,
                            'y': 5196,
                            'radius': 40
                        }, {
                            'x': 7774,
                            'y': 5178,
                            'radius': 40
                        }, {
                            'x': 7777,
                            'y': 5160,
                            'radius': 40
                        }, {
                            'x': 7787,
                            'y': 5151,
                            'radius': 40
                        }];
                    }
                    case 'Star':
                        return [{
                            'x': 7795,
                            'y': 5553,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5539,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5525,
                            'radius': 40
                        }, {
                            'x': 7795,
                            'y': 5511,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5501,
                            'radius': 40
                        }, {
                            'x': 7781,
                            'y': 5497,
                            'radius': 40
                        }, {
                            'x': 7767,
                            'y': 5490,
                            'radius': 40
                        }, {
                            'x': 7767,
                            'y': 5478,
                            'radius': 40
                        }, {
                            'x': 7768,
                            'y': 5464,
                            'radius': 40
                        }, {
                            'x': 7768,
                            'y': 5452,
                            'radius': 40
                        }, {
                            'x': 7772,
                            'y': 5439,
                            'radius': 40
                        }, {
                            'x': 7781,
                            'y': 5431,
                            'radius': 40
                        }, {
                            'x': 7788,
                            'y': 5423,
                            'radius': 40
                        }, {
                            'x': 7777,
                            'y': 5414,
                            'radius': 40
                        }, {
                            'x': 7767,
                            'y': 5398,
                            'radius': 40
                        }, {
                            'x': 7767,
                            'y': 5388,
                            'radius': 40
                        }, {
                            'x': 7768,
                            'y': 5379,
                            'radius': 40
                        }, {
                            'x': 7771,
                            'y': 5367,
                            'radius': 40
                        }, {
                            'x': 7770,
                            'y': 5360,
                            'radius': 40
                        }, {
                            'x': 7786,
                            'y': 5351,
                            'radius': 40
                        }, {
                            'x': 7797,
                            'y': 5347,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5331,
                            'radius': 40
                        }];
        }
        return [];
    };
    let sor675 = function () {
        let sor676 = getUnit(1);
        if (sor676) {
            do {
                if (!sor676['dead'] && (sor676['classid'] != 243) && !sor676['getParent']()) {
                    return false;
                }
            } while (sor676['getNext']());
        }
        return true;
    };
    let sor677 = function (sor678) {
        let sor679 = sor673(sor678);
        if (me['nightmare']) {
            Config['Dodge'] = true;
            Config['DodgeRange'] = 15;
            Config['DodgeHP'] = 70;
        }
        Attack['clearCoordList'](sor679, 5);
        let sor680 = sor655(sor678);
        sor680['every'](function (sor681) {
            return sor659(sor681);
        });
        let {
            x,
            y
        } = sor657(sor678);
        Pather['teleportTo'](x, y);
        if ((sor678 == 'Infector of Souls')) {
            Pather['teleport'] = true;
            Config['Dodge'] = true;
            Config['DodgeRange'] = 30;
            Config['DodgeHP'] = 100;
        }
        if (sor678 == 'Lord De Seis') {
            Pather['teleport'] = true;
            Config['Dodge'] = true;
            Config['DodgeRange'] = 15;
            Config['DodgeHP'] = 100;
            Skill['usePvpRange'] = false;
            if (sor551['lut786'](sor651(394, 7773), 1)) {
                Pather['moveTo'](7809, 5158);
                Pather['moveTo'](7811, 5238);
                Pather['moveTo'](7793, 5248);
            } else {
                Pather['moveTo'](7813, 5182);
                Pather['moveTo'](7800, 5198);
            }
        }
        if (sor666(sor678)) {
            var sor682 = '3|6|4|1|5|0|2'['split']('|'),
                sor683 = 0;
            while (true) {
                switch (sor682[sor683++]) {
                case '0':
                    if ((sor678 == 'Infector of Souls')) {
                        Config['Dodge'] = false;
                        Config['DodgeRange'] = 15;
                    }
                    continue;
                case '1':
                    Pather['moveTo'](7791, 5294);
                    continue;
                case '2':
                    return true;
                case '3':
                    Attack['clear'](50);
                    continue;
                case '4':
                    Pather['teleport'] = true;
                    continue;
                case '5':
                    if (me['normal']) {
                        Pather['teleport'] = false;
                    }
                    continue;
                case '6':
                    Pickit['pickItems'](50);
                    continue;
                }
                break;
            }
        }
        return false;
    };
    let sor684 = sor685 => {
        let sor686;
        let sor687 = 0;
        let sor688 = getUnit(1, 'Diablo');
        let sor689 = Math['floor'](sor551['lut787'](sor551['lut750'](sor551['lut748'](me['getSkill'](42, 1), 4), 2), 3));
        while (sor687 < 600 && Attack['checkMonster'](sor688)) {
            Misc['townCheck']();
            if (!sor688 || !copyUnit(sor688)['x']) {
                sor688 = getUnit(1, 'Diablo');
                if (!sor688) {
                    break;
                }
            }
            if (sor551['lut788']((sor688['hp'] * 100), 128) <= sor685) {
                break;
            }
            if (sor688['mode'] == 7 || sor688['mode'] == 10) {
                var sor690 = '0|1|3|4|2' ['split']('|'),
                    sor691 = 0;
                while (true) {
                    switch (sor690[sor691++]) {
                    case '0':
                        sor686 = getTickCount();
                        continue;
                    case '1':
                        Town['goToTown']();
                        continue;
                    case '2':
                        Pather['usePortal'](108, me['name']);
                        continue;
                    case '3':
                        Town['doChores']();
                        continue;
                    case '4':
                        while (sor551['lut758']((getTickCount - sor686), 3000)) {
                            delay(25);
                        }
                        continue;
                    }
                    break;
                }
            }
            if (sor551['lut772'](getDistance(me, sor688), sor689) || checkCollision(me, sor688, 4)) {
                Attack['getIntoPosition'](sor688, sor689, 4);
            }
            if (!sor688['getState'](11)) {
                Skill['cast'](44, 1);
            }
            Skill['cast'](42, 0);
            sor687 += 1;
        }
        return true;
    };
    let sor692 = () => {
        Attack['getMonsterCount'] = function (sor693, sor694, sor695, sor696) {
            var sor697, sor698, sor699 = 0,
                sor700 = [];
            for (sor697 = 0; (sor697 < sor696['length']); sor697 += 1) {
                if (sor700['indexOf'](sor696[sor697]['classid']) === -1 && this['checkMonster'](sor696[sor697]) && sor551['lut791'](getDistance(sor693, sor694, sor696[sor697]['x'], sor696[sor697]['y']), sor695)) {
                    if (('rval92' !== 'rval92')) {
                        return [{
                            'x': 7784,
                            'y': 5270,
                            'radius': 40
                        }, {
                            'x': 7787,
                            'y': 5257,
                            'radius': 40
                        }, {
                            'x': 7790,
                            'y': 5250,
                            'radius': 40
                        }, {
                            'x': 7794,
                            'y': 5241,
                            'radius': 40
                        }, {
                            'x': 7803,
                            'y': 5230,
                            'radius': 40
                        }, {
                            'x': 7810,
                            'y': 5217,
                            'radius': 40
                        }, {
                            'x': 7811,
                            'y': 5204,
                            'radius': 40
                        }, {
                            'x': 7797,
                            'y': 5201,
                            'radius': 40
                        }, {
                            'x': 7774,
                            'y': 5196,
                            'radius': 40
                        }, {
                            'x': 7774,
                            'y': 5178,
                            'radius': 40
                        }, {
                            'x': 7777,
                            'y': 5160,
                            'radius': 40
                        }, {
                            'x': 7787,
                            'y': 5151,
                            'radius': 40
                        }];
                    } else {
                        sor699 += 1;
                    }
                }
            }
            sor698 = getUnit(2, 'fire');
            if (sor698) {
                do {
                    if (sor551['lut791'](getDistance(sor693, sor694, sor698['x'], sor698['y']), 4)) {
                        sor699 += 100;
                    }
                } while (sor698['getNext']());
            }
            return sor699;
        };
        let sor701;
        let sor702;
        let sor703 = getUnit(1, 'Diablo');
        Config['AttackSkill'][2] = -1;
        Config['TownHP'] = 0;
        while (Attack['checkMonster'](sor703)) {
            Misc['townCheck']();
            me['overhead'](sor551['lut748']('Diablo life: ', Math['round'](sor551['lut788']((sor703['hp'] * 100), 128))));
            if (!sor703 || !copyUnit(sor703)['x']) {
                sor703 = getUnit(1, 'Diablo');
                if (!sor703) {
                    break;
                }
            }
            sor702 = me['getMerc']();
            if (sor551['lut795'](getDistance(me, sor703), 45)) {
                if (('wnGSM' === 'wnGSM')) {
                    Attack['deploy'](sor703, 40, 5, 50);
                } else {
                    count += 100;
                }
            }
            if (sor702 && getDistance(sor702, sor703) < 30) {
                Pather['teleportTo'](me['x'], me['y'], 1);
            }
            if (sor703['mode'] == 7 || sor703['mode'] == 10) {
                sor701 = getTickCount();
                Town['doChores']();
                while (sor551['lut799']((getTickCount - sor701), 3000)) {
                    delay(25);
                }
                Pather['usePortal'](108, me['name']);
            }
            ClassAttack['doAttack'](sor703, false);
        }
        if (!sor703 || !copyUnit(sor703)['x']) {
            for (let sor704 = 0; sor704 < sor705['length']; sor704++) {
                Pather['moveTo'](sor705[sor704][0], sor705[sor704][1]);
                if (getUnit(1, 'Diablo')) {
                    break;
                }
            }
        }
        if (!sor703 || !copyUnit(sor703)['x']) {
            return true;
        }
        if (sor703['hp'] > 0 && sor703['mode'] !== 0 && (sor703['mode'] !== 12)) {
            return false;
        }
        return true;
    };
    me['overhead']('starting diablo');
    if (me['diff'] === 2) {
        Config['UseMerc'] = true;
        Config['MercWatch'] = true;
    }
    Town['doChores']();
    if (!Pather['checkWP'](107)) {
        Pather['getWP'](107, false);
    } else {
        Pather['useWaypoint'](107);
    }
    Precast['doPrecast'](true);
    Pather['moveTo'](7802, 5569);
    Pather['moveTo'](7774, 5305);
    if (me['normal']) {
        Pather['teleport'] = false;
    }
    Config['Dodge'] = false;
    Config['PickRange'] = 20;
    Skill['usePvpRange'] = false;
    Attack['clear'](30);
    if (!sor650['every'](sor706 => sor677(sor706))) {
        return false;
    }
    Pather['teleport'] = true;
    Pather['moveTo'](7792, 5327);
    if (!sor675()) {
        return false;
    }
    const sor707 = !Packet['checkQuest'](26, 0);
    Skill['usePvpRange'] = true;
    Config['UseMerc'] = false;
    Pather['moveTo'](7827, 5321);
    sor671();
    let sor705 = [
        [7846, 5294],
        [7792, 5339],
        [7747, 5291],
        [7794, 5249]
    ];
    for (let sor708 = 0; sor708 < 5; sor708++) {
        try {
            if (sor692()) {
                break;
            }
        } catch (sor709) {
            print(sor709);
            for (let sor710 = 0; sor710 < sor705['length']; sor710++) {
                Pather['moveTo'](sor705[sor710][0], sor705[sor710][1]);
                if (getUnit(1, 'Diablo')) {
                    break;
                }
            }
        }
    }
    Pickit['pickItems'](50);
    Config['MercWatch'] = false;
    if (me['diff'] !== 2 && General['goToNextDifficulty']()) {
        Account['update']('difficulty', Misc['difficultyString'][(me['diff'] + 1)]);
        return false;
    }
    if (sor707) {
        if (!me['classic']) {
            Town['goToTown']();
            Quest['talkTo']('tyrael', 'tyrael');
            Quest['changeAct'](5);
        } else {
            D2Bot['restart']();
        }
    }
    return true;
}

function shenk(sor711, sor712) {
    var sor713 = {};
    sor713['lut907'] = function (sor716, sor717) {
        return sor716 >= sor717;
    };
    if (!Packet['checkQuest'](35, 0) && !Packet['checkQuest'](35, 1) && sor711) {
        if (('rval94' === 'rval95')) {
            return false;
        } else {
            return false;
        }
    }
    if ((Packet['checkQuest'](35, 0) || Packet['checkQuest'](35, 1)) && !sor711) {
        if (('rval96' === 'rval96')) {
            return true;
        } else {
            Pather['useWaypoint'](111);
        }
    }
    let sor719 = function () {
        switch (me['diff']) {
        case 0:
            return 45;
        case 1:
            return 75;
        default:
            return 1;
        }
    };
    if (sor713['lut907'](me['charlvl'], sor719())) {
        return true;
    }
    me['overhead']('starting shenk');
    Town['doChores']();
    if (!Pather['checkWP'](111)) {
        Pather['getWP'](111, sor712);
        if (Packet['checkQuest'](35, 1)) {
            return true;
        }
    } else {
        if ('rval97' !== 'rval97') {
            Pather['getWP'](111, sor712);
            if (Packet['checkQuest'](35, 1)) {
                return true;
            }
        } else {
            Pather['useWaypoint'](111);
        }
    }
    Precast['doPrecast'](true);
    Pather['moveTo'](3846, 5120, 3, sor712);
    Skill['usePvpRange'] = true;
    Attack['kill'](getLocaleString(22435));
    Pickit['pickItems'](50);
    return true;
}

function rescue() {
    var sor720 = {};
    sor720['lut921'] = function (sor723, sor724) {
        return sor723 + sor724;
    };
    sor720['lut934'] = function (sor742, sor743) {
        return sor742 + sor743;
    };
    var sor748, sor749, sor750;
    if ((me['gametype'] === 0)) return true;
    if (me['getQuest'](36, 0) || me['getQuest'](36, 1)) {
        if (('rval98' === 'VeNqA')) {
            ClassAttack['doAttack'](sor749, false);
            delay((200 + 2 * me['ping']));
        } else {
            return true;
        }
    }
    me['overhead']('starting rescue');
    Town['doChores']();
    if (!Pather['journeyTo'](111)) {
        print('Failed to move to Frigid Highlands');
        return false;
    }
    var sor751 = getPresetUnits(111, 2, 473);
    var sor752 = [];
    for (sor748 = 0; sor748 < sor751['length']; sor748++) {
        if (('rval99' !== 'rval99')) {
            sor750 = {};
            sor750['x'] = sor720['lut921']((sor751[sor748].roomx * 5), sor751[sor748].x);
            sor750['y'] = sor720['lut921']((sor751[sor748].roomy * 5), sor751[sor748].y);
            sor750['classid'] = 434;
            sor750['type'] = 1;
            sor752[sor748] = sor750;
        } else {
            sor750 = {};
            sor750['x'] = sor720['lut921']((sor751[sor748].roomx * 5), sor751[sor748].x);
            sor750['y'] = sor720['lut921']((sor751[sor748].roomy * 5), sor751[sor748].y);
            sor750['classid'] = 434;
            sor750['type'] = 1;
            sor752[sor748] = sor750;
        }
    }

    function sor753(sor754, sor755) {
        return getDistance(me, sor754) - getDistance(me, sor755);
    }
    while (sor752['length']) {
        if (('rval100' === 'aJGSt')) {
            return true;
        } else {
            sor752['sort'](sor753);
            let sor756 = sor752['shift']();
            Pather['moveTo'](sor756['x'], sor756['y']);
            let sor749 = getUnit(sor756['type'], sor756['classid']);
            if (sor749) {
                while (sor749['mode'] !== 12) {
                    ClassAttack['doAttack'](sor749, false);
                    delay(sor720['lut934'](200, (2 * me['ping'])));
                }
            } else {
                print('Failed to destroy the doors');
                return false;
            }
            delay(3000);
        }
    }
    Town['goToTown'](5);
    Town['move'](NPC['Qual-Kehk']);
    sor750 = getUnit(1, 'Qual-Kehk');
    sor750['openMenu']();
    me['cancel']();
    return true;
}

function anya(sor757, sor758) {
    if (Packet['checkQuest'](37, 1)) {
        if (('HqlWD' === 'rDKGa')) {
            return false;
        } else {
            Quest['talkTo']('anya', 'anya');
        }
    }
    if (!Packet['checkQuest'](37, 0) && sor757) {
        return false;
    }
    if (Packet['checkQuest'](37, 0) && !sor757) {
        return true;
    }
    let sor780 = function () {
        let sor781 = getUnit(1, 'malah');
        while (!sor781) {
            Town['move'](portalspot);
            Packet['flash'](me['gid']);
            delay((me['ping'] * 2));
            sor781 = getUnit(1, 'malah');
        }
        if (sor781) {
            for (let sor782 = 0; sor782 < 10 && !me['getItem'](646); sor782++) {
                Quest['talkTo']('malah', 'malah');
                delay((me['ping'] * 2) + 500);
            }
            Pickit['pickItems']();
            return !!me['getItem'](646);
        }
        return false;
    };
    me['overhead']('starting anya');
    Town['doChores']();
    Town['stackPotions'](517);
    if (!Pather['checkWP'](113)) {
        if (('rval101' !== 'rval101')) {
            return true;
        } else {
            Pather['getWP'](113, sor758);
        }
    } else {
        Pather['useWaypoint'](113);
    }
    Pather['moveToExit'](114, true, sor758);
    Pather['moveToPreset'](me['area'], 2, 460, 0, 0, sor758);
    let sor783 = getUnit(2, 558);
    if (!sor783) {
        if (('rval102' !== 'rval102')) {
            delay(1000);
            sor783 = getUnit(2, 558);
        } else {
            delay(1000);
            sor783 = getUnit(2, 558);
        }
    }
    if (sor783) {
        Pather['moveToUnit'](sor783);
        sor783['interact']();
        me['cancel']();
        me['cancel']();
    }
    Town['goToTown']();
    Quest['talkTo']('malah', 'malah');
    Pather['usePortal'](114, me['name']);
    sor783 = getUnit(2, 558);
    while (sor783 && !sor783['mode']) {
        sor783['interact']();
        me['cancel']();
        me['cancel']();
        delay((me['ping'] * 2 + 50));
    }
    Town['goToTown']();
    sor780();
    Quest['talkTo']('anya', 'anya');
    delay(200);
    me['cancel']();
    me['cancel']();
    return true;
}

function ancients(sor784, sor785) {
    if (!Packet['checkQuest'](39, 0) && sor784) {
        return false;
    }
    if (Packet['checkQuest'](39, 0) && !sor784) {
        return true;
    }
    let sor804 = function () {
        let sor805 = getUnit(1);
        if (sor805) {
            do {
                if (!sor805['getParent']() && !Attack['canAttack'](sor805) && ((me['diff'] < 2) || sor805['classid'] !== 542)) {
                    return false;
                }
            } while (sor805['getNext']());
        }
        return true;
    };
    let sor806 = function () {
        let sor807 = getTickCount();
        while (getTickCount() - sor807 < 5000) {
            if (getUnit(2, 546)) {
                break;
            }
            delay(20);
        }
        let sor806 = getUnit(2, 546);
        if (sor806) {
            if ('vcdgn' !== 'doVUs') {
                while ((sor806['mode'] != 2)) {
                    if ('rval103' !== 'FJLQH') {
                        Pather['moveToUnit'](sor806);
                        Skill['cast'](43, 0, sor806);
                        delay(200 + me['ping']);
                        me['cancel']();
                    } else {
                        sor806();
                        while (!getUnit(1, 542)) {
                            delay(50);
                        }
                        while (!sor804()) {
                            var sor808 = '4|1|3|2|0'['split']('|'),
                                sor809 = 0;
                            while (true) {
                                switch (sor808[sor809++]) {
                                case '0':
                                    while (!getUnit(1, 542)) {
                                        delay(10);
                                    }
                                    continue;
                                case '1':
                                    Town['fillTome'](518);
                                    continue;
                                case '2':
                                    sor806();
                                    continue;
                                case '3':
                                    Pather['usePortal'](120, me['name']);
                                    continue;
                                case '4':
                                    Pather['makePortal'](true);
                                    continue;
                                }
                                break;
                            }
                        }
                    }
                }
                return true;
            } else {
                do {
                    if (!monster['getParent']() && !Attack['canAttack'](monster) && ((me['diff'] < 2) || monster['classid'] !== 542)) {
                        return false;
                    }
                } while (monster['getNext']());
            }
        }
        return false;
    };
    me['overhead']('starting ancients');
    Town['doChores']();
    if (!Pather['checkWP'](118)) {
        Pather['getWP'](118, sor785);
    } else {
        Pather['useWaypoint'](118);
    }
    Pather['moveToExit'](120, true, sor785);
    Pather['moveTo'](10048, 12628);
    let sor810 = Misc['copy'](Config);
    Config['MPBuffer'] = 25;
    Config['HPBuffer'] = 5;
    Town['visitTown']();
    let sor811 = function () {
        sor806();
        while (!getUnit(1, 542)) {
            delay(50);
        }
        while (!sor804()) {
            Pather['makePortal'](true);
            Town['fillTome'](518);
            Pather['usePortal'](120, me['name']);
            sor806();
            while (!getUnit(1, 542)) {
                delay(10);
            }
        }
    };
    Config['LifeChicken'] = 10;
    Config['TownHP'] = 0;
    Config['TownCheck'] = false;
    Pather['teleport'] = true;
    Misc['updateConfig']();
    while (!Packet['checkQuest'](39, 0)) {
        Pather['moveTo'](10048, 12628);
        sor811();
        Attack['clear'](50);
        if ((me['diff'] === 2)) {
            Config['TeleStomp'] = true;
            Attack['clear'](50);
        }
        delay(6000);
    }
    Config = sor810;
    Misc['updateConfig']();
    return true;
}

function pindle() {
    var sor812 = {};
    sor812['lut1014'] = function (sor815, sor816) {
        return sor815 >= sor816;
    };
    sor812['lut1022'] = function (sor822, sor823) {
        return sor822 <= sor823;
    };
    if (!Packet['checkQuest'](37, 1) && !Packet['checkQuest'](37, 0)) {
        return true;
    }
    let sor828 = function () {
        switch (me['diff']) {
        case 0:
            return 45;
        case 1:
            return 75;
        default:
            return 100;
        }
    };
    if (sor812['lut1014'](me['charlvl'], sor828())) {
        if ('rval104' !== 'rval104') {
            Pather['moveTo'](5100, 5018);
        } else {
            return true;
        }
    }
    me['overhead']('starting pindle');
    Town['doChores']();
    if (me['act'] != 5) {
        Town['goToTown'](5);
    } else {
        if (('rval105' !== 'rval106')) {
            let sor829 = getUnit(1, 'malah');
            if (sor829) {
                if (sor812['lut1022'](getDistance(me, sor829), 20)) {
                    Pather['moveTo'](5100, 5018);
                }
            }
        } else {
            Attack['clear'](15, 0, getLocaleString(22497));
        }
    }
    Town['move']('anya');
    if (!Pather['getPortal'](121)) {
        let sor830 = getUnit(1, NPC['Anya']);
        if (sor830) {
            if (('OmWZB' === 'rval107')) {
                return true;
            } else {
                sor830['openMenu']();
                me['cancel']();
            }
        }
    }
    if (!Pather['usePortal'](121)) {
        return true;
    }
    Pather['moveTo'](10058, 13234);
    try {
        Attack['clear'](15, 0, getLocaleString(22497));
    } catch (sor831) {}
    return true;
}

function baal(sor832, sor833) {
    var sor834 = {};
    sor834['lut1042'] = function (sor835, sor836) {
        return sor835 > sor836;
    };
    sor834['lut1049'] = function (sor849, sor850) {
        return sor849 < sor850;
    };
    sor834['lut1056'] = function (sor860, sor861) {
        return sor860 - sor861;
    };
    sor834['lut1059'] = function (sor864, sor865) {
        return sor864 < sor865;
    };
    if (!Packet['checkQuest'](40, 0) && sor832) {
        return false;
    }
    if (General['goToNextDifficulty']()) {
        Account['update']('difficulty', Misc['difficultyString'][(me['diff'] + 1)]);
        return false;
    }
    if (Packet['checkQuest'](40, 0) && !sor832) {
        return true;
    }
    let sor888 = function () {
        let sor889 = [{
            'x': 15097,
            'y': 5054
        }, {
            'x': 15085,
            'y': 5053
        }, {
            'x': 15085,
            'y': 5040
        }, {
            'x': 15098,
            'y': 5040
        }, {
            'x': 15099,
            'y': 5022
        }, {
            'x': 15086,
            'y': 5024
        }];
        return sor889['forEach'](sor890 => {
            Pather['moveTo'](sor890['x'], sor890['y']);
            Attack['clear'](30);
        });
    };
    let sor891 = function () {
        switch (me['classid']) {
        case 1:
            if (sor834['lut1042']([56, 59, 64]['indexOf'](Config['AttackSkill'][1]), -1)) {
                if (me['getState'](121)) {
                    delay(50);
                } else {
                    Skill['cast'](Config['AttackSkill'][1], 0, 15093, 5024);
                }
            }
            return true;
        case 3:
            if ((Config['AttackSkill'][3] !== 112)) {
                return false;
            }
            if (sor834['lut1042'](getDistance(me, 15093, 5029), 3)) {
                if (('keuuy' !== 'rval108')) {
                    Pather['moveTo'](15093, 5029);
                } else {
                    return false;
                }
            }
            if ((Config['AttackSkill'][4] > 0)) {
                Skill['setSkill'](Config['AttackSkill'][4], 0);
            }
            Skill['cast'](Config['AttackSkill'][3], 1);
            return true;
        case 5:
            if ((Config['AttackSkill'][3] === 245)) {
                Skill['cast'](Config['AttackSkill'][3], 0, 15093, 5029);
                return true;
            }
            break;
        case 6:
            if (Config['UseTraps']) {
                let sor892 = ClassAttack['checkTraps']({
                    'x': 15093,
                    'y': 5029
                });
                if (sor892) {
                    ClassAttack['placeTraps']({
                        'x': 15093,
                        'y': 5029
                    }, 5);
                    return true;
                }
            }
            break;
        }
        return false;
    };
    let sor893 = function () {
        let sor894 = getUnit(1);
        if (sor894) {
            do {
                if (Attack['checkMonster'](sor894) && (sor894['y'] < 5080)) {
                    switch (sor894['classid']) {
                    case 23:
                    case 62:
                        return 1;
                    case 105:
                    case 381:
                        return 2;
                    case 557:
                        return 3;
                    case 558:
                        return 4;
                    case 571:
                        return 5;
                    default:
                        Attack['getIntoPosition'](sor894, 10, 4);
                        Attack['clear'](15);
                        return false;
                    }
                }
            } while (sor894['getNext']());
        }
        return false;
    };
    let sor895 = function () {
        let sor896;
        let sor897 = getTickCount();
        sor898: while (true) {
            if (sor834['lut1042'](getDistance(me, 15116, 5026), 3)) {
                Pather['moveTo'](15116, 5026);
            }
            if (!getUnit(1, 543)) {
                break;
            }
            Misc['townCheck']();
            switch (sor893()) {
            case 1:
                Attack['clearClassids'](23, 62);
                sor897 = getTickCount();
                break;
            case 2:
                sor896 = getUnit(1, 'Achmel the Cursed');
                if (sor896 && !Attack['canAttack'](sor896)) {
                    me['overhead']('immune achmel');
                    return false;
                }
                Attack['clearClassids'](105, 381);
                sor897 = getTickCount();
                break;
            case 4:
                Attack['clearClassids'](558);
                sor897 = getTickCount();
                break;
            case 3:
                Attack['clearClassids'](557);
                sor897 = getTickCount();
                break;
            case 5:
                sor896 = getUnit(1, 'Lister the Tormentor');
                if (sor896 && !Attack['canAttack'](sor896)) {
                    me['overhead']('immune lister');
                    return false;
                }
                Attack['clearClassids'](571);
                break sor898;
            default:
                if (sor834['lut1049'](sor834['lut1056'](getTickCount(), sor897), 7000)) {
                    if (me['getState'](2)) {
                        Skill['setSkill'](109, 0);
                    }
                }
                if (sor834['lut1042'](sor834['lut1056'](getTickCount(), sor897), 20000)) {
                    sor897 = getTickCount();
                    sor888();
                }
                if (!sor891()) {
                    delay(50);
                }
                break;
            }
            delay(10);
        }
        return true;
    };
    let sor899 = function (sor900, sor901) {
        var sor902 = {};
        sor902['lut1146'] = function (sor903, sor904) {
            return sor903(sor904);
        };
        let sor907 = getUnit(1, 641);
        let sor908 = 0;
        if (sor907) {
            do {
                if (sor834['lut1059'](getDistance(me, sor907), 45)) {
                    sor908 += 1;
                }
            } while (sor907['getNext']());
        }
        if ((sor908 > sor900)) {
            return true;
        }
        let sor909 = getUnit(1);
        if (sor909) {
            do {
                if (!sor909['getParent']() && (sor909['classid'] != 641) && sor834['lut1059'](getDistance(me, sor909), 45)) {
                    if (('rval109' === 'rval110')) {
                        let sor910 = getUnit(1);
                        if (sor910) {
                            do {
                                if (Attack['checkMonster'](sor910) && (sor910['y'] < 5080)) {
                                    switch (sor910['classid']) {
                                    case 23:
                                    case 62:
                                        return 1;
                                    case 105:
                                    case 381:
                                        return 2;
                                    case 557:
                                        return 3;
                                    case 558:
                                        return 4;
                                    case 571:
                                        return 5;
                                    default:
                                        Attack['getIntoPosition'](sor910, 10, 4);
                                        Attack['clear'](15);
                                        return false;
                                    }
                                }
                            } while (sor910['getNext']());
                        }
                        return false;
                    } else {
                        sor908 += 1;
                    }
                }
            } while (sor909['getNext']());
        }
        return sor908 > sor901;
    };
    let sor911 = function (sor912) {
        let sor913 = getUnit(1);
        let sor914 = 0;
        if (sor913) {
            do {
                if (!Attack['canAttack'](sor913) && getDistance(me, sor913) < 45) sor914 += 1;
            } while (sor913['getNext']());
        }
        if ((sor914 > sor912)) {
            return true;
        }
        return false;
    };
    me['overhead']('starting baal');
    Town['doChores']();
    if (!Pather['checkWP'](129)) {
        Pather['getWP'](129, sor833);
    } else {
        Pather['useWaypoint'](129);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToExit']([130, 131], true, sor833)) {
        return false;
    }
    Pather['moveTo'](15095, 5029, 5, sor833);
    Pather['moveTo'](15113, 5040, 5, sor833);
    if (me['nightmare'] && sor899(8, 20) && (me['lightningResist'] < 70)) {
        print('Too many souls or mobs in throne');
        return false;
    }
    if (me['nightmare'] && sor911(8)) {
        print('Too many immunes in throne');
        return false;
    }
    if (me['playertype'] && getUnit(1, 691)) {
        print('Dolls in throne room');
        return false;
    }
    Attack['clear'](15);
    sor888();
    if (!sor895()) {
        return false;
    }
    sor888();
    Pather['moveTo'](15090, 5008);
    Precast['doPrecast'](true);
    while (getUnit(1, 543)) {
        delay(500);
    }
    Pather['usePortal'](null, null, getUnit(2, 563));
    Pather['moveTo'](15134, 5923);
    const sor915 = !Packet['checkQuest'](40, 0);
    Config['CastStatic'] = Attack['getStaticAmount']();
    Config['StaticList'] = ['Baal'];
    Attack['kill'](544);
    Pickit['pickItems']();
    if (General['goToNextDifficulty']()) {
        if (('rval111' !== 'ciCpE')) {
            Account['update']('difficulty', Misc['difficultyString'][(me['diff'] + 1)]);
            return false;
        } else {
            let sor916 = ClassAttack['checkTraps']({
                'x': 15093,
                'y': 5029
            });
            if (sor916) {
                ClassAttack['placeTraps']({
                    'x': 15093,
                    'y': 5029
                }, 5);
                return true;
            }
        }
    }
    if (sor915) {
        D2Bot['restart']();
    }
    return true;
}

function chests() {
    var sor917, sor918;
    if (!Pather['accessToAct'](3)) {
        return true;
    }
    me['overhead']('starting chests');
    Town['doChores']();
    var sor919 = [Config['ChestMania']['Act1'], Config['ChestMania']['Act2'], Config['ChestMania']['Act3'], Config['ChestMania']['Act4'], Config['ChestMania']['Act5']];
    for (var sor918 = 0; sor918 < sor919['length']; sor918++) {
        if ('KLodm' !== 'laZNd') {
            if (!Pather['accessToAct'](sor918 + 1)) {
                return true;
            }
            if (sor919[sor918]['length']) {
                for (var sor920 = 0; sor920 < sor919[sor918]['length']; sor920++) {
                    Pather['journeyTo'](sor919[sor918][sor920]);
                    Misc['openChestsInArea'](sor919[sor918][sor920]);
                }
                Town['doChores']();
            }
        } else {
            for (var sor921 = 0; sor921 < sor919[sor918]['length']; sor921++) {
                Pather['journeyTo'](sor919[sor918][sor921]);
                Misc['openChestsInArea'](sor919[sor918][sor921]);
            }
            Town['doChores']();
        }
    }
    return true;
}
