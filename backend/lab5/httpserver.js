import http from 'http';

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/msg') {
        res.write('hello from msg');
    } else {
        res.write('hello world');
    }

    res.end();
});

server.listen(3000, () => {
    console.log('Server running at 3000');
});