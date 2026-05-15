import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { container } from './config/container';
import { TYPES } from './types/types';
import { IDatabase } from './interfaces/IDatabase';
import * as config from './config/env';
import type { IConfig } from './config/container';
import { swaggerSpec } from './config/swagger';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api-spec.json', (_req, res) => {
    res.json(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const database = container.get<IDatabase>(TYPES.IDatabase);
const appConfig = container.get<IConfig>('Config');

import bearRoutes from './routes/bears';
app.use('/api/bears', bearRoutes);

const PORT = config.PORT;

if (require.main === module) {
    database
        .connect()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Сервер запущено на порту ${PORT} у режимі ${appConfig.nodeEnv}`);

                const baseUrl =
                    process.env.CODESPACE_NAME !== undefined
                        ? `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
                        : `http://localhost:${PORT}`;

                console.log(`Документація API доступна за адресою ${baseUrl}/api-docs`);
                console.log(
                    `Специфікація доступна в Swagger UI за адресою ${baseUrl}/api-spec.json`,
                );
            });
        })
        .catch(err => {
            console.error('Не вдалося підключитися до бази даних:', err);
            process.exit(1);
        });
}

export default app;
