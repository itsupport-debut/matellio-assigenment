importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
    console.log(event);
    if (event.tag === 'get-data') {
        event.waitUntil(getData());
    }
});

function getData(userName) {

    fetch('https://dummyjson.com/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(() => Promise.resolve())
        .catch((error) => Promise.reject(error));
}

