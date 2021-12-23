/**
* @param {NS} ns
**/

export async function main(ns, serverToNuke) {
    const args = ns.flags([['help', false]]);
    const serverToHack = args._[0];
    let hackToolsUsed = 0;
    let rootAccess = ns.hasRootAccess(serverToNuke);
    const requiredPorts = ns.getServerNumPortsRequired(serverToNuke);

    if (!rootAccess && requiredPorts !== 0) {
        ns.tprint('Trying to open ports on: ' + serverToNuke);

        if (ns.fileExists('BruteSSH.exe', home)) {
            ns.brutessh(serverToNuke);
            hackToolsUsed++;
        }

        if (ns.fileExists('FTPCrack.exe', home)) {
            ns.ftpcrack(serverToNuke);
            hackToolsUsed++;
        }

        if (ns.fileExists('relaySMTP.exe', home)) {
            ns.relaysmtp(serverToNuke);
            hackToolsUsed++;
        }

        if (ns.fileExists('HTTPWorm.exe', home)) {
            ns.httpworm(serverToNuke);
            hackToolsUsed++;
        }
        
        if (ns.fileExists('SQLInject.exe', home)) {
            ns.sqlinject(serverToNuke);
            hackToolsUsed++;
        }
    }

    if (requiredPorts <= hackToolsUsed && !hasRootAccess) {
        ns.tprint('Trying to nuke: ' + serverToNuke)
        ns.nuke(serverToNuke);
        rootAccess = ns.hasRootAccess(serverToNuke);
    }

    if (!rootAccess) {
        ns.tprint('Could not gain root access to: ' + serverToNuke);
    }

    return rootAccess;
}