/**
 *    @filename   SorcBuild.js
 *    @desc       autobuild thread
 */

function main() {
    include("common/misc.js");
    include("include/misc.js");
    include("sorc/settings/settings.js");
    include("sorc/common/account.js");
    include("sorc/common/autostat.js");
    include("sorc/common/autoskill.js");

    let {
        respecLevel,
        beforeRespecBuild,
        afterRespecbuild
    } = Account.get();

    let file = me.charlvl < respecLevel ? beforeRespecBuild : afterRespecbuild;

    include("sorc/build/" + file + ".js");

    print("SorcBuild: Loaded template " + file);

    while(true) {
        try {
            if (me.getStat(4)) {
                AutoStat(Build.stats);
            }

            if (me.getStat(5)) {
                AutoSkill(Build.skills);
            }
        } catch (e) {
            D2Bot.printToConsole(e);
            break;
        }

        delay(2500);
    }

    return true;
}