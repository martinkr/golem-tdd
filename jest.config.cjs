module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // Allow transforming msw and its dependency until-async which ship ESM code
  transformIgnorePatterns: ["node_modules/(?!(msw|until-async)/)"],
  testEnvironment: "node",
};
