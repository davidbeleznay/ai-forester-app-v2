// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Increase timeout for transforming files
config.transformer.transformerPath = require.resolve('metro-transform-worker');
config.transformer.workerPath = require.resolve('metro/src/DeltaBundler/Worker');
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.server.port = 8082;
config.server.timeout = 120000; // 2 minutes timeout
config.maxWorkers = 2; // Reduce number of workers to avoid timeouts

module.exports = config;