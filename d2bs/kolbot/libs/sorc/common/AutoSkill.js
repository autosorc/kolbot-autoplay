/**
 *    @filename   AutoSkill.js
 *    @desc       automatically allocates stat points - credit to dzik for some code
 */

function AutoSkill(skillBuildOrder) {
    this.getRequiredSkills = function(id) {
        let skill;
        let results = [];

        for (let i = 181; i <= 183; i += 1) {
            skill = getBaseStat("skills", id, i);

            if (skill >= 0 && skill <= 0x7FFF) {
                results.push(skill);
            }
        }

        return results;
    };

    this.checkRequiredSkills = function(id) {
        let req = this.getRequiredSkills(id);

        return req.every(function(skill) {
            return me.getSkill(skill, 0);
        });
    };

    this.getLevelRequire = function(id) {
        return getBaseStat("skills", id, 176);
    };

    this.isDesiredLevel = function(id, desiredLevel) {
        return me.getSkill(id, 0) >= desiredLevel;
    };

    // what's the highest the skill can be currently leveled to?
    this.currentMaxLevel = function(id) {
        let reqLvl = this.getLevelRequire(id) - 1;
        let lvl = me.charlvl - reqLvl;

        if (lvl < 0) {
            lvl = 0;
        }

        if (lvl > 20) {
            lvl = 20;
        }

        return lvl;
    };

    let tick;
    let reqLevel;
    let reqSkills;
    let currentMax;
    let currentSkillLevel;
    let skillPoints = me.getStat(5);

    skillBuildOrder.every(function(skill) {
        if (skill.hasOwnProperty("save") && skill.save) {
            return false;
        }

        reqLevel = this.getLevelRequire(skill.id);
        reqSkills = this.checkRequiredSkills(skill.id);

        if ((me.charlvl < reqLevel) || (!reqSkills)) {
            return true;
        }

        while (me.getStat(5) && !this.isDesiredLevel(skill.id, skill.level)) {
            currentSkillLevel = me.getSkill(skill.id, 0);

            if (!currentSkillLevel) {
                currentSkillLevel = 0;
            }

            currentMax = this.currentMaxLevel(skill.id);

            if (currentSkillLevel == currentMax) {
                break;
            }

            useSkillPoint(skill.id);

            tick = getTickCount();

            while (getTickCount() - tick < 2000) {
                if (currentSkillLevel < me.getSkill(skill.id, 0)) {
                    break;
                }

                delay(150 + me.ping);
            }

            delay(150 + me.ping);
        }

        return true;
    }, this);

    return skillPoints < me.getStat(5);
}
