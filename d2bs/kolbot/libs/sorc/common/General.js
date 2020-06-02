/**
 *    @filename   General.js
 *    @desc       general functions
 */

const General = function () {
    return {
        'initConfig': function () {
            Pather['teleport'] = me['charlvl'] >= 0x18;
            if (me['diff'] == 0x0 && me['getSkill'](0x27, 0x0) >= 0x1) {
                Config['AttackSkill'][0x1] = 0x3b;
                Config['AttackSkill'][0x2] = 0x2d;
                Config['AttackSkill'][0x3] = 0x3b;
                Config['AttackSkill'][0x4] = 0x2d;
            }
            if (!me['normal'] || !me['classic'] && me['getQuest'](0x1a, 0x0)) {
                Config['Dodge'] = true;
                Config['DodgeRange'] = 0xf;
                Config['DodgeHP'] = 0x64;
            }
            if (!me['classic']) {
                Config['UseMerc'] = me['normal'] ? Packet['checkQuest'](0x2, 0x0) || Pather['accessToAct'](0x2) : true;
                Config['MercWatch'] = false;
                if (!me['hell']) {
                    Config['TeleStomp'] = true;
                }
            }
            return true;
        },
        'timeToFarm': function () {
            if (me['diff'] == 0x2 && me['gold'] < 0x30d40) return true;
            if (me['diff'] == 0x2 && me['gold'] > 0x124f80 && Pather['accessToAct'](0x5)) {
                if (me['ping'] < 0xe1 && (!me['getQuest'](0x1, 0x0) || !me['getQuest'](0x25, 0x0)) && Misc['mercPower']() > 0xfde8) return false;
            }
            return Pather['accessToAct'](me['normal'] ? 0x4 : 0x4);
        },
        'goToNextDifficulty': function () {
            return Sequences['nextDifficulty'][me['gametype']][me['diff']]['every'](gen87 => eval(gen87));
        },
        'shouldClearPath': function (gen89) {
            switch (gen89) {
            case 'den':
            case 'raven':
                return me['normal'];
            case 'trist':
                return me['nightmare'] && me['charlvl'] < 0x21 || me['normal'] && me['charlvl'] < 0x7;
            case 'cave':
            case 'tree':
            case 'countess':
            case 'andariel':
            case 'radament':
            case 'cube':
            case 'amulet':
                return me['nightmare'] && me['charlvl'] < 0x24 || me['normal'];
            case 'summoner':
            case 'duriel':
                return me['nightmare'] && me['charlvl'] < 0x26 || me['normal'];
            case 'shaft':
                return me['normal'];
            case 'eye':
            case 'brain':
            case 'heart':
                return me['nightmare'] && me['classic'];
            default:
                return false;
            }
        },
        'hireMerc': function (gen91, gen92, gen93, gen94 = 0x2) {
            if (this['checkMercType'](gen92) && !gen93) {
                return true;
            }
            const gen97 = me['act'];
            var gen98 = false;
            if (!Town['goToTown'](gen91)) {
                if (me['act'] != gen97) {
                    Town['goToTown'](gen97);
                }
                return false;
            }
            addEventListener('gamepacket', mercPacket);
            Town['move'](Town['tasks'][me['act'] - 0x1]['Merc']);
            Item['removeItemsMerc']();
            Town['initNPC']('Merc', 'newMerc');
            for (let gen102 of Mercs) {
                for (let gen103 of gen102['skills']) {
                    if (gen103['name'] == gen92 && gen102['level'] >= gen94 && gen102['cost'] <= me['gold']) {
                        gen98 = true;
                        gen102['hire']();
                    }
                }
            }
            if (!gen98) {
                print('No merc found with the required stats, moving on');
                this['validMerc'] = false;
            }
            removeEventListener('gamepacket', mercPacket);
            Item['autoEquipMerc']();
            let gen113 = [];
            let gen114 = getUnit(0x4);
            if (gen114) {
                do {
                    gen113['push'](copyUnit(gen114));
                } while (gen114['getNext']());
            }
            let gen119;
            let gen120;
            gen113['filter'](gen122 => gen122['mode'] == (0x3 || 0x5))['forEach'](function (gen124) {
                for (let gen125 = 0x0; gen125 < 0x5; gen125 += 0x1) {
                    if (getDistance(me, gen124) > 0x3) {
                        Pather['moveToUnit'](gen124);
                    }
                    sendPacket(0x1, 0x16, 0x4, gen124['type'], 0x4, gen124['gid'], 0x4, 0x1);
                    delay(me['ping'] * 0x2 + 0x1f4);
                    gen120 = getUnit(0x64);
                    gen119 = Item['getBodyLoc'](gen120)[0x0];
                    if (gen120) {
                        if (Item['canEquipMerc'](gen120, gen119)) {
                            Item['equipMerc'](gen120, gen119);
                        } else {
                            gen120['drop']();
                        }
                        break;
                    }
                }
            });
            if (me['act'] != gen97) {
                Town['goToTown'](gen97);
            }
            return true;
        },
        'checkMercType': function (gen143) {
            const gen144 = {};
            gen144['Cold Arrow'] = 0xb;
            gen144['Prayer'] = 0x63;
            gen144['Defiance'] = 0x68;
            gen144['Holy Freeze'] = 0x72;
            if (!gen144['hasOwnProperty'](gen143)) {
                return false;
            }
            if (!me['getMerc']()) {
                Town['reviveMerc']();
            }
            let gen151 = me['getMerc']();
            return gen151 && gen151['getSkill'](gen144[gen143], 0x0);
        },
        'validMerc': true
    };
}();
