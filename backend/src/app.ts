import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { config } from './config/env';
import logger from './utils/logger';
import { ensureUploadDir, isValidFileType } from './utils/file.utils';
import uploadController from './api/upload.controller';

/**
 * Express application setup
 */
export class App {
    public app: Express;
    private upload: multer.Multer;

    constructor() {
        this.app = express();
        this.upload = this.configureMulter();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    /**
     * Configures Multer for file uploads
     */
    private configureMulter(): multer.Multer {
        const storage = multer.diskStorage({
            destination: async (_req, _file, cb) => {
                await ensureUploadDir();
                cb(null, config.upload.uploadDir);
            },
            filename: (_req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = path.extname(file.originalname);
                cb(null, `upload-${uniqueSuffix}${ext}`);
            },
        });

        return multer({
            storage,
            limits: {
                fileSize: config.upload.maxFileSize,
            },
            fileFilter: (_req, file, cb) => {
                if (isValidFileType(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error(`Invalid file type: ${file.mimetype}`));
                }
            },
        });
    }

    /**
     * Configures Express middleware
     */
    private configureMiddleware(): void {
        // CORS
        this.app.use(
            cors({
                origin: config.nodeEnv === 'development' ? '*' : process.env.FRONTEND_URL,
                credentials: true,
            })
        );

        // Body parsing
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Request logging
        this.app.use((req: Request, _res: Response, next: NextFunction) => {
            logger.info(`${req.method} ${req.path}`);
            next();
        });
    }

    /**
     * Configures application routes
     */
    private configureRoutes(): void {
        // Health check
        this.app.get('/health', (_req: Request, res: Response) => {
            res.json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            });
        });

        // Timetable routes
        this.app.post(
            '/api/timetable/upload',
            this.upload.single('file'),
            (req: Request, res: Response) => uploadController.uploadTimetable(req, res)
        );

        this.app.get('/api/timetable/:id', (req: Request, res: Response) =>
            uploadController.getTimetable(req, res)
        );

        this.app.get('/api/timetable', (req: Request, res: Response) =>
            uploadController.listTimetables(req, res)
        );

        // 404 handler
        this.app.use((_req: Request, res: Response) => {
            res.status(404).json({
                status: 'error',
                message: 'Route not found',
            });
        });
    }

    /**
     * Configures error handling middleware
     */
    private configureErrorHandling(): void {
        this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
            logger.error('Unhandled error:', err);

            // Multer errors
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({
                        status: 'error',
                        message: 'File too large',
                    });
                    return;
                }
            }

            res.status(500).json({
                status: 'error',
                message: config.nodeEnv === 'development' ? err.message : 'Internal server error',
            });
        });
    }
}

export default new App().app;
