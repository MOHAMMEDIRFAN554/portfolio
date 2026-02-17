
import dns from 'dns';

const srv = '_mongodb._tcp.cluster0.ur4rzwx.mongodb.net';

console.log(`Resolving SRV for ${srv}...`);
dns.resolveSrv(srv, (err, addresses) => {
    if (err) {
        console.error('SRV Resolution Failed:', err);

        // Try A record of the cluster domain itself
        console.log('Trying A record resolution for cluster0.ur4rzwx.mongodb.net...');
        dns.resolve4('cluster0.ur4rzwx.mongodb.net', (err2, addresses2) => {
            if (err2) {
                console.error('A Record Resolution Failed:', err2);
            } else {
                console.log('A Record Addresses:', addresses2);
            }
        });

    } else {
        console.log('SRV Records:', addresses);
    }
});
