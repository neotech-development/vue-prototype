const href = 'https://www.leonbets.net/mobile/';
const fs = require('fs');
const process = require('process');
const path = require('path');
const request = require('request');
const cacheDir = path.resolve(__dirname, '../cache');
const pidFile = path.resolve(cacheDir, '.pid');
const defaultInterval = 3000;
const errorInterval = 5000;
const cookies = [
    'uaTimezone=' + new Date().getTimezoneOffset() + '; Path=/; Expires=' + (new Date('3000-1-1')).toGMTString()
];
if (!fs.existsSync(cacheDir)) {
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

const getBaseOptions = () => ({
    uri: href,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6' +
        ' (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1',
        Cookie: cookies.join(';')
    }
});

const fetch = () => new Promise((resolve, reject) => {
    request.get(getBaseOptions(), (error, response, body) => {

        try {
            if (error) {
                return reject(error);
            }

            if (!body) {
                return reject(new Error('Empty response'));
            }

            // Solve security issue.
            if (body.indexOf('<title') === -1 && body.indexOf('setCookie') >= 0) {
                if (body.indexOf('isCookiesEnabled') === -1) {
                    const code = body.match(/[\s\S]+<script.*>([\s\S]+?)<\/script[\s\S]+/).pop();
                    const matches = code.match(/setCookie[(]'(\w+?)', '([\d.]+?)', (\d+)[)];/);
                    const expire = Number(matches.pop());
                    const value = matches.pop();
                    const key = matches.pop();

                    const d = new Date();
                    d.setDate(d.getDate() + expire);
                    const cookie = key + '=' + value + '; Path=/; Expires=' + d.toGMTString();
                    if (cookies.indexOf(cookie) === -1) {
                        cookies.push(cookie);
                    }

                    return safeFetch();
                } else {
                    return reject(new Error('Unexpected response'));
                }
            }

            if (body.indexOf('initResp') === -1) {
                console.log(response);
                return reject(new Error('Unexpected response'));
            }

            const initResp = JSON.parse(body.match(/initResp = (.+);/).pop());
            const data = JSON.stringify(initResp.sportline.live, null, 2);

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
});

const safeFetch = () =>
    fetch()
        .then(data => {
            if (cache !== data) {
                cache = data;
                fs.writeFileSync(path.resolve(__dirname, '../static/live.json'), data, 'utf-8');
                console.log('live init has been saved');
            }
            setTimeout(safeFetch, defaultInterval);
        })
        .catch(error => {
            // Connection problem.
            console.error('Fetch error:', error);
            setTimeout(() => {
                safeFetch();
            }, errorInterval);
        });

safeFetch();
