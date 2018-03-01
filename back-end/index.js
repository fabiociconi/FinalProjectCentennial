require("ts-node/register");

const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

const baseUrl = "./";
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths
});

require("./src/app");