import { VARIABLES } from "../../Environments/config";

const get = (key = VARIABLES.userSession) => {
    let userData = sessionStorage.getItem(key);
    try {
        if (userData) userData = JSON.parse(userData);
    } catch (e) {
        console.error('* user session\n', userData, e);
        userData = null;
    }

    return userData;
}

const set = (data, key) => {
    let tempData;
    try {
        if (typeof data === 'object') tempData = JSON.stringify(data);
        else if (typeof data === 'string') tempData = data;
        sessionStorage.setItem(key || VARIABLES.userSession, tempData);
    } catch (e) { console.error('Session Service * setSession', e) }
}

const setKey = (keyValue, sessionKey) => {
    try {
        let session = get(sessionKey);
        session = { ...session, ...keyValue };
        set(session, sessionKey);
    } catch (e) { console.error('Session Service * setSession', e) }
}

const clear = (key) => {
    sessionStorage.removeItem(key);
}

const sessionService = {
    getSession: get,
    setSession: set,
    setKey: setKey,
    clearSession: clear,
};

export { sessionService };