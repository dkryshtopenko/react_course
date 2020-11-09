// Config should export object with properties: PORT, ENV
module.exports = {
    PORT: 3000,
    ENV: "dev",
    getCliOptions: () => {
        const myArgs = process.argv.slice(2);
        const cliOptions = []
        myArgs.map((arg) => {
            const options = arg.slice(1).split("=");
            cliOptions.push({
                name: options[0],
                value: options[1],
            })
        })
        return cliOptions;
    }
}
