const app = require("./app");
const port = process.env.PORT || 5000;

// Manually start the server for local development
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
