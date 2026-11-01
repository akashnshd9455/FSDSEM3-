import http from "http";
import os from "os";

let userData = [
    {
        id: 1,
        name: "Akshat",
        email: "akshat@gmail.com"
    },
    {
        id: 2,
        name: "Akarsh",
        email: "akarsh@gmail.com"
    },
    {
        id: 3,
        name: "Ansh",
        email: "ansh@gmail.com"
    }
];

const server = http.createServer(async (req, res) => {

    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    ).pathname;

    const method = req.method;

    if (url === "/" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end(
            "Available routes: GET /msg, GET /sys, GET /employee, POST /create"
        );

    }

    else if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Hello World");

    }

    else if (url === "/sys" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        const sysInfo = {
            platform: os.platform(),
            uptime: os.uptime()
        };

        res.end(JSON.stringify(sysInfo));

    }

    else if (url === "/employee" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(userData));

    }

    else if (url === "/create" && method === "POST") {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const newUser = {

                id: data.id,
                name: data.name,
                email: data.email

            };

            userData.push(newUser);

            res.statusCode = 201;

            res.end("user created successfully");

        });

    }

    else if (url === "/delete" && method === "DELETE") {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        });

        req.on("end", () => {

            const data = JSON.parse(body);

            const id = data.id;

            userData = userData.filter(
                (user) => user.id !== id
            );

            res.statusCode = 200;

            res.end("user deleted successfully");

        });

    }

    else {

        res.statusCode = 404;

        res.setHeader("Content-Type", "text/plain");

        res.end("Route Not Found");

    }

});

const port = 3000;

server.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});