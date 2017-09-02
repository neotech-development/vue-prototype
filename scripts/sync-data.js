const host = 'https://leonbets.dev.leoncorp.net';
const fs = require('fs');
const process = require('process');
const path = require('path');
const request = require('request');
const assign = Object.assign;
const cacheDir = path.resolve(__dirname, '../cache');
const pidFile = path.resolve(cacheDir, '.pid');

if (!fs.existsSync(cacheDir)){
    fs.mkdirSync(cacheDir);
}

try {
    // Kill concurrent process.
    let pid = fs.readFileSync(pidFile, 'utf-8');
    process.kill(pid);
} catch (e) {
    // No concurrency.
}

try {
    // Write current process pid.
    fs.writeFileSync(pidFile, process.pid, 'utf-8');
} catch (e) {
    console.warn('Unable to save process pid');
}

let cache = '[]';

const fetchInit = options => request.get(assign({baseUrl: host, uri: '/mobile'}, options), (error, response, body) => {

    if (error) {
        console.error('Error:', error);
        console.error('Response:', response);
        process.exit(1);
    }

    // Solve security issue.
    if (body.indexOf('<title') === -1 && body.indexOf('setCookie') >= 0) {
        const code = body.match(/[\s\S]+<script.*>([\s\S]+?)<\/script[\s\S]+/).pop();
        const matches = code.match(/setCookie[(]'(\w+?)', '([\d.]+?)', (\d+)[)];/);

        const expire = Number(matches.pop());
        const value = matches.pop();
        const key = matches.pop();

        const d = new Date();
        d.setDate(d.getDate() + expire);
        const cookie = key + '=' + value + '; Path=/; Expires=' + d.toGMTString();

        return fetchInit({
            headers: {
                Cookie: cookie
            }
        });
    }

    const initResp = JSON.parse(body.match(/initResp = (.+);/).pop());
    const data = JSON.stringify(initResp.sportline.live, null, 2);

    if (body && cache !== data) {
        cache = data;
        fs.writeFileSync(path.resolve(__dirname, '../static/live.json'), data, 'utf-8');
        console.log('live init has been saved');
    }
    setTimeout(fetchInit, 3000);
});

fetchInit();
