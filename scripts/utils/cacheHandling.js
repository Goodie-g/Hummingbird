export function setCache(key, data, ttl = 1000 * 60 * 60) { 
    const record = {
        data, 
        expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(record));
}

export function getCache(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const record = JSON.parse(cached);

    if (Date.now() > record.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return record.data;
}

