import winston from 'winston';
import { config } from '../config/env';

/**
 * Winston logger instance for application-wide logging
 * Logs to console in development and to files in production
 */
const logger = winston.createLogger({
    level: config.logging.level,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'timetable-extraction' },
    transports: [
        // Write all logs to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(
                    ({ level, message, timestamp, ...metadata }) => {
                        let msg = `${timestamp} [${level}]: ${message}`;
                        if (Object.keys(metadata).length > 0) {
                            msg += ` ${JSON.stringify(metadata)}`;
                        }
                        return msg;
                    }
                )
            ),
        }),
    ],
});

// Add file transports in production
if (config.nodeEnv === 'production') {
    logger.add(
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    );
    logger.add(
        new winston.transports.File({ filename: 'logs/combined.log' })
    );
}

export default logger;
