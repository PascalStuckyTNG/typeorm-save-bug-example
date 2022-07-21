module.exports = {
    moduleFileExtensions: ["js", "ts"],
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    transformIgnorePatterns: ["/node_modules/"],
    testMatch: ["**/test/**/*.test.ts"]
};