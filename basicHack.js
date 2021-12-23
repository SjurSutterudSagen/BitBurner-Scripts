/**
* @param {NS} ns
**/

export async function main(ns) {
    const args = ns.flags([['help', false]]);
    const moneyThreshold = ns.getServerMaxMoney(serverToHack) * 0.75;
    const securityThreshold = ns.getServerMinSecurityLevel(serverToHack) + 5;

    //  If missing argument or help
    if (args.help || false) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName} n00dles`);
        return;
    }

    while (true) {
        if (ns.getServerSecurityLevel(serverToHack) > securityThreshold) {
            await ns.weaken(serverToHack);
        } else if (ns.getServerMoneyAvailable(serverToHack) < moneyThreshold) {
            await ns.grow(serverToHack);
        } else {
            await ns.hack(serverToHack);
        }
    }
}