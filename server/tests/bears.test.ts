import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Bear } from '../src/models/bear';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

describe('API вебдодатку сайту про бурих ведмедів', () => {
    const database = container.get<IDatabase>(TYPES.IDatabase);
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/bears-test');

    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    after(async () => {
        try {
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "bears-test" успішно видалено');
        } catch (error) {
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    beforeEach(async () => {
        await Bear.deleteMany({});
    });

    describe('POST /api/bears', () => {
        it('має створити запис про нового бурого ведмедя', done => {
            const bear = {
                name: 'Бурко',
                age: 7,
                height: 130,
                weight: 280,
                gender: 'male' as const,
                description: 'Дорослий самець бурого ведмедя',
                hibernationTime: 120,
            };

            chai.request(app)
                .post('/api/bears')
                .send(bear)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }

                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', bear.name);
                    expect(res.body).to.have.property('age', bear.age);
                    expect(res.body).to.have.property('height', bear.height);
                    expect(res.body).to.have.property('weight', bear.weight);
                    expect(res.body).to.have.property('gender', bear.gender);
                    expect(res.body).to.have.property('description', bear.description);
                    expect(res.body).to.have.property('hibernationTime', bear.hibernationTime);
                    expect(res.body).to.have.property('dateAdded');
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    describe('GET /api/bears', () => {
        it('має отримати всіх бурих ведмедів', async () => {
            const testBear = new Bear({
                name: 'Карпатка',
                age: 5,
                height: 110,
                weight: 190,
                gender: 'female',
                description: 'Самка бурого ведмедя з Карпат',
                hibernationTime: 135,
            });

            await testBear.save();

            const res = await chai.request(app).get('/api/bears');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Карпатка');
            expect(res.body[0]).to.have.property('gender', 'female');
            expect(res.body[0]).to.have.property('description', 'Самка бурого ведмедя з Карпат');
            expect(res.body[0]).to.have.property('hibernationTime', 135);
            expect(res.body[0]).to.have.property('dateAdded');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    describe('GET /api/bears/:id', () => {
        it('має отримати конкретного бурого ведмедя за id', async () => {
            const testBear = new Bear({
                name: 'Ведмедик',
                age: 2,
                height: 85,
                weight: 90,
                gender: 'male',
                description: 'Молодий бурий ведмідь',
                hibernationTime: 100,
            });

            const savedBear = await testBear.save();

            const res = await chai.request(app).get(`/api/bears/${String(savedBear._id)}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Ведмедик');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 85);
            expect(res.body).to.have.property('weight', 90);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Молодий бурий ведмідь');
            expect(res.body).to.have.property('hibernationTime', 100);
        });

        it('має повернути 404 для неіснуючого бурого ведмедя', async () => {
            const res = await chai.request(app).get('/api/bears/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    describe('PUT /api/bears/:id', () => {
        it('має повністю оновити запис про бурого ведмедя', async () => {
            const testBear = new Bear({
                name: 'Оригінальний',
                age: 4,
                height: 115,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
                hibernationTime: 110,
            });

            const savedBear = await testBear.save();

            const updatedData = {
                name: 'Оновлений',
                age: 6,
                height: 125,
                weight: 250,
                gender: 'female',
                description: 'Оновлений опис',
                hibernationTime: 140,
            };

            const res = await chai
                .request(app)
                .put(`/api/bears/${String(savedBear._id)}`)
                .send(updatedData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 6);
            expect(res.body).to.have.property('height', 125);
            expect(res.body).to.have.property('weight', 250);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('hibernationTime', 140);
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            const testBear = new Bear({
                name: 'Оригінальний',
                age: 4,
                height: 115,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
                hibernationTime: 110,
            });

            const savedBear = await testBear.save();

            const incompleteData = {
                name: 'Оновлений',
                age: 6,
                gender: 'female',
                description: 'Оновлений опис',
            };

            const res = await chai
                .request(app)
                .put(`/api/bears/${String(savedBear._id)}`)
                .send(incompleteData);

            expect(res).to.have.status(400);

            const unchangedBear = await Bear.findById(savedBear._id);

            expect(unchangedBear).to.have.property('name', 'Оригінальний');
            expect(unchangedBear).to.have.property('height', 115);
            expect(unchangedBear).to.have.property('weight', 210);
            expect(unchangedBear).to.have.property('hibernationTime', 110);
        });
    });

    describe('PATCH /api/bears/:id', () => {
        it('має частково оновити запис про бурого ведмедя', async () => {
            const testBear = new Bear({
                name: 'Оригінальний',
                age: 4,
                height: 115,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
                hibernationTime: 110,
            });

            const savedBear = await testBear.save();

            const patchData = {
                name: 'Частково оновлений',
                age: 7,
                description: 'Оновлений опис',
                hibernationTime: 130,
            };

            const res = await chai
                .request(app)
                .patch(`/api/bears/${String(savedBear._id)}`)
                .send(patchData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 7);
            expect(res.body).to.have.property('height', 115);
            expect(res.body).to.have.property('weight', 210);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('hibernationTime', 130);
            expect(res.body).to.have.property('dateAdded');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            const testBear = new Bear({
                name: 'Оригінальний',
                age: 4,
                height: 115,
                weight: 210,
                gender: 'male',
                description: 'Початковий опис',
                hibernationTime: 110,
            });

            const savedBear = await testBear.save();

            const partialData = {
                name: 'Оновлений',
                age: 6,
                gender: 'female',
                description: 'Оновлений опис',
                hibernationTime: 125,
            };

            const res = await chai
                .request(app)
                .patch(`/api/bears/${String(savedBear._id)}`)
                .send(partialData);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 6);
            expect(res.body).to.have.property('height', 115);
            expect(res.body).to.have.property('weight', 210);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('hibernationTime', 125);
        });
    });

    describe('HEAD /api/bears', () => {
        it('має повернути заголовки метаданих', async () => {
            const res = await chai
                .request(app)
                .head('/api/bears')
                .set('Accept', 'application/json');

            expect(res).to.have.status(200);

            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    describe('DELETE /api/bears/:id', () => {
        it('має видалити запис про бурого ведмедя', async () => {
            const testBear = new Bear({
                name: 'Лісовик',
                age: 8,
                height: 140,
                weight: 320,
                gender: 'male',
                description: 'Великий бурий ведмідь',
                hibernationTime: 150,
            });

            const savedBear = await testBear.save();

            const res = await chai.request(app).delete(`/api/bears/${String(savedBear._id)}`);

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про бурого ведмедя видалено');

            const findBear = await Bear.findById(savedBear._id);
            expect(findBear).to.be.null;
        });
    });
});
