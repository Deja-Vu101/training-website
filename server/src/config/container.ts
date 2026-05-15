import 'reflect-metadata';
import { Container } from 'inversify';
import { IDatabase } from '../interfaces/IDatabase';
import { MongoDatabase } from '../database/MongoDatabase';
import { BearRepository } from '../repositories/BearRepository';
import { TYPES } from '../types/types';
import { NODE_ENV } from './env';

export interface IConfig {
    nodeEnv: string;
}

const container = new Container();

container.bind<IConfig>('Config').toConstantValue({
    nodeEnv: NODE_ENV,
});

container.bind<IDatabase>(TYPES.IDatabase).to(MongoDatabase).inSingletonScope();

container.bind(BearRepository).toSelf().inSingletonScope();

export { container };
