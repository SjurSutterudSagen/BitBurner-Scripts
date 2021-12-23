/**
* @param {NS} ns
**/

export async function main(ns, serverToNuke) {
    const args = ns.flags([['help', false]]);
    const targetServer = args._[0];
    let hackToolsUsed = 0;
    let rootAccess = ns.hasRootAccess(targetServer);
    const requiredPorts = ns.getServerNumPortsRequired(targetServer);

    if (!rootAccess && requiredPorts !== 0) {
        ns.tprint('Trying to open ports on: ' + targetServer);

        if (ns.fileExists('BruteSSH.exe', home)) {
            ns.brutessh(targetServer);
            hackToolsUsed++;
        }

        if (ns.fileExists('FTPCrack.exe', home)) {
            ns.ftpcrack(targetServer);
            hackToolsUsed++;
        }

        if (ns.fileExists('relaySMTP.exe', home)) {
            ns.relaysmtp(targetServer);
            hackToolsUsed++;
        }

        if (ns.fileExists('HTTPWorm.exe', home)) {
            ns.httpworm(targetServer);
            hackToolsUsed++;
        }
        
        if (ns.fileExists('SQLInject.exe', home)) {
            ns.sqlinject(targetServer);
            hackToolsUsed++;
        }
    }

    if (requiredPorts <= hackToolsUsed && !hasRootAccess) {
        ns.tprint('Trying to nuke: ' + targetServer)
        ns.nuke(targetServer);
        rootAccess = ns.hasRootAccess(targetServer);
    }

    if (!rootAccess) {
        ns.tprint('Could not gain root access to: ' + targetServer);
    }

    return rootAccess;
}