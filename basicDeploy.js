/**
* @param {NS} ns
**/

export async function main(ns) {
    const args = ns.flags([['help', false]]);
    const serverToHack = args._[0];
    const serverRunningScript = ns.getHostname();
    const nukeScript = "nukeServer.js";
    const hackScript = "basicHack.js"
    let rootAccess = ns.hasRootAccess(serverToHack);

    //  If missing argument or help
    if (args.help || !serverToHack) {
        ns.tprint("This script will generate money by hacking a target server.");
        ns.tprint(`USAGE: run ${ns.getScriptName()} SERVER_NAME`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName} n00dles`);
        return;
    }

    //  Check that target server exists
    if (!ns.serverExists(serverToHack)) {
        ns.tprint("Target Server does not exist. Aborting basicHack.js");
        return;
    }

    //  Check if the script for gaining access exists on the current server, copy it to it if it does not.
    if (!ns.fileExists(nukeScript)) {
        await ns.scp(nukeScript, "home", serverRunningScript);
    }

    //  Try to gain root access
    if (!rootAccess) {
        ns.exec(nukeScript, serverRunningScript, 1, serverToHack);

        ns.sleep(1000)
        let rootAccess = ns.hasRootAccess(serverToHack);
        if (!rootAccess) {
            ns.tprint(`Aborting deploy to ${serverToHack} because of no root access.`);

            return;
        }
    }



    //  "deploy" a hacking script, with max threads 
    //  Check if the hacking script exists on the target server, copy it to it if it does not.
    if (!ns.fileExists(hackScript, serverToHack)) {
        await ns.scp(hackScript, "home", serverToHack);
    }

    const targetServerMaxRam = ns.getServerMaxRam(serverToHack);
    const targetServerUsedRam = ns.getServerUsedRam(serverToHack);
    const scriptRamUsage = ns.getScriptRam(hackScript, serverToHack);

    const threads = Math.floor((targetServerMaxRam - targetServerUsedRam) / scriptRamUsage);

    if (threads > 0) {
        ns.tprint(`Launching script ${hackScript} on ${serverToHack} with ${threads} and the following arguments: ${serverToHack}`);

        ns.exec(hackScript, serverToHack, threads, serverToHack);
        return;
    }

    ns.tprint(`The target server (${serverToHack} can not support any threads of the script (${hackScript}))`);
    
}