const domain = 'https://leonbets.dev.leoncorp.net';
const cmdInit = `curl '${domain}/mobile/' -H \'Cookie: geotar=4; ipfrom=195.222.2.73; referer="${domain}"; _ym_uid=1499420267589691871; mobile_ver=5; lts="W10="; countrymode=2ed868ccdaa7b793445bf7f94d09671d; YPF8827340282Jdskjhfiw_928937459182JAX666=195.222.2.73; JSESSIONID=5AF72FD1878E7B07D6738061C11577F6; mpopup=MOBILE_POP_UP_SLOT_MONTH/1/1503485993; _ym_isad=2; ABTestSeed=1; mobile5Migrated=true; uaTimezone=-180; _ga=GA1.2.937289443.1499420266; _gid=GA1.2.104169166.1504074051\' -H \'Origin: https://www.leonbets.net\' -H \'Accept-Encoding: gzip, deflate, br\' -H \'Accept-Language: en-US,en;q=0.8,ru;q=0.6\' -H \'X-Zubr-appType: m\' -H \'X-Requested-With: XMLHttpRequest\' -H \'Connection: keep-alive\' -H \'Pragma: no-cache\' -H \'X-Zubr-mobileVer: 5\' -H \'X-Zubr-translationsTimestamp: 1503924748149\' -H \'X-Zubr-version: 70\' -H \'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1\' -H \'Content-Type: application/x-www-form-urlencoded;\' -H \'Accept: application/json, text/javascript, */*; q=0.01\' -H \'Cache-Control: no-cache\' -H \'Referer: https://www.leonbets.net/mobile/\' -H \'X-Zubr-appVersion: \' --data \'eventTypes=5&waitingBets=0&curLang=en-US&clientTimestamp=1504076091594\' --compressed`;
const cmdUpdate = `curl '${domain}/rest/sportline/list' -H \'Cookie: geotar=4; ipfrom=195.222.2.73; referer="${domain}"; _ym_uid=1499420267589691871; mobile_ver=5; lts="W10="; countrymode=2ed868ccdaa7b793445bf7f94d09671d; YPF8827340282Jdskjhfiw_928937459182JAX666=195.222.2.73; JSESSIONID=5AF72FD1878E7B07D6738061C11577F6; mpopup=MOBILE_POP_UP_SLOT_MONTH/1/1503485993; _ym_isad=2; ABTestSeed=1; mobile5Migrated=true; uaTimezone=-180; _ga=GA1.2.937289443.1499420266; _gid=GA1.2.104169166.1504074051\' -H \'Origin: https://www.leonbets.net\' -H \'Accept-Encoding: gzip, deflate, br\' -H \'Accept-Language: en-US,en;q=0.8,ru;q=0.6\' -H \'X-Zubr-appType: m\' -H \'X-Requested-With: XMLHttpRequest\' -H \'Connection: keep-alive\' -H \'Pragma: no-cache\' -H \'X-Zubr-mobileVer: 5\' -H \'X-Zubr-translationsTimestamp: 1503924748149\' -H \'X-Zubr-version: 70\' -H \'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1\' -H \'Content-Type: application/x-www-form-urlencoded;\' -H \'Accept: application/json, text/javascript, */*; q=0.01\' -H \'Cache-Control: no-cache\' -H \'Referer: https://www.leonbets.net/mobile/\' -H \'X-Zubr-appVersion: \' --data \'eventTypes=5&waitingBets=0&curLang=en-US&clientTimestamp=1504076091594\' --compressed`;
const exec = require('child_process').exec;
const fs = require('fs');
const process = require('process');
const path = require('path');
const pidFile = path.resolve(__dirname, '.pid');

try {
    let pid = fs.readFileSync(pidFile, 'utf-8');
    process.kill(pid);
} catch (e) {
    // No concurrency.
}

try {
    fs.writeFileSync(pidFile, process.pid, 'utf-8');
} catch (e) {
    console.warn('Unable to save process pid');
}

let bufferUpdate = '[]';
let bufferInit = '[]';

const fetchInit = () => exec(cmdInit, function (err, stdout, stderr) {

    if (err) {
        console.error('ERROR', err);
        console.error('ERROR', stderr);
        process.exit(1);
    }
    const initResp = JSON.parse(stdout.match(/initResp = (.+);/).pop());
    const data = JSON.stringify(initResp.sportline.live);

    if (stdout && bufferInit !== data) {
        bufferInit = data;
        fs.writeFileSync('./static//live-init.json', data, 'utf-8');
        console.log('live init has been saved');
    }
    setTimeout(fetchInit, 3000);
});

const fetchUpdate = () => exec(cmdUpdate, function (err, stdout) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    if (stdout && bufferUpdate !== stdout) {
        const data = JSON.stringify(JSON.parse(stdout).liveEvents);
        bufferUpdate = data;
        fs.writeFileSync('./static/live-update.json', data, 'utf-8');
        console.log('live update has been saved');

        setTimeout(fetchUpdate, 3000);
    }
});

fetchInit();
// fetchUpdate()
