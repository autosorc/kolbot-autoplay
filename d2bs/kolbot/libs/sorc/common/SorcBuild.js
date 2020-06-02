/**
 *    @filename   SorcBuild.js
 *    @desc       autobuild thread
 */

function main() {
    include("common/misc.js");
	include("common/autostat.js");
    include("common/autoskill.js");
	include("sorc/common/account.js");
    include("sorc/settings/settings.js");

    let acc = Account.get();
	var file = acc.build1;
	if (acc.respec1 && acc.build2 && me.charlvl >= acc.respec1) file = acc.build2;
	if (acc.respec2 && acc.build3 && me.charlvl >= acc.respec2) file = acc.build3;
    include("sorc/build/" + file + ".js");

    print("SorcBuild: Loaded template " + file);

    while(true) {
        try {
            if (me.getStat(4)) {
                AutoStat.init(Build.stats);
            }

            if (me.getStat(5)) {
                AutoSkill.init(Build.skills);
            }
        } catch (e) {
			print(e);
            break;
        }

        delay(2500);
    }

    return true;
}