"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldConfigurationManager = void 0;
exports.getFieldsForTool = getFieldsForTool;
exports.isToolConfigured = isToolConfigured;
exports.hasFieldConfiguration = hasFieldConfiguration;
exports.loadFieldConfiguration = loadFieldConfiguration;
exports.initializeFieldConfiguration = initializeFieldConfiguration;
const fs = require("fs");
class FieldConfigurationManager {
    constructor() {
        this.config = null;
    }
    static getInstance() {
        if (!FieldConfigurationManager.instance) {
            FieldConfigurationManager.instance = new FieldConfigurationManager();
        }
        return FieldConfigurationManager.instance;
    }
    loadFromFile(configPath) {
        try {
            if (!fs.existsSync(configPath)) {
                console.warn(`Configuration file not found: ${configPath}`);
                return;
            }
            console.error(`Loading field configuration from: ${configPath}`);
            const configContent = fs.readFileSync(configPath, 'utf8');
            const parsedConfig = JSON.parse(configContent);
            // Validate the configuration structure
            if (!parsedConfig.supported_fields || typeof parsedConfig.supported_fields !== 'object') {
                throw new Error('Invalid configuration format. Expected { "supported_fields": { "tool_name": ["field1", "field2"] } }');
            }
            this.config = parsedConfig;
            console.log(`Field configuration loaded from: ${configPath}`);
        }
        catch (error) {
            console.error('Error loading field configuration:', error);
            throw error;
        }
    }
    getFieldsForTool(toolName) {
        if (!this.config) {
            return null; // No configuration loaded, return all fields
        }
        return this.config.supported_fields[toolName] || null;
    }
    hasConfiguration() {
        return this.config !== null;
    }
    isToolConfigured(toolName) {
        return this.config !== null && toolName in this.config.supported_fields;
    }
    getConfiguration() {
        return this.config;
    }
    clearConfiguration() {
        this.config = null;
    }
}
exports.FieldConfigurationManager = FieldConfigurationManager;
// Helper functions for easy access
function getFieldsForTool(toolName) {
    return FieldConfigurationManager.getInstance().getFieldsForTool(toolName);
}
function isToolConfigured(toolName) {
    return FieldConfigurationManager.getInstance().isToolConfigured(toolName);
}
function hasFieldConfiguration() {
    return FieldConfigurationManager.getInstance().hasConfiguration();
}
function loadFieldConfiguration(configPath) {
    FieldConfigurationManager.getInstance().loadFromFile(configPath);
}
function initializeFieldConfiguration() {
    const configPath = process.env.FIELD_CONFIG_PATH;
    if (configPath) {
        try {
            loadFieldConfiguration(configPath);
        }
        catch (error) {
            console.error('Failed to load field configuration:', error);
        }
    }
}
