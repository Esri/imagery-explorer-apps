const { ERROR_TERMIAL_OUTPUT_COLOR } = require('./constants');

const { ENV_VARIABLES_BY_APP_NAME } = require('./config');

/**
 * Validate that all required environment variables are set for the specified application.
 *
 * @param {*} app name of the application to validate environment variables for, should match a key in src/config.json
 * @param {*} envConfig object containing environment variables loaded from .env file by dotenv
 */
const validateEnv = (app, envConfig) => {
    console.log(
        `Validating environment variables for "${app || 'undefined application'}"`
    );

    if (!app) {
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            'Failed to validate environment variables: No application specified for environment variable validation.'
        );
        process.exit(1);
    }

    if (!envConfig) {
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            'Failed to validate environment variables: No environment configuration provided for validation.'
        );
        process.exit(1);
    }

    // Get environment variables for the specified application
    const environmentVariables = ENV_VARIABLES_BY_APP_NAME[app];

    if (!environmentVariables) {
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            `Failed to validate environment variables: No environment variable configuration found for application: "${app}".`
        );
        process.exit(1);
    }

    // Get required environment variable names
    const requiredEnvVars = environmentVariables
        .filter((envVar) => envVar.required)
        .map((envVar) => envVar.name);

    if (!requiredEnvVars || requiredEnvVars.length === 0) {
        console.warn(
            `No required environment variables defined for application: "${app}". Skipping validation.`
        );
        return;
    }

    for (const varName of requiredEnvVars) {
        if (envConfig && !(varName in envConfig)) {
            console.error(
                ERROR_TERMIAL_OUTPUT_COLOR,
                `Missing required environment variable: "${varName}" for "${app}". Please define it in your .env file.`
            );
            process.exit(1);
        }
    }

    console.log(`All required environment variables are set for "${app}".\n`);
};

module.exports = validateEnv;
