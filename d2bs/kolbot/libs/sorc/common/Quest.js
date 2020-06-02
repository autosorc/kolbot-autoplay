/**
 *    @filename   Quest.js
 *    @desc       quest related helper functions
 */

const Quest = function () {
    var qst87 = {};
    qst87['lut1'] = 'open chest';
    qst87['lut2'] = function (qst90, qst91) {
        return qst90(qst91);
    };
    qst87['lut3'] = function (qst95) {
        return qst95();
    };
    qst87['lut4'] = function (qst98, qst99) {
        return qst98 < qst99;
    };
    qst87['lut5'] = function (qst103, qst104, qst105) {
        return qst103(qst104, qst105);
    };
    qst87['lut6'] = function (qst110, qst111) {
        return qst110(qst111);
    };
    qst87['lut7'] = function (qst115, qst116) {
        return qst115 * qst116;
    };
    qst87['lut8'] = function (qst120, qst121) {
        return qst120 + qst121;
    };
    qst87['lut9'] = function (qst125, qst126) {
        return qst125 + qst126;
    };
    qst87['lut10'] = function (qst130, qst131) {
        return qst130 == qst131;
    };
    qst87['lut11'] = function (qst135, qst136) {
        return qst135 == qst136;
    };
    qst87['lut12'] = function (qst140, qst141) {
        return qst140(qst141);
    };
    qst87['lut13'] = function (qst145, qst146) {
        return qst145(qst146);
    };
    qst87['lut14'] = function (qst150, qst151) {
        return qst150 * qst151;
    };
    qst87['lut15'] = 'warriv';
    qst87['lut16'] = 'meshif';
    qst87['lut17'] = function (qst157, qst158, qst159) {
        return qst157(qst158, qst159);
    };
    qst87['lut18'] = function (qst164, qst165) {
        return qst164 + qst165;
    };
    qst87['lut19'] = function (qst169, qst170) {
        return qst169 === qst170;
    };
    qst87['lut20'] = function (qst174, qst175) {
        return qst174 === qst175;
    };
    return {
        'useItem': function (qst178) {
            let qst179 = me['getItem'](qst178);
            if (qst179) {
                if (qst179['location'] === 0x7 && (!Town['goToTown']() || !Town['openStash']())) {
                    return false;
                }
                while (qst179) {
                    qst179['interact']();
                    delay(0x64);
                    qst179 = me['getItem'](qst178);
                }
            }
            return me['getItem'](qst178);
        },
        'getItem': function (qst188, qst189) {
            if (me['getItem'](qst188)) {
                return true;
            }
            let qst191 = getUnit(0x2, qst189);
            if (!qst191) {
                return false;
            }
            print(qst87['lut1']);
            Misc['openChest'](qst191);
            qst87['lut2'](print, 'chest open');
            let qst197;
            let qst198 = qst87['lut3'](getTickCount);
            while (qst87['lut4'](getTickCount() - qst198, 0x7d0)) {
                qst197 = qst87['lut5'](getUnit, 0x4, qst188);
                if (qst197) {
                    break;
                }
                delay(0x32);
            }
            qst87['lut6'](print, 'pick item');
            Pickit['pickItems']();
            return me['getItem'](qst188);
        },
        'stashItem': function (qst208) {
            if (!me['getItem'](qst208)) {
                return false;
            }
            if (!me['inTown']) {
                Town['goToTown']();
            }
            let qst210 = me['getItem'](qst208);
            if (qst210['location'] !== 0x7 && Storage['Stash']['CanFit'](qst210)) {
                Storage['Stash']['MoveTo'](qst210);
                delay(0x64 + qst87['lut7'](me['ping'], 0x2));
                qst210 = me['getItem'](qst208);
            }
            return true;
        },
        'transmuteItems': function (qst218, ...qst219) {
            if (me['getItem'](qst218)) {
                return true;
            }
            if (!me['inTown']) {
                Town['goToTown']();
            }
            if (!getUIFlag(0x1a) && !Town['openStash']() || !Cubing['emptyCube']()) {
                return false;
            }
            let qst221;
            for (let qst222 of qst219) {
                qst221 = me['getItem'](qst222);
                if (!qst221 || !Storage['Cube']['MoveTo'](qst221)) {
                    return false;
                }
            }
            print('All items ready to cube');
            delay(0x3e8);
            if (!Cubing['openCube']()) {
                return false;
            }
            transmute();
            qst87['lut6'](delay, 0x2bc + me['ping']);
            let qst229;
            qst229 = me['getItem'](qst218);
            if (!qst229) return false;
            if (!Storage['Inventory']['MoveTo'](qst229)) {
                qst229['drop']();
                delay(0x64 + qst87['lut7'](me['ping'], 0x2));
                Pickit['pickItems']();
            }
            if (me['itemoncursor']) {
                D2Bot['printToConsole']('Problem cubing!!!');
                qst87['lut6'](getUnit, 0x64)['drop']();
                delay(qst87['lut8'](0x64, me['ping'] * 0x2));
                Pickit['pickItems']();
            }
            if (qst229) {
                if (qst229['location'] == 0x3 && Storage['Stash']['CanFit'](qst229)) {
                    Storage['Stash']['MoveTo'](qst229);
                }
            }
            return me['getItem'](qst218);
        },
        'insertStaff': function () {
            let qst243 = me['getItem'](0x5b);
            if (!qst243) {
                if (Packet['checkQuest'](0xa, 0x0)) {
                    return true;
                }
                return false;
            }
            let qst245 = getUnit(0x2, 0x98);
            if (!qst245) {
                return false;
            }
            if (qst243['location'] === 0x6) {
                if (Cubing['openCube']()) {
                    if (Storage['Inventory']['MoveTo'](qst243)) {
                        delay(qst87['lut9'](0xc8, me['ping']));
                    }
                    me['cancel']();
                }
            }
            if (qst243['location'] === 0x7) {
                Town['doChores']();
                if (Town['openStash']() && Storage['Inventory']['CanFit'](qst243)) {
                    Storage['Inventory']['MoveTo'](qst243);
                    Town['move']('portalspot');
                    Pather['usePortal'](null, me['name']);
                    qst245 = getUnit(0x2, 0x98);
                }
            }
            if (qst245 && qst243['location'] == 0x3 && Misc['openChest'](qst245) && Packet['itemToCursor'](qst243)) {
                submitItem();
                delay(0xc8 + me['ping']);
            }
            Cubing['openCube']();
            delay(0x1f4);
            me['cancel']();
            return !me['getItem'](0x5b);
        },
        'smashCompellingOrb': function () {
            let qst258 = me['getItem'](0xae);
            if (!qst258) {
                return false;
            }
            if (qst87['lut10'](qst258['location'], 0x7) || qst87['lut11'](qst258['location'], 0x6)) {
                Town['openStash']();
                if (qst258['location'] == 0x6) {
                    Cubing['openCube']();
                }
            }
            Item['equip'](qst258, 0x4, true);
            if (me['area'] != 0x53) {
                if (Pather['getPortal'](0x53, me['name'])) {
                    Pather['usePortal'](0x53, me['name']);
                } else {
                    Pather['useWaypoint'](0x53);
                }
            }
            Pather['moveToPreset'](me['area'], 0x2, 0x194, 0x0, 0x0, false);
            let qst266 = getUnit(0x2, 0x194);
            if (qst266) {
                while (me['getItem'](0xae)) {
                    Pather['moveToUnit'](qst266, 0x0, 0x0, false);
                    Skill['cast'](0x0, 0x0, qst266);
                    qst266['interact']();
                    delay(me['ping']);
                }
                Town['goToTown']();
                Pickit['pickItems']();
                Item['autoEquip']();
            }
            return !me['getItem'](0xae);
        },
        'respec': function () {
            if (!Packet['checkQuest'](0x1, 0x0) || !Town['goToTown'](0x1)) {
                return false;
            }
            print('time to respec');
            me['overhead']('time to respec');
            let qst271 = qst87['lut12'](getScript, 'libs/sorc/tools/sorcbuild.js');
            if (qst271 && qst271['running']) {
                qst271['stop']();
            }
            let qst276 = me['getStat'](0x4);
            while (qst276 == me['getStat'](0x4)) {
                Packet['entityAction']('akara');
                qst87['lut13'](delay, qst87['lut14'](me['ping'], 0x2) + 0x3e8);
                qst87['lut5'](sendPacket, 0x1, 0x40);
            }
            load('libs/sorc/tools/sorcbuild.js');
            qst276 = me['getStat'](0x5);
            for (let qst282 = 0x0; qst282 < 0x5; qst282 += 0x1) {
                if (qst276 > me['getStat'](0x5)) {
                    qst276 = me['getStat'](0x5);
                    qst282 = 0x0;
                }
                qst87['lut13'](delay, 0x3e8);
            }
            print('respec complete');
            me['overhead']('respec complete');
            return true;
        },
        'talkTo': function (qst289, qst290, qst291) {
            var qst292 = getUnit(0x1, qst289);
            let qst294 = 0x0;
            while (!qst292 && qst294 < 0xa) {
                Town['move'](qst290);
                qst292 = qst87['lut5'](getUnit, 0x1, qst289);
                delay(0xc8);
                qst294++;
            }
            if (!qst292 || !qst292['openMenu']()) return false;
            if (qst291) return Misc['useMenu'](qst291);
            me['cancel']();
            return true;
        },
        'changeAct': function (qst306) {
            let qst307, qst308;
            if (!qst306) return false;
            switch (qst306) {
            case 0x2:
                qst307 = qst87['lut15'];
                qst308 = 0x28;
                break;
            case 0x3:
                qst307 = qst87['lut16'];
                qst308 = 0x4b;
                break;
            case 0x5:
                qst307 = 'tyrael';
                qst308 = 0x6d;
                break;
            }
            let qst319 = qst87['lut17'](getUnit, 0x1, qst307);
            while (!qst319) {
                Town['move'](qst307);
                Packet['flash'](me['gid']);
                qst87['lut13'](delay, me['ping'] * 0x2);
                qst319 = qst87['lut17'](getUnit, 0x1, qst307);
            }
            if (qst319) {
                for (let qst329 = 0x0; qst87['lut4'](qst329, 0x5); qst329 += 0x1) {
                    sendPacket(0x1, 0x38, 0x4, 0x0, 0x4, qst319['gid'], 0x4, qst308);
                    delay(qst87['lut18'](0x1f4, me['ping']));
                    if (qst87['lut19'](me['act'], qst306)) {
                        break;
                    }
                }
            }
            return qst87['lut20'](me['act'], qst306);
        }
    };
}();
