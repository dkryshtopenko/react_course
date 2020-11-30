// Config should export object with properties: PORT, ENV
require("dotenv").config();

module.exports = {
    SECRET: process.env.SECRET,
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || "development",
    getCliOptions: () => {
        const myArgs = process.argv.slice(2);
        const cliOptions = [];
        myArgs.map((arg) => {
            const options = arg.slice(1).split("=");
            cliOptions.push({
                name: options[0],
                value: options[1],
            })
        });
        return cliOptions;
    },
    // Environment-dependent settings
    development: {
        db: {
            dialect: "sqlite",
            storage: ":memory:"
        }
    },
    production: {
        db: {
            dialect: "sqlite",
            storage: "db/database.sqlite"
        }
    }
};
