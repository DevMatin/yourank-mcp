import { z } from 'zod';
import { defaultGlobalToolConfig } from '../config/global.tool.js';
import { filterFields, parseFieldPaths } from '../utils/field-filter.js';
import { FieldConfigurationManager } from '../config/field-configuration.js';
export class BaseTool {
    dataForSEOClient;
    constructor(dataForSEOClient) {
        this.dataForSEOClient = dataForSEOClient;
    }
    supportOnlyFullResponse() {
        return false;
    }
    formatError(error) {
        return error instanceof Error ? error.message : 'Unknown error';
    }
    getFilterExpression() {
        const filterExpression = z.array(z.union([
            z.array(z.union([z.string(), z.number(), z.boolean()])).length(3),
            z.enum(["and", "or"]),
            z.array(z.unknown()).length(3),
            z.union([z.string(), z.number(), z.unknown()]),
            z.any()
        ])).max(3);
        return filterExpression;
    }
    validateAndFormatResponse(response) {
        console.error(JSON.stringify(response));
        if (defaultGlobalToolConfig.fullResponse || this.supportOnlyFullResponse()) {
            let data = response;
            this.validateResponseFull(data);
            let result = data.tasks[0].result;
            return this.formatResponse(result);
        }
        this.validateResponse(response);
        return this.formatResponse(response);
    }
    formatResponse(data) {
        const fieldConfig = FieldConfigurationManager.getInstance();
        if (fieldConfig.hasConfiguration()) {
            const toolName = this.getName();
            if (fieldConfig.isToolConfigured(toolName)) {
                const fields = fieldConfig.getFieldsForTool(toolName);
                if (fields && fields.length > 0) {
                    data = filterFields(data, parseFieldPaths(fields));
                }
            }
        }

        // Response Size Limiting für Keywords Data APIs
        data = this.limitResponseSize(data);

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(data, null, 2),
                },
            ],
        };
    }

    limitResponseSize(data, maxSize = 500000) { // 500KB Limit
        const jsonString = JSON.stringify(data);
        if (jsonString.length <= maxSize) {
            return data;
        }

        // Für Keywords Data: Limitiere Arrays auf die ersten N Einträge
        if (Array.isArray(data)) {
            const limitedData = data.slice(0, 10); // Nur erste 10 Einträge
            return {
                ...limitedData,
                _truncated: true,
                _original_count: data.length,
                _message: `Response wurde auf ${limitedData.length} von ${data.length} Einträgen beschränkt aufgrund der Größe.`
            };
        }

        // Für Objekte mit Arrays: Limitiere die Arrays
        if (typeof data === 'object' && data !== null) {
            const limitedData = { ...data };
            
            for (const [key, value] of Object.entries(limitedData)) {
                if (Array.isArray(value) && value.length > 10) {
                    limitedData[key] = value.slice(0, 10);
                    limitedData[`_${key}_truncated`] = true;
                    limitedData[`_${key}_original_count`] = value.length;
                }
            }
            
            limitedData._response_limited = true;
            limitedData._message = "Response wurde aufgrund der Größe beschränkt. Verwenden Sie spezifischere Parameter für vollständige Ergebnisse.";
            
            return limitedData;
        }

        return data;
    }
    formatErrorResponse(error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${this.formatError(error)}`,
                },
            ],
        };
    }
    validateResponse(response) {
        if (response.status_code / 100 !== 200) {
            throw new Error(`API Error: ${response.status_message} (Code: ${response.status_code})`);
        }
    }
    validateResponseFull(response) {
        if (response.status_code / 100 !== 200) {
            throw new Error(`API Error: ${response.status_message} (Code: ${response.status_code})`);
        }
        if (response.tasks.length === 0) {
            throw new Error('No tasks in response');
        }
        const task = response.tasks[0];
        if (task.status_code / 100 !== 200) {
            throw new Error(`Task Error: ${task.status_message} (Code: ${task.status_code})`);
        }
        if (response.tasks_error > 0) {
            throw new Error(`Tasks Error: ${response.tasks_error} tasks failed`);
        }
    }
    filterResponseFields(response, fields) {
        if (!fields || fields.length === 0) {
            return response;
        }
        const fieldPaths = parseFieldPaths(fields);
        return filterFields(response, fieldPaths);
    }
    formatFilters(filters) {
        if (!filters)
            return null;
        if (filters.length === 0) {
            return null;
        }
        return this.removeNested(filters);
    }
    removeNested(filters) {
        for (var i = 0; i < filters.length; i++) {
            if (Array.isArray(filters[i]) && filters[i].length == 1 && Array.isArray(filters[i][0])) {
                filters[i] = this.removeNested(filters[i][0]);
            }
        }
        return filters;
    }
    formatOrderBy(orderBy) {
        if (!orderBy)
            return null;
        if (orderBy.length === 0) {
            return null;
        }
        return orderBy;
    }
}
