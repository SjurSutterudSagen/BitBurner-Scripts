/**
* @param {NS} ns
**/

export async function main(ns) {
    const args = ns.flags([['help', false]]);
    const targetServerToHack = args._[0];
    const moneyThreshold = ns.getServerMaxMoney(targetServerToHack) * 0.75;
    const securityThreshold = ns.getServerMinSecurityLevel(targetServerToHack) + 5;

    //  If missing argument or help
    if (args.help || false) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName} n00dles`);
        return;
    }

    while (true) {
        if (ns.getServerSecurityLevel(targetServerToHack) > securityThreshold) {
            await ns.weaken(targetServerToHack);
        } else if (ns.getServerMoneyAvailable(targetServerToHack) < moneyThreshold) {
            await ns.grow(targetServerToHack);
        } else {
            await ns.hack(targetServerToHack);
        }
    }
}