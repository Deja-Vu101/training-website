export const swaggerSpec = {
    openapi: '3.0.0',

    info: {
        title: 'API Сайту про Бурих Ведмедів',
        version: '1.0.0',
        description: 'Документація API для Сайту про Бурих Ведмедів',
    },

    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],

    paths: {
        '/api/bears': {
            get: {
                summary: 'Отримати всіх бурих ведмедів',
                responses: {
                    '200': {
                        description: 'Список всіх бурих ведмедів',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Bear' },
                                },
                            },
                        },
                    },
                },
            },

            post: {
                summary: 'Створити нового бурого ведмедя',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Bear' },
                            example: {
                                name: 'Бурко',
                                age: 7,
                                height: 130,
                                weight: 280,
                                gender: 'male',
                                description: 'Дорослий самець бурого ведмедя',
                                hibernationTime: 120,
                            },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт бурого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Bear' },
                            },
                        },
                    },
                },
            },
        },

        '/api/bears/{id}': {
            get: {
                summary: 'Отримати бурого ведмедя за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бурого ведмедя',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт бурого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Bear' },
                            },
                        },
                    },
                    '404': { description: 'Бурого ведмедя не знайдено' },
                },
            },

            put: {
                summary: 'Повністю оновити бурого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бурого ведмедя',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Bear' },
                            example: {
                                name: 'Бурко',
                                age: 8,
                                height: 135,
                                weight: 300,
                                gender: 'male',
                                description: 'Дорослий самець бурого ведмедя після оновлення даних',
                                hibernationTime: 125,
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт бурого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Bear' },
                            },
                        },
                    },
                    '400': { description: "Відсутні обов'язкові поля" },
                    '404': { description: 'Бурого ведмедя не знайдено' },
                },
            },

            patch: {
                summary: 'Частково оновити бурого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бурого ведмедя',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BearPatch' },
                            example: {
                                weight: 310,
                                hibernationTime: 130,
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт бурого ведмедя",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Bear' },
                            },
                        },
                    },
                    '404': { description: 'Бурого ведмедя не знайдено' },
                },
            },

            delete: {
                summary: 'Видалити дані про бурого ведмедя',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID бурого ведмедя',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Бурого ведмедя не знайдено' },
                },
            },
        },
    },

    components: {
        schemas: {
            Bear: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender', 'hibernationTime'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я бурого ведмедя",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік бурого ведмедя у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота бурого ведмедя в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага бурого ведмедя в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать бурого ведмедя',
                    },
                    description: {
                        type: 'string',
                        description: "Опис бурого ведмедя, необов'язкове поле",
                    },
                    hibernationTime: {
                        type: 'number',
                        description: 'Час знаходження у сплячці, дні',
                    },
                },
            },

            BearPatch: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    age: { type: 'number' },
                    height: { type: 'number' },
                    weight: { type: 'number' },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                    },
                    description: { type: 'string' },
                    hibernationTime: {
                        type: 'number',
                        description: 'Час знаходження у сплячці, дні',
                    },
                },
            },
        },
    },
};
