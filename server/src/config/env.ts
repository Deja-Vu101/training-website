import dotenv from 'dotenv';

dotenv.config();

const getEnvValue = (key: string, defaultValue: string): string => {
    const value = process.env[key];

    if (value === undefined && process.env.NODE_ENV === 'production') {
        console.warn(
            `Попередження: змінна середовища ${key} не встановлена, використовуємо значення за замовчуванням`,
        );
    }
    return value !== undefined ? value : defaultValue;
};

export const NODE_ENV: string = getEnvValue('NODE_ENV', 'development');
export const PORT: number = parseInt(getEnvValue('PORT', '5000'), 10);
export const MONGODB_URI: string = getEnvValue('MONGODB_URI', 'mongodb://localhost:27017/bears');
