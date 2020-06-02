/**
 *		@filename		Sorc.js
 *		@desc			ingame script for sorc
 */
 
function runSequence(seqtmp85, seqtmp86) {
    var seqtmp87 = {};
    seqtmp87['lut1'] = function (seqtmp89, seqtmp90) {
        return seqtmp89 >= seqtmp90;
    };
    seqtmp87['lut2'] = 'Prayer';
    seqtmp87['lut3'] = function (seqtmp95, seqtmp96) {
        return seqtmp95 === seqtmp96;
    };
    seqtmp87['lut4'] = 'rval0';
    seqtmp87['lut5'] = function (seqtmp101, seqtmp102) {
        return seqtmp101 < seqtmp102;
    };
    seqtmp87['lut6'] = function (seqtmp106, seqtmp107) {
        return seqtmp106 !== seqtmp107;
    };
    seqtmp87['lut7'] = 'rval1';
    seqtmp87['lut8'] = 'rval2';
    seqtmp87['lut9'] = 'Holy Freeze';
    return seqtmp85['every'](function (seqtmp114) {
        var seqtmp115 = {};
        seqtmp115['lut10'] = function (seqtmp117, seqtmp118) {
            return seqtmp117 < seqtmp118;
        };
        seqtmp115['lut11'] = function (seqtmp122, seqtmp123) {
            return seqtmp87.lut1(seqtmp122, seqtmp123);
        };
        seqtmp115['lut12'] = seqtmp87.lut2;
        seqtmp115['lut13'] = 'Holy Freeze';
        let {
            respecLevel
        } = Account['get']();
        if (!me['getQuest'](0x29, 0x0) && (me['charlvl'] >= respecLevel && me['normal'] && me['getQuest'](0x12, 0x0))) {
            Quest['respec']();
        }
        General['initConfig']();
        if (!me['classic'] && Pather['accessToAct'](0x2)) {
            if (me['normal']) {
                if (seqtmp87['lut3'](seqtmp87['lut4'], 'rval0')) {
                    General['hireMerc'](0x2, seqtmp87['lut2']);
                    if (Pather['accessToAct'](0x5)) {
                        let seqtmp133 = me['getMerc']();
                        if (seqtmp133 && seqtmp87['lut5'](seqtmp133['charlvl'], 0x19) && seqtmp87['lut1'](me['charlvl'], 0x1c) && General['validMerc']) {
                            if (seqtmp87['lut6'](seqtmp87['lut7'], seqtmp87['lut7'])) {
                                General['hireMerc'](0x2, 'Prayer', true, 0x19);
                            } else {
                                General['hireMerc'](0x2, seqtmp87['lut2'], true, 0x19);
                            }
                        }
                    }
                } else {
                    General['hireMerc'](0x2, 'Prayer');
                    if (Pather['accessToAct'](0x5)) {
                        let seqtmp142 = me['getMerc']();
                        if (seqtmp142 && seqtmp115['lut10'](seqtmp142['charlvl'], 0x19) && seqtmp115['lut11'](me['charlvl'], 0x1c) && General['validMerc']) {
                            General['hireMerc'](0x2, seqtmp115['lut12'], true, 0x19);
                        }
                    }
                }
            }
            if (me['nightmare']) {
                if ('slsd' !== seqtmp87['lut8']) {
                    General['hireMerc'](0x2, seqtmp87['lut9']);
                } else {
                    General['hireMerc'](0x2, seqtmp115['lut13']);
                }
            }
        }
        return global[seqtmp114](seqtmp86, General['shouldClearPath'](seqtmp114));
    }, this);
};

function den(seqtmp238, seqtmp239) {
    var seqtmp240 = {};
    seqtmp240['lut14'] = 'akara';
    seqtmp240['lut15'] = function (seqtmp243, seqtmp244) {
        return seqtmp243 !== seqtmp244;
    };
    seqtmp240['lut16'] = 'rval3';
    seqtmp240['lut17'] = function (seqtmp249, seqtmp250) {
        return seqtmp249 === seqtmp250;
    };
    seqtmp240['lut18'] = function (seqtmp254, seqtmp255) {
        return seqtmp254 == seqtmp255;
    };
    if (Packet['checkQuest'](0x1, 0x1)) {
        print(0x1);
        Packet['entityAction'](seqtmp240['lut14']);
    }
    if (Packet['checkQuest'](0x1, 0x0)) {
        if (seqtmp240['lut15']('dfgh', seqtmp240['lut16'])) {
            return true;
        } else {
            Pather['moveToExit']([0x2, 0x1], true, seqtmp239);
        }
    }
    me['overhead']('starting den');
    Town['doChores']();
    Town['goToTown'](0x1);
    if (!Pather['moveToExit']([0x2, 0x8], true, seqtmp239)) {
        return false;
    }
    if (seqtmp240['lut17'](me['diff'], 0x2)) {
        Config['TeleStomp'] = true;
    }
    for (let seqtmp264 = 0x0; seqtmp264 < 0x3; seqtmp264 += 0x1) {
        if (me['area'] == 0x8) {
            Attack['clearLevel']();
            if (Packet['checkQuest'](0x1, 0x1) || Packet['checkQuest'](0x1, 0x0)) {
                try {
                    Town['goToTown']();
                } catch (seqtmp268) {
                    Pather['moveToExit']([0x2, 0x1], true, seqtmp239);
                }
                if (seqtmp240['lut18'](me['area'], 0x1)) {
                    Quest['talkTo']('akara', seqtmp240['lut14']);
                }
                Config['TeleStomp'] = false;
                return true;
            }
        }
    }
    Config['TeleStomp'] = false;
    return false;
}

function raven(seqtmp358, seqtmp359) {
    var seqtmp360 = {};
    seqtmp360['lut19'] = 'kashya';
    seqtmp360['lut20'] = 'Merc';
    seqtmp360['lut21'] = function (seqtmp364, seqtmp365) {
        return seqtmp364 !== seqtmp365;
    };
    seqtmp360['lut22'] = 'rval4';
    seqtmp360['lut23'] = 'starting raven';
    seqtmp360['lut24'] = function (seqtmp371, seqtmp372) {
        return seqtmp371(seqtmp372);
    };
    seqtmp360['lut25'] = 'getMerc';
    if (Packet['checkQuest'](0x2, 0x1)) {
        Quest['talkTo'](seqtmp360['lut19'], seqtmp360['lut19']);
        Town['initNPC'](seqtmp360['lut20'], 'getMerc');
    }
    if (!Packet['checkQuest'](0x2, 0x0) && seqtmp358) {
        if (seqtmp360['lut21']('berdf', seqtmp360['lut22'])) {
            return false;
        } else {
            Pather['getWP'](0x3, seqtmp359);
        }
    }
    if (Packet['checkQuest'](0x2, 0x0) && !seqtmp358) {
        return true;
    }
    me['overhead'](seqtmp360['lut23']);
    Town['doChores']();
    if (!Pather['checkWP'](0x3)) {
        Pather['getWP'](0x3, seqtmp359);
    } else {
        Pather['useWaypoint'](0x3);
    }
    Pather['moveToExit'](0x11, true, seqtmp359);
    Pather['moveToPreset'](me['area'], 0x1, 0x325, 0x0, 0x0, seqtmp359);
    const seqtmp388 = !Packet['checkQuest'](0x2, 0x0);
    Attack['clear'](0xf, 0x0, seqtmp360['lut24'](getLocaleString, 0xc27));
    Pickit['pickItems']();
    if (seqtmp388) {
        Pather['makePortal'](true);
        if (!Packet['checkQuest'](0x2, 0x0)) {
            Quest['talkTo']('kashya', seqtmp360['lut19']);
            Town['initNPC']('Merc', seqtmp360['lut25']);
        }
    }
    return true;
}

function mausoleum(seqtmp413, seqtmp414) {
    var seqtmp415 = {};
    seqtmp415['lut26'] = function (seqtmp417, seqtmp418) {
        return seqtmp417(seqtmp418);
    };
    seqtmp415['lut27'] = 'Failed to move to Burial Grounds';
    seqtmp415['lut28'] = 'starting mausoleum';
    seqtmp415['lut29'] = function (seqtmp424, seqtmp425) {
        return seqtmp424 === seqtmp425;
    };
    seqtmp415['lut30'] = 'rval5';
    seqtmp415['lut31'] = function (seqtmp430, seqtmp431) {
        return seqtmp430 === seqtmp431;
    };
    seqtmp415['lut32'] = 'rval6';
    seqtmp415['lut33'] = function (seqtmp436, seqtmp437) {
        return seqtmp436 !== seqtmp437;
    };
    seqtmp415['lut34'] = 'rval7';
    seqtmp415['lut35'] = 'rval8';
    me['overhead'](seqtmp415['lut28']);
    Town['doChores']();
    if (!Pather['checkWP'](0x3)) {
        Pather['getWP'](0x3, false);
    } else {
        if (seqtmp415['lut29'](seqtmp415['lut30'], seqtmp415['lut30'])) {
            Pather['useWaypoint'](0x3);
        } else {
            Pather['moveToPreset'](0x11, 0x1, 0x325, 0x0, 0x0, false, true);
            Attack['kill'](seqtmp415['lut26'](getLocaleString, 0xc27));
            Pickit['pickItems']();
        }
    }
    if (!Pather['moveToExit'](0x11, true)) {
        throw new Error('Failed to move to Burial Grounds');
    }
    if (true) {
        if (seqtmp415['lut31'](seqtmp415['lut32'], seqtmp415['lut32'])) {
            Pather['moveToPreset'](0x11, 0x1, 0x325, 0x0, 0x0, false, true);
            Attack['kill'](getLocaleString(0xc27));
            Pickit['pickItems']();
        } else {
            if (!(Pather['moveToExit'](0x11, true) && Pather['moveToPreset'](0x11, 0x5, 0x6, 0x5, 0x0) && Pather['moveToExit'](0x12, true))) {
                return false;
            }
            Attack['clearLevel'](Config['ClearType']);
        }
    }
    if (!Pather['moveToExit'](0x13, true)) {
        if (seqtmp415['lut33'](seqtmp415['lut34'], seqtmp415['lut35'])) {
            return false;
        } else {
            throw new Error(seqtmp415['lut27']);
        }
    }
    Attack['clearLevel'](Config['ClearType']);
    if (true) {
        if (!(Pather['moveToExit'](0x11, true) && Pather['moveToPreset'](0x11, 0x5, 0x6, 0x5, 0x0) && Pather['moveToExit'](0x12, true))) {
            return false;
        }
        Attack['clearLevel'](Config['ClearType']);
    }
    return true;
}

function cave(seqtmp540, seqtmp541) {
    var seqtmp542 = {};
    seqtmp542['lut36'] = 'starting cave';
    seqtmp542['lut37'] = function (seqtmp545, seqtmp546) {
        return seqtmp545 === seqtmp546;
    };
    let seqtmp549 = function () {
        switch (me['diff']) {
        case 0x0:
            return 0x7;
        case 0x1:
            return 0x1e;
        default:
            return 0x1;
        }
    };
    if (me['charlvl'] >= seqtmp549()) {
        return true;
    }
    me['overhead'](seqtmp542['lut36']);
    Town['doChores']();
    if (!Pather['checkWP'](0x3)) {
        Pather['getWP'](0x3, true);
    } else {
        Pather['useWaypoint'](0x3);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToExit']([0x9, 0xd], true, seqtmp541)) {
        return false;
    }
    if (seqtmp542['lut37'](me['area'], 0xd)) {
        let seqtmp554 = [{
            'x': 0x1d7d,
            'y': 0x310a,
            'radius': 0xa
        }, {
            'x': 0x1d88,
            'y': 0x3107,
            'radius': 0xa
        }, {
            'x': 0x1d95,
            'y': 0x3106,
            'radius': 0xa
        }, {
            'x': 0x1d98,
            'y': 0x3113,
            'radius': 0xa
        }, {
            'x': 0x1da2,
            'y': 0x3114,
            'radius': 0xa
        }, {
            'x': 0x1dac,
            'y': 0x3117,
            'radius': 0xa
        }, {
            'x': 0x1dac,
            'y': 0x3122,
            'radius': 0xa
        }, {
            'x': 0x1db6,
            'y': 0x310f,
            'radius': 0xa
        }, {
            'x': 0x1dbc,
            'y': 0x3105,
            'radius': 0xa
        }, {
            'x': 0x1dbb,
            'y': 0x30fc,
            'radius': 0xa
        }, {
            'x': 0x1db8,
            'y': 0x30f0,
            'radius': 0xa
        }, {
            'x': 0x1dab,
            'y': 0x30f1,
            'radius': 0xa
        }, {
            'x': 0x1da4,
            'y': 0x30e7,
            'radius': 0xa
        }, {
            'x': 0x1d96,
            'y': 0x30e8,
            'radius': 0xa
        }, {
            'x': 0x1d8c,
            'y': 0x30eb,
            'radius': 0xa
        }, {
            'x': 0x1d90,
            'y': 0x3117,
            'radius': 0xa
        }, {
            'x': 0x1d8d,
            'y': 0x311e,
            'radius': 0xa
        }, {
            'x': 0x1d88,
            'y': 0x3127,
            'radius': 0xa
        }, {
            'x': 0x1d82,
            'y': 0x3122,
            'radius': 0xa
        }, {
            'x': 0x1d7a,
            'y': 0x311d,
            'radius': 0xa
        }, {
            'x': 0x1d71,
            'y': 0x311d,
            'radius': 0xa
        }, {
            'x': 0x1d68,
            'y': 0x311e,
            'radius': 0xa
        }, {
            'x': 0x1d5f,
            'y': 0x311f,
            'radius': 0xa
        }, {
            'x': 0x1d56,
            'y': 0x3116,
            'radius': 0xa
        }, {
            'x': 0x1d56,
            'y': 0x3128,
            'radius': 0xa
        }, {
            'x': 0x1d5a,
            'y': 0x3131,
            'radius': 0xa
        }, {
            'x': 0x1d61,
            'y': 0x3133,
            'radius': 0xa
        }, {
            'x': 0x1d66,
            'y': 0x3138,
            'radius': 0xa
        }, {
            'x': 0x1d65,
            'y': 0x313e,
            'radius': 0xa
        }, {
            'x': 0x1d6f,
            'y': 0x3134,
            'radius': 0xa
        }, {
            'x': 0x1d77,
            'y': 0x3134,
            'radius': 0xa
        }, {
            'x': 0x1d7e,
            'y': 0x3134,
            'radius': 0xa
        }, {
            'x': 0x1d85,
            'y': 0x3133,
            'radius': 0xa
        }, {
            'x': 0x1d84,
            'y': 0x313d,
            'radius': 0xa
        }, {
            'x': 0x1d84,
            'y': 0x3143,
            'radius': 0xa
        }, {
            'x': 0x1d8e,
            'y': 0x3140,
            'radius': 0xa
        }, {
            'x': 0x1d9c,
            'y': 0x3145,
            'radius': 0xa
        }, {
            'x': 0x1da5,
            'y': 0x3142,
            'radius': 0xa
        }, {
            'x': 0x1daa,
            'y': 0x3139,
            'radius': 0xa
        }, {
            'x': 0x1db0,
            'y': 0x3139,
            'radius': 0xa
        }];
        Attack['clearCoordList'](seqtmp554, 0xa);
        return true;
    }
    return false;
}

function tree() {
    var seqtmp642 = {};
    seqtmp642['lut38'] = function (seqtmp644, seqtmp645) {
        return seqtmp644 === seqtmp645;
    };
    seqtmp642['lut39'] = 'rval9';
    seqtmp642['lut40'] = function (seqtmp650, seqtmp651) {
        return seqtmp650 !== seqtmp651;
    };
    seqtmp642['lut41'] = 'rval10';
    if (Packet['checkQuest'](0x4, 0x4)) {
        return true;
    }
    if (me['getItem'](0x20c) || me['getItem'](0x20d)) {
        return true;
    }
    me['overhead']('starting tree');
    Town['doChores']();
    if (!Pather['checkWP'](0x5)) {
        if (seqtmp642['lut38'](seqtmp642['lut39'], seqtmp642['lut39'])) {
            Pather['getWP'](0x5, true);
        } else {
            Pather['getWP'](0x5, true);
        }
    } else {
        Pather['useWaypoint'](0x5);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToPreset'](me['area'], 0x1, 0x2e2, 0x0, 0x0, true)) {
        if (seqtmp642['lut40'](seqtmp642['lut41'], 'rval10')) {
            return true;
        } else {
            return false;
        }
    }
    Attack['clear'](0x14);
    return Quest['getItem'](0x20c, 0x1e);
}

function cain() {
    var seqtmp746 = {};
    seqtmp746['lut42'] = 'akara';
    seqtmp746['lut43'] = 'starting cain';
    seqtmp746['lut44'] = function (seqtmp750, seqtmp751) {
        return seqtmp750 !== seqtmp751;
    };
    seqtmp746['lut45'] = 'rval11';
    seqtmp746['lut46'] = function (seqtmp756, seqtmp757) {
        return seqtmp756(seqtmp757);
    };
    seqtmp746['lut47'] = function (seqtmp761, seqtmp762) {
        return seqtmp761 === seqtmp762;
    };
    seqtmp746['lut48'] = 'rval12';
    seqtmp746['lut49'] = function (seqtmp767, seqtmp768) {
        return seqtmp767 < seqtmp768;
    };
    seqtmp746['lut50'] = function (seqtmp772, seqtmp773) {
        return seqtmp772 === seqtmp773;
    };
    seqtmp746['lut51'] = 'rval13';
    seqtmp746['lut52'] = 'rval14';
    seqtmp746['lut53'] = function (seqtmp779) {
        return seqtmp779();
    };
    seqtmp746['lut54'] = function (seqtmp782) {
        return seqtmp782();
    };
    seqtmp746['lut55'] = function (seqtmp785, seqtmp786) {
        return seqtmp785(seqtmp786);
    };
    seqtmp746['lut56'] = function (seqtmp790, seqtmp791) {
        return seqtmp790 < seqtmp791;
    };
    seqtmp746['lut57'] = function (seqtmp795, seqtmp796) {
        return seqtmp795 === seqtmp796;
    };
    seqtmp746['lut58'] = 'rval15';
    seqtmp746['lut59'] = 'rval16';
    seqtmp746['lut60'] = function (seqtmp556c1, seqtmp803) {
        return seqtmp556c1 !== seqtmp803;
    };
    seqtmp746['lut61'] = 'rval17';
    seqtmp746['lut62'] = function (seqtmp808, seqtmp809) {
        return seqtmp808(seqtmp809);
    };
    seqtmp746['lut63'] = function (seqtmp813, seqtmp814, seqtmp815) {
        return seqtmp813(seqtmp814, seqtmp815);
    };
    if (Packet['checkQuest'](0x4, 0x1)) {
        Quest['talkTo'](seqtmp746['lut42'], seqtmp746['lut42']);
    }
    if (Packet['checkQuest'](0x4, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp746['lut43']);
    Town['doChores']();
    if (me['getItem'](0x20c)) {
        Quest['talkTo'](seqtmp746['lut42'], 'akara');
    }
    if (!Pather['checkWP'](0x4)) {
        Pather['getWP'](0x4, true);
    } else {
        if (seqtmp746['lut44']('rval11', seqtmp746['lut45'])) {
            Quest['talkTo']('akara', seqtmp746['lut42']);
        } else {
            Pather['useWaypoint'](0x4);
        }
    }
    if (!Pather['moveToPreset'](me['area'], 0x1, 0x2e1, 0x14, 0x0, true)) {
        return false;
    }
    try {
        Attack['clear'](0xf, 0x0, seqtmp746['lut46'](getLocaleString, 0xb38));
    } catch (seqtmp827) {
        Attack['clear'](0x14);
    }
    if (me['getItem'](0x20d)) {
        if (seqtmp746['lut47'](seqtmp746['lut48'], seqtmp746['lut48'])) {
            let seqtmp831;
            for (let seqtmp832 = 0x0; seqtmp832 < 0x5; seqtmp832 += 0x1) {
                for (let seqtmp835 = 0x11; seqtmp746['lut49'](seqtmp835, 0x16); seqtmp835 += 0x1) {
                    if (seqtmp746['lut50'](seqtmp746['lut51'], seqtmp746['lut51'])) {
                        seqtmp831 = getUnit(0x2, seqtmp835);
                        if (seqtmp831) {
                            if (seqtmp746['lut52'] === seqtmp746['lut52']) {
                                Misc['openChest'](seqtmp831);
                                Attack['clear'](0xa);
                            } else {
                                Quest['talkTo'](seqtmp746['lut42'], seqtmp746['lut42']);
                            }
                        }
                    } else {
                        return false;
                    }
                }
            }
        } else {
            let seqtmp850 = [{
                'x': 0x624e,
                'y': 0x13f4,
                'radius': 0xa
            }, {
                'x': 0x624c,
                'y': 0x13fb,
                'radius': 0xa
            }, {
                'x': 0x624b,
                'y': 0x1401,
                'radius': 0xa
            }, {
                'x': 0x6246,
                'y': 0x1406,
                'radius': 0xa
            }, {
                'x': 0x623f,
                'y': 0x1405,
                'radius': 0xa
            }, {
                'x': 0x6239,
                'y': 0x1409,
                'radius': 0xa
            }, {
                'x': 0x6236,
                'y': 0x140f,
                'radius': 0xa
            }];
            Attack['clearCoordList'](seqtmp850);
            let seqtmp852 = getUnit(0x2, 0x1a);
            if (seqtmp852 && Misc['openChest'](seqtmp852)) {
                Town['goToTown']();
                if (Packet['checkQuest'](0x4, 0x1)) {
                    Quest['talkTo']('akara', seqtmp746['lut42']);
                }
            }
        }
    }
    let seqtmp856 = seqtmp746['lut53'](getTickCount);
    while (!Pather['getPortal'](0x26) && seqtmp746['lut54'](getTickCount) - seqtmp856 < 0x9c40) {
        Attack['clear'](0xa);
        seqtmp746['lut55'](delay, 0x32);
    }
    if (!Pather['getPortal'](0x26)) {
        return false;
    }
    for (let seqtmp832 = 0x0; seqtmp746['lut56'](seqtmp832, 0xa); seqtmp832 += 0x1) {
        if (seqtmp746['lut57'](seqtmp746['lut58'], seqtmp746['lut59'])) {
            Pather['getWP'](0x4, true);
        } else {
            if (Pather['usePortal'](0x26)) {
                if (seqtmp746['lut60'](seqtmp746['lut61'], 'rval17')) {
                    Quest['talkTo']('akara', 'akara');
                } else {
                    break;
                }
            }
            seqtmp746['lut62'](delay, 0x64);
        }
    }
    if (me['area'] === 0x26) {
        let seqtmp871 = [{
            'x': 0x624e,
            'y': 0x13f4,
            'radius': 0xa
        }, {
            'x': 0x624c,
            'y': 0x13fb,
            'radius': 0xa
        }, {
            'x': 0x624b,
            'y': 0x1401,
            'radius': 0xa
        }, {
            'x': 0x6246,
            'y': 0x1406,
            'radius': 0xa
        }, {
            'x': 0x623f,
            'y': 0x1405,
            'radius': 0xa
        }, {
            'x': 0x6239,
            'y': 0x1409,
            'radius': 0xa
        }, {
            'x': 0x6236,
            'y': 0x140f,
            'radius': 0xa
        }];
        Attack['clearCoordList'](seqtmp871);
        let seqtmp873 = seqtmp746['lut63'](getUnit, 0x2, 0x1a);
        if (seqtmp873 && Misc['openChest'](seqtmp873)) {
            Town['goToTown']();
            if (Packet['checkQuest'](0x4, 0x1)) {
                Quest['talkTo'](seqtmp746['lut42'], 'akara');
            }
        }
    }
    return Packet['checkQuest'](0x4, 0x0);
}

function trist(seqtmp962, seqtmp963) {
    var seqtmp964 = {};
    seqtmp964['lut65'] = function (seqtmp966, seqtmp967) {
        return seqtmp966 >= seqtmp967;
    };
    seqtmp964['lut66'] = 'rval18';
    seqtmp964['lut67'] = function (seqtmp972, seqtmp973) {
        return seqtmp972 == seqtmp973;
    };
    seqtmp964['lut68'] = 'rval19';
    seqtmp964['lut69'] = function (seqtmp978, seqtmp979) {
        return seqtmp978 != seqtmp979;
    };
    seqtmp964['lut70'] = function (seqtmp983, seqtmp984) {
        return seqtmp983 === seqtmp984;
    };
    seqtmp964['lut71'] = 'rval20';
    seqtmp964['lut72'] = function (seqtmp989, seqtmp990) {
        return seqtmp989(seqtmp990);
    };
    seqtmp964['lut73'] = function (seqtmp994, seqtmp995) {
        return seqtmp994 !== seqtmp995;
    };
    seqtmp964['lut74'] = 'rval21';
    seqtmp964['lut75'] = 'rval22';
    let seqtmp1000 = function () {
        switch (me['diff']) {
        case 0x0:
            return 0xf;
        case 0x1:
            return 0x25;
        default:
            return 0x1;
        }
    };
    if (seqtmp964['lut65'](me['charlvl'], seqtmp1000())) {
        if (seqtmp964['lut66'] !== seqtmp964['lut66']) {
            Attack['clear'](0x14);
        } else {
            return true;
        }
    }
    me['overhead']('starting trist');
    Town['doChores']();
    if (seqtmp964['lut67'](me['act'], 0x1)) {
        if (seqtmp964['lut68'] === seqtmp964['lut68']) {
            if (Pather['getPortal'](0x26)) {
                Pather['usePortal'](0x26, me['name']);
            }
        } else {
            switch (me['diff']) {
            case 0x0:
                return 0xf;
            case 0x1:
                return 0x25;
            default:
                return 0x1;
            }
        }
    }
    if (seqtmp964['lut69'](me['area'], 0x26)) {
        if (!Pather['checkWP'](0x4)) {
            Pather['getWP'](0x4, true);
        } else {
            if (seqtmp964['lut70'](seqtmp964['lut71'], seqtmp964['lut71'])) {
                Pather['useWaypoint'](0x4);
            } else {
                if (Pather['getPortal'](0x26)) {
                    Pather['usePortal'](0x26, me['name']);
                }
            }
        }
        if (!Pather['moveToPreset'](me['area'], 0x1, 0x2e1, 0x0, 0x0, seqtmp963)) {
            return false;
        }
        try {
            Attack['clear'](0xf, 0x0, seqtmp964['lut72'](getLocaleString, 0xb38));
        } catch (seqtmp1014) {
            if (seqtmp964['lut73']('wOaKI', seqtmp964['lut74'])) {
                Attack['clear'](0x14);
            } else {
                Pather['useWaypoint'](0x4);
            }
        }
        Pather['usePortal'](0x26);
    }
    if (me['area'] === 0x26) {
        if (seqtmp964['lut73']('hsdfg', seqtmp964['lut75'])) {
            let seqtmp1019 = [{
                'x': 0x6258,
                'y': 0x1408,
                'radius': 0x14
            }, {
                'x': 0x6257,
                'y': 0x1419,
                'radius': 0x14
            }, {
                'x': 0x6253,
                'y': 0x1427,
                'radius': 0x14
            }, {
                'x': 0x624e,
                'y': 0x143a,
                'radius': 0x14
            }, {
                'x': 0x6255,
                'y': 0x1448,
                'radius': 0x14
            }, {
                'x': 0x6241,
                'y': 0x144e,
                'radius': 0x14
            }, {
                'x': 0x6230,
                'y': 0x1445,
                'radius': 0x14
            }, {
                'x': 0x6227,
                'y': 0x142f,
                'radius': 0x14
            }, {
                'x': 0x6220,
                'y': 0x141c,
                'radius': 0x14
            }, {
                'x': 0x620d,
                'y': 0x1410,
                'radius': 0x14
            }, {
                'x': 0x621f,
                'y': 0x13f2,
                'radius': 0x14
            }, {
                'x': 0x6221,
                'y': 0x13d8,
                'radius': 0x14
            }, {
                'x': 0x621f,
                'y': 0x13c5,
                'radius': 0x14
            }, {
                'x': 0x1345,
                'y': 0x110b,
                'radius': 0x14
            }];
            Attack['clearCoordList'](seqtmp1019);
        } else {
            return true;
        }
    }
    return true;
}

function countess(seqtmp1105, seqtmp1106) {
    var seqtmp1107 = {};
    seqtmp1107['lut77'] = function (seqtmp1109) {
        return seqtmp1109();
    };
    seqtmp1107['lut78'] = function (seqtmp1112, seqtmp1113) {
        return seqtmp1112 !== seqtmp1113;
    };
    seqtmp1107['lut79'] = 'starting countess';
    seqtmp1107['lut80'] = function (seqtmp1118, seqtmp1119) {
        return seqtmp1118 !== seqtmp1119;
    };
    seqtmp1107['lut81'] = 'rval23';
    seqtmp1107['lut82'] = function (seqtmp1124, seqtmp1125) {
        return seqtmp1124(seqtmp1125);
    };
    let seqtmp1128 = function () {
        switch (me['diff']) {
        case 0x0:
            return 0xf;
        case 0x1:
            return 0x25;
        default:
            return 0x1;
        }
    };
    if (me['charlvl'] >= seqtmp1107['lut77'](seqtmp1128) && seqtmp1105) {
        return true;
    }
    if (Packet['checkQuest'](0x5, 0x0) && !seqtmp1105 && seqtmp1107['lut78'](me['diff'], 0x1)) {
        return true;
    }
    me['overhead'](seqtmp1107['lut79']);
    Town['doChores']();
    if (!Pather['checkWP'](0x6)) {
        Pather['getWP'](0x6, seqtmp1106);
    } else {
        Pather['useWaypoint'](0x6);
    }
    Pather['moveToExit']([0x14, 0x15, 0x16, 0x17, 0x18, 0x19], true, seqtmp1106);
    Pather['moveToPreset'](me['area'], 0x2, 0x244, 0x0, 0x0, seqtmp1106);
    try {
        if (seqtmp1107['lut80'](seqtmp1107['lut81'], seqtmp1107['lut81'])) {
            switch (me['diff']) {
            case 0x0:
                return 0xf;
            case 0x1:
                return 0x25;
            default:
                return 0x1;
            }
        } else {
            Attack['clear'](0x14, 0x0, seqtmp1107['lut82'](getLocaleString, 0xb3b));
        }
    } catch (seqtmp1142) {}
    Pickit['pickItems']();
    return true;
}

function andariel(seqtmp1227, seqtmp1228) {
    var seqtmp1229 = {};
    seqtmp1229['lut83'] = 'rval24';
    seqtmp1229['lut84'] = 'starting andariel';
    seqtmp1229['lut85'] = 'rval25';
    seqtmp1229['lut86'] = function (seqtmp1234, seqtmp1235) {
        return seqtmp1234 === seqtmp1235;
    };
    seqtmp1229['lut87'] = 'rval26';
    seqtmp1229['lut88'] = function (seqtmp1240, seqtmp1241) {
        return seqtmp1240 === seqtmp1241;
    };
    seqtmp1229['lut89'] = 'rval27';
    seqtmp1229['lut90'] = '2|1|0|4|3';
    seqtmp1229['lut91'] = 'warriv';
    seqtmp1229['lut92'] = function (seqtmp1248, seqtmp1249) {
        return seqtmp1248(seqtmp1249);
    };
    seqtmp1229['lut93'] = 'quit';
    if (Packet['checkQuest'](0x6, 0x1)) {
        Quest['talkTo']('warriv', 'warriv');
        Quest['changeAct'](0x2);
    }
    if (!Pather['accessToAct'](0x2) && seqtmp1227) {
        return false;
    }
    if (Pather['accessToAct'](0x2) && !seqtmp1227) {
        if (seqtmp1229['lut83'] !== 'dfdvb') {
            return true;
        } else {
            Pather['moveTo'](0x5823, 0x2554);
        }
    }
    me['overhead'](seqtmp1229['lut84']);
    Town['doChores']();
    if (!Pather['checkWP'](0x23)) {
        Pather['getWP'](0x23, seqtmp1228);
    } else {
        if (seqtmp1229['lut85'] !== 'uyojk') {
            Pather['useWaypoint'](0x23);
        } else {
            Town['stackPotions'](0x202);
        }
    }
    Precast['doPrecast'](true);
    Pather['moveToExit']([0x24, 0x25], true, seqtmp1228);
    if (!seqtmp1227) {
        Town['stackPotions'](0x202);
    }
    if (seqtmp1228) {
        let seqtmp1262 = [{
            'x': 0x5840,
            'y': 0x25a8,
            'radius': 0x14
        }, {
            'x': 0x5827,
            'y': 0x259f,
            'radius': 0x14
        }, {
            'x': 0x5800,
            'y': 0x25a7,
            'radius': 0x14
        }, {
            'x': 0x5826,
            'y': 0x2573,
            'radius': 0x14
        }, {
            'x': 0x5813,
            'y': 0x2569,
            'radius': 0x14
        }];
        Attack['clearCoordList'](seqtmp1262, 0xa);
    } else {
        Pather['moveTo'](0x5823, 0x2554);
    }
    try {
        if (seqtmp1229['lut86'](seqtmp1229['lut87'], seqtmp1229['lut87'])) {
            Attack['kill'](0x9c);
        } else {
            Pather['getWP'](0x23, seqtmp1228);
        }
    } catch (seqtmp1268) {
        if (seqtmp1229['lut88']('brdfg', 'brdfg')) {
            Attack['clear'](0x1e);
        } else {
            Attack['kill'](0x9c);
        }
    }
    Pickit['pickItems']();
    Town['goToTown']();
    if (!seqtmp1227) {
        if (seqtmp1229['lut88'](seqtmp1229['lut89'], seqtmp1229['lut89'])) {
            var seqtmp1274 = seqtmp1229['lut90']['split']('|'),
                seqtmp1276 = 0x0;
            while (true) {
                switch (seqtmp1274[seqtmp1276++]) {
                case '0':
                    delay(0x7d0);
                    continue;
                case '1':
                    Quest['changeAct'](0x2);
                    continue;
                case '2':
                    Quest['talkTo'](seqtmp1229['lut91'], 'warriv');
                    continue;
                case '3':
                    seqtmp1229['lut92'](delay, 0x1388);
                    continue;
                case '4':
                    scriptBroadcast(seqtmp1229['lut93']);
                    continue;
                }
                break;
            }
        } else {
            return true;
        }
    }
    return Pather['accessToAct'](0x2);
}

function radament(seqtmp1368, seqtmp1369) {
    var seqtmp1370 = {};
    seqtmp1370['lut94'] = 'atma';
    seqtmp1370['lut95'] = function (seqtmp1373, seqtmp1374) {
        return seqtmp1373 === seqtmp1374;
    };
    seqtmp1370['lut96'] = 'starting radament';
    seqtmp1370['lut97'] = function (seqtmp1379, seqtmp1380) {
        return seqtmp1379 !== seqtmp1380;
    };
    seqtmp1370['lut98'] = 'rval28';
    seqtmp1370['lut99'] = 'rval29';
    seqtmp1370['lut100'] = function (seqtmp1386, seqtmp1387) {
        return seqtmp1386 + seqtmp1387;
    };
    if (Packet['checkQuest'](0x9, 0x1)) {
        Town['goToTown'](0x2);
        Quest['talkTo'](seqtmp1370['lut94'], seqtmp1370['lut94']);
        return true;
    }
    if (Packet['checkQuest'](0x9, 0x0)) {
        if (seqtmp1370['lut95']('dbrtf', 'dbrtf')) {
            return true;
        } else {
            Town['goToTown']();
        }
    }
    me['overhead'](seqtmp1370['lut96']);
    Town['doChores']();
    if (!Pather['checkWP'](0x30)) {
        if (seqtmp1370['lut97'](seqtmp1370['lut98'], seqtmp1370['lut99'])) {
            Pather['getWP'](0x30, seqtmp1369);
        } else {
            Pather['getWP'](0x30, seqtmp1369);
        }
    } else {
        Pather['useWaypoint'](0x30);
    }
    if (!Pather['moveToExit'](0x31, true, seqtmp1369)) return false;
    if (!Pather['moveToPreset'](0x31, 0x2, 0x163, 0x5, 0x0, seqtmp1369)) {
        return false;
    }
    if (!Attack['canAttack'](getUnit(0x1, 0xe5))) {
        return true;
    }
    try {
        Attack['clear'](0xf, 0x0, 0xe5);
    } catch (seqtmp1401) {
        Attack['clear'](0x14);
    }
    Pickit['pickItems']();
    Quest['useItem'](0x228);
    if (!me['inTown']) {
        Town['goToTown']();
    }
    Quest['talkTo'](seqtmp1370['lut94'], seqtmp1370['lut94']);
    delay(seqtmp1370['lut100'](me['ping'], 0x3e8));
    return Packet['checkQuest'](0x9, 0x0);
}

function cube() {
    var seqtmp1491 = {};
    seqtmp1491['lut101'] = 'starting cube';
    if (me['getItem'](0x225)) {
        return true;
    }
    me['overhead'](seqtmp1491['lut101']);
    Town['doChores']();
    if (!Pather['checkWP'](0x39)) {
        Pather['getWP'](0x39, true);
    } else {
        Pather['useWaypoint'](0x39);
    }
    Pather['moveToExit'](0x3c, true, true);
    Pather['moveToPreset'](me['area'], 0x2, 0x162, 0x0, 0x0, true);
    Attack['clear'](0x14);
    Quest['getItem'](0x225, 0x162);
    Quest['stashItem'](0x225);
    return me['getItem'](0x225);
}

function tunnels() {
    var seqtmp1578 = {};
    seqtmp1578['lut102'] = 'starting tunnels';
    seqtmp1578['lut103'] = function (seqtmp1581, seqtmp1582, seqtmp1583) {
        return seqtmp1581(seqtmp1582, seqtmp1583);
    };
    Config['TeleStomp'] = false;
    me['overhead'](seqtmp1578['lut102']);
    Town['doChores']();
    if (!Pather['checkWP'](0x2c)) {
        Pather['getWP'](0x2c);
    } else {
        Pather['useWaypoint'](0x2c);
    }
    Precast['doPrecast'](true);
    if (!Pather['journeyTo'](0x41, false)) {
        return true;
    }
    Attack['clearLevel']();
    Pather['moveToPreset'](me['area'], 0x2, 0x18d);
    Misc['openChest'](seqtmp1578['lut103'](getUnit, 0x2, 0x18d));
    Pickit['pickItems']();
    return true;
}

function amulet(seqtmp1675, seqtmp1676) {
    var seqtmp1677 = {};
    seqtmp1677['lut104'] = 'drognan';
    seqtmp1677['lut105'] = function (seqtmp1680, seqtmp1681) {
        return seqtmp1680 === seqtmp1681;
    };
    seqtmp1677['lut106'] = function (seqtmp1685, seqtmp1686) {
        return seqtmp1685 !== seqtmp1686;
    };
    seqtmp1677['lut107'] = 'rval30';
    seqtmp1677['lut108'] = 'rval31';
    seqtmp1677['lut109'] = 'rval32';
    seqtmp1677['lut110'] = 'rval33';
    seqtmp1677['lut111'] = 'rval34';
    seqtmp1677['lut112'] = function (seqtmp1695, seqtmp1696) {
        return seqtmp1695 !== seqtmp1696;
    };
    seqtmp1677['lut113'] = 'rval35';
    if (Packet['checkQuest'](0xa, 0x0) && Packet['checkQuest'](0xd, 0x0)) {
        if (seqtmp1677['lut106']('rval30', seqtmp1677['lut107'])) {
            if (seqtmp1676) {
                let seqtmp1703 = [{
                    'x': 0x3ac1,
                    'y': 0x36c4,
                    'radius': 0x28
                }, {
                    'x': 0x3ac5,
                    'y': 0x36cf,
                    'radius': 0x28
                }, {
                    'x': 0x3acc,
                    'y': 0x36d1,
                    'radius': 0x28
                }, {
                    'x': 0x3ad5,
                    'y': 0x36d2,
                    'radius': 0x28
                }, {
                    'x': 0x3adb,
                    'y': 0x36db,
                    'radius': 0x28
                }, {
                    'x': 0x3add,
                    'y': 0x36e5,
                    'radius': 0x28
                }, {
                    'x': 0x3adc,
                    'y': 0x36f0,
                    'radius': 0x28
                }, {
                    'x': 0x3ad3,
                    'y': 0x36f5,
                    'radius': 0x28
                }, {
                    'x': 0x3ac9,
                    'y': 0x36f7,
                    'radius': 0x28
                }, {
                    'x': 0x3acb,
                    'y': 0x36ed,
                    'radius': 0x28
                }, {
                    'x': 0x3ac6,
                    'y': 0x36e7,
                    'radius': 0x28
                }];
                Skill['usePvpRange'] = true;
                Attack['clearCoordList'](seqtmp1703);
            }
            if (!Quest['getItem'](0x209, 0x95) || !Town['goToTown']()) {
                return false;
            }
            Quest['stashItem'](0x209);
            Quest['talkTo']('drognan', seqtmp1677['lut104']);
        } else {
            return true;
        }
    }
    if (me['getItem'](0x209) || me['getItem'](0x5b) || Packet['checkQuest'](0xa, 0x0)) {
        return true;
    }
    me['overhead']('starting amulet');
    Town['doChores']();
    Pather['teleport'] = !!me['getSkill'](0x36, 0x0);
    if (!Pather['checkWP'](0x2c)) {
        if (seqtmp1677['lut105'](seqtmp1677['lut108'], seqtmp1677['lut109'])) {
            let seqtmp1709 = [{
                'x': 0x3ac1,
                'y': 0x36c4,
                'radius': 0x28
            }, {
                'x': 0x3ac5,
                'y': 0x36cf,
                'radius': 0x28
            }, {
                'x': 0x3acc,
                'y': 0x36d1,
                'radius': 0x28
            }, {
                'x': 0x3ad5,
                'y': 0x36d2,
                'radius': 0x28
            }, {
                'x': 0x3adb,
                'y': 0x36db,
                'radius': 0x28
            }, {
                'x': 0x3add,
                'y': 0x36e5,
                'radius': 0x28
            }, {
                'x': 0x3adc,
                'y': 0x36f0,
                'radius': 0x28
            }, {
                'x': 0x3ad3,
                'y': 0x36f5,
                'radius': 0x28
            }, {
                'x': 0x3ac9,
                'y': 0x36f7,
                'radius': 0x28
            }, {
                'x': 0x3acb,
                'y': 0x36ed,
                'radius': 0x28
            }, {
                'x': 0x3ac6,
                'y': 0x36e7,
                'radius': 0x28
            }];
            Skill['usePvpRange'] = true;
            Attack['clearCoordList'](seqtmp1709);
        } else {
            Pather['getWP'](0x2c, seqtmp1676);
        }
    } else {
        Pather['useWaypoint'](0x2c);
    }
    if (me['area'] === 0x2c) {
        Pather['moveToExit']([0x2d, 0x3a, 0x3d], true, seqtmp1676);
        if (seqtmp1677['lut105'](me['area'], 0x3d)) {
            if (seqtmp1677['lut106'](seqtmp1677['lut110'], seqtmp1677['lut111'])) {
                if (seqtmp1676) {
                    if (seqtmp1677['lut112'](seqtmp1677['lut113'], seqtmp1677['lut113'])) {
                        Pather['moveToExit']([0x2d, 0x3a, 0x3d], true, seqtmp1676);
                        if (seqtmp1677['lut105'](me['area'], 0x3d)) {
                            if (seqtmp1676) {
                                let seqtmp1724 = [{
                                    'x': 0x3ac1,
                                    'y': 0x36c4,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3ac5,
                                    'y': 0x36cf,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3acc,
                                    'y': 0x36d1,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3ad5,
                                    'y': 0x36d2,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3adb,
                                    'y': 0x36db,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3add,
                                    'y': 0x36e5,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3adc,
                                    'y': 0x36f0,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3ad3,
                                    'y': 0x36f5,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3ac9,
                                    'y': 0x36f7,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3acb,
                                    'y': 0x36ed,
                                    'radius': 0x28
                                }, {
                                    'x': 0x3ac6,
                                    'y': 0x36e7,
                                    'radius': 0x28
                                }];
                                Skill['usePvpRange'] = true;
                                Attack['clearCoordList'](seqtmp1724);
                            }
                            if (!Quest['getItem'](0x209, 0x95) || !Town['goToTown']()) {
                                return false;
                            }
                            Quest['stashItem'](0x209);
                            Quest['talkTo'](seqtmp1677['lut104'], seqtmp1677['lut104']);
                        }
                    } else {
                        let seqtmp1728 = [{
                            'x': 0x3ac1,
                            'y': 0x36c4,
                            'radius': 0x28
                        }, {
                            'x': 0x3ac5,
                            'y': 0x36cf,
                            'radius': 0x28
                        }, {
                            'x': 0x3acc,
                            'y': 0x36d1,
                            'radius': 0x28
                        }, {
                            'x': 0x3ad5,
                            'y': 0x36d2,
                            'radius': 0x28
                        }, {
                            'x': 0x3adb,
                            'y': 0x36db,
                            'radius': 0x28
                        }, {
                            'x': 0x3add,
                            'y': 0x36e5,
                            'radius': 0x28
                        }, {
                            'x': 0x3adc,
                            'y': 0x36f0,
                            'radius': 0x28
                        }, {
                            'x': 0x3ad3,
                            'y': 0x36f5,
                            'radius': 0x28
                        }, {
                            'x': 0x3ac9,
                            'y': 0x36f7,
                            'radius': 0x28
                        }, {
                            'x': 0x3acb,
                            'y': 0x36ed,
                            'radius': 0x28
                        }, {
                            'x': 0x3ac6,
                            'y': 0x36e7,
                            'radius': 0x28
                        }];
                        Skill['usePvpRange'] = true;
                        Attack['clearCoordList'](seqtmp1728);
                    }
                }
                if (!Quest['getItem'](0x209, 0x95) || !Town['goToTown']()) {
                    return false;
                }
                Quest['stashItem'](0x209);
                Quest['talkTo'](seqtmp1677['lut104'], seqtmp1677['lut104']);
            } else {
                Pather['useWaypoint'](0x2c);
            }
        }
    }
    return me['getItem'](0x209);
}

function summoner(seqtmp1816, seqtmp1817) {
    var seqtmp1818 = {};
    seqtmp1818['lut114'] = 'starting summoner';
    seqtmp1818['lut115'] = function (seqtmp1821, seqtmp1822) {
        return seqtmp1821 === seqtmp1822;
    };
    seqtmp1818['lut116'] = 'rval36';
    seqtmp1818['lut117'] = 'rval37';
    seqtmp1818['lut118'] = function (seqtmp1828, seqtmp1829, seqtmp1830, seqtmp1831) {
        return seqtmp1828(seqtmp1829, seqtmp1830, seqtmp1831);
    };
    seqtmp1818['lut119'] = function (seqtmp1837, seqtmp1838, seqtmp1839, seqtmp1840, seqtmp1841, seqtmp1842, seqtmp1843, seqtmp1844) {
        return seqtmp1837(seqtmp1838, seqtmp1839, seqtmp1840, seqtmp1841, seqtmp1842, seqtmp1843, seqtmp1844);
    };
    seqtmp1818['lut120'] = function (seqtmp1854, seqtmp1855) {
        return seqtmp1854 + seqtmp1855;
    };
    seqtmp1818['lut121'] = function (seqtmp1859, seqtmp1860) {
        return seqtmp1859 * seqtmp1860;
    };
    seqtmp1818['lut122'] = function (seqtmp1864, seqtmp1865) {
        return seqtmp1864(seqtmp1865);
    };
    seqtmp1818['lut123'] = 'Looking for a better telepad layout';
    seqtmp1818['lut124'] = 'rval38';
    seqtmp1818['lut125'] = function (seqtmp1871, seqtmp1872, seqtmp1873) {
        return seqtmp1871(seqtmp1872, seqtmp1873);
    };
    seqtmp1818['lut126'] = 'rval39';
    seqtmp1818['lut127'] = function (seqtmp1879, seqtmp1880) {
        return seqtmp1879 === seqtmp1880;
    };
    seqtmp1818['lut128'] = function (seqtmp1884, seqtmp1885) {
        return seqtmp1884 !== seqtmp1885;
    };
    seqtmp1818['lut129'] = 'rval40';
    if (Packet['checkQuest'](0xd, 0x0) && Pather['checkWP'](0x2e) && !seqtmp1816) {
        return true;
    }
    if (!Packet['checkQuest'](0xd, 0x0) && seqtmp1816) {
        return false;
    }
    if (!me['getItem'](0x209) && !me['getItem'](0x5b)) return false;
    me['overhead'](seqtmp1818['lut114']);
    Town['doChores']();
    let seqtmp1892 = me['getSkill'](0x36, 0x0);
    if (seqtmp1892) {
        Pather['teleport'] = true;
    }
    if (!Pather['checkWP'](0x34)) {
        Pather['getWP'](0x34, seqtmp1817);
    }
    if (!Pather['checkWP'](0x4a)) {
        if (me['area'] != 0x34) {
            if (seqtmp1818['lut115'](seqtmp1818['lut116'], seqtmp1818['lut117'])) {
                return false;
            } else {
                Pather['useWaypoint'](0x34);
            }
        }
        Pather['moveTo'](0x2773, 0x1a42, 0x3, seqtmp1817);
        Pather['moveTo'](0x2787, 0x1a53, 0x3, seqtmp1817);
        Pather['getWP'](0x4a, seqtmp1817);
    } else {
        Pather['useWaypoint'](0x4a);
    }
    if (me['area'] === 0x4a) {
        let seqtmp1901 = seqtmp1818['lut118'](getPresetUnit, me['area'], 0x2, 0x165);
        if (me['normal'] && !Pather['teleport']) {
            if (seqtmp1818['lut115'](seqtmp1818['lut119'](getPath, me['area'], me['x'], me['y'], seqtmp1901['roomx'] * 0x5 + seqtmp1901['x'], seqtmp1818['lut120'](seqtmp1818['lut121'](seqtmp1901['roomy'], 0x5), seqtmp1901['y']), 0x0, 0xa)['length'], 0x0)) {
                seqtmp1818['lut122'](print, seqtmp1818['lut123']);
                return false;
            }
        }
        let seqtmp1913 = {};
        if (!Pather['teleport']) {
            switch (seqtmp1901['roomx'] * 0x5 + seqtmp1901['x']) {
            case 0x61b3:
                seqtmp1913 = {};
                seqtmp1913['x'] = 0x61f9;
                seqtmp1913['y'] = 0x1546;
                break;
            case 0x650a:
                seqtmp1913 = {};
                seqtmp1913['x'] = 0x64e6;
                seqtmp1913['y'] = 0x1547;
                break;
            case 0x6357:
                switch (seqtmp1818['lut120'](seqtmp1901['roomy'] * 0x5, seqtmp1901['y'])) {
                case 0x1393:
                    seqtmp1913 = {};
                    seqtmp1913['x'] = 0x6369;
                    seqtmp1913['y'] = 0x13d9;
                    break;
                case 0x16e5:
                    seqtmp1913 = {};
                    seqtmp1913['x'] = 0x6372;
                    seqtmp1913['y'] = 0x16d1;
                    break;
                }
                break;
            }
        } else {
            if ('rval38' !== seqtmp1818['lut124']) {
                Pather['useWaypoint'](0x4a);
            } else {
                seqtmp1913 = seqtmp1901;
            }
        }
        Pather['moveToUnit'](seqtmp1913, 0x0, 0x0, seqtmp1817);
        Skill['usePvpRange'] = true;
        try {
            Attack['kill'](0xfa);
        } catch (seqtmp1936) {
            Attack['clear'](0x14);
        }
        Skill['usePvpRange'] = false;
        Pather['moveToPreset'](me['area'], 0x2, 0x165, 0x0, 0x0, true);
        Pickit['pickItems']();
        if (!seqtmp1816) {
            let seqtmp1938 = seqtmp1818['lut125'](getUnit, 0x2, 0x165);
            for (let seqtmp1940 = 0x0; seqtmp1940 < 0x5; seqtmp1940 += 0x1) {
                Pather['moveToUnit'](seqtmp1938);
                seqtmp1938['interact']();
                seqtmp1818['lut122'](delay, 0x7d0);
                me['cancel']();
                if (Pather['getPortal'](0x2e)) {
                    if (seqtmp1818['lut126'] === 'dcavf') {
                        Pather['getWP'](0x34, seqtmp1817);
                    } else {
                        break;
                    }
                }
            }
            Pather['usePortal'](0x2e);
            if (seqtmp1818['lut127'](me['area'], 0x2e)) {
                if (seqtmp1818['lut128'](seqtmp1818['lut129'], seqtmp1818['lut129'])) {
                    return true;
                } else {
                    Pather['getWP'](0x2e, true);
                    Pather['useWaypoint'](0x28);
                }
            }
        }
    }
    return true;
}

function tomb() {
    var seqtmp1972 = {};
    seqtmp1972['lut131'] = function (seqtmp1974, seqtmp1975) {
        return seqtmp1974 > seqtmp1975;
    };
    seqtmp1972['lut132'] = function (seqtmp1979, seqtmp1980) {
        return seqtmp1979 >= seqtmp1980;
    };
    seqtmp1972['lut133'] = function (seqtmp1984, seqtmp1985) {
        return seqtmp1984 >= seqtmp1985;
    };
    seqtmp1972['lut134'] = function (seqtmp1989, seqtmp1990) {
        return seqtmp1989 == seqtmp1990;
    };
    seqtmp1972['lut135'] = function (seqtmp1994, seqtmp1995) {
        return seqtmp1994 < seqtmp1995;
    };
    seqtmp1972['lut136'] = function (seqtmp1999, seqtmp2000, seqtmp2001, seqtmp2002) {
        return seqtmp1999(seqtmp2000, seqtmp2001, seqtmp2002);
    };
    seqtmp1972['lut137'] = function (seqtmp2008, seqtmp2009, seqtmp2010, seqtmp2011) {
        return seqtmp2008(seqtmp2009, seqtmp2010, seqtmp2011);
    };
    seqtmp1972['lut138'] = function (seqtmp2017, seqtmp2018) {
        return seqtmp2017 >= seqtmp2018;
    };
    seqtmp1972['lut139'] = 'starting tomb';
    if (seqtmp1972['lut138'](me['charlvl'], 0x18)) {
        return true;
    }
    me['overhead'](seqtmp1972['lut139']);
    Town['doChores']();
    let seqtmp2024 = [0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48];
    seqtmp2024['some'](function (seqtmp2026) {
        if (!me['inTown']) {
            Town['doChores']();
        }
        Pather['teleport'] = seqtmp1972['lut131'](me['gold'], 0x9c40) && seqtmp1972['lut132'](me['charlvl'], 0x12);
        if (!Config['OpenChests'] && seqtmp1972['lut133'](me['charlvl'], 0x13)) {
            Config['OpenChests'] = true;
            Misc['updateConfig']();
        }
        Pather['useWaypoint'](0x2e);
        Pather['moveToExit'](seqtmp2026, true, true);
        if (seqtmp1972['lut134'](me['area'], seqtmp2026)) {
            for (let seqtmp2033 = 0x0; seqtmp1972['lut135'](seqtmp2033, 0x6); seqtmp2033 += 0x1) {
                try {
                    let seqtmp2037 = seqtmp1972['lut136'](getPresetUnit, me['area'], 0x2, 0x18d);
                    let seqtmp2039 = seqtmp1972['lut137'](getPresetUnit, me['area'], 0x2, 0x98);
                    if (seqtmp2037) {
                        if (Pather['moveToPreset'](me['area'], 0x2, 0x18d, 0x0, 0x0, true)) {
                            break;
                        }
                    } else if (seqtmp2039) {
                        if (Pather['moveToPreset'](me['area'], 0x2, 0x98, 0x0, 0x0, true)) {
                            break;
                        }
                    }
                } catch (seqtmp2043) {}
            }
            Attack['clear'](0x32);
            Pickit['pickItems']();
            Town['doChores']();
        }
        return seqtmp1972['lut133'](me['charlvl'], 0x18);
    });
    return seqtmp1972['lut138'](me['charlvl'], 0x18);
}

function shaft(seqtmp2130, seqtmp2131) {
    var seqtmp2132 = {};
    seqtmp2132['lut140'] = function (seqtmp2134, seqtmp2135) {
        return seqtmp2134 !== seqtmp2135;
    };
    seqtmp2132['lut141'] = 'rval41';
    seqtmp2132['lut142'] = 'starting shaft';
    seqtmp2132['lut143'] = 'rval42';
    seqtmp2132['lut144'] = function (seqtmp2142, seqtmp2143) {
        return seqtmp2142 === seqtmp2143;
    };
    if (Packet['checkQuest'](0xa, 0x0) || me['getItem'](0x5c) || me['getItem'](0x5b)) {
        if (seqtmp2132['lut140'](seqtmp2132['lut141'], seqtmp2132['lut141'])) {
            Quest['stashItem'](0x209);
        } else {
            return true;
        }
    }
    me['overhead'](seqtmp2132['lut142']);
    Town['doChores']();
    Pather['teleport'] = !!me['getSkill'](0x36, 0x0);
    if (!Pather['checkWP'](0x2b)) {
        Pather['getWP'](0x2b, seqtmp2131);
    } else {
        if ('aspX' === seqtmp2132['lut143']) {
            Pather['useWaypoint'](0x2b);
        } else {
            Pather['useWaypoint'](0x2b);
        }
    }
    Pather['moveToExit']([0x3e, 0x3f, 0x40], true, seqtmp2131);
    if (seqtmp2132['lut144'](me['area'], 0x40)) {
        Pather['moveToPreset'](me['area'], 0x2, 0x164, 0x0, 0x0, seqtmp2131);
        if (Quest['getItem'](0x5c, 0x164)) {
            Quest['stashItem'](0x209);
        }
    }
    return me['getItem'](0x5c);
}

function duriel(seqtmp2239, seqtmp2240) {
    var seqtmp2241 = {};
    seqtmp2241['lut145'] = function (seqtmp2243, seqtmp2244) {
        return seqtmp2243 < seqtmp2244;
    };
    seqtmp2241['lut146'] = function (seqtmp2248, seqtmp2249) {
        return seqtmp2248 !== seqtmp2249;
    };
    seqtmp2241['lut147'] = 'rval43';
    seqtmp2241['lut148'] = 'rval44';
    seqtmp2241['lut149'] = function (seqtmp2255, seqtmp2256) {
        return seqtmp2255(seqtmp2256);
    };
    seqtmp2241['lut150'] = function (seqtmp2260, seqtmp2261) {
        return seqtmp2260 <= seqtmp2261;
    };
    seqtmp2241['lut151'] = function (seqtmp2265, seqtmp2266, seqtmp2267) {
        return seqtmp2265(seqtmp2266, seqtmp2267);
    };
    seqtmp2241['lut152'] = function (seqtmp2272, seqtmp2273) {
        return seqtmp2272 === seqtmp2273;
    };
    seqtmp2241['lut153'] = 'rval45';
    seqtmp2241['lut154'] = function (seqtmp2278, seqtmp2279) {
        return seqtmp2278 + seqtmp2279;
    };
    seqtmp2241['lut155'] = function (seqtmp2283, seqtmp2284) {
        return seqtmp2283 * seqtmp2284;
    };
    seqtmp2241['lut156'] = function (seqtmp2288, seqtmp2289, seqtmp2290) {
        return seqtmp2288(seqtmp2289, seqtmp2290);
    };
    seqtmp2241['lut157'] = function (seqtmp2295) {
        return seqtmp2295();
    };
    seqtmp2241['lut158'] = function (seqtmp2298, seqtmp2299) {
        return seqtmp2298 < seqtmp2299;
    };
    seqtmp2241['lut159'] = function (seqtmp2303, seqtmp2304) {
        return seqtmp2303 - seqtmp2304;
    };
    seqtmp2241['lut160'] = function (seqtmp2308, seqtmp2309) {
        return seqtmp2308(seqtmp2309);
    };
    seqtmp2241['lut161'] = function (seqtmp2313, seqtmp2314) {
        return seqtmp2313 < seqtmp2314;
    };
    seqtmp2241['lut162'] = 'failed to move to act 3';
    seqtmp2241['lut163'] = function (seqtmp2319, seqtmp2320) {
        return seqtmp2319 !== seqtmp2320;
    };
    seqtmp2241['lut164'] = 'meshif';
    seqtmp2241['lut165'] = function (seqtmp2325, seqtmp2326) {
        return seqtmp2325 === seqtmp2326;
    };
    seqtmp2241['lut166'] = 'rval46';
    seqtmp2241['lut167'] = 'rval47';
    seqtmp2241['lut168'] = function (seqtmp2332, seqtmp2333) {
        return seqtmp2332 === seqtmp2333;
    };
    seqtmp2241['lut169'] = 'rval48';
    seqtmp2241['lut170'] = 'rval49';
    seqtmp2241['lut171'] = function (seqtmp2339, seqtmp2340) {
        return seqtmp2339 !== seqtmp2340;
    };
    seqtmp2241['lut172'] = 'jerhyn';
    seqtmp2241['lut173'] = 'rval50';
    seqtmp2241['lut174'] = 'rval51';
    seqtmp2241['lut175'] = function (seqtmp2347, seqtmp2348) {
        return seqtmp2347 !== seqtmp2348;
    };
    seqtmp2241['lut176'] = 'rval52';
    seqtmp2241['lut177'] = function (seqtmp2353, seqtmp2354) {
        return seqtmp2353 > seqtmp2354;
    };
    seqtmp2241['lut178'] = function (seqtmp2358) {
        return seqtmp2358();
    };
    seqtmp2241['lut179'] = function (seqtmp2361, seqtmp2362) {
        return seqtmp2361 === seqtmp2362;
    };
    seqtmp2241['lut180'] = function (seqtmp2366, seqtmp2367) {
        return seqtmp2366 === seqtmp2367;
    };
    seqtmp2241['lut181'] = 'rval53';
    seqtmp2241['lut182'] = 'rval54';
    seqtmp2241['lut183'] = function (seqtmp2373, seqtmp2374) {
        return seqtmp2373 < seqtmp2374;
    };
    seqtmp2241['lut184'] = function (seqtmp2378, seqtmp2379) {
        return seqtmp2378 != seqtmp2379;
    };
    seqtmp2241['lut185'] = function (seqtmp2383, seqtmp2384) {
        return seqtmp2383 === seqtmp2384;
    };
    seqtmp2241['lut186'] = 'rval55';
    seqtmp2241['lut187'] = 'rval56';
    seqtmp2241['lut188'] = 'rval57';
    seqtmp2241['lut189'] = 'rval58';
    seqtmp2241['lut190'] = function (seqtmp2392, seqtmp2393) {
        return seqtmp2392 == seqtmp2393;
    };
    seqtmp2241['lut191'] = function (seqtmp2397, seqtmp2398) {
        return seqtmp2397 === seqtmp2398;
    };
    seqtmp2241['lut192'] = 'rval59';
    seqtmp2241['lut193'] = function (seqtmp2403, seqtmp2404) {
        return seqtmp2403 !== seqtmp2404;
    };
    seqtmp2241['lut194'] = 'rval60';
    seqtmp2241['lut195'] = function (seqtmp2409, seqtmp2410) {
        return seqtmp2409 === seqtmp2410;
    };
    seqtmp2241['lut196'] = function (seqtmp2414, seqtmp2415, seqtmp2416) {
        return seqtmp2414(seqtmp2415, seqtmp2416);
    };
    seqtmp2241['lut197'] = function (seqtmp2421, seqtmp2422) {
        return seqtmp2421(seqtmp2422);
    };
    seqtmp2241['lut198'] = function (seqtmp2426, seqtmp2427, seqtmp2428) {
        return seqtmp2426(seqtmp2427, seqtmp2428);
    };
    seqtmp2241['lut199'] = function (seqtmp2433, seqtmp2434) {
        return seqtmp2433(seqtmp2434);
    };
    seqtmp2241['lut200'] = function (seqtmp2438, seqtmp2439) {
        return seqtmp2438 === seqtmp2439;
    };
    seqtmp2241['lut201'] = 'failed to talk to jerhyn';
    seqtmp2241['lut202'] = 'failed to talk to meshif';
    let seqtmp2444 = function () {
        var seqtmp2445, seqtmp2446;
        for (seqtmp2445 = 0x0; seqtmp2241['lut145'](seqtmp2445, 0x3); seqtmp2445 += 0x1) {
            seqtmp2446 = getUnit(0x1, 0xd3);
            if (seqtmp2446) {
                if (seqtmp2241['lut146'](seqtmp2241['lut147'], seqtmp2241['lut148'])) {
                    break;
                } else {
                    throw new Error('Failed to move to duriels tomb');
                }
            }
            seqtmp2241['lut149'](delay, 0x1f4);
        }
        if (!seqtmp2446) {
            throw new Error('Duriel not found.');
        }
        for (seqtmp2445 = 0x0; seqtmp2241['lut145'](seqtmp2445, 0x384); seqtmp2445 += 0x1) {
            Misc['townCheck']();
            ClassAttack['doCast'](seqtmp2446, Config['AttackSkill'][0x1], Config['AttackSkill'][0x2]);
            if (seqtmp2446['dead']) {
                return true;
            }
            if (seqtmp2241['lut150'](seqtmp2241['lut151'](getDistance, me, seqtmp2446), 0xa)) {
                if (seqtmp2241['lut152'](seqtmp2241['lut153'], seqtmp2241['lut153'])) {
                    Pather['moveTo'](0x586e, me['y'] < seqtmp2446['y'] ? 0x3d6a : 0x3d4d);
                } else {
                    if (me['act'] !== 0x2) Town['goToTown'](0x2);
                    Quest['talkTo']('meshif', 'meshif');
                    return Quest['changeAct'](0x3);
                }
            }
        }
        return seqtmp2446['dead'];
    };
    if (Packet['checkQuest'](0xe, 0x0) && !Pather['accessToAct'](0x3)) {
        if (seqtmp2241['lut163'](me['act'], 0x2)) Town['goToTown'](0x2);
        Quest['talkTo'](seqtmp2241['lut164'], 'meshif');
        return Quest['changeAct'](0x3);
    }
    if (!Packet['checkQuest'](0xe, 0x0) && seqtmp2239) {
        if (seqtmp2241['lut165']('rval46', seqtmp2241['lut166'])) {
            return false;
        } else {
            if (me['act'] !== 0x2) Town['goToTown'](0x2);
            Quest['talkTo']('jerhyn', 'jerhyn');
        }
    }
    if (Packet['checkQuest'](0xe, 0x0) && !seqtmp2239) {
        return true;
    }
    me['overhead']('starting duriel');
    Town['doChores']();
    if (!Packet['checkQuest'](0xa, 0x0) && !me['getItem'](0x5b)) {
        if ('rval47' !== seqtmp2241['lut167']) {
            Pather['moveTo'](0x586e, me['y'] < target['y'] ? 0x3d6a : 0x3d4d);
        } else {
            if (!Quest['transmuteItems'](0x5b, 0x5c, 0x209)) {
                return false;
            }
        }
    }
    if (Packet['checkQuest'](0xe, 0x3)) {
        if (seqtmp2241['lut168'](seqtmp2241['lut169'], seqtmp2241['lut170'])) {
            Pather['usePortal'](null);
            seqtmp2241['lut149'](delay, seqtmp2241['lut154'](0x64, seqtmp2241['lut155'](me['ping'], 0x2)));
        } else {
            if (seqtmp2241['lut171'](me['act'], 0x2)) Town['goToTown'](0x2);
            Quest['talkTo']('jerhyn', seqtmp2241['lut172']);
        }
    }
    if (Packet['checkQuest'](0xe, 0x4)) {
        if (seqtmp2241['lut173'] === seqtmp2241['lut174']) {
            seqtmp2241['lut149'](delay, 0x1f4);
        } else {
            if (seqtmp2241['lut171'](me['act'], 0x2)) Town['goToTown'](0x2);
            Quest['talkTo'](seqtmp2241['lut164'], 'meshif');
            return Quest['changeAct'](0x3);
        }
    }
    if (me['charlvl'] < 0x12) {
        if (seqtmp2241['lut175'](seqtmp2241['lut176'], seqtmp2241['lut176'])) {
            if (!Quest['transmuteItems'](0x5b, 0x5c, 0x209)) {
                return false;
            }
        } else {
            return true;
        }
    }
    Pather['useWaypoint'](0x2e);
    Pather['teleport'] = seqtmp2241['lut177'](me['gold'], 0xc350) && me['charlvl'] >= 0x12;
    let seqtmp2496 = seqtmp2241['lut178'](getRoom)['correcttomb'];
    if (!Pather['moveToExit'](seqtmp2496, true, seqtmp2240)) {
        throw new Error('Failed to move to duriels tomb');
    }
    if (seqtmp2241['lut179'](me['area'], seqtmp2496)) {
        Pather['moveToPreset'](me['area'], 0x2, 0x98, 0x0, 0x0, seqtmp2240);
        if (!seqtmp2239) {
            Attack['clear'](0x14);
            Pather['moveToPreset'](me['area'], 0x2, 0x98);
            if (Quest['insertStaff']()) {
                if (seqtmp2241['lut180'](seqtmp2241['lut181'], seqtmp2241['lut181'])) {
                    if (!getUnit(0x2, 0x64)) {
                        if (Town['goToTown']()) {
                            if (seqtmp2241['lut182'] !== 'rval54') {
                                return false;
                            } else {
                                let seqtmp2508 = getTickCount();
                                Town['doChores']();
                                Town['stackPotions'](0x205);
                                while (seqtmp2241['lut183'](seqtmp2241['lut159'](getTickCount(), seqtmp2508), 0x3a98)) {
                                    delay(0x1f4);
                                }
                            }
                        }
                    }
                } else {
                    if (!seqtmp2241['lut156'](getUnit, 0x2, 0x64)) {
                        if (Town['goToTown']()) {
                            let seqtmp2513 = seqtmp2241['lut157'](getTickCount);
                            Town['doChores']();
                            Town['stackPotions'](0x205);
                            while (seqtmp2241['lut158'](seqtmp2241['lut159'](seqtmp2241['lut157'](getTickCount), seqtmp2513), 0x3a98)) {
                                seqtmp2241['lut160'](delay, 0x1f4);
                            }
                        }
                    }
                }
            }
        }
        if (seqtmp2241['lut184'](me['area'], seqtmp2496)) {
            if (seqtmp2241['lut185'](seqtmp2241['lut186'], 'rval55')) {
                Pather['usePortal'](seqtmp2496, me['name']);
            } else {
                Attack['clear'](0xa);
                Pather['useUnit'](0x2, 0x64, 0x49);
            }
        }
        for (let seqtmp2525 = 0x0; seqtmp2525 < 0x14; seqtmp2525 += 0x1) {
            if (seqtmp2241['lut156'](getUnit, 0x2, 0x64)) {
                break;
            }
            delay(0xc8);
        }
        let seqtmp2529 = getUnit(0x2, 0x64);
        if (seqtmp2529) {
            if (seqtmp2241['lut185'](seqtmp2241['lut187'], seqtmp2241['lut187'])) {
                for (let seqtmp2525 = 0x0; seqtmp2525 < 0x5; seqtmp2525 += 0x1) {
                    if (seqtmp2241['lut188'] !== seqtmp2241['lut189']) {
                        if (seqtmp2241['lut190'](me['area'], seqtmp2529['area'])) {
                            if (seqtmp2241['lut191']('rval59', seqtmp2241['lut192'])) {
                                Skill['cast'](0x2b, 0x0, seqtmp2529);
                            } else {
                                if (Town['goToTown']()) {
                                    let seqtmp2544 = seqtmp2241['lut157'](getTickCount);
                                    Town['doChores']();
                                    Town['stackPotions'](0x205);
                                    while (seqtmp2241['lut161'](seqtmp2241['lut157'](getTickCount) - seqtmp2544, 0x3a98)) {
                                        delay(0x1f4);
                                    }
                                }
                            }
                        }
                        if (me['area'] === 0x49) {
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
        if (me['area'] !== 0x49 && !Pather['useUnit'](0x2, 0x64, 0x49)) {
            Attack['clear'](0xa);
            Pather['useUnit'](0x2, 0x64, 0x49);
        }
        if (me['area'] === 0x49) {
            if (seqtmp2241['lut193'](seqtmp2241['lut194'], 'SmsEI')) {
                Pather['teleport'] = true;
                if (!seqtmp2239) {
                    if (seqtmp2241['lut195']('WcOdk', 'WcOdk')) {
                        Config['Dodge'] = true;
                        Config['DodgeRange'] = 0xf;
                        Config['DodgeHP'] = 0x64;
                        seqtmp2241['lut178'](seqtmp2444);
                        Pickit['pickItems']();
                        Pather['teleport'] = false;
                        Pather['moveTo'](0x5851, 0x3d5a);
                        Pather['moveTo'](0x5833, 0x3d5a);
                        Pather['moveTo'](0x5831, 0x3d21);
                        seqtmp2555: for (let seqtmp2525 = 0x0; seqtmp2525 < 0x3; seqtmp2525 += 0x1) {
                            let seqtmp2559 = seqtmp2241['lut196'](getUnit, 0x1, seqtmp2241['lut197'](getLocaleString, 0x3f5));
                            if (seqtmp2559) {
                                for (let seqtmp2563 = 0x0; seqtmp2563 < 0x5; seqtmp2563 += 0x1) {
                                    if (seqtmp2241['lut177'](seqtmp2241['lut198'](getDistance, me, seqtmp2559), 0x3)) {
                                        Pather['moveToUnit'](seqtmp2559);
                                    }
                                    seqtmp2559['interact']();
                                    seqtmp2241['lut199'](delay, seqtmp2241['lut154'](0x3e8, me['ping']));
                                    me['cancel']();
                                    if (Pather['getPortal'](null)) {
                                        if (seqtmp2241['lut200'](true, true)) {
                                            break seqtmp2555;
                                        } else {
                                            throw new Error('Duriel not found.');
                                        }
                                    }
                                }
                                break;
                            }
                            delay(0x1f4);
                        }
                        if (seqtmp2241['lut200'](me['area'], 0x49) && Pather['getPortal'](null)) {
                            Pather['usePortal'](null);
                            seqtmp2241['lut199'](delay, seqtmp2241['lut154'](0x64, seqtmp2241['lut155'](me['ping'], 0x2)));
                        }
                        seqtmp2241['lut199'](delay, 0x3e8);
                        if (me['inTown']) {
                            if (!Quest['talkTo'](seqtmp2241['lut172'], 'palace')) throw new Error(seqtmp2241['lut201']);
                            if (!Quest['talkTo'](seqtmp2241['lut164'], seqtmp2241['lut164'])) throw new Error(seqtmp2241['lut202']);
                            if (!Quest['changeAct'](0x3)) {
                                throw new Error(seqtmp2241['lut162']);
                            }
                        }
                    } else {
                        throw new Error(seqtmp2241['lut162']);
                    }
                } else {
                    seqtmp2444();
                    Pickit['pickItems']();
                }
            } else {
                return true;
            }
        }
    }
    return Pather['accessToAct'](0x3);
}

function lamessen() {
    var seqtmp2674 = {};
    seqtmp2674['lut204'] = 'starting lamessen';
    seqtmp2674['lut205'] = 'alkor';
    return true;
    if (Packet['checkQuest'](0x11, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp2674['lut204']);
    Town['doChores']();
    if (me['area'] != 0x4b) {
        Town['goToTown'](0x3);
    }
    Quest['talkTo'](seqtmp2674['lut205'], seqtmp2674['lut205']);
    return true;
}

function eye(seqtmp2764, seqtmp2765) {
    var seqtmp2766 = {};
    seqtmp2766['lut206'] = 'starting eye';
    if (me['getItem'](0x229) || me['getItem'](0xae) || Packet['checkQuest'](0x12, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp2766['lut206']);
    Town['doChores']();
    Pather['journeyTo'](0x55, seqtmp2765);
    Pather['moveToPreset'](0x55, 0x2, 0x197, 0x0, 0x0, seqtmp2765);
    if (Quest['getItem'](0x229, 0x197)) {
        Quest['stashItem'](0x229);
    }
    if (me['getItem'](0x229)) return true;
    return false;
}

function brain(seqtmp2855, seqtmp2856) {
    var seqtmp2857 = {};
    seqtmp2857['lut207'] = 'starting brain';
    if (me['getItem'](0x22b) || me['getItem'](0xae) || me['getQuest'](0x12, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp2857['lut207']);
    Town['doChores']();
    if (!Pather['checkWP'](0x4e)) {
        Pather['getWP'](0x4e, seqtmp2856);
    } else {
        Pather['useWaypoint'](0x4e);
    }
    Pather['moveToExit'](0x58, true, seqtmp2856);
    Pather['journeyTo'](0x5b);
    Pather['moveToPreset'](me['area'], 0x2, 0x196);
    if (Quest['getItem'](0x22b, 0x196)) {
        Quest['stashItem'](0x22b);
    }
    if (me['getItem'](0x22b)) return true;
    return false;
}

function heart(seqtmp2948, seqtmp2949) {
    var seqtmp2950 = {};
    seqtmp2950['lut208'] = 'starting heart';
    if (me['getItem'](0x22a) || me['getItem'](0xae) || me['getQuest'](0x12, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp2950['lut208']);
    Town['doChores']();
    if (!Pather['checkWP'](0x50)) {
        Pather['getWP'](0x50, seqtmp2949);
    } else {
        Pather['useWaypoint'](0x50);
    }
    Pather['journeyTo'](0x5d, seqtmp2949);
    Pather['moveToPreset'](me['area'], 0x2, 0x195, 0x0, 0x0, false);
    if (Quest['getItem'](0x22a, 0x195)) {
        Quest['stashItem'](0x22a);
    }
    return me['getItem'](0x22a);
}

function travincal() {
    var seqtmp3041 = {};
    seqtmp3041['lut209'] = 'starting travincal';
    seqtmp3041['lut210'] = function (seqtmp3044, seqtmp3045) {
        return seqtmp3044 === seqtmp3045;
    };
    seqtmp3041['lut211'] = 'rval61';
    seqtmp3041['lut212'] = function (seqtmp3050, seqtmp3051) {
        return seqtmp3050 + seqtmp3051;
    };
    seqtmp3041['lut213'] = function (seqtmp3055, seqtmp3056) {
        return seqtmp3055 - seqtmp3056;
    };
    seqtmp3041['lut214'] = function (seqtmp3060, seqtmp3061, seqtmp3062) {
        return seqtmp3060(seqtmp3061, seqtmp3062);
    };
    seqtmp3041['lut215'] = 'Ismail Vilehand';
    seqtmp3041['lut216'] = function (seqtmp3068, seqtmp3069) {
        return seqtmp3068 !== seqtmp3069;
    };
    seqtmp3041['lut217'] = 'rval62';
    seqtmp3041['lut218'] = 'rval63';
    seqtmp3041['lut219'] = 'cain';
    if (Packet['checkQuest'](0x12, 0x0)) {
        return true;
    }
    me['overhead'](seqtmp3041['lut209']);
    Town['doChores']();
    if (!me['getItem'](0xae) && !me['getItem'](0xad)) {
        if (!Pather['checkWP'](0x53)) {
            Pather['getWP'](0x53, false);
        } else {
            if (seqtmp3041['lut210'](seqtmp3041['lut211'], 'rval61')) {
                Pather['useWaypoint'](0x53);
            } else {
                return false;
            }
        }
        let seqtmp3078 = {};
        seqtmp3078['x'] = seqtmp3041.lut212(me.x, 0x4c);
        seqtmp3078['y'] = seqtmp3041.lut213(me.y, 0x43);
        Pather['moveToUnit'](seqtmp3078);
        if (me['hell'] && !me['classic']) {
            let seqtmp3084 = seqtmp3041['lut214'](getUnit, 0x1, seqtmp3041['lut215']);
            if (seqtmp3084 && !Attack['canAttack'](seqtmp3084)) {
                if (seqtmp3041['lut216'](seqtmp3041['lut217'], 'SClks')) {
                    return false;
                } else {
                    Attack['clear'](0x1e);
                }
            }
            Config['UseMerc'] = false;
            Attack['kill'](seqtmp3084);
        } else {
            if (seqtmp3041['lut216'](seqtmp3041['lut218'], 'SLemsE')) {
                Attack['clear'](0x1e);
            } else {
                Pather['getWP'](0x53, false);
            }
        }
        Pickit['pickItems']();
        Pather['moveToUnit'](seqtmp3078);
        Pickit['pickItems']();
    }
    if (!Quest['transmuteItems'](0xae, 0x229, 0x22a, 0x22b, 0xad) || !Quest['smashCompellingOrb']()) {
        return false;
    }
    if (!me['inTown']) {
        Town['goToTown']();
    }
    Quest['talkTo'](seqtmp3041['lut219'], seqtmp3041['lut219']);
    return Packet['checkQuest'](0x12, 0x0, 0x7d0);
}

function mephisto(seqtmp3117) {
    var seqtmp3118 = {};
    seqtmp3118['lut220'] = function (seqtmp3120, seqtmp3121) {
        return seqtmp3120(seqtmp3121);
    };
    seqtmp3118['lut221'] = 'Mephisto not found.';
    seqtmp3118['lut222'] = function (seqtmp3126, seqtmp3127) {
        return seqtmp3126(seqtmp3127);
    };
    seqtmp3118['lut223'] = function (seqtmp3131, seqtmp3132) {
        return seqtmp3131(seqtmp3132);
    };
    seqtmp3118['lut224'] = function (seqtmp3136, seqtmp3137) {
        return seqtmp3136(seqtmp3137);
    };
    seqtmp3118['lut225'] = function (seqtmp3141, seqtmp3142) {
        return seqtmp3141(seqtmp3142);
    };
    seqtmp3118['lut226'] = function (seqtmp3146, seqtmp3147, seqtmp3148) {
        return seqtmp3146(seqtmp3147, seqtmp3148);
    };
    seqtmp3118['lut227'] = function (seqtmp3153, seqtmp3154) {
        return seqtmp3153(seqtmp3154);
    };
    seqtmp3118['lut228'] = function (seqtmp3158, seqtmp3159) {
        return seqtmp3158(seqtmp3159);
    };
    seqtmp3118['lut229'] = function (seqtmp3163, seqtmp3164) {
        return seqtmp3163(seqtmp3164);
    };
    seqtmp3118['lut230'] = function (seqtmp3168, seqtmp3169) {
        return seqtmp3168(seqtmp3169);
    };
    seqtmp3118['lut231'] = function (seqtmp3173, seqtmp3174) {
        return seqtmp3173(seqtmp3174);
    };
    seqtmp3118['lut232'] = function (seqtmp3178, seqtmp3179) {
        return seqtmp3178 >= seqtmp3179;
    };
    seqtmp3118['lut233'] = 'Mephisto not found!';
    seqtmp3118['lut234'] = function (seqtmp3184, seqtmp3185) {
        return seqtmp3184 < seqtmp3185;
    };
    seqtmp3118['lut235'] = function (seqtmp3189, seqtmp3190) {
        return seqtmp3189 === seqtmp3190;
    };
    seqtmp3118['lut236'] = function (seqtmp3194, seqtmp3195) {
        return seqtmp3194 / seqtmp3195;
    };
    seqtmp3118['lut237'] = function (seqtmp3199, seqtmp3200) {
        return seqtmp3199 - seqtmp3200;
    };
    seqtmp3118['lut238'] = function (seqtmp3204, seqtmp3205) {
        return seqtmp3204 - seqtmp3205;
    };
    seqtmp3118['lut239'] = function (seqtmp3209, seqtmp3210) {
        return seqtmp3209 > seqtmp3210;
    };
    seqtmp3118['lut240'] = function (seqtmp3214, seqtmp3215) {
        return seqtmp3214 !== seqtmp3215;
    };
    seqtmp3118['lut241'] = 'rval64';
    seqtmp3118['lut242'] = function (seqtmp3220, seqtmp3221) {
        return seqtmp3220 + seqtmp3221;
    };
    seqtmp3118['lut243'] = function (seqtmp3225, seqtmp3226) {
        return seqtmp3225 * seqtmp3226;
    };
    seqtmp3118['lut244'] = function (seqtmp3230, seqtmp3231) {
        return seqtmp3230 * seqtmp3231;
    };
    seqtmp3118['lut245'] = function (seqtmp3235, seqtmp3236) {
        return seqtmp3235 + seqtmp3236;
    };
    seqtmp3118['lut246'] = 'move, bitch!';
    seqtmp3118['lut247'] = 'rval65';
    seqtmp3118['lut248'] = 'rval66';
    seqtmp3118['lut249'] = function (seqtmp3243, seqtmp3244) {
        return seqtmp3243(seqtmp3244);
    };
    seqtmp3118['lut250'] = 'rval67';
    seqtmp3118['lut251'] = function (seqtmp3249, seqtmp3250) {
        return seqtmp3249 != seqtmp3250;
    };
    seqtmp3118['lut252'] = function (seqtmp3254, seqtmp3255) {
        return seqtmp3254(seqtmp3255);
    };
    seqtmp3118['lut253'] = function (seqtmp3259, seqtmp3260) {
        return seqtmp3259(seqtmp3260);
    };
    seqtmp3118['lut254'] = function (seqtmp3264, seqtmp3265) {
        return seqtmp3264(seqtmp3265);
    };
    seqtmp3118['lut255'] = function (seqtmp3269, seqtmp3270) {
        return seqtmp3269 > seqtmp3270;
    };
    seqtmp3118['lut256'] = 'rval68';
    seqtmp3118['lut257'] = function (seqtmp3275, seqtmp3276) {
        return seqtmp3275(seqtmp3276);
    };
    seqtmp3118['lut258'] = 'rval69';
    seqtmp3118['lut259'] = function (seqtmp3281, seqtmp3282, seqtmp3283) {
        return seqtmp3281(seqtmp3282, seqtmp3283);
    };
    seqtmp3118['lut260'] = function (seqtmp3288, seqtmp3289) {
        return seqtmp3288(seqtmp3289);
    };
    seqtmp3118['lut261'] = 'rval70';
    seqtmp3118['lut262'] = 'rval71';
    seqtmp3118['lut263'] = function (seqtmp3295) {
        return seqtmp3295();
    };
    seqtmp3118['lut264'] = function (seqtmp3298, seqtmp3299) {
        return seqtmp3298 === seqtmp3299;
    };
    seqtmp3118['lut265'] = 'rval72';
    seqtmp3118['lut266'] = function (seqtmp3304, seqtmp3305, seqtmp3306, seqtmp3307) {
        return seqtmp3304(seqtmp3305, seqtmp3306, seqtmp3307);
    };
    seqtmp3118['lut267'] = 'rval73';
    seqtmp3118['lut268'] = function (seqtmp3314, seqtmp3315) {
        return seqtmp3314 === seqtmp3315;
    };
    seqtmp3118['lut269'] = function (seqtmp3319, seqtmp3320) {
        return seqtmp3319 > seqtmp3320;
    };
    seqtmp3118['lut270'] = 'rval74';
    seqtmp3118['lut271'] = function (seqtmp3325, seqtmp3326) {
        return seqtmp3325 === seqtmp3326;
    };
    seqtmp3118['lut272'] = function (seqtmp3330, seqtmp3331) {
        return seqtmp3330(seqtmp3331);
    };
    seqtmp3118['lut273'] = function (seqtmp3335, seqtmp3336) {
        return seqtmp3335 === seqtmp3336;
    };
    seqtmp3118['lut274'] = 'rval75';
    seqtmp3118['lut275'] = 'rval76';
    seqtmp3118['lut276'] = function (seqtmp3342, seqtmp3343) {
        return seqtmp3342 !== seqtmp3343;
    };
    seqtmp3118['lut277'] = 'rval77';
    seqtmp3118['lut278'] = 'rval78';
    seqtmp3118['lut279'] = 'starting mephisto';
    seqtmp3118['lut280'] = 'rval79';
    seqtmp3118['lut281'] = 'rval80';
    seqtmp3118['lut282'] = 'rval81';
    seqtmp3118['lut283'] = function (seqtmp3353, seqtmp3354) {
        return seqtmp3353(seqtmp3354);
    };
    seqtmp3118['lut284'] = function (seqtmp3358, seqtmp3359) {
        return seqtmp3358 >= seqtmp3359;
    };
    seqtmp3118['lut285'] = function (seqtmp3363, seqtmp3364) {
        return seqtmp3363(seqtmp3364);
    };
    if (!Pather['accessToAct'](0x4) && seqtmp3117) {
        if (seqtmp3118['lut277'] === seqtmp3118['lut277']) {
            return false;
        } else {
            return true;
        }
    }
    if (Pather['accessToAct'](0x4) && !seqtmp3117) {
        if (seqtmp3118['lut276']('rval78', seqtmp3118['lut278'])) {
            Pather['teleport'] = false;
            seqtmp3118['lut220'](delay, 0x15e);
            Pather['moveTo'](0x449f, 0x1f86);
            let seqtmp3374 = getUnit(0x1, 0xf2);
            if (!seqtmp3374) {
                throw new Error(seqtmp3118['lut221']);
            }
            seqtmp3118['lut222'](delay, 0x15e);
            Pather['moveTo'](0x44a9, 0x1f8a);
            seqtmp3118['lut222'](delay, 0x226);
            Pather['moveTo'](0x44b0, 0x1f90);
            seqtmp3118['lut223'](delay, 0x226);
            Pather['moveTo'](0x44b4, 0x1f99);
            seqtmp3118['lut224'](delay, 0x226);
            Pather['teleport'] = true;
            Pather['moveTo'](0x44c0, 0x1f99);
            seqtmp3118['lut225'](delay, 0x1f4);
            Pather['moveTo'](0x44ca, 0x1f9e);
            Attack['clear'](0xa);
            delay(0x1f4);
            Pather['moveTo'](0x44ca, 0x1f9e);
            let seqtmp3382 = seqtmp3118['lut226'](getDistance, me, seqtmp3374);
            let seqtmp3385 = 0x0;
            while (seqtmp3382 > 0x23) {
                seqtmp3385 += 0x1;
                Pather['moveTo'](0x44c0, 0x1f9f);
                delay(0x96);
                Pather['moveTo'](0x44b0, 0x1f9b);
                seqtmp3118['lut227'](delay, 0x96);
                Pather['moveTo'](0x44a7, 0x1f96);
                seqtmp3118['lut227'](delay, 0x96);
                Pather['moveTo'](0x449b, 0x1f88);
                seqtmp3118['lut227'](delay, 0x15e);
                Pather['moveTo'](0x44a7, 0x1f96);
                delay(0x15e);
                Pather['moveTo'](0x44b0, 0x1f9b);
                delay(0x4b0);
                Pather['moveTo'](0x44c0, 0x1f9f);
                seqtmp3118['lut228'](delay, 0x226);
                Pather['moveTo'](0x44ca, 0x1f9e);
                seqtmp3118['lut229'](delay, 0x9c4);
                Attack['clear'](0xa);
                Pather['moveTo'](0x44ca, 0x1f9e);
                seqtmp3382 = seqtmp3118['lut226'](getDistance, me, seqtmp3374);
                if (seqtmp3385 >= 0x5) {
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }
    let seqtmp3397 = function () {
        var seqtmp3398, seqtmp3399, seqtmp3400, seqtmp3401 = {},
            seqtmp3402 = 0x0,
            seqtmp3403 = getUnit(0x1, 0xf2);
        if (!seqtmp3403) {
            throw new Error(seqtmp3118['lut233']);
        }
        while (seqtmp3118['lut234'](seqtmp3402, 0x12c) && Attack['checkMonster'](seqtmp3403)) {
            if (seqtmp3118['lut235'](seqtmp3403['mode'], 0x5)) {
                seqtmp3399 = Math['round'](seqtmp3118['lut236'](Math['atan2'](seqtmp3118['lut237'](me['y'], seqtmp3403['y']), seqtmp3118['lut238'](me['x'], seqtmp3403['x'])) * 0xb4, Math['PI']));
                seqtmp3400 = seqtmp3118['lut239'](me['y'], seqtmp3403['y']) ? [-0x1e, -0x3c, -0x5a] : [0x1e, 0x3c, 0x5a];
                for (seqtmp3398 = 0x0; seqtmp3118['lut234'](seqtmp3398, seqtmp3400['length']); seqtmp3398 += 0x1) {
                    if (seqtmp3118['lut240'](seqtmp3118['lut241'], seqtmp3118['lut241'])) {
                        count += 0x1;
                        Pather['moveTo'](0x44c0, 0x1f9f);
                        delay(0x96);
                        Pather['moveTo'](0x44b0, 0x1f9b);
                        delay(0x96);
                        Pather['moveTo'](0x44a7, 0x1f96);
                        delay(0x96);
                        Pather['moveTo'](0x449b, 0x1f88);
                        seqtmp3118['lut229'](delay, 0x15e);
                        Pather['moveTo'](0x44a7, 0x1f96);
                        seqtmp3118['lut229'](delay, 0x15e);
                        Pather['moveTo'](0x44b0, 0x1f9b);
                        seqtmp3118['lut230'](delay, 0x4b0);
                        Pather['moveTo'](0x44c0, 0x1f9f);
                        seqtmp3118['lut231'](delay, 0x226);
                        Pather['moveTo'](0x44ca, 0x1f9e);
                        seqtmp3118['lut231'](delay, 0x9c4);
                        Attack['clear'](0xa);
                        Pather['moveTo'](0x44ca, 0x1f9e);
                        distance = getDistance(me, mephisto);
                        if (seqtmp3118['lut232'](count, 0x5)) {
                            return false;
                        }
                    } else {
                        seqtmp3401['dist'] = 0x12;
                        seqtmp3401['x'] = Math['round'](seqtmp3118['lut242'](seqtmp3118['lut243'](Math['cos'](seqtmp3118['lut242'](seqtmp3399, seqtmp3400[seqtmp3398]) * Math['PI'] / 0xb4), seqtmp3401['dist']), seqtmp3403['x']));
                        seqtmp3401['y'] = Math['round'](seqtmp3118['lut242'](Math['sin'](seqtmp3118['lut236'](seqtmp3118['lut244'](seqtmp3118['lut245'](seqtmp3399, seqtmp3400[seqtmp3398]), Math['PI']), 0xb4)) * seqtmp3401['dist'], seqtmp3403['y']));
                        if (Attack['validSpot'](seqtmp3401['x'], seqtmp3401['y'])) {
                            me['overhead'](seqtmp3118['lut246']);
                            Pather['moveTo'](seqtmp3401['x'], seqtmp3401['y']);
                            break;
                        }
                    }
                }
            }
            if (ClassAttack['doAttack'](seqtmp3403) < 0x2) {
                if (seqtmp3118['lut240'](seqtmp3118['lut247'], seqtmp3118['lut248'])) {
                    break;
                } else {
                    return false;
                }
            }
            seqtmp3402 += 0x1;
        }
        return seqtmp3118['lut235'](seqtmp3403['mode'], 0x0) || seqtmp3403['mode'] === 0xc;
    };
    let seqtmp3467 = function () {
        let seqtmp3468 = seqtmp3118['lut249'](getUnit, 0x1);
        if (seqtmp3468) {
            if (seqtmp3118['lut235']('rval67', seqtmp3118['lut250'])) {
                do {
                    if (!seqtmp3468['getParent'] && seqtmp3118['lut251'](seqtmp3468['classid'], 0xf2) && getDistance(me, seqtmp3468) < 0xf) {
                        return seqtmp3468;
                    }
                } while (seqtmp3468['getNext']());
            } else {
                Pather['getWP'](0x65, false);
            }
        }
        return false;
    };
    let seqtmp3479 = function () {
        Pather['teleport'] = false;
        seqtmp3118['lut252'](delay, 0x15e);
        Pather['moveTo'](0x449f, 0x1f86);
        let seqtmp3481 = seqtmp3118['lut226'](getUnit, 0x1, 0xf2);
        if (!seqtmp3481) {
            throw new Error(seqtmp3118['lut221']);
        }
        delay(0x15e);
        Pather['moveTo'](0x44a9, 0x1f8a);
        seqtmp3118['lut252'](delay, 0x226);
        Pather['moveTo'](0x44b0, 0x1f90);
        seqtmp3118['lut253'](delay, 0x226);
        Pather['moveTo'](0x44b4, 0x1f99);
        seqtmp3118['lut253'](delay, 0x226);
        Pather['teleport'] = true;
        Pather['moveTo'](0x44c0, 0x1f99);
        seqtmp3118['lut254'](delay, 0x1f4);
        Pather['moveTo'](0x44ca, 0x1f9e);
        Attack['clear'](0xa);
        seqtmp3118['lut254'](delay, 0x1f4);
        Pather['moveTo'](0x44ca, 0x1f9e);
        let seqtmp3490 = getDistance(me, seqtmp3481);
        let seqtmp3492 = 0x0;
        while (seqtmp3118['lut255'](seqtmp3490, 0x23)) {
            if ('rval68' !== seqtmp3118['lut256']) {
                throw new Error(seqtmp3118['lut233']);
            } else {
                seqtmp3492 += 0x1;
                Pather['moveTo'](0x44c0, 0x1f9f);
                seqtmp3118['lut254'](delay, 0x96);
                Pather['moveTo'](0x44b0, 0x1f9b);
                seqtmp3118['lut254'](delay, 0x96);
                Pather['moveTo'](0x44a7, 0x1f96);
                seqtmp3118['lut254'](delay, 0x96);
                Pather['moveTo'](0x449b, 0x1f88);
                seqtmp3118['lut254'](delay, 0x15e);
                Pather['moveTo'](0x44a7, 0x1f96);
                seqtmp3118['lut257'](delay, 0x15e);
                Pather['moveTo'](0x44b0, 0x1f9b);
                seqtmp3118['lut257'](delay, 0x4b0);
                Pather['moveTo'](0x44c0, 0x1f9f);
                seqtmp3118['lut257'](delay, 0x226);
                Pather['moveTo'](0x44ca, 0x1f9e);
                seqtmp3118['lut257'](delay, 0x9c4);
                Attack['clear'](0xa);
                Pather['moveTo'](0x44ca, 0x1f9e);
                seqtmp3490 = getDistance(me, seqtmp3481);
                if (seqtmp3492 >= 0x5) {
                    if (seqtmp3118['lut258'] === seqtmp3118['lut258']) {
                        return false;
                    } else {
                        Attack['kill'](0xf2);
                    }
                }
            }
        }
        return true;
    };
    let seqtmp3511 = function () {
        var seqtmp3512 = {};
        seqtmp3512['lut288'] = function (seqtmp3514, seqtmp3515) {
            return seqtmp3118.lut234(seqtmp3514, seqtmp3515);
        };
        seqtmp3512['lut289'] = function (seqtmp3520, seqtmp3521, seqtmp3522) {
            return seqtmp3118.lut259(seqtmp3520, seqtmp3521, seqtmp3522);
        };
        let seqtmp3527;
        let seqtmp3528 = 0x0;
        let seqtmp3529 = 0x0;
        let seqtmp3530 = getUnit(0x1, 0xf2);
        Config['UseMerc'] = false;
        Skill['usePvpRange'] = true;
        let seqtmp3531 = Config['AttackSkill'][0x2];
        Config['AttackSkill'][0x2] = -0x1;
        while (seqtmp3529 < 0x12c && Attack['checkMonster'](seqtmp3530) && Attack['skipCheck'](seqtmp3530)) {
            Misc['townCheck']();
            if (!seqtmp3530 || !seqtmp3118['lut260'](copyUnit, seqtmp3530)['x']) {
                if (seqtmp3118['lut261'] !== seqtmp3118['lut262']) {
                    seqtmp3530 = seqtmp3118['lut259'](getUnit, 0x1, 0xf2);
                    if (!seqtmp3530) {
                        break;
                    }
                } else {
                    Pather['moveTo'](0x44ca, 0x1f9e);
                    seqtmp3528 += 0x1;
                }
            }
            seqtmp3527 = seqtmp3118['lut263'](seqtmp3467);
            if (seqtmp3527) {
                if (seqtmp3118['lut264'](seqtmp3118['lut265'], seqtmp3118['lut265'])) {
                    if (me['hell'] && !Attack['canAttack'](seqtmp3527) && !me['classic']) {
                        return false;
                    }
                } else {
                    if (!monster['getParent'] && monster['classid'] != 0xf2 && seqtmp3512['lut288'](seqtmp3512['lut289'](getDistance, me, monster), 0xf)) {
                        return monster;
                    }
                }
            }
            Attack['clear'](0xf);
            if (seqtmp3118['lut255'](seqtmp3118['lut266'](getDistance, me, 0x44ca, 0x1f9e), 0x5)) {
                if (seqtmp3118['lut240'](seqtmp3118['lut267'], seqtmp3118['lut267'])) {
                    return true;
                } else {
                    Pather['moveTo'](0x44ca, 0x1f9e);
                    seqtmp3528 += 0x1;
                }
            }
            if (seqtmp3529 > 0x0 && seqtmp3118['lut268'](seqtmp3529 % 0xf, 0x0) && Skill['getRange'](Config['AttackSkill'][0x1]) < 0x4) {
                Packet['flash'](me['gid']);
            }
            if (seqtmp3118['lut269'](seqtmp3528, 0x3)) {
                if (seqtmp3118['lut240'](seqtmp3118['lut270'], 'CWOds')) {
                    break;
                } else {
                    if (me['hell'] && !Attack['canAttack'](seqtmp3527) && !me['classic']) {
                        return false;
                    }
                }
            }
            if (!ClassAttack['doAttack'](seqtmp3530, seqtmp3118['lut271'](seqtmp3529 % 0xf, 0x0))) {
                break;
            }
            seqtmp3529 += 0x1;
        }
        Skill['usePvpRange'] = false;
        Config['AttackSkill'][0x2] = seqtmp3531;
        ClassAttack['afterAttack']();
        Config['UseMerc'] = true;
        if (!seqtmp3530 || !seqtmp3118['lut272'](copyUnit, seqtmp3530)['x']) {
            if (seqtmp3118['lut273'](seqtmp3118['lut274'], seqtmp3118['lut275'])) {
                Packet['flash'](me['gid']);
            } else {
                return true;
            }
        }
        return seqtmp3118['lut269'](seqtmp3530['hp'], 0x0) && seqtmp3118['lut240'](seqtmp3530['mode'], 0x0) && seqtmp3118['lut276'](seqtmp3530['mode'], 0xc);
    };
    me['overhead'](seqtmp3118['lut279']);
    Town['doChores']();
    if (!Pather['checkWP'](0x65)) {
        if (seqtmp3118['lut280'] === seqtmp3118['lut281']) {
            return false;
        } else {
            Pather['getWP'](0x65, false);
        }
    } else {
        if (seqtmp3118['lut273'](seqtmp3118['lut282'], 'rval81')) {
            Pather['useWaypoint'](0x65);
        } else {
            return false;
        }
    }
    Precast['doPrecast']();
    Pather['moveToExit'](0x66, true);
    Config['OpenChests'] = false;
    Pather['moveTo'](0x449e, 0x1f85);
    seqtmp3118['lut283'](delay, 0x15e);
    Config['UseMerc'] = false;
    Misc['updateConfig']();
    if (seqtmp3118['lut284'](me['charlvl'], 0x50) || (!seqtmp3479() || !seqtmp3118['lut263'](seqtmp3511))) {
        Attack['kill'](0xf2);
    }
    Pickit['pickItems']();
    Pather['moveTo'](0x44b6, 0x1f84);
    seqtmp3118['lut285'](delay, 0x5dc);
    Pather['moveTo'](0x44c1, 0x1f86);
    Pather['usePortal'](null);
    Config['OpenChests'] = true;
    Config['UseMerc'] = true;
    Misc['updateConfig']();
    if (me['act'] == 0x4) return true;
    return false;
}

function izual(seqtmp3682, seqtmp3683) {
    var seqtmp3684 = {};
    seqtmp3684['lut291'] = function (seqtmp3686, seqtmp3687) {
        return seqtmp3686 > seqtmp3687;
    };
    seqtmp3684['lut292'] = function (seqtmp3691, seqtmp3692) {
        return seqtmp3691 === seqtmp3692;
    };
    seqtmp3684['lut293'] = function (seqtmp3696, seqtmp3697) {
        return seqtmp3696 % seqtmp3697;
    };
    seqtmp3684['lut294'] = function (seqtmp3701, seqtmp3702) {
        return seqtmp3701 < seqtmp3702;
    };
    seqtmp3684['lut295'] = 'clearing!';
    seqtmp3684['lut296'] = function (seqtmp3707, seqtmp3708) {
        return seqtmp3707(seqtmp3708);
    };
    seqtmp3684['lut297'] = function (seqtmp3712, seqtmp3713) {
        return seqtmp3712 > seqtmp3713;
    };
    seqtmp3684['lut298'] = function (seqtmp3717, seqtmp3718) {
        return seqtmp3717 !== seqtmp3718;
    };
    seqtmp3684['lut299'] = function (seqtmp21667a, seqtmp3723) {
        return seqtmp21667a !== seqtmp3723;
    };
    seqtmp3684['lut300'] = 'rval82';
    seqtmp3684['lut301'] = function (seqtmp3728, seqtmp3729) {
        return seqtmp3728 + seqtmp3729;
    };
    seqtmp3684['lut302'] = 'Failed to kill ';
    seqtmp3684['lut303'] = 'tyrael';
    seqtmp3684['lut304'] = 'rval83';
    seqtmp3684['lut305'] = 'rval84';
    seqtmp3684['lut306'] = function (seqtmp3737, seqtmp3738) {
        return seqtmp3737 === seqtmp3738;
    };
    seqtmp3684['lut307'] = 'rval85';
    seqtmp3684['lut308'] = 'rval86';
    seqtmp3684['lut309'] = function (seqtmp3744, seqtmp3745, seqtmp3746) {
        return seqtmp3744(seqtmp3745, seqtmp3746);
    };
    seqtmp3684['lut310'] = 'rval87';
    seqtmp3684['lut311'] = 'rval88';
    if (Packet['checkQuest'](0x19, 0x1)) {
        if (Town['goToTown'](0x4)) {
            Quest['talkTo'](seqtmp3684['lut303'], seqtmp3684['lut303']);
        }
    }
    if (!Packet['checkQuest'](0x19, 0x0) && (seqtmp3682 || seqtmp3684['lut294'](me['lightningResist'], 0x4b) && (me['charlvl'] < 0x50 && me['hell']))) {
        return false;
    }
    if (Packet['checkQuest'](0x19, 0x0) && !seqtmp3682) {
        if (seqtmp3684['lut304'] === seqtmp3684['lut305']) {
            Pather['useWaypoint'](0x6a);
        } else {
            return true;
        }
    }
    let seqtmp3759 = function () {
        let seqtmp3760 = 0x0;
        let seqtmp3761 = getUnit(0x1, 0x100);
        while (seqtmp3760 < 0x258 && Attack['checkMonster'](seqtmp3761) && Attack['skipCheck'](seqtmp3761)) {
            Misc['townCheck']();
            if (!seqtmp3761 || !copyUnit(seqtmp3761)['x']) {
                break;
            }
            if (seqtmp3684['lut291'](seqtmp3760, 0x0) && seqtmp3684['lut292'](seqtmp3684['lut293'](seqtmp3760, 0xf), 0x0) && seqtmp3684['lut294'](Skill['getRange'](Config['AttackSkill'][0x1]), 0x4)) {
                Packet['flash'](me['gid']);
            }
            if (!ClassAttack['doAttack'](seqtmp3761, seqtmp3684['lut293'](seqtmp3760, 0xf) === 0x0)) {
                break;
            }
            if (seqtmp3684['lut291'](Attack['getMonsterCount'](me['x'], me['y'], 0xf, Attack['buildMonsterList']()), 0x1)) {
                me['overhead'](seqtmp3684['lut295']);
                Attack['clear'](0xf);
            }
            seqtmp3760 += 0x1;
        }
        ClassAttack['afterAttack']();
        if (!seqtmp3761 || !seqtmp3684['lut296'](copyUnit, seqtmp3761)['x']) {
            return true;
        }
        if (seqtmp3684['lut297'](seqtmp3761['hp'], 0x0) && seqtmp3684['lut298'](seqtmp3761['mode'], 0x0) && seqtmp3761['mode'] !== 0xc) {
            if (seqtmp3684['lut299'](seqtmp3684['lut300'], seqtmp3684['lut300'])) {
                me['overhead']('clearing!');
                Attack['clear'](0xf);
            } else {
                throw new Error(seqtmp3684['lut301'](seqtmp3684['lut302'], seqtmp3761['name']));
            }
        }
        return true;
    };
    me['overhead']('starting izual');
    Town['doChores']();
    if (seqtmp3683 && me['normal']) {
        Pather['teleport'] = false;
    }
    if (!Pather['checkWP'](0x6a)) {
        if (seqtmp3684['lut306'](seqtmp3684['lut307'], seqtmp3684['lut308'])) {
            Pather['teleport'] = false;
        } else {
            Pather['getWP'](0x6a, seqtmp3683);
        }
    } else {
        Pather['useWaypoint'](0x6a);
    }
    Pather['moveToPreset'](0x69, 0x1, 0x100, 0x14, 0x0, seqtmp3683);
    if (!me['hell']) {
        Attack['deploy'](seqtmp3684['lut309'](getUnit, 0x1, 0x100), 0x23, 0x5, 0x9);
        Attack['clear'](0x1e);
        Pather['moveToPreset'](0x69, 0x1, 0x100, 0x14, 0x0, seqtmp3683);
    }
    try {
        Attack['kill'](0x100);
    } catch (seqtmp3801) {}
    Pickit['pickItems']();
    if (!Packet['checkQuest'](0x19, 0x0)) {
        if (seqtmp3684['lut299'](seqtmp3684['lut310'], seqtmp3684['lut311'])) {
            Town['goToTown']();
            Quest['talkTo']('tyrael', 'tyrael');
        } else {
            return true;
        }
    }
    return true;
}

function Sorc() {
    var seqtmp3889 = {};
    seqtmp3889['lut313'] = function (seqtmp3891, seqtmp3892) {
        return seqtmp3891 !== seqtmp3892;
    };
    seqtmp3889['lut315'] = function (seqtmp3897, seqtmp3898) {
        return seqtmp3897 !== seqtmp3898;
    };
    seqtmp3889['lut316'] = 'rval89';
    seqtmp3889['lut317'] = 'rval90';
    seqtmp3889['lut318'] = function (seqtmp3904, seqtmp3905) {
        return seqtmp3904(seqtmp3905);
    };
    seqtmp3889['lut319'] = 'Time to farm';
    seqtmp3889['lut320'] = function (seqtmp3910, seqtmp3911, seqtmp3912) {
        return seqtmp3910(seqtmp3911, seqtmp3912);
    };
    seqtmp3889['lut321'] = 'scriptmsg';
    seqtmp3889['lut323'] = function (seqtmp3919, seqtmp3920) {
        return seqtmp3919 === seqtmp3920;
    };
    seqtmp3889['lut324'] = 'rval92';
    seqtmp3889['lut326'] = function (seqtmp3926, seqtmp3927) {
        return seqtmp3926(seqtmp3927);
    };
    seqtmp3889['lut327'] = 'sorc/build/addRunewords.js';
    seqtmp3889['lut328'] = 'General.js';
    seqtmp3889['lut329'] = function (seqtmp3933, seqtmp3934) {
        return seqtmp3933 < seqtmp3934;
    };
    seqtmp3889['lut330'] = function (seqtmp3938, seqtmp3939) {
        return seqtmp3938 > seqtmp3939;
    };
    seqtmp3889['lut331'] = function (seqtmp3943, seqtmp3944) {
        return seqtmp3943 < seqtmp3944;
    };
    seqtmp3889['lut332'] = function (seqtmp3948, seqtmp3949) {
        return seqtmp3948(seqtmp3949);
    };
    seqtmp3889['lut333'] = function (seqtmp3953, seqtmp3954) {
        return seqtmp3953 + seqtmp3954;
    };
    seqtmp3889['lut334'] = function (seqtmp28627a, seqtmp3959) {
        return seqtmp28627a + seqtmp3959;
    };
    seqtmp3889['lut335'] = 'Added ';
    seqtmp3889['lut336'] = ' to runewords';
    seqtmp3889['lut337'] = function (seqtmp3965, seqtmp3966) {
        return seqtmp3965 > seqtmp3966;
    };
    seqtmp3889['lut338'] = 'Out of gold';
    seqtmp3889['lut339'] = function (seqtmp3971, seqtmp3972) {
        return seqtmp3971 < seqtmp3972;
    };
    seqtmp3889['lut340'] = function (seqtmp3976, seqtmp3977) {
        return seqtmp3976 === seqtmp3977;
    };
    seqtmp3889['lut341'] = 'rval94';
    seqtmp3889['lut342'] = function (seqtmp3982, seqtmp3983) {
        return seqtmp3982(seqtmp3983);
    };
    seqtmp3889['lut343'] = function (seqtmp3987, seqtmp3988, seqtmp3989) {
        return seqtmp3987(seqtmp3988, seqtmp3989);
    };
    seqtmp3889['lut344'] = function (seqtmp3994, seqtmp3995) {
        return seqtmp3994(seqtmp3995);
    };
    /*var seqtmp3998;
    seqtmp3889['lut320'](addEventListener, seqtmp3889['lut321'], function (seqtmp4001) {
        if (seqtmp3889['lut313']('gdcIQ', 'kFSur')) {
            if (seqtmp4001 === 'rval93' || seqtmp4001 === seqtmp3889['lut314']) {
                if (seqtmp3889['lut315'](seqtmp3889['lut316'], seqtmp3889['lut317'])) {
                    seqtmp3998 = seqtmp4001;
                } else {
                    Config['KeepRunewords']['push'](addRunewords[i]['keep'][a]);
                }
            }
        } else {
            Config['Runewords']['push'](addRunewords[i]['make'][a]);
        }
    });
    seqtmp3889['lut318'](scriptBroadcast, seqtmp3889['lut322']);
    while (!seqtmp3998) {
        if (seqtmp3889['lut323'](seqtmp3889['lut324'], seqtmp3889['lut324'])) {
            delay(0x32);
        } else {
            seqtmp3889['lut318'](print, seqtmp3889['lut319']);
            runSequence(Sequences['magicfind'][me['gametype']][me['diff']], true);
        }
    }
    if (seqtmp3998 !== seqtmp3889['lut325']) {
        D2Bot['stop']();
        seqtmp3889['lut326'](delay, 0x1f4);
        return true;
    }*/
    include(seqtmp3889['lut327']);
    var seqtmp4023 = {};
    seqtmp4023['line'] = 0x1;
    seqtmp4023['file'] = seqtmp3889.lut328;
    seqtmp4023['string'] = '';
    for (let seqtmp4028 = 0x0; Config['AutoEquip'] && seqtmp3889['lut329'](seqtmp4028, addRunewords['length']); seqtmp4028++) {
        if (me['diff'] !== 0x2 || !Config['MakeRunewords']) continue;
        if (seqtmp3889['lut330'](Item['getEquippedItem'](addRunewords[seqtmp4028]['slot'])['tier'], addRunewords[seqtmp4028]['tier'])) continue;
        seqtmp4023['string'] = addRunewords[seqtmp4028]['pickit'];
        stringArray['push'](seqtmp4023);
        NTIP_CheckList['push'](NTIP['ParseLineInt'](seqtmp4023['string'], seqtmp4023));
        NTIP_CheckListNoTier['push'](NTIP['ParseLineInt'](seqtmp4023['string'], seqtmp4023));
        for (let seqtmp4042 = 0x0; seqtmp4042 < addRunewords[seqtmp4028]['make']['length']; seqtmp4042++) {
            Config['Runewords']['push'](addRunewords[seqtmp4028]['make'][seqtmp4042]);
        }
        for (let seqtmp4048 = 0x0; seqtmp3889['lut331'](seqtmp4048, addRunewords[seqtmp4028]['keep']['length']); seqtmp4048++) {
            Config['KeepRunewords']['push'](addRunewords[seqtmp4028]['keep'][seqtmp4048]);
        }
        seqtmp3889['lut332'](print, seqtmp3889['lut333'](seqtmp3889['lut334'](seqtmp3889['lut335'], addRunewords[seqtmp4028]['name']), seqtmp3889['lut336']));
    }
    while (me['getStat'](0x5)) {
        seqtmp3889['lut332'](delay, 0x3e8);
    }
    if (seqtmp3889['lut331'](me['gold'], 0x1388) && seqtmp3889['lut337'](me['charlvl'], 0xa)) {
        D2Bot['printToConsole'](seqtmp3889['lut338']);
    }
    Runewords['init']();
    Runewords['buildLists']();
    var seqtmp4065 = me['findItem'](0x177, -0x1, 0x1, 0x7);
    if (seqtmp4065 && seqtmp3889['lut339'](seqtmp4065['itemcount'], 0x2)) {
        Misc['socketItems'](seqtmp4065, [0x24a, 0x24a]);
    }
    if (!Storage['Stash']['CanFit']({
            'sizex': 0x2,
            'sizey': 0x4,
            'gid': 0xa2c2a
        })) {
        Town['clearStash']();
        Storage['Stash']['SortItems']();
    }
    if (General['timeToFarm']()) {
        if (seqtmp3889['lut340'](seqtmp3889['lut341'], seqtmp3889['lut341'])) {
            seqtmp3889['lut342'](print, 'Time to farm');
            seqtmp3889['lut343'](runSequence, Sequences['magicfind'][me['gametype']][me['diff']], true);
        } else {
            Misc['socketItems'](seqtmp4065, [0x24a, 0x24a]);
        }
    }
    return seqtmp3889['lut344'](runSequence, Sequences['quest'][me['gametype']][me['diff']]);
}

function vizier() {
    var seqtmp4161 = {};
    seqtmp4161['lut345'] = function (seqtmp4163, seqtmp4164, seqtmp4165) {
        return seqtmp4163(seqtmp4164, seqtmp4165);
    };
    seqtmp4161['lut346'] = function (seqtmp4170, seqtmp4171) {
        return seqtmp4170 < seqtmp4171;
    };
    seqtmp4161['lut347'] = function (seqtmp4175, seqtmp4176, seqtmp4177) {
        return seqtmp4175(seqtmp4176, seqtmp4177);
    };
    seqtmp4161['lut348'] = function (seqtmp4182) {
        return seqtmp4182();
    };
    seqtmp4161['lut349'] = function (seqtmp4185, seqtmp4186) {
        return seqtmp4185 - seqtmp4186;
    };
    seqtmp4161['lut350'] = function (seqtmp4190, seqtmp4191) {
        return seqtmp4190 === seqtmp4191;
    };
    seqtmp4161['lut351'] = 'rval95';
    seqtmp4161['lut352'] = function (seqtmp4196, seqtmp4197) {
        return seqtmp4196(seqtmp4197);
    };
    seqtmp4161['lut353'] = 'rval96';
    seqtmp4161['lut354'] = 'rval97';
    seqtmp4161['lut355'] = function (seqtmp4203, seqtmp4204) {
        return seqtmp4203 + seqtmp4204;
    };
    seqtmp4161['lut356'] = 'Failed to open seal: ';
    seqtmp4161['lut357'] = function (seqtmp4209) {
        return seqtmp4209();
    };
    seqtmp4161['lut358'] = function (seqtmp4212, seqtmp4213) {
        return seqtmp4212 < seqtmp4213;
    };
    seqtmp4161['lut359'] = function (seqtmp4217) {
        return seqtmp4217();
    };
    seqtmp4161['lut360'] = function (seqtmp4220, seqtmp4221) {
        return seqtmp4220 !== seqtmp4221;
    };
    seqtmp4161['lut361'] = 'rval98';
    seqtmp4161['lut362'] = 'rval99';
    seqtmp4161['lut363'] = function (seqtmp4227, seqtmp4228, seqtmp4229, seqtmp4230, seqtmp4231, seqtmp4232, seqtmp4233) {
        return seqtmp4227(seqtmp4228, seqtmp4229, seqtmp4230, seqtmp4231, seqtmp4232, seqtmp4233);
    };
    seqtmp4161['lut364'] = 'rval100';
    seqtmp4161['lut365'] = 'starting vizier';
    seqtmp4161['lut366'] = function (seqtmp4244, seqtmp4245) {
        return seqtmp4244 !== seqtmp4245;
    };
    seqtmp4161['lut367'] = 'rval101';
    seqtmp4161['lut368'] = function (seqtmp4250, seqtmp4251) {
        return seqtmp4250(seqtmp4251);
    };
    seqtmp4161['lut369'] = function (seqtmp4255) {
        return seqtmp4255();
    };
    seqtmp4161['lut370'] = 'rval102';
    seqtmp4161['lut371'] = 'rval103';
    seqtmp4161['lut372'] = function (seqtmp4260, seqtmp4261) {
        return seqtmp4260 < seqtmp4261;
    };
    seqtmp4161['lut373'] = function (seqtmp4265, seqtmp4266, seqtmp4267) {
        return seqtmp4265(seqtmp4266, seqtmp4267);
    };
    seqtmp4161['lut374'] = 'rval104';
    seqtmp4161['lut375'] = 'Grand Vizier of Chaos';
    if (!Pather['accessToAct'](0x4)) {
        if (seqtmp4161['lut364'] === 'rval100') {
            return true;
        } else {
            if (seqtmp4161['lut345'](getDistance, me, seqtmp4275) < 0x5) {
                Skill['cast'](0x2c, 0x0);
            }
            ClassAttack['doAttack'](seqtmp4275);
        }
    }
    if (me['hell'] && seqtmp4161['lut358'](me['charlvl'], 0x46) && me['fireResist'] < 0x55) {
        return true;
    }
    let seqtmp4278 = function (seqtmp4279) {
        var seqtmp4280 = {};
        seqtmp4280['lut377'] = 'Grand Vizier of Chaos';
        let seqtmp4282;
        let seqtmp4283;
        for (let seqtmp4284 = 0x0; seqtmp4161['lut346'](seqtmp4284, 0x5); seqtmp4284 += 0x1) {
            Pather['moveToPreset'](0x6c, 0x2, seqtmp4279, seqtmp4279 === 0x18a ? 0x5 : 0x2, seqtmp4279 === 0x18a ? 0x5 : 0x0);
            if (seqtmp4284 > 0x3) {
                Attack['clear'](0xa);
            }
            seqtmp4282 = seqtmp4161['lut347'](getUnit, 0x2, seqtmp4279);
            seqtmp4283 = seqtmp4161['lut348'](getTickCount);
            while (seqtmp4161['lut346'](seqtmp4161['lut349'](seqtmp4161['lut348'](getTickCount), seqtmp4283), 0x1388)) {
                if (seqtmp4161['lut350'](false, seqtmp4161['lut351'])) {
                    return true;
                } else {
                    if (seqtmp4282) {
                        break;
                    }
                    seqtmp4161['lut352'](delay, 0x32);
                }
            }
            if (!seqtmp4282) {
                if (seqtmp4161['lut353'] !== seqtmp4161['lut354']) {
                    throw new Error(seqtmp4161['lut355'](seqtmp4161['lut356'], seqtmp4279));
                } else {
                    Skill['cast'](0x2c, 0x0);
                }
            }
            seqtmp4283 = seqtmp4161['lut357'](getTickCount);
            while (seqtmp4161['lut358'](seqtmp4161['lut359'](getTickCount) - seqtmp4283, 0x3e8)) {
                if (seqtmp4161['lut360'](seqtmp4161['lut361'], seqtmp4161['lut362'])) {
                    seqtmp4161['lut363'](sendPacket, 0x1, 0x13, 0x4, 0x2, 0x4, seqtmp4282['gid']);
                    if (seqtmp4282['mode']) {
                        return true;
                    }
                    delay(0x32);
                } else {
                    Attack['kill'](seqtmp4280['lut377']);
                }
            }
        }
        return false;
    };
    me['overhead'](seqtmp4161['lut365']);
    Town['doChores']();
    if (!Pather['checkWP'](0x6b)) {
        if (seqtmp4161['lut366']('SCesk', 'SLDKf')) {
            Pather['getWP'](0x6b);
        } else {
            return true;
        }
    } else {
        if (seqtmp4161['lut366'](seqtmp4161['lut367'], seqtmp4161['lut367'])) {
            Skill['cast'](Config['AttackSkill'][0x1], 0x0);
        } else {
            Pather['useWaypoint'](0x6b);
        }
    }
    Precast['doPrecast'](true);
    if (!seqtmp4161['lut368'](seqtmp4278, 0x18c)) {
        return true;
    }
    let seqtmp4330 = seqtmp4161['lut359'](getTickCount);
    let seqtmp4275;
    let seqtmp4333;
    while (seqtmp4161['lut358'](seqtmp4161['lut369'](getTickCount) - seqtmp4330, 0x1388)) {
        if (seqtmp4161['lut350'](seqtmp4161['lut370'], 'XMOsk')) {
            return true;
        } else {
            seqtmp4333 = getUnit(0x1, 'Grand Vizier of Chaos');
            if (seqtmp4333) {
                break;
            }
            seqtmp4275 = Attack['getNearestMonster']();
            if (seqtmp4275) {
                if (seqtmp4161['lut371'] !== seqtmp4161['lut371']) {
                    Attack['clear'](0xa);
                } else {
                    if (seqtmp4161['lut372'](seqtmp4161['lut373'](getDistance, me, seqtmp4275), 0x5)) {
                        Skill['cast'](0x2c, 0x0);
                    }
                    ClassAttack['doAttack'](seqtmp4275);
                }
            } else {
                Skill['cast'](Config['AttackSkill'][0x1], 0x0);
            }
            delay(0x32);
        }
    }
    try {
        if (seqtmp4161['lut350'](seqtmp4161['lut374'], seqtmp4161['lut374'])) {
            Attack['kill'](seqtmp4161['lut375']);
        } else {
            return true;
        }
    } catch (seqtmp4353) {}
    Pickit['pickItems']();
    return true;
}

function diablo(seqtmp4374) {
    var seqtmp4375 = {};
    seqtmp4375['lut378'] = function (seqtmp4377, seqtmp4378, seqtmp4379, seqtmp4380) {
        return seqtmp4377(seqtmp4378, seqtmp4379, seqtmp4380);
    };
    seqtmp4375['lut379'] = function (seqtmp4386, seqtmp4387) {
        return seqtmp4386 + seqtmp4387;
    };
    seqtmp4375['lut380'] = 'Grand Vizier of Chaos';
    seqtmp4375['lut381'] = 'Lord De Seis';
    seqtmp4375['lut382'] = function (seqtmp4393, seqtmp4394, seqtmp4395) {
        return seqtmp4393(seqtmp4394, seqtmp4395);
    };
    seqtmp4375['lut383'] = 'Infector of Souls';
    seqtmp4375['lut384'] = function (seqtmp4401, seqtmp4402) {
        return seqtmp4401 == seqtmp4402;
    };
    seqtmp4375['lut385'] = '7|6|3|2|4|0|1|5';
    seqtmp4375['lut386'] = function (seqtmp4407) {
        return seqtmp4407();
    };
    seqtmp4375['lut387'] = function (seqtmp4410, seqtmp4411) {
        return seqtmp4410 - seqtmp4411;
    };
    seqtmp4375['lut388'] = function (seqtmp4415) {
        return seqtmp4415();
    };
    seqtmp4375['lut389'] = function (seqtmp4418, seqtmp4419) {
        return seqtmp4418(seqtmp4419);
    };
    seqtmp4375['lut390'] = function (seqtmp4423, seqtmp4424, seqtmp4425, seqtmp4426, seqtmp4427, seqtmp4428, seqtmp4429) {
        return seqtmp4423(seqtmp4424, seqtmp4425, seqtmp4426, seqtmp4427, seqtmp4428, seqtmp4429);
    };
    seqtmp4375['lut391'] = function (seqtmp4438, seqtmp4439) {
        return seqtmp4438(seqtmp4439);
    };
    seqtmp4375['lut392'] = function (seqtmp4443, seqtmp4444) {
        return seqtmp4443 === seqtmp4444;
    };
    seqtmp4375['lut393'] = function (seqtmp4448, seqtmp4449) {
        return seqtmp4448 < seqtmp4449;
    };
    seqtmp4375['lut394'] = function (seqtmp4453, seqtmp4454, seqtmp4455) {
        return seqtmp4453(seqtmp4454, seqtmp4455);
    };
    seqtmp4375['lut395'] = function (seqtmp4460) {
        return seqtmp4460();
    };
    seqtmp4375['lut396'] = function (seqtmp4463, seqtmp4464) {
        return seqtmp4463 >= seqtmp4464;
    };
    seqtmp4375['lut397'] = function (seqtmp4468, seqtmp4469) {
        return seqtmp4468 - seqtmp4469;
    };
    seqtmp4375['lut398'] = function (seqtmp4473) {
        return seqtmp4473();
    };
    seqtmp4375['lut399'] = function (seqtmp4476, seqtmp4477) {
        return seqtmp4476(seqtmp4477);
    };
    seqtmp4375['lut400'] = function (seqtmp4481, seqtmp4482, seqtmp4483) {
        return seqtmp4481(seqtmp4482, seqtmp4483);
    };
    seqtmp4375['lut401'] = 'Diablo not found';
    seqtmp4375['lut402'] = 'Star';
    seqtmp4375['lut403'] = function (seqtmp4490, seqtmp4491) {
        return seqtmp4490(seqtmp4491);
    };
    seqtmp4375['lut404'] = function (seqtmp4495, seqtmp4496, seqtmp4497) {
        return seqtmp4495(seqtmp4496, seqtmp4497);
    };
    seqtmp4375['lut405'] = function (seqtmp4502, seqtmp4503) {
        return seqtmp4502 * seqtmp4503;
    };
    seqtmp4375['lut406'] = function (seqtmp4507, seqtmp4508) {
        return seqtmp4507 <= seqtmp4508;
    };
    seqtmp4375['lut407'] = '2|4|3|1|0';
    seqtmp4375['lut408'] = function (seqtmp4513, seqtmp4514) {
        return seqtmp4513 < seqtmp4514;
    };
    seqtmp4375['lut409'] = function (seqtmp4518, seqtmp4519) {
        return seqtmp4518(seqtmp4519);
    };
    seqtmp4375['lut410'] = function (seqtmp4523) {
        return seqtmp4523();
    };
    seqtmp4375['lut411'] = 'fire';
    seqtmp4375['lut412'] = function (seqtmp4527, seqtmp4528, seqtmp4529) {
        return seqtmp4527(seqtmp4528, seqtmp4529);
    };
    seqtmp4375['lut413'] = 'Diablo';
    seqtmp4375['lut414'] = function (seqtmp4535, seqtmp4536) {
        return seqtmp4535 + seqtmp4536;
    };
    seqtmp4375['lut415'] = 'Diablo life: ';
    seqtmp4375['lut416'] = function (seqtmp4541, seqtmp4542) {
        return seqtmp4541 * seqtmp4542;
    };
    seqtmp4375['lut417'] = function (seqtmp4546, seqtmp4547) {
        return seqtmp4546(seqtmp4547);
    };
    seqtmp4375['lut418'] = function (seqtmp4551, seqtmp4552, seqtmp4553) {
        return seqtmp4551(seqtmp4552, seqtmp4553);
    };
    seqtmp4375['lut419'] = function (seqtmp4558, seqtmp4559) {
        return seqtmp4558 < seqtmp4559;
    };
    seqtmp4375['lut420'] = function (seqtmp4563, seqtmp4564) {
        return seqtmp4563 == seqtmp4564;
    };
    seqtmp4375['lut421'] = function (seqtmp4568, seqtmp4569) {
        return seqtmp4568(seqtmp4569);
    };
    seqtmp4375['lut422'] = function (seqtmp4573, seqtmp4574) {
        return seqtmp4573 > seqtmp4574;
    };
    seqtmp4375['lut423'] = function (seqtmp4578, seqtmp4579) {
        return seqtmp4578 !== seqtmp4579;
    };
    seqtmp4375['lut424'] = function (seqtmp4583, seqtmp4584) {
        return seqtmp4583 !== seqtmp4584;
    };
    seqtmp4375['lut425'] = 'difficulty';
    seqtmp4375['lut426'] = function (seqtmp4589, seqtmp4590) {
        return seqtmp4589 + seqtmp4590;
    };
    seqtmp4375['lut427'] = 'tyrael';
    if (me['diff'] !== 0x2 && General['goToNextDifficulty']()) {
        Account['update'](seqtmp4375['lut425'], Misc['difficultyString'][me['diff'] + 0x1]);
        return false;
    }
    if (!Packet['checkQuest'](0x1a, 0x0) && seqtmp4374) {
        return false;
    }
    if (Packet['checkQuest'](0x1a, 0x0) && !seqtmp4374) {
        return true;
    }
    if (seqtmp4375['lut392'](me['diff'], 0x2)) {
        if (me['gold'] < 0x7a120) return false;
        if (me['charlvl'] < 0x54) return false;
        if (Misc['mercPower']() < 0xea60) return false;
    }
    Config['ScanShrines'] = [];
    const seqtmp4598 = ['Grand Vizier of Chaos', 'Infector of Souls', 'Lord De Seis'];
    let seqtmp4599 = function (seqtmp4600, seqtmp4601) {
        let seqtmp4602 = seqtmp4375['lut378'](getPresetUnit, 0x6c, 0x2, seqtmp4600);
        if (!seqtmp4600) {
            throw new Error('Seal preset not found');
        }
        if (seqtmp4602['roomy'] * 0x5 + seqtmp4602['y'] === seqtmp4601 || seqtmp4375['lut379'](seqtmp4602['roomx'] * 0x5, seqtmp4602['x']) === seqtmp4601) {
            return 0x1;
        }
        return 0x2;
    };
    let seqtmp4613 = seqtmp4614 => {
        switch (seqtmp4614) {
        case seqtmp4375['lut380']:
            return [0x18b, 0x18c];
        case seqtmp4375['lut381']:
            return [0x18a];
        case 'Infector of Souls':
            return [0x189, 0x188];
        default:
            return false;
        }
    };
    let seqtmp4618 = seqtmp4619 => {
        switch (seqtmp4619) {
        case 'Grand Vizier of Chaos':
            if (seqtmp4375['lut382'](seqtmp4599, 0x18c, 0x149b) == 0x1) {
                return {
                    'x': 0x1e00,
                    'y': 0x149c
                };
            }
            break;
        case seqtmp4375['lut383']:
            if (seqtmp4375['lut384'](seqtmp4599(0x188, 0x1ed5), 0x1)) {
                return {
                    'x': 0x1ec0,
                    'y': 0x14b2
                };
            }
            break;
        }
        return {
            'x': me['x'],
            'y': me['y']
        };
    };
    let seqtmp4626 = seqtmp4627 => {
        let seqtmp4628;
        let seqtmp4629;
        for (let seqtmp4630 = 0x0; seqtmp4630 < 0xa; seqtmp4630 += 0x1) {
            var seqtmp4633 = seqtmp4375['lut385']['split']('|'),
                seqtmp4635 = 0x0;
            while (true) {
                switch (seqtmp4633[seqtmp4635++]) {
                case '0':
                    if (!seqtmp4628) {
                        throw new Error(seqtmp4375['lut379']('Failed to open seal: ', seqtmp4627));
                    }
                    continue;
                case '1':
                    seqtmp4629 = seqtmp4375['lut386'](getTickCount);
                    continue;
                case '2':
                    seqtmp4629 = getTickCount();
                    continue;
                case '3':
                    seqtmp4628 = getUnit(0x2, seqtmp4627);
                    continue;
                case '4':
                    while (seqtmp4375['lut387'](seqtmp4375['lut388'](getTickCount), seqtmp4629) < 0x1388) {
                        if (seqtmp4628) {
                            break;
                        }
                        seqtmp4375['lut389'](delay, 0x32);
                    }
                    continue;
                case '5':
                    while (getTickCount() - seqtmp4629 < 0x3e8) {
                        Pather['walkTo'](seqtmp4628['x'], seqtmp4628['y'], 0xf);
                        if (seqtmp4630 <= 0x5) {
                            Skill['cast'](0x2b, 0x0, seqtmp4628);
                        } else {
                            seqtmp4375['lut390'](sendPacket, 0x1, 0x13, 0x4, 0x2, 0x4, seqtmp4628['gid']);
                        }
                        if (seqtmp4628['mode']) {
                            return true;
                        }
                        Pather['moveToPreset'](0x6c, 0x2, seqtmp4627, [-0x5, -0x5, 0x5, 0x5][seqtmp4375['lut382'](rand, 0x0, 0x3)], [-0x5, -0x5, 0x5, 0x5][seqtmp4375['lut382'](rand, 0x0, 0x3)]);
                        seqtmp4375['lut391'](delay, 0x64);
                    }
                    continue;
                case '6':
                    Attack['clear'](0x14);
                    continue;
                case '7':
                    Pather['moveToPreset'](0x6c, 0x2, seqtmp4627, seqtmp4627 === 0x18a ? 0x5 : 0x2, seqtmp4375['lut392'](seqtmp4627, 0x18a) ? 0x5 : 0x0);
                    continue;
                }
                break;
            }
        }
        return false;
    };
    let seqtmp4667 = seqtmp4668 => {
        let seqtmp4669;
        let seqtmp4670 = getTickCount();
        let seqtmp4671 = seqtmp4668 == 'Diablo' ? 0xea60 : 0x1388;
        while (seqtmp4375['lut393'](seqtmp4375['lut387'](seqtmp4375['lut388'](getTickCount), seqtmp4670), seqtmp4671)) {
            seqtmp4669 = seqtmp4375['lut394'](getUnit, 0x1, seqtmp4668);
            if (seqtmp4669) {
                break;
            }
            delay(0x32);
        }
        if (!Attack['canAttack'](seqtmp4669)) {
            Config['TeleStomp'] = true;
            Attack['clear'](0x14, 0x0, seqtmp4668);
        }
        return Attack['kill'](seqtmp4669);
    };
    let seqtmp4685 = () => {
        let seqtmp4686 = getTickCount();
        while (seqtmp4375['lut393'](seqtmp4375['lut395'](getTickCount) - seqtmp4686, 0x7530)) {
            if (seqtmp4375['lut396'](seqtmp4375['lut397'](seqtmp4375['lut398'](getTickCount), seqtmp4686), 0x1f40)) {
                if ([0x38, 0x3b, 0x40]['indexOf'](Config['AttackSkill'][0x1]) > -0x1) {
                    if (me['getState'](0x79)) {
                        seqtmp4375['lut399'](delay, 0x1f4);
                    } else {
                        Skill['cast'](Config['AttackSkill'][0x1], 0x0, 0x1e71, 0x14ad);
                    }
                }
            }
            if (seqtmp4375['lut400'](getUnit, 0x1, 0xf3)) {
                return true;
            }
            delay(0x96);
        }
        throw new Error(seqtmp4375['lut401']);
    };
    let seqtmp4697 = seqtmp4698 => {
        switch (seqtmp4698) {
        case 'Grand Vizier of Chaos':
            if (seqtmp4375['lut384'](seqtmp4599(0x18c, 0x149b), 0x1)) {
                return [{
                    'x': 0x1e62,
                    'y': 0x14aa,
                    'radius': 0x28
                }, {
                    'x': 0x1e55,
                    'y': 0x14a7,
                    'radius': 0x28
                }, {
                    'x': 0x1e4c,
                    'y': 0x14af,
                    'radius': 0x28
                }, {
                    'x': 0x1e3e,
                    'y': 0x14af,
                    'radius': 0x28
                }, {
                    'x': 0x1e33,
                    'y': 0x14b0,
                    'radius': 0x28
                }, {
                    'x': 0x1e2a,
                    'y': 0x14b5,
                    'radius': 0x28
                }, {
                    'x': 0x1e16,
                    'y': 0x14b0,
                    'radius': 0x28
                }, {
                    'x': 0x1e03,
                    'y': 0x14ad,
                    'radius': 0x28
                }];
            } else {
                return [{
                    'x': 0x1e65,
                    'y': 0x14ac,
                    'radius': 0x28
                }, {
                    'x': 0x1e5b,
                    'y': 0x14a8,
                    'radius': 0x28
                }, {
                    'x': 0x1e53,
                    'y': 0x14b3,
                    'radius': 0x28
                }, {
                    'x': 0x1e4a,
                    'y': 0x14b2,
                    'radius': 0x28
                }, {
                    'x': 0x1e3f,
                    'y': 0x14af,
                    'radius': 0x28
                }, {
                    'x': 0x1e34,
                    'y': 0x14ae,
                    'radius': 0x28
                }, {
                    'x': 0x1e2f,
                    'y': 0x14aa,
                    'radius': 0x28
                }, {
                    'x': 0x1e2e,
                    'y': 0x14c3,
                    'radius': 0x28
                }, {
                    'x': 0x1e22,
                    'y': 0x14c3,
                    'radius': 0x28
                }, {
                    'x': 0x1e13,
                    'y': 0x14c5,
                    'radius': 0x28
                }, {
                    'x': 0x1e08,
                    'y': 0x14c5,
                    'radius': 0x28
                }, {
                    'x': 0x1dfc,
                    'y': 0x14c4,
                    'radius': 0x28
                }, {
                    'x': 0x1def,
                    'y': 0x14bd,
                    'radius': 0x28
                }, {
                    'x': 0x1de7,
                    'y': 0x14b0,
                    'radius': 0x28
                }];
            }
            case seqtmp4375['lut383']:
                if (seqtmp4599(0x188, 0x1ed5) == 0x1) {
                    return [{
                        'x': 0x1e7a,
                        'y': 0x1497,
                        'radius': 0x28
                    }, {
                        'x': 0x1e85,
                        'y': 0x14a0,
                        'radius': 0x28
                    }, {
                        'x': 0x1e8c,
                        'y': 0x14ad,
                        'radius': 0x28
                    }, {
                        'x': 0x1e95,
                        'y': 0x14ae,
                        'radius': 0x28
                    }, {
                        'x': 0x1e9e,
                        'y': 0x14b0,
                        'radius': 0x28
                    }, {
                        'x': 0x1ea6,
                        'y': 0x14a2,
                        'radius': 0x28
                    }, {
                        'x': 0x1eb1,
                        'y': 0x14b4,
                        'radius': 0x28
                    }, {
                        'x': 0x1eba,
                        'y': 0x14b4,
                        'radius': 0x28
                    }, {
                        'x': 0x1ec7,
                        'y': 0x14b3,
                        'radius': 0x28
                    }, {
                        'x': 0x1ed1,
                        'y': 0x14b8,
                        'radius': 0x28
                    }, {
                        'x': 0x1edc,
                        'y': 0x14b9,
                        'radius': 0x28
                    }, {
                        'x': 0x1ee6,
                        'y': 0x14b5,
                        'radius': 0x28
                    }];
                } else {
                    return [{
                        'x': 0x1e88,
                        'y': 0x149e,
                        'radius': 0x28
                    }, {
                        'x': 0x1e91,
                        'y': 0x14a8,
                        'radius': 0x28
                    }, {
                        'x': 0x1e9a,
                        'y': 0x14ae,
                        'radius': 0x28
                    }, {
                        'x': 0x1ea6,
                        'y': 0x14b2,
                        'radius': 0x28
                    }, {
                        'x': 0x1eaf,
                        'y': 0x14b1,
                        'radius': 0x28
                    }, {
                        'x': 0x1eb7,
                        'y': 0x14a9,
                        'radius': 0x28
                    }, {
                        'x': 0x1ebb,
                        'y': 0x14a5,
                        'radius': 0x28
                    }, {
                        'x': 0x1ec1,
                        'y': 0x149e,
                        'radius': 0x28
                    }, {
                        'x': 0x1ecc,
                        'y': 0x149e,
                        'radius': 0x28
                    }, {
                        'x': 0x1ed6,
                        'y': 0x149e,
                        'radius': 0x28
                    }, {
                        'x': 0x1edf,
                        'y': 0x149b,
                        'radius': 0x28
                    }, {
                        'x': 0x1ee6,
                        'y': 0x149c,
                        'radius': 0x28
                    }, {
                        'x': 0x1ef0,
                        'y': 0x1497,
                        'radius': 0x28
                    }, {
                        'x': 0x1ef8,
                        'y': 0x149a,
                        'radius': 0x28
                    }, {
                        'x': 0x1f01,
                        'y': 0x149f,
                        'radius': 0x28
                    }, {
                        'x': 0x1f04,
                        'y': 0x14a8,
                        'radius': 0x28
                    }, {
                        'x': 0x1f04,
                        'y': 0x14b1,
                        'radius': 0x28
                    }, {
                        'x': 0x1f04,
                        'y': 0x14bb,
                        'radius': 0x28
                    }, {
                        'x': 0x1f02,
                        'y': 0x14c3,
                        'radius': 0x28
                    }, {
                        'x': 0x1efb,
                        'y': 0x14c7,
                        'radius': 0x28
                    }, {
                        'x': 0x1ef3,
                        'y': 0x14c9,
                        'radius': 0x28
                    }];
                }
                case seqtmp4375['lut381']:
                    if (seqtmp4599(0x18a, 0x1e5d) == 0x1) {
                        return [{
                            'x': 0x1e6b,
                            'y': 0x14a5,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6b,
                            'y': 0x1496,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6d,
                            'y': 0x148b,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6e,
                            'y': 0x1481,
                            'radius': 0x28
                        }, {
                            'x': 0x1e67,
                            'y': 0x147a,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5a,
                            'y': 0x1473,
                            'radius': 0x28
                        }, {
                            'x': 0x1e59,
                            'y': 0x1454,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6a,
                            'y': 0x144c,
                            'radius': 0x28
                        }, {
                            'x': 0x1e80,
                            'y': 0x1450,
                            'radius': 0x28
                        }, {
                            'x': 0x1e8a,
                            'y': 0x1448,
                            'radius': 0x28
                        }, {
                            'x': 0x1e8d,
                            'y': 0x143e,
                            'radius': 0x28
                        }, {
                            'x': 0x1e8b,
                            'y': 0x1424,
                            'radius': 0x28
                        }, {
                            'x': 0x1e79,
                            'y': 0x1422,
                            'radius': 0x28
                        }];
                    } else {
                        return [{
                            'x': 0x1e68,
                            'y': 0x1496,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6b,
                            'y': 0x1489,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6e,
                            'y': 0x1482,
                            'radius': 0x28
                        }, {
                            'x': 0x1e72,
                            'y': 0x1479,
                            'radius': 0x28
                        }, {
                            'x': 0x1e7b,
                            'y': 0x146e,
                            'radius': 0x28
                        }, {
                            'x': 0x1e82,
                            'y': 0x1461,
                            'radius': 0x28
                        }, {
                            'x': 0x1e83,
                            'y': 0x1454,
                            'radius': 0x28
                        }, {
                            'x': 0x1e75,
                            'y': 0x1451,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5e,
                            'y': 0x144c,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5e,
                            'y': 0x143a,
                            'radius': 0x28
                        }, {
                            'x': 0x1e61,
                            'y': 0x1428,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6b,
                            'y': 0x141f,
                            'radius': 0x28
                        }];
                    }
                    case seqtmp4375['lut402']:
                        return [{
                            'x': 0x1e73,
                            'y': 0x15b1,
                            'radius': 0x28
                        }, {
                            'x': 0x1e72,
                            'y': 0x15a3,
                            'radius': 0x28
                        }, {
                            'x': 0x1e72,
                            'y': 0x1595,
                            'radius': 0x28
                        }, {
                            'x': 0x1e73,
                            'y': 0x1587,
                            'radius': 0x28
                        }, {
                            'x': 0x1e72,
                            'y': 0x157d,
                            'radius': 0x28
                        }, {
                            'x': 0x1e65,
                            'y': 0x1579,
                            'radius': 0x28
                        }, {
                            'x': 0x1e57,
                            'y': 0x1572,
                            'radius': 0x28
                        }, {
                            'x': 0x1e57,
                            'y': 0x1566,
                            'radius': 0x28
                        }, {
                            'x': 0x1e58,
                            'y': 0x1558,
                            'radius': 0x28
                        }, {
                            'x': 0x1e58,
                            'y': 0x154c,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5c,
                            'y': 0x153f,
                            'radius': 0x28
                        }, {
                            'x': 0x1e65,
                            'y': 0x1537,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6c,
                            'y': 0x152f,
                            'radius': 0x28
                        }, {
                            'x': 0x1e61,
                            'y': 0x1526,
                            'radius': 0x28
                        }, {
                            'x': 0x1e57,
                            'y': 0x1516,
                            'radius': 0x28
                        }, {
                            'x': 0x1e57,
                            'y': 0x150c,
                            'radius': 0x28
                        }, {
                            'x': 0x1e58,
                            'y': 0x1503,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5b,
                            'y': 0x14f7,
                            'radius': 0x28
                        }, {
                            'x': 0x1e5a,
                            'y': 0x14f0,
                            'radius': 0x28
                        }, {
                            'x': 0x1e6a,
                            'y': 0x14e7,
                            'radius': 0x28
                        }, {
                            'x': 0x1e75,
                            'y': 0x14e3,
                            'radius': 0x28
                        }, {
                            'x': 0x1e72,
                            'y': 0x14d3,
                            'radius': 0x28
                        }];
        }
        return [];
    };
    let seqtmp4707 = function () {
        let seqtmp4708 = getUnit(0x1);
        if (seqtmp4708) {
            do {
                if (!seqtmp4708['dead'] && seqtmp4708['classid'] != 0xf3 && !seqtmp4708['getParent']()) {
                    return false;
                }
            } while (seqtmp4708['getNext']());
        }
        return true;
    };
    let seqtmp4714 = function (seqtmp4715) {
        var seqtmp4716 = {};
        seqtmp4716['lut428'] = function (seqtmp4718, seqtmp4719) {
            return seqtmp4718(seqtmp4719);
        };
        let seqtmp4722 = seqtmp4697(seqtmp4715);
        if (me['nightmare']) {
            Config['Dodge'] = true;
            Config['DodgeRange'] = 0xf;
            Config['DodgeHP'] = 0x46;
        }
        Attack['clearCoordList'](seqtmp4722, 0x5);
        let seqtmp4726 = seqtmp4375['lut403'](seqtmp4613, seqtmp4715);
        seqtmp4726['every'](function (seqtmp4731) {
            return seqtmp4716['lut428'](seqtmp4626, seqtmp4731);
        });
        let {
            x,
            y
        } = seqtmp4618(seqtmp4715);
        Pather['teleportTo'](x, y);
        if (seqtmp4715 == seqtmp4375['lut383']) {
            Pather['teleport'] = true;
            Config['Dodge'] = true;
            Config['DodgeRange'] = 0x1e;
            Config['DodgeHP'] = 0x64;
        }
        if (seqtmp4715 == 'Lord De Seis') {
            Pather['teleport'] = true;
            Config['Dodge'] = true;
            Config['DodgeRange'] = 0xf;
            Config['DodgeHP'] = 0x64;
            Skill['usePvpRange'] = false;
            if (seqtmp4375['lut384'](seqtmp4375['lut404'](seqtmp4599, 0x18a, 0x1e5d), 0x1)) {
                Pather['moveTo'](0x1e81, 0x1426);
                Pather['moveTo'](0x1e83, 0x1476);
                Pather['moveTo'](0x1e71, 0x1480);
            } else {
                Pather['moveTo'](0x1e85, 0x143e);
                Pather['moveTo'](0x1e78, 0x144e);
            }
        }
        if (seqtmp4667(seqtmp4715)) {
            var seqtmp4745 = '2|6|3|0|4|5|1'['split']('|'),
                seqtmp4746 = 0x0;
            while (true) {
                switch (seqtmp4745[seqtmp4746++]) {
                case '0':
                    Pather['moveTo'](0x1e6f, 0x14ae);
                    continue;
                case '1':
                    return true;
                case '2':
                    Attack['clear'](0x32);
                    continue;
                case '3':
                    Pather['teleport'] = true;
                    continue;
                case '4':
                    if (me['normal']) {
                        Pather['teleport'] = false;
                    }
                    continue;
                case '5':
                    if (seqtmp4375['lut384'](seqtmp4715, seqtmp4375['lut383'])) {
                        Config['Dodge'] = false;
                        Config['DodgeRange'] = 0xf;
                    }
                    continue;
                case '6':
                    Pickit['pickItems'](0x32);
                    continue;
                }
                break;
            }
        }
        return false;
    };
    let seqtmp4752 = seqtmp4753 => {
        let seqtmp4754;
        let seqtmp4755 = 0x0;
        let seqtmp4756 = getUnit(0x1, 'Diablo');
        let seqtmp4757 = Math['floor'](seqtmp4375['lut405'](me['getSkill'](0x2a, 0x1) + 0x4, 0x2) / 0x3);
        while (seqtmp4755 < 0x258 && Attack['checkMonster'](seqtmp4756)) {
            Misc['townCheck']();
            if (!seqtmp4756 || !copyUnit(seqtmp4756)['x']) {
                seqtmp4756 = getUnit(0x1, 'Diablo');
                if (!seqtmp4756) {
                    break;
                }
            }
            if (seqtmp4375['lut406'](seqtmp4375['lut405'](seqtmp4756['hp'], 0x64) / 0x80, seqtmp4753)) {
                break;
            }
            if (seqtmp4375['lut384'](seqtmp4756['mode'], 0x7) || seqtmp4756['mode'] == 0xa) {
                var seqtmp4772 = seqtmp4375['lut407']['split']('|'),
                    seqtmp4774 = 0x0;
                while (true) {
                    switch (seqtmp4772[seqtmp4774++]) {
                    case '0':
                        Pather['usePortal'](0x6c, me['name']);
                        continue;
                    case '1':
                        while (seqtmp4375['lut408'](getTickCount - seqtmp4754, 0xbb8)) {
                            seqtmp4375['lut409'](delay, 0x19);
                        }
                        continue;
                    case '2':
                        seqtmp4754 = seqtmp4375['lut410'](getTickCount);
                        continue;
                    case '3':
                        Town['doChores']();
                        continue;
                    case '4':
                        Town['goToTown']();
                        continue;
                    }
                    break;
                }
            }
            if (getDistance(me, seqtmp4756) > seqtmp4757 || seqtmp4375['lut378'](checkCollision, me, seqtmp4756, 0x4)) {
                Attack['getIntoPosition'](seqtmp4756, seqtmp4757, 0x4);
            }
            if (!seqtmp4756['getState'](0xb)) {
                Skill['cast'](0x2c, 0x1);
            }
            Skill['cast'](0x2a, 0x0);
            seqtmp4755 += 0x1;
        }
        return true;
    };
    let seqtmp4790 = () => {
        var seqtmp4791 = {};
        seqtmp4791['lut429'] = function (seqtmp4793, seqtmp4794) {
            return seqtmp4793 < seqtmp4794;
        };
        seqtmp4791['lut430'] = function (seqtmp4798, seqtmp4799) {
            return seqtmp4798 <= seqtmp4799;
        };
        seqtmp4791['lut431'] = function (seqtmp4803, seqtmp4804, seqtmp4805, seqtmp4806, seqtmp4807) {
            return seqtmp4803(seqtmp4804, seqtmp4805, seqtmp4806, seqtmp4807);
        };
        seqtmp4791['lut432'] = seqtmp4375.lut411;
        Attack['getMonsterCount'] = function (seqtmp4815, seqtmp4816, seqtmp4817, seqtmp4818) {
            var seqtmp4819, seqtmp4820, seqtmp4821 = 0x0,
                seqtmp4822 = [];
            for (seqtmp4819 = 0x0; seqtmp4791['lut429'](seqtmp4819, seqtmp4818['length']); seqtmp4819 += 0x1) {
                if (seqtmp4822['indexOf'](seqtmp4818[seqtmp4819]['classid']) === -0x1 && this['checkMonster'](seqtmp4818[seqtmp4819]) && seqtmp4791['lut430'](seqtmp4791['lut431'](getDistance, seqtmp4815, seqtmp4816, seqtmp4818[seqtmp4819]['x'], seqtmp4818[seqtmp4819]['y']), seqtmp4817)) {
                    seqtmp4821 += 0x1;
                }
            }
            seqtmp4820 = getUnit(0x2, seqtmp4791['lut432']);
            if (seqtmp4820) {
                do {
                    if (seqtmp4791['lut431'](getDistance, seqtmp4815, seqtmp4816, seqtmp4820['x'], seqtmp4820['y']) <= 0x4) {
                        seqtmp4821 += 0x64;
                    }
                } while (seqtmp4820['getNext']());
            }
            return seqtmp4821;
        };
        let seqtmp4854;
        let seqtmp4855;
        let seqtmp4856 = seqtmp4375['lut412'](getUnit, 0x1, seqtmp4375['lut413']);
        Config['AttackSkill'][0x2] = -0x1;
        Config['TownHP'] = 0x0;
        while (Attack['checkMonster'](seqtmp4856)) {
            Misc['townCheck']();
            me['overhead'](seqtmp4375['lut414'](seqtmp4375['lut415'], Math['round'](seqtmp4375['lut416'](seqtmp4856['hp'], 0x64) / 0x80)));
            if (!seqtmp4856 || !seqtmp4375['lut417'](copyUnit, seqtmp4856)['x']) {
                seqtmp4856 = getUnit(0x1, 'Diablo');
                if (!seqtmp4856) {
                    break;
                }
            }
            seqtmp4855 = me['getMerc']();
            if (seqtmp4375['lut418'](getDistance, me, seqtmp4856) < 0x2d) {
                Attack['deploy'](seqtmp4856, 0x28, 0x5, 0x32);
            }
            if (seqtmp4855 && seqtmp4375['lut419'](seqtmp4375['lut418'](getDistance, seqtmp4855, seqtmp4856), 0x1e)) {
                Pather['teleportTo'](me['x'], me['y'], 0x1);
            }
            if (seqtmp4375['lut420'](seqtmp4856['mode'], 0x7) || seqtmp4375['lut420'](seqtmp4856['mode'], 0xa)) {
                seqtmp4854 = seqtmp4375['lut410'](getTickCount);
                Town['doChores']();
                while (getTickCount - seqtmp4854 < 0xbb8) {
                    delay(0x19);
                }
                Pather['usePortal'](0x6c, me['name']);
            }
            ClassAttack['doAttack'](seqtmp4856, false);
        }
        if (!seqtmp4856 || !seqtmp4375['lut421'](copyUnit, seqtmp4856)['x']) {
            return true;
        }
        if (seqtmp4375['lut422'](seqtmp4856['hp'], 0x0) && seqtmp4375['lut423'](seqtmp4856['mode'], 0x0) && seqtmp4375['lut424'](seqtmp4856['mode'], 0xc)) {
            return false;
        }
        return true;
    };
    me['overhead']('starting diablo');
    if (me['diff'] === 0x2) {
        Config['UseMerc'] = true;
        Config['MercWatch'] = true;
    }
    Town['doChores']();
    if (!Pather['checkWP'](0x6b)) {
        Pather['getWP'](0x6b, false);
    } else {
        Pather['useWaypoint'](0x6b);
    }
    Precast['doPrecast'](true);
    Pather['moveTo'](0x1e7a, 0x15c1);
    Pather['moveTo'](0x1e5e, 0x14b9);
    if (me['normal']) {
        Pather['teleport'] = false;
    }
    Config['Dodge'] = false;
    Config['PickRange'] = 0x14;
    Skill['usePvpRange'] = false;
    Attack['clear'](0x1e);
    if (!seqtmp4598['every'](seqtmp4896 => seqtmp4714(seqtmp4896))) {
        return false;
    }
    Pather['teleport'] = true;
    Pather['moveTo'](0x1e70, 0x14cf);
    if (!seqtmp4707()) {
        return false;
    }
    const seqtmp4900 = !Packet['checkQuest'](0x1a, 0x0);
    Skill['usePvpRange'] = true;
    Config['UseMerc'] = false;
    Pather['moveTo'](0x1e93, 0x14c9);
    seqtmp4685();
    let seqtmp4902 = [
        [0x1ea6, 0x14ae],
        [0x1e70, 0x14db],
        [0x1e43, 0x14ab],
        [0x1e72, 0x1481]
    ];
    for (let seqtmp4903 = 0x0; seqtmp4903 < 0x5; seqtmp4903++) {
        try {
            if (seqtmp4790()) {
                break;
            }
        } catch (seqtmp4907) {
            seqtmp4375['lut421'](print, seqtmp4907);
            for (let seqtmp4910 = 0x0; seqtmp4375['lut419'](seqtmp4910, seqtmp4902['length']); seqtmp4910++) {
                Pather['moveTo'](seqtmp4902[seqtmp4910][0x0], seqtmp4902[seqtmp4910][0x1]);
                if (getUnit(0x1, 'Diablo')) {
                    break;
                }
            }
        }
    }
    Pickit['pickItems'](0x32);
    Config['MercWatch'] = false;
    if (seqtmp4375['lut424'](me['diff'], 0x2) && General['goToNextDifficulty']()) {
        Account['update'](seqtmp4375['lut425'], Misc['difficultyString'][seqtmp4375['lut426'](me['diff'], 0x1)]);
        return false;
    }
    if (seqtmp4900) {
        if (!me['classic']) {
            Town['goToTown']();
            Quest['talkTo'](seqtmp4375['lut427'], seqtmp4375['lut427']);
            Quest['changeAct'](0x5);
        } else {
            D2Bot['restart']();
        }
    }
    return true;
}

function shenk(seqtmp5011, seqtmp5012) {
    var seqtmp5013 = {};
    seqtmp5013['lut433'] = function (seqtmp5015, seqtmp5016) {
        return seqtmp5015 === seqtmp5016;
    };
    seqtmp5013['lut434'] = 'rval105';
    seqtmp5013['lut435'] = 'rval106';
    seqtmp5013['lut436'] = 'rval107';
    seqtmp5013['lut437'] = function (seqtmp5023, seqtmp5024) {
        return seqtmp5023 >= seqtmp5024;
    };
    seqtmp5013['lut438'] = function (seqtmp5028) {
        return seqtmp5028();
    };
    seqtmp5013['lut439'] = 'starting shenk';
    seqtmp5013['lut440'] = 'rval108';
    if (!Packet['checkQuest'](0x23, 0x0) && !Packet['checkQuest'](0x23, 0x1) && seqtmp5011) {
        if (seqtmp5013['lut433'](seqtmp5013['lut434'], seqtmp5013['lut435'])) {
            return false;
        } else {
            return false;
        }
    }
    if ((Packet['checkQuest'](0x23, 0x0) || Packet['checkQuest'](0x23, 0x1)) && !seqtmp5011) {
        if (seqtmp5013['lut433']('rval107', seqtmp5013['lut436'])) {
            return true;
        } else {
            Pather['useWaypoint'](0x6f);
        }
    }
    let seqtmp5039 = function () {
        switch (me['diff']) {
        case 0x0:
            return 0x2d;
        case 0x1:
            return 0x4b;
        default:
            return 0x1;
        }
    };
    if (seqtmp5013['lut437'](me['charlvl'], seqtmp5013['lut438'](seqtmp5039))) {
        return true;
    }
    me['overhead'](seqtmp5013['lut439']);
    Town['doChores']();
    if (!Pather['checkWP'](0x6f)) {
        Pather['getWP'](0x6f, seqtmp5012);
        if (Packet['checkQuest'](0x23, 0x1)) {
            return true;
        }
    } else {
        if (seqtmp5013['lut440'] !== 'rval108') {
            Pather['getWP'](0x6f, seqtmp5012);
            if (Packet['checkQuest'](0x23, 0x1)) {
                return true;
            }
        } else {
            Pather['useWaypoint'](0x6f);
        }
    }
    Precast['doPrecast'](true);
    Pather['moveTo'](0xf06, 0x1400, 0x3, seqtmp5012);
    Skill['usePvpRange'] = true;
    Attack['kill'](getLocaleString(0x57a3));
    Pickit['pickItems'](0x32);
    return true;
}

function rescue() {
    var seqtmp5134 = {};
    seqtmp5134['lut441'] = function (seqtmp5136, seqtmp5137) {
        return seqtmp5136(seqtmp5137);
    };
    seqtmp5134['lut442'] = function (seqtmp5141, seqtmp5142) {
        return seqtmp5141 + seqtmp5142;
    };
    seqtmp5134['lut443'] = function (seqtmp5146, seqtmp5147) {
        return seqtmp5146 * seqtmp5147;
    };
    seqtmp5134['lut444'] = function (seqtmp5151, seqtmp5152) {
        return seqtmp5151 * seqtmp5152;
    };
    seqtmp5134['lut445'] = function (seqtmp5156, seqtmp5157, seqtmp5158) {
        return seqtmp5156(seqtmp5157, seqtmp5158);
    };
    seqtmp5134['lut446'] = function (seqtmp5163, seqtmp5164) {
        return seqtmp5163 === seqtmp5164;
    };
    seqtmp5134['lut447'] = 'rval109';
    seqtmp5134['lut448'] = function (seqtmp5169, seqtmp5170) {
        return seqtmp5169(seqtmp5170);
    };
    seqtmp5134['lut449'] = 'Failed to move to Frigid Highlands';
    seqtmp5134['lut450'] = function (seqtmp5175, seqtmp5176) {
        return seqtmp5175 !== seqtmp5176;
    };
    seqtmp5134['lut451'] = 'rval110';
    seqtmp5134['lut452'] = function (seqtmp5181, seqtmp5182) {
        return seqtmp5181 * seqtmp5182;
    };
    seqtmp5134['lut453'] = 'rval111';
    seqtmp5134['lut454'] = function (seqtmp5187, seqtmp5188) {
        return seqtmp5187(seqtmp5188);
    };
    seqtmp5134['lut455'] = function (seqtmp5192, seqtmp5193) {
        return seqtmp5192 + seqtmp5193;
    };
    seqtmp5134['lut456'] = function (seqtmp5197, seqtmp5198) {
        return seqtmp5197 * seqtmp5198;
    };
    seqtmp5134['lut457'] = function (seqtmp5202, seqtmp5203) {
        return seqtmp5202(seqtmp5203);
    };
    seqtmp5134['lut458'] = 'Qual-Kehk';
    var seqtmp5207, seqtmp5208, seqtmp5209;
    if (seqtmp5134['lut446'](me['gametype'], 0x0)) return true;
    if (me['getQuest'](0x24, 0x0) || me['getQuest'](0x24, 0x1)) {
        if (seqtmp5134['lut446'](seqtmp5134['lut447'], 'CSdwe')) {
            ClassAttack['doAttack'](seqtmp5208, false);
            seqtmp5134['lut441'](delay, seqtmp5134['lut442'](0xc8, 0x2 * me['ping']));
        } else {
            return true;
        }
    }
    me['overhead']('starting rescue');
    Town['doChores']();
    if (!Pather['journeyTo'](0x6f)) {
        seqtmp5134['lut448'](print, seqtmp5134['lut449']);
        return false;
    }
    var seqtmp5218 = getPresetUnits(0x6f, 0x2, 0x1d9);
    var seqtmp5219 = [];
    for (seqtmp5207 = 0x0; seqtmp5207 < seqtmp5218['length']; seqtmp5207++) {
        if (seqtmp5134['lut450'](seqtmp5134['lut451'], seqtmp5134['lut451'])) {
            seqtmp5209 = {};
            seqtmp5209['x'] = seqtmp5134.lut442(seqtmp5134.lut443(seqtmp5218[seqtmp5207].roomx, 0x5), seqtmp5218[seqtmp5207].x);
            seqtmp5209['y'] = seqtmp5134.lut442(seqtmp5134.lut444(seqtmp5218[seqtmp5207].roomy, 0x5), seqtmp5218[seqtmp5207].y);
            seqtmp5209['classid'] = 0x1b2;
            seqtmp5209['type'] = 0x1;
            seqtmp5219[seqtmp5207] = seqtmp5209;
        } else {
            seqtmp5209 = {};
            seqtmp5209['x'] = seqtmp5134.lut442(seqtmp5134.lut452(seqtmp5218[seqtmp5207].roomx, 0x5), seqtmp5218[seqtmp5207].x);
            seqtmp5209['y'] = seqtmp5134.lut442(seqtmp5134.lut452(seqtmp5218[seqtmp5207].roomy, 0x5), seqtmp5218[seqtmp5207].y);
            seqtmp5209['classid'] = 0x1b2;
            seqtmp5209['type'] = 0x1;
            seqtmp5219[seqtmp5207] = seqtmp5209;
        }
    }

    function seqtmp5267(seqtmp5268, seqtmp5269) {
        return seqtmp5134['lut445'](getDistance, me, seqtmp5268) - seqtmp5134['lut445'](getDistance, me, seqtmp5269);
    }
    while (seqtmp5219['length']) {
        if (seqtmp5134['lut446'](seqtmp5134['lut453'], 'CMseT')) {
            return true;
        } else {
            seqtmp5219['sort'](seqtmp5267);
            let seqtmp5279 = seqtmp5219['shift']();
            Pather['moveTo'](seqtmp5279['x'], seqtmp5279['y']);
            let seqtmp5208 = getUnit(seqtmp5279['type'], seqtmp5279['classid']);
            if (seqtmp5208) {
                while (seqtmp5208['mode'] !== 0xc) {
                    ClassAttack['doAttack'](seqtmp5208, false);
                    seqtmp5134['lut454'](delay, seqtmp5134['lut455'](0xc8, seqtmp5134['lut456'](0x2, me['ping'])));
                }
            } else {
                seqtmp5134['lut457'](print, 'Failed to destroy the doors');
                return false;
            }
            seqtmp5134['lut457'](delay, 0xbb8);
        }
    }
    Town['goToTown'](0x5);
    Town['move'](NPC[seqtmp5134['lut458']]);
    seqtmp5209 = getUnit(0x1, seqtmp5134['lut458']);
    seqtmp5209['openMenu']();
    me['cancel']();
    return true;
}

function anya(seqtmp5382, seqtmp5383) {
    var seqtmp5384 = {};
    seqtmp5384['lut459'] = function (seqtmp5386, seqtmp5387, seqtmp5388) {
        return seqtmp5386(seqtmp5387, seqtmp5388);
    };
    seqtmp5384['lut460'] = function (seqtmp5393, seqtmp5394) {
        return seqtmp5393 * seqtmp5394;
    };
    seqtmp5384['lut461'] = 'malah';
    seqtmp5384['lut462'] = function (seqtmp5399, seqtmp5400) {
        return seqtmp5399(seqtmp5400);
    };
    seqtmp5384['lut463'] = function (seqtmp5404, seqtmp5405) {
        return seqtmp5404 === seqtmp5405;
    };
    seqtmp5384['lut464'] = function (seqtmp5409, seqtmp5410) {
        return seqtmp5409 !== seqtmp5410;
    };
    seqtmp5384['lut465'] = 'rval112';
    seqtmp5384['lut466'] = function (seqtmp5415, seqtmp5416, seqtmp5417) {
        return seqtmp5415(seqtmp5416, seqtmp5417);
    };
    seqtmp5384['lut467'] = 'rval113';
    seqtmp5384['lut468'] = function (seqtmp5423, seqtmp5424, seqtmp5425) {
        return seqtmp5423(seqtmp5424, seqtmp5425);
    };
    seqtmp5384['lut469'] = function (seqtmp5430, seqtmp5431) {
        return seqtmp5430 + seqtmp5431;
    };
    seqtmp5384['lut470'] = function (seqtmp5435) {
        return seqtmp5435();
    };
    seqtmp5384['lut471'] = 'anya';
    if (Packet['checkQuest'](0x25, 0x1)) {
        if (seqtmp5384['lut463'](true, false)) {
            return false;
        } else {
            Quest['talkTo']('anya', 'anya');
        }
    }
    if (!Packet['checkQuest'](0x25, 0x0) && seqtmp5382) {
        return false;
    }
    if (Packet['checkQuest'](0x25, 0x0) && !seqtmp5382) {
        return true;
    }
    let seqtmp5441 = function () {
        let seqtmp5442 = seqtmp5384['lut459'](getUnit, 0x1, 'malah');
        while (!seqtmp5442) {
            Town['move'](portalspot);
            Packet['flash'](me['gid']);
            delay(seqtmp5384['lut460'](me['ping'], 0x2));
            seqtmp5442 = getUnit(0x1, 'malah');
        }
        if (seqtmp5442) {
            for (let seqtmp5448 = 0x0; seqtmp5448 < 0xa && !me['getItem'](0x286); seqtmp5448++) {
                Quest['talkTo']('malah', seqtmp5384['lut461']);
                seqtmp5384['lut462'](delay, seqtmp5384['lut460'](me['ping'], 0x2) + 0x1f4);
            }
            Pickit['pickItems']();
            return !!me['getItem'](0x286);
        }
        return false;
    };
    me['overhead']('starting anya');
    Town['doChores']();
    Town['stackPotions'](0x205);
    if (!Pather['checkWP'](0x71)) {
        if (seqtmp5384['lut464'](seqtmp5384['lut465'], 'rval112')) {
            return true;
        } else {
            Pather['getWP'](0x71, seqtmp5383);
        }
    } else {
        Pather['useWaypoint'](0x71);
    }
    Pather['moveToExit'](0x72, true, seqtmp5383);
    Pather['moveToPreset'](me['area'], 0x2, 0x1cc, 0x0, 0x0, seqtmp5383);
    let seqtmp5459 = seqtmp5384['lut466'](getUnit, 0x2, 0x22e);
    if (!seqtmp5459) {
        if (seqtmp5384['lut464'](seqtmp5384['lut467'], seqtmp5384['lut467'])) {
            delay(0x3e8);
            seqtmp5459 = getUnit(0x2, 0x22e);
        } else {
            delay(0x3e8);
            seqtmp5459 = getUnit(0x2, 0x22e);
        }
    }
    if (seqtmp5459) {
        Pather['moveToUnit'](seqtmp5459);
        seqtmp5459['interact']();
        me['cancel']();
        me['cancel']();
    }
    Town['goToTown']();
    Quest['talkTo']('malah', 'malah');
    Pather['usePortal'](0x72, me['name']);
    seqtmp5459 = seqtmp5384['lut468'](getUnit, 0x2, 0x22e);
    while (seqtmp5459 && !seqtmp5459['mode']) {
        seqtmp5459['interact']();
        me['cancel']();
        me['cancel']();
        seqtmp5384['lut462'](delay, seqtmp5384['lut469'](me['ping'] * 0x2, 0x32));
    }
    Town['goToTown']();
    seqtmp5384['lut470'](seqtmp5441);
    Quest['talkTo'](seqtmp5384['lut471'], seqtmp5384['lut471']);
    seqtmp5384['lut462'](delay, 0xc8);
    me['cancel']();
    me['cancel']();
    return true;
}

function ancients(seqtmp5502, seqtmp5503) {
    var seqtmp5504 = {};
    seqtmp5504['lut472'] = function (seqtmp5506, seqtmp5507) {
        return seqtmp5506 != seqtmp5507;
    };
    seqtmp5504['lut473'] = function (seqtmp5511, seqtmp5512) {
        return seqtmp5511(seqtmp5512);
    };
    seqtmp5504['lut474'] = function (seqtmp5516, seqtmp5517) {
        return seqtmp5516 < seqtmp5517;
    };
    seqtmp5504['lut475'] = function (seqtmp5521, seqtmp5522) {
        return seqtmp5521 !== seqtmp5522;
    };
    seqtmp5504['lut476'] = '3|4|1|2|0';
    seqtmp5504['lut477'] = function (seqtmp5527, seqtmp5528) {
        return seqtmp5527 === seqtmp5528;
    };
    seqtmp5504['lut478'] = function (seqtmp5532) {
        return seqtmp5532();
    };
    seqtmp5504['lut479'] = 'rval114';
    seqtmp5504['lut480'] = function (seqtmp5536, seqtmp5537) {
        return seqtmp5536 === seqtmp5537;
    };
    seqtmp5504['lut481'] = 'rval115';
    seqtmp5504['lut482'] = 'rval116';
    seqtmp5504['lut483'] = function (seqtmp5543, seqtmp5544) {
        return seqtmp5543(seqtmp5544);
    };
    seqtmp5504['lut484'] = function (seqtmp5548, seqtmp5549) {
        return seqtmp5548 + seqtmp5549;
    };
    seqtmp5504['lut485'] = function (seqtmp5553, seqtmp5554) {
        return seqtmp5553 === seqtmp5554;
    };
    seqtmp5504['lut486'] = 'rval117';
    seqtmp5504['lut487'] = 'rval118';
    seqtmp5504['lut488'] = function (seqtmp5560, seqtmp5561) {
        return seqtmp5560 < seqtmp5561;
    };
    seqtmp5504['lut489'] = function (seqtmp5565, seqtmp5566) {
        return seqtmp5565 - seqtmp5566;
    };
    seqtmp5504['lut490'] = 'rval119';
    seqtmp5504['lut491'] = function (seqtmp5571, seqtmp5572, seqtmp5573) {
        return seqtmp5571(seqtmp5572, seqtmp5573);
    };
    seqtmp5504['lut492'] = 'rval120';
    seqtmp5504['lut493'] = 'rval121';
    seqtmp5504['lut494'] = function (seqtmp5580, seqtmp5581) {
        return seqtmp5580(seqtmp5581);
    };
    seqtmp5504['lut495'] = '4|1|3|0|2';
    seqtmp5504['lut496'] = function (seqtmp5586) {
        return seqtmp5586();
    };
    seqtmp5504['lut497'] = 'rval122';
    seqtmp5504['lut498'] = function (seqtmp5590, seqtmp5591) {
        return seqtmp5590(seqtmp5591);
    };
    seqtmp5504['lut499'] = function (seqtmp5595) {
        return seqtmp5595();
    };
    seqtmp5504['lut500'] = '2|3|0|4|1';
    seqtmp5504['lut501'] = function (seqtmp5599, seqtmp5600, seqtmp5601) {
        return seqtmp5599(seqtmp5600, seqtmp5601);
    };
    seqtmp5504['lut502'] = function (seqtmp4077c8) {
        return seqtmp4077c8();
    };
    seqtmp5504['lut503'] = function (seqtmp5609, seqtmp5610) {
        return seqtmp5609 !== seqtmp5610;
    };
    seqtmp5504['lut504'] = 'rval123';
    seqtmp5504['lut505'] = 'starting ancients';
    if (!Packet['checkQuest'](0x27, 0x0) && seqtmp5502) {
        if (seqtmp5504['lut503'](seqtmp5504['lut504'], 'rval123')) {
            while (seqtmp5504['lut472'](seqtmp5619['mode'], 0x2)) {
                Pather['moveToUnit'](seqtmp5619);
                seqtmp5619['interact']();
                seqtmp5504['lut473'](delay, 0xc8 + me['ping']);
                me['cancel']();
            }
            return true;
        } else {
            return false;
        }
    }
    if (Packet['checkQuest'](0x27, 0x0) && !seqtmp5502) {
        return true;
    }
    let seqtmp5624 = function () {
        let seqtmp5625 = seqtmp5504['lut473'](getUnit, 0x1);
        if (seqtmp5625) {
            if ('rval114' === seqtmp5504['lut479']) {
                do {
                    if (seqtmp5504['lut480'](seqtmp5504['lut481'], 'oIbPz')) {
                        Config['TeleStomp'] = true;
                        Attack['clear'](0x32);
                    } else {
                        if (!seqtmp5625['getParent']() && !Attack['canAttack'](seqtmp5625) && (seqtmp5504['lut474'](me['diff'], 0x2) || seqtmp5504['lut475'](seqtmp5625['classid'], 0x21e))) {
                            if (seqtmp5504['lut480'](seqtmp5504['lut482'], seqtmp5504['lut482'])) {
                                return false;
                            } else {
                                do {
                                    if (!seqtmp5625['getParent']() && !Attack['canAttack'](seqtmp5625) && (seqtmp5504['lut474'](me['diff'], 0x2) || seqtmp5504['lut475'](seqtmp5625['classid'], 0x21e))) {
                                        return false;
                                    }
                                } while (seqtmp5625['getNext']());
                            }
                        }
                    }
                } while (seqtmp5625['getNext']());
            } else {
                var seqtmp5646 = seqtmp5504['lut476']['split']('|'),
                    seqtmp5648 = 0x0;
                while (true) {
                    switch (seqtmp5646[seqtmp5648++]) {
                    case '0':
                        seqtmp5504['lut473'](delay, 0x1770);
                        continue;
                    case '1':
                        Attack['clear'](0x32);
                        continue;
                    case '2':
                        if (seqtmp5504['lut477'](me['diff'], 0x2)) {
                            Config['TeleStomp'] = true;
                            Attack['clear'](0x32);
                        }
                        continue;
                    case '3':
                        Pather['moveTo'](0x2740, 0x3154);
                        continue;
                    case '4':
                        seqtmp5504['lut478'](seqtmp5654);
                        continue;
                    }
                    break;
                }
            }
        }
        return true;
    };
    let seqtmp5619 = function () {
        var seqtmp5656 = {};
        seqtmp5656['lut506'] = function (seqtmp5658, seqtmp5659) {
            return seqtmp5504.lut483(seqtmp5658, seqtmp5659);
        };
        seqtmp5656['lut507'] = function (seqtmp5664, seqtmp5665) {
            return seqtmp5504.lut484(seqtmp5664, seqtmp5665);
        };
        if (seqtmp5504['lut485'](seqtmp5504['lut486'], seqtmp5504['lut487'])) {
            let seqtmp5672 = seqtmp5504['lut473'](getUnit, 0x1);
            if (seqtmp5672) {
                do {
                    if (!seqtmp5672['getParent']() && !Attack['canAttack'](seqtmp5672) && (seqtmp5504['lut474'](me['diff'], 0x2) || seqtmp5504['lut475'](seqtmp5672['classid'], 0x21e))) {
                        return false;
                    }
                } while (seqtmp5672['getNext']());
            }
            return true;
        } else {
            let seqtmp5681 = seqtmp5504['lut478'](getTickCount);
            while (seqtmp5504['lut488'](seqtmp5504['lut489'](getTickCount(), seqtmp5681), 0x1388)) {
                if (getUnit(0x2, 0x222)) {
                    if (seqtmp5504['lut475']('LMsdi', seqtmp5504['lut490'])) {
                        break;
                    } else {
                        Pather['moveToUnit'](seqtmp5619);
                        seqtmp5619['interact']();
                        seqtmp5656['lut506'](delay, seqtmp5656['lut507'](0xc8, me['ping']));
                        me['cancel']();
                    }
                }
                seqtmp5504['lut483'](delay, 0x14);
            }
            let seqtmp5619 = seqtmp5504['lut491'](getUnit, 0x2, 0x222);
            if (seqtmp5619) {
                while (seqtmp5504['lut472'](seqtmp5619['mode'], 0x2)) {
                    if (seqtmp5504['lut492'] === seqtmp5504['lut493']) {
                        return true;
                    } else {
                        Pather['moveToUnit'](seqtmp5619);
                        seqtmp5619['interact']();
                        seqtmp5504['lut494'](delay, 0xc8 + me['ping']);
                        me['cancel']();
                    }
                }
                return true;
            }
            return false;
        }
    };
    me['overhead'](seqtmp5504['lut505']);
    Town['doChores']();
    if (!Pather['checkWP'](0x76)) {
        Pather['getWP'](0x76, seqtmp5503);
    } else {
        Pather['useWaypoint'](0x76);
    }
    Pather['moveToExit'](0x78, true, seqtmp5503);
    Pather['moveTo'](0x2740, 0x3154);
    let seqtmp5706 = Misc['copy'](Config);
    Config['MPBuffer'] = 0x19;
    Config['HPBuffer'] = 0x5;
    Town['visitTown']();
    let seqtmp5654 = function () {
        var seqtmp5708 = {};
        seqtmp5708['lut509'] = seqtmp5504.lut495;
        seqtmp5708['lut510'] = function (seqtmp5712) {
            return seqtmp5504.lut496(seqtmp5712);
        };
        seqtmp5708['lut511'] = function (seqtmp5716, seqtmp5717, seqtmp5718) {
            return seqtmp5504.lut491(seqtmp5716, seqtmp5717, seqtmp5718);
        };
        seqtmp5708['lut512'] = function (seqtmp5724, seqtmp5725) {
            return seqtmp5724(seqtmp5725);
        };
        if (seqtmp5504['lut475']('THRsc', seqtmp5504['lut497'])) {
            seqtmp5504['lut496'](seqtmp5619);
            while (!getUnit(0x1, 0x21e)) {
                seqtmp5504['lut498'](delay, 0x32);
            }
            while (!seqtmp5504['lut499'](seqtmp5624)) {
                var seqtmp5735 = seqtmp5504['lut500']['split']('|'),
                    seqtmp5737 = 0x0;
                while (true) {
                    switch (seqtmp5735[seqtmp5737++]) {
                    case '0':
                        Pather['usePortal'](0x78, me['name']);
                        continue;
                    case '1':
                        while (!seqtmp5504['lut501'](getUnit, 0x1, 0x21e)) {
                            delay(0xa);
                        }
                        continue;
                    case '2':
                        Pather['makePortal'](true);
                        continue;
                    case '3':
                        Town['fillTome'](0x206);
                        continue;
                    case '4':
                        seqtmp5504['lut502'](seqtmp5619);
                        continue;
                    }
                    break;
                }
            }
        } else {
            var seqtmp5743 = seqtmp5708['lut509']['split']('|'),
                seqtmp5745 = 0x0;
            while (true) {
                switch (seqtmp5743[seqtmp5745++]) {
                case '0':
                    seqtmp5708['lut510'](seqtmp5619);
                    continue;
                case '1':
                    Town['fillTome'](0x206);
                    continue;
                case '2':
                    while (!seqtmp5708['lut511'](getUnit, 0x1, 0x21e)) {
                        seqtmp5708['lut512'](delay, 0xa);
                    }
                    continue;
                case '3':
                    Pather['usePortal'](0x78, me['name']);
                    continue;
                case '4':
                    Pather['makePortal'](true);
                    continue;
                }
                break;
            }
        }
    };
    Config['LifeChicken'] = 0xa;
    Config['TownHP'] = 0x0;
    Config['TownCheck'] = false;
    Pather['teleport'] = true;
    Misc['updateConfig']();
    while (!Packet['checkQuest'](0x27, 0x0)) {
        var seqtmp5752 = '3|2|4|0|1'['split']('|'),
            seqtmp5753 = 0x0;
        while (true) {
            switch (seqtmp5752[seqtmp5753++]) {
            case '0':
                if (seqtmp5504['lut485'](me['diff'], 0x2)) {
                    Config['TeleStomp'] = true;
                    Attack['clear'](0x32);
                }
                continue;
            case '1':
                seqtmp5504['lut498'](delay, 0x1770);
                continue;
            case '2':
                seqtmp5654();
                continue;
            case '3':
                Pather['moveTo'](0x2740, 0x3154);
                continue;
            case '4':
                Attack['clear'](0x32);
                continue;
            }
            break;
        }
    }
    Config = seqtmp5706;
    Misc['updateConfig']();
    return true;
}

function pindle() {
    var seqtmp5846 = {};
    seqtmp5846['lut513'] = function (seqtmp5848, seqtmp5849) {
        return seqtmp5848(seqtmp5849);
    };
    seqtmp5846['lut514'] = function (seqtmp5853, seqtmp5854) {
        return seqtmp5853 >= seqtmp5854;
    };
    seqtmp5846['lut515'] = 'rval124';
    seqtmp5846['lut516'] = 'starting pindle';
    seqtmp5846['lut517'] = function (seqtmp5860, seqtmp5861) {
        return seqtmp5860 !== seqtmp5861;
    };
    seqtmp5846['lut518'] = 'rval125';
    seqtmp5846['lut519'] = 'rval126';
    seqtmp5846['lut520'] = function (seqtmp5867, seqtmp5868, seqtmp5869) {
        return seqtmp5867(seqtmp5868, seqtmp5869);
    };
    seqtmp5846['lut521'] = 'malah';
    seqtmp5846['lut522'] = function (seqtmp5875, seqtmp5876) {
        return seqtmp5875 <= seqtmp5876;
    };
    seqtmp5846['lut523'] = 'anya';
    seqtmp5846['lut524'] = function (seqtmp5881, seqtmp5882) {
        return seqtmp5881 === seqtmp5882;
    };
    seqtmp5846['lut525'] = 'rval127';
    seqtmp5846['lut526'] = function (seqtmp5887, seqtmp5888) {
        return seqtmp5887(seqtmp5888);
    };
    if (!Packet['checkQuest'](0x25, 0x1) && !Packet['checkQuest'](0x25, 0x0)) {
        return true;
    }
    let seqtmp5891 = function () {
        switch (me['diff']) {
        case 0x0:
            return 0x2d;
        case 0x1:
            return 0x4b;
        default:
            return 0x64;
        }
    };
    if (seqtmp5846['lut514'](me['charlvl'], seqtmp5891())) {
        if (seqtmp5846['lut515'] !== seqtmp5846['lut515']) {
            Pather['moveTo'](0x13ec, 0x139a);
        } else {
            return true;
        }
    }
    me['overhead'](seqtmp5846['lut516']);
    Town['doChores']();
    if (me['act'] != 0x5) {
        Town['goToTown'](0x5);
    } else {
        if (seqtmp5846['lut517'](seqtmp5846['lut518'], seqtmp5846['lut519'])) {
            let seqtmp5900 = seqtmp5846['lut520'](getUnit, 0x1, seqtmp5846['lut521']);
            if (seqtmp5900) {
                if (seqtmp5846['lut522'](getDistance(me, seqtmp5900), 0x14)) {
                    Pather['moveTo'](0x13ec, 0x139a);
                }
            }
        } else {
            Attack['clear'](0xf, 0x0, seqtmp5846['lut513'](getLocaleString, 0x57e1));
        }
    }
    Town['move'](seqtmp5846['lut523']);
    if (!Pather['getPortal'](0x79)) {
        let seqtmp5908 = getUnit(0x1, NPC['Anya']);
        if (seqtmp5908) {
            if (seqtmp5846['lut524']('BMOdc', seqtmp5846['lut525'])) {
                return true;
            } else {
                seqtmp5908['openMenu']();
                me['cancel']();
            }
        }
    }
    if (!Pather['usePortal'](0x79)) {
        return true;
    }
    Pather['moveTo'](0x274a, 0x33b2);
    try {
        Attack['clear'](0xf, 0x0, seqtmp5846['lut526'](getLocaleString, 0x57e1));
    } catch (seqtmp5914) {}
    return true;
}

function baal(seqtmp6001, seqtmp6002) {
    var seqtmp6003 = {};
    seqtmp6003['lut527'] = function (seqtmp6005, seqtmp6006) {
        return seqtmp6005 > seqtmp6006;
    };
    seqtmp6003['lut528'] = function (seqtmp6010, seqtmp6011) {
        return seqtmp6010(seqtmp6011);
    };
    seqtmp6003['lut529'] = function (seqtmp6015, seqtmp6016) {
        return seqtmp6015 !== seqtmp6016;
    };
    seqtmp6003['lut530'] = function (seqtmp6020, seqtmp6021, seqtmp6022, seqtmp6023) {
        return seqtmp6020(seqtmp6021, seqtmp6022, seqtmp6023);
    };
    seqtmp6003['lut531'] = 'rval128';
    seqtmp6003['lut532'] = function (seqtmp6030, seqtmp6031) {
        return seqtmp6030 === seqtmp6031;
    };
    seqtmp6003['lut533'] = function (seqtmp6035, seqtmp6036) {
        return seqtmp6035(seqtmp6036);
    };
    seqtmp6003['lut534'] = function (seqtmp6040, seqtmp6041) {
        return seqtmp6040 < seqtmp6041;
    };
    seqtmp6003['lut535'] = function (seqtmp6045) {
        return seqtmp6045();
    };
    seqtmp6003['lut536'] = function (seqtmp6048, seqtmp6049, seqtmp6050) {
        return seqtmp6048(seqtmp6049, seqtmp6050);
    };
    seqtmp6003['lut537'] = function (seqtmp6055) {
        return seqtmp6055();
    };
    seqtmp6003['lut538'] = 'Achmel the Cursed';
    seqtmp6003['lut539'] = function (seqtmp6059) {
        return seqtmp6059();
    };
    seqtmp6003['lut540'] = function (seqtmp6062, seqtmp6063, seqtmp6064) {
        return seqtmp6062(seqtmp6063, seqtmp6064);
    };
    seqtmp6003['lut541'] = function (seqtmp6069, seqtmp6070) {
        return seqtmp6069 - seqtmp6070;
    };
    seqtmp6003['lut542'] = function (seqtmp6074) {
        return seqtmp6074();
    };
    seqtmp6003['lut543'] = function (seqtmp6077) {
        return seqtmp6077();
    };
    seqtmp6003['lut544'] = function (seqtmp6080, seqtmp6081) {
        return seqtmp6080 < seqtmp6081;
    };
    seqtmp6003['lut545'] = function (seqtmp6085, seqtmp6086, seqtmp6087) {
        return seqtmp6085(seqtmp6086, seqtmp6087);
    };
    seqtmp6003['lut546'] = function (seqtmp6092, seqtmp6093) {
        return seqtmp6092 != seqtmp6093;
    };
    seqtmp6003['lut547'] = function (seqtmp6097, seqtmp6098, seqtmp6099) {
        return seqtmp6097(seqtmp6098, seqtmp6099);
    };
    seqtmp6003['lut548'] = 'rval129';
    seqtmp6003['lut549'] = 'rval130';
    seqtmp6003['lut550'] = function (seqtmp6106, seqtmp6107) {
        return seqtmp6106(seqtmp6107);
    };
    seqtmp6003['lut551'] = 'difficulty';
    seqtmp6003['lut552'] = function (seqtmp6112, seqtmp6113) {
        return seqtmp6112 + seqtmp6113;
    };
    seqtmp6003['lut553'] = 'starting baal';
    seqtmp6003['lut554'] = 'Too many souls or mobs in throne';
    seqtmp6003['lut555'] = function (seqtmp6119, seqtmp6120) {
        return seqtmp6119(seqtmp6120);
    };
    seqtmp6003['lut556'] = 'Too many immunes in throne';
    seqtmp6003['lut557'] = function (seqtmp6125, seqtmp6126) {
        return seqtmp6125(seqtmp6126);
    };
    seqtmp6003['lut558'] = 'Dolls in throne room';
    seqtmp6003['lut559'] = function (seqtmp6131) {
        return seqtmp6131();
    };
    seqtmp6003['lut560'] = function (seqtmp6134) {
        return seqtmp6134();
    };
    seqtmp6003['lut561'] = function (seqtmp6137, seqtmp6138) {
        return seqtmp6137(seqtmp6138);
    };
    seqtmp6003['lut562'] = 'Baal';
    seqtmp6003['lut563'] = 'rval131';
    seqtmp6003['lut564'] = function (seqtmp6144, seqtmp6145) {
        return seqtmp6144 + seqtmp6145;
    };
    if (!Packet['checkQuest'](0x28, 0x0) && seqtmp6001) {
        return false;
    }
    if (General['goToNextDifficulty']()) {
        Account['update'](seqtmp6003['lut551'], Misc['difficultyString'][seqtmp6003['lut552'](me['diff'], 0x1)]);
        return false;
    }
    if (Packet['checkQuest'](0x28, 0x0) && !seqtmp6001) {
        return true;
    }
    let seqtmp6152 = function () {
        let seqtmp6153 = [{
            'x': 0x3af9,
            'y': 0x13be
        }, {
            'x': 0x3aed,
            'y': 0x13bd
        }, {
            'x': 0x3aed,
            'y': 0x13b0
        }, {
            'x': 0x3afa,
            'y': 0x13b0
        }, {
            'x': 0x3afb,
            'y': 0x139e
        }, {
            'x': 0x3aee,
            'y': 0x13a0
        }];
        return seqtmp6153['forEach'](seqtmp6155 => {
            Pather['moveTo'](seqtmp6155['x'], seqtmp6155['y']);
            Attack['clear'](0x1e);
        });
    };
    let seqtmp6158 = function () {
        switch (me['classid']) {
        case 0x1:
            if (seqtmp6003['lut527']([0x38, 0x3b, 0x40]['indexOf'](Config['AttackSkill'][0x1]), -0x1)) {
                if (me['getState'](0x79)) {
                    seqtmp6003['lut528'](delay, 0x32);
                } else {
                    Skill['cast'](Config['AttackSkill'][0x1], 0x0, 0x3af5, 0x13a0);
                }
            }
            return true;
        case 0x3:
            if (seqtmp6003['lut529'](Config['AttackSkill'][0x3], 0x70)) {
                return false;
            }
            if (seqtmp6003['lut527'](seqtmp6003['lut530'](getDistance, me, 0x3af5, 0x13a5), 0x3)) {
                if (seqtmp6003['lut529']('cesbu', seqtmp6003['lut531'])) {
                    Pather['moveTo'](0x3af5, 0x13a5);
                } else {
                    return false;
                }
            }
            if (seqtmp6003['lut527'](Config['AttackSkill'][0x4], 0x0)) {
                Skill['setSkill'](Config['AttackSkill'][0x4], 0x0);
            }
            Skill['cast'](Config['AttackSkill'][0x3], 0x1);
            return true;
        case 0x5:
            if (seqtmp6003['lut532'](Config['AttackSkill'][0x3], 0xf5)) {
                Skill['cast'](Config['AttackSkill'][0x3], 0x0, 0x3af5, 0x13a5);
                return true;
            }
            break;
        case 0x6:
            if (Config['UseTraps']) {
                let seqtmp6168 = ClassAttack['checkTraps']({
                    'x': 0x3af5,
                    'y': 0x13a5
                });
                if (seqtmp6168) {
                    ClassAttack['placeTraps']({
                        'x': 0x3af5,
                        'y': 0x13a5
                    }, 0x5);
                    return true;
                }
            }
            break;
        }
        return false;
    };
    let seqtmp6170 = function () {
        let seqtmp6171 = seqtmp6003['lut533'](getUnit, 0x1);
        if (seqtmp6171) {
            do {
                if (Attack['checkMonster'](seqtmp6171) && seqtmp6003['lut534'](seqtmp6171['y'], 0x13d8)) {
                    switch (seqtmp6171['classid']) {
                    case 0x17:
                    case 0x3e:
                        return 0x1;
                    case 0x69:
                    case 0x17d:
                        return 0x2;
                    case 0x22d:
                        return 0x3;
                    case 0x22e:
                        return 0x4;
                    case 0x23b:
                        return 0x5;
                    default:
                        Attack['getIntoPosition'](seqtmp6171, 0xa, 0x4);
                        Attack['clear'](0xf);
                        return false;
                    }
                }
            } while (seqtmp6171['getNext']());
        }
        return false;
    };
    let seqtmp6180 = function () {
        let seqtmp6181;
        let seqtmp6182 = seqtmp6003['lut535'](getTickCount);
        seqtmp6184: while (true) {
            if (seqtmp6003['lut527'](seqtmp6003['lut530'](getDistance, me, 0x3b0c, 0x13a2), 0x3)) {
                Pather['moveTo'](0x3b0c, 0x13a2);
            }
            if (!seqtmp6003['lut536'](getUnit, 0x1, 0x21f)) {
                break;
            }
            Misc['townCheck']();
            switch (seqtmp6003['lut537'](seqtmp6170)) {
            case 0x1:
                Attack['clearClassids'](0x17, 0x3e);
                seqtmp6182 = getTickCount();
                break;
            case 0x2:
                seqtmp6181 = seqtmp6003['lut536'](getUnit, 0x1, seqtmp6003['lut538']);
                if (seqtmp6181 && !Attack['canAttack'](seqtmp6181)) {
                    me['overhead']('immune achmel');
                    return false;
                }
                Attack['clearClassids'](0x69, 0x17d);
                seqtmp6182 = getTickCount();
                break;
            case 0x4:
                Attack['clearClassids'](0x22e);
                seqtmp6182 = getTickCount();
                break;
            case 0x3:
                Attack['clearClassids'](0x22d);
                seqtmp6182 = seqtmp6003['lut539'](getTickCount);
                break;
            case 0x5:
                seqtmp6181 = seqtmp6003['lut540'](getUnit, 0x1, 'Lister the Tormentor');
                if (seqtmp6181 && !Attack['canAttack'](seqtmp6181)) {
                    me['overhead']('immune lister');
                    return false;
                }
                Attack['clearClassids'](0x23b);
                break seqtmp6184;
            default:
                if (seqtmp6003['lut534'](seqtmp6003['lut541'](seqtmp6003['lut542'](getTickCount), seqtmp6182), 0x1b58)) {
                    if (me['getState'](0x2)) {
                        Skill['setSkill'](0x6d, 0x0);
                    }
                }
                if (seqtmp6003['lut527'](seqtmp6003['lut541'](getTickCount(), seqtmp6182), 0x4e20)) {
                    seqtmp6182 = seqtmp6003['lut542'](getTickCount);
                    seqtmp6003['lut542'](seqtmp6152);
                }
                if (!seqtmp6003['lut543'](seqtmp6158)) {
                    seqtmp6003['lut533'](delay, 0x32);
                }
                break;
            }
            seqtmp6003['lut533'](delay, 0xa);
        }
        return true;
    };
    let seqtmp6220 = function (seqtmp6221, seqtmp6222) {
        var seqtmp6223 = {};
        seqtmp6223['lut565'] = function (seqtmp6225, seqtmp6226) {
            return seqtmp6003.lut533(seqtmp6225, seqtmp6226);
        };
        seqtmp6223['lut566'] = function (seqtmp6231, seqtmp6232) {
            return seqtmp6231 < seqtmp6232;
        };
        let seqtmp6235 = seqtmp6003['lut540'](getUnit, 0x1, 0x281);
        let seqtmp6237 = 0x0;
        if (seqtmp6235) {
            do {
                if (seqtmp6003['lut544'](seqtmp6003['lut545'](getDistance, me, seqtmp6235), 0x2d)) {
                    seqtmp6237 += 0x1;
                }
            } while (seqtmp6235['getNext']());
        }
        if (seqtmp6003['lut527'](seqtmp6237, seqtmp6221)) {
            return true;
        }
        let seqtmp6247 = seqtmp6003['lut533'](getUnit, 0x1);
        if (seqtmp6247) {
            do {
                if (!seqtmp6247['getParent']() && seqtmp6003['lut546'](seqtmp6247['classid'], 0x281) && seqtmp6003['lut544'](seqtmp6003['lut547'](getDistance, me, seqtmp6247), 0x2d)) {
                    if (seqtmp6003['lut532'](seqtmp6003['lut548'], seqtmp6003['lut549'])) {
                        let seqtmp6259 = seqtmp6223['lut565'](getUnit, 0x1);
                        if (seqtmp6259) {
                            do {
                                if (Attack['checkMonster'](seqtmp6259) && seqtmp6223['lut566'](seqtmp6259['y'], 0x13d8)) {
                                    switch (seqtmp6259['classid']) {
                                    case 0x17:
                                    case 0x3e:
                                        return 0x1;
                                    case 0x69:
                                    case 0x17d:
                                        return 0x2;
                                    case 0x22d:
                                        return 0x3;
                                    case 0x22e:
                                        return 0x4;
                                    case 0x23b:
                                        return 0x5;
                                    default:
                                        Attack['getIntoPosition'](seqtmp6259, 0xa, 0x4);
                                        Attack['clear'](0xf);
                                        return false;
                                    }
                                }
                            } while (seqtmp6259['getNext']());
                        }
                        return false;
                    } else {
                        seqtmp6237 += 0x1;
                    }
                }
            } while (seqtmp6247['getNext']());
        }
        return seqtmp6237 > seqtmp6222;
    };
    let seqtmp6272 = function (seqtmp6273) {
        let seqtmp6274 = seqtmp6003['lut550'](getUnit, 0x1);
        let seqtmp6276 = 0x0;
        if (seqtmp6274) {
            do {
                if (!Attack['canAttack'](seqtmp6274) && seqtmp6003['lut547'](getDistance, me, seqtmp6274) < 0x2d) seqtmp6276 += 0x1;
            } while (seqtmp6274['getNext']());
        }
        if (seqtmp6003['lut527'](seqtmp6276, seqtmp6273)) {
            return true;
        }
        return false;
    };
    me['overhead'](seqtmp6003['lut553']);
    Town['doChores']();
    if (!Pather['checkWP'](0x81)) {
        Pather['getWP'](0x81, seqtmp6002);
    } else {
        Pather['useWaypoint'](0x81);
    }
    Precast['doPrecast'](true);
    if (!Pather['moveToExit']([0x82, 0x83], true, seqtmp6002)) {
        return false;
    }
    Pather['moveTo'](0x3af7, 0x13a5, 0x5, seqtmp6002);
    Pather['moveTo'](0x3b09, 0x13b0, 0x5, seqtmp6002);
    if (me['nightmare'] && seqtmp6003['lut547'](seqtmp6220, 0x8, 0x14) && seqtmp6003['lut544'](me['lightningResist'], 0x46)) {
        print(seqtmp6003['lut554']);
        return false;
    }
    if (me['nightmare'] && seqtmp6003['lut555'](seqtmp6272, 0x8)) {
        seqtmp6003['lut555'](print, seqtmp6003['lut556']);
        return false;
    }
    if (me['playertype'] && seqtmp6003['lut547'](getUnit, 0x1, 0x2b3)) {
        seqtmp6003['lut557'](print, seqtmp6003['lut558']);
        return false;
    }
    Attack['clear'](0xf);
    seqtmp6003['lut559'](seqtmp6152);
    if (!seqtmp6003['lut560'](seqtmp6180)) {
        return false;
    }
    seqtmp6003['lut560'](seqtmp6152);
    Pather['moveTo'](0x3af2, 0x1390);
    Precast['doPrecast'](true);
    while (seqtmp6003['lut547'](getUnit, 0x1, 0x21f)) {
        seqtmp6003['lut561'](delay, 0x1f4);
    }
    Pather['usePortal'](null, null, getUnit(0x2, 0x233));
    Pather['moveTo'](0x3b1e, 0x1723);
    const seqtmp6310 = !Packet['checkQuest'](0x28, 0x0);
    Config['CastStatic'] = Attack['getStaticAmount']();
    Config['StaticList'] = [seqtmp6003['lut562']];
    Attack['kill'](0x220);
    Pickit['pickItems']();
    if (General['goToNextDifficulty']()) {
        if (seqtmp6003['lut529'](seqtmp6003['lut563'], 'FEdki')) {
            Account['update'](seqtmp6003['lut551'], Misc['difficultyString'][seqtmp6003['lut564'](me['diff'], 0x1)]);
            return false;
        } else {
            let seqtmp6316 = ClassAttack['checkTraps']({
                'x': 0x3af5,
                'y': 0x13a5
            });
            if (seqtmp6316) {
                ClassAttack['placeTraps']({
                    'x': 0x3af5,
                    'y': 0x13a5
                }, 0x5);
                return true;
            }
        }
    }
    if (seqtmp6310) {
        D2Bot['restart']();
    }
    return true;
}

function chests() {
    var seqtmp6339 = {};
    seqtmp6339['lut567'] = 'starting chests';
    seqtmp6339['lut568'] = function (seqtmp6342, seqtmp6343) {
        return seqtmp6342 < seqtmp6343;
    };
    var seqtmp6346, seqtmp6347;
    if (!Pather['accessToAct'](0x3)) {
        return true;
    }
    me['overhead'](seqtmp6339['lut567']);
    Town['doChores']();
    var seqtmp6349 = {
        1: [0xd, 0xe, 0xf, 0x10],
        2: [0x37, 0x3b, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48],
        3: [0x4f, 0x50, 0x51, 0x5c, 0x5d, 0x54]
    };
    for (seqtmp6346 in seqtmp6349) {
        if (seqtmp6349['hasOwnProperty'](seqtmp6346)) {
            for (seqtmp6347 = 0x0; seqtmp6339['lut568'](seqtmp6347, seqtmp6349[seqtmp6346]['length']); seqtmp6347 += 0x1) {
                Pather['journeyTo'](seqtmp6349[seqtmp6346][seqtmp6347]);
                Misc['openChestsInArea'](seqtmp6349[seqtmp6346][seqtmp6347]);
            }
            Town['doChores']();
        }
    }
    return true;
}