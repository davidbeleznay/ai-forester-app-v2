// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Increase timeout for slow connections
config.server.timeout = 120000; // 2 minutes timeout
config.maxWorkers = 2; // Reduce number of workers to avoid timeouts

module.exports = config;