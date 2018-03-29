//
// Copyright 2017-present Muflihun Labs
//
// Part of residue-node
//
// Author: @abumusamq
//
// https://muflihun.com
// https://muflihun.github.io/residue
// https://github.com/muflihun/residue-node
// https://github.com/muflihun/residue-node-native
//

const fs = require('fs');
const path = require('path');

"use strict";

// Get location of callstack in <file>:<line> format
const getSourceLocation = (splitChar, baseIdx) => {
    const er = new Error;
    const item = er.stack.split('\n')[baseIdx || 4];
    if (!item) {
        return ['<anonymous>', 0];
    }
    return item.replace(' at ', '').trim().split(splitChar);
};

// Get file of callstack.
// See getSourceLocation
exports.getSourceFile = (baseIdx) => getSourceLocation(':', baseIdx)[0];

// Get line of callstack.
// See getSourceLocation
exports.getSourceLine = (baseIdx) => parseInt(getSourceLocation(':', baseIdx)[1]);

// Get func of call stack
// See getSourceLocation
exports.getSourceFunc = (baseIdx) => {
    const parts = getSourceLocation(' ', baseIdx);
    if (parts.length <= 1) {
        return 'anonymous';
    }
    return parts[0];
}

exports.confJson = (jsonOrFilename) => {
    if (typeof jsonOrFilename === 'object') {
        return JSON.stringify(jsonOrFilename)
    } else if (typeof jsonOrFilename === 'string' && jsonOrFilename.length > 0) {
        if (jsonOrFilename.trim()[0] === '{') {
            return jsonOrFilename.trim();
        }
        return fs.readFileSync(path.resolve(jsonOrFilename), 'utf8');
    }
    return false;
}

exports.LoggingLevels = {
    Global: 1,
    Trace: 2,
    Debug: 4,
    Fatal: 8,
    Error: 16,
    Warning: 32,
    Verbose: 64,
    Info: 128
};

exports.ConfigurationType = {
    Enabled: 1,
    ToFile: 2,
    ToStandardOutput: 4,
    Format: 8,
    Filename: 16,
    SubsecondPrecision: 32,
    MillisecondsWidth: 32,
    PerformanceTracking: 64,
    MaxLogFileSize: 128,
    LogFlushThreshold: 256,
};

exports.LoggingFlag = {
    NewLineForContainer: 1,
    AllowVerboseIfModuleNotSpecified: 2,
    LogDetailedCrashReason: 4,
    DisableApplicationAbortOnFatalLog: 8,
    ImmediateFlush: 16,
    StrictLogFileSizeCheck: 32,
    ColoredTerminalOutput: 64,
    MultiLoggerSupport: 128,
    DisablePerformanceTrackingCheckpointComparison: 256,
    DisableVModules: 512,
    DisableVModulesExtensions: 1024,
    HierarchicalLogging: 2048,
    CreateLoggerAutomatically: 4096,
    AutoSpacing: 8192,
    FixedTimeFormat: 16384
}