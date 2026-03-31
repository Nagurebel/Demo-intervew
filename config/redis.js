const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => {
    console.log("Redis Error:", err);
});

client.on("connect", () => {
    console.log("Redis connected ✅");
});

(async () => {
    await client.connect();
})();

module.exports = client;