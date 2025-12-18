import app from './app';
import { config, validateConfig } from './config/env';
import logger from './utils/logger';

/**
 * Server entry point
 * Starts the Express server and handles graceful shutdown
 */
async function startServer(): Promise<void> {
    try {
        // Validate environment configuration
        validateConfig();

        // Start server
        const server = app.listen(config.port, () => {
            logger.info(`🚀 Server running on port ${config.port}`);
            logger.info(`📝 Environment: ${config.nodeEnv}`);
            logger.info(`🔗 API: http://localhost:${config.port}/api/timetable/upload`);
        });

        // Graceful shutdown
        const shutdown = async (signal: string) => {
            logger.info(`${signal} received, shutting down gracefully...`);

            server.close(() => {
                logger.info('Server closed');
                process.exit(0);
            });

            // Force shutdown after 10 seconds
            setTimeout(() => {
                logger.error('Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();
