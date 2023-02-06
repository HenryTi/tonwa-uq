const debugHosts = {
    center: 'localhost:3000',
    uq: 'localhost:3015',
    res: 'localhost:3015',
};
const fetchOptions = {
    method: "GET",
    // mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
        "Content-Type": "text/plain;charset=UTF-8"
    },
};
export async function buildHosts(center, isDevelopment) {
    if (isDevelopment === true) {
        return await buildDebugHosts(center);
    }
    // let uq: string, res: string;
    if (center.endsWith('/') === false) {
        center += '/';
    }
    return { center, uqDebug: undefined, res: undefined, uqs: undefined };
}
async function buildDebugHosts(center) {
    if (center.endsWith('/') === false) {
        center += '/';
    }
    let { center: debugCenter, uq, res } = debugHosts;
    let promises = [debugCenter, uq, res].map(v => localCheck(v));
    let [retCenter, retUq, retRes] = await Promise.all(promises);
    if (retCenter !== null)
        center = `http://${debugCenter}/`;
    let uqDebug = undefined;
    let uqs;
    if (retUq !== null) {
        uqDebug = `http://${uq}/`;
        let json = JSON.parse(retUq);
        uqs = json.uqs;
    }
    else {
        uq = undefined;
    }
    if (retRes !== null) {
        res = undefined; // 直接指向目的服务器 `http://${res}/`;
    }
    else {
        res = undefined;
    }
    return { center, uqDebug, res, uqs };
}
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
const timeout = 2000;
function fetchLocalCheck(url) {
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(reject, timeout, new Error("Connection timed out"));
            let resp = await fetch(url, fetchOptions);
            if (resp.ok === false) {
                reject('resp.ok === false');
                return;
            }
            let text = await resp.text();
            resolve(text);
        }
        catch (err) {
            reject(err);
        }
    });
}
async function localCheck(host) {
    if (!host)
        return null;
    let url = `http://${host}/hello`;
    try {
        return await fetchLocalCheck(url);
    }
    catch (err) {
        return null;
    }
}
//# sourceMappingURL=host.js.map