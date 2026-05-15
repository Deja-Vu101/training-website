import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { BearRepository } from '../repositories/BearRepository';

const router = Router();

const bearRepository = container.get(BearRepository);

router.get('/', (async (_req: Request, res: Response) => {
    try {
        const bears = await bearRepository.findAll();
        res.json(bears);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

router.get('/:id', (async (req: Request, res: Response) => {
    try {
        const bear = await bearRepository.findById(req.params.id);

        if (bear) {
            res.json(bear);
        } else {
            res.status(404).json({ message: 'Запис бурого ведмедя не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

router.post('/', (async (req: Request, res: Response) => {
    try {
        const newBear = await bearRepository.create(req.body);
        res.status(201).json(newBear);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

router.put('/:id', (async (req: Request, res: Response) => {
    try {
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender', 'hibernationTime'];

        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        const bear = await bearRepository.update(req.params.id, req.body);

        if (bear) {
            return res.json(bear);
        }

        return res.status(404).json({ message: 'Запис бурого ведмедя не знайдено' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        const bear = await bearRepository.patch(req.params.id, req.body);

        if (bear) {
            res.json(bear);
        } else {
            res.status(404).json({ message: 'Запис бурого ведмедя не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        const bear = await bearRepository.delete(req.params.id);

        if (bear) {
            res.json({ message: 'Запис про бурого ведмедя видалено' });
        } else {
            res.status(404).json({ message: 'Запис про бурого ведмедя не знайдено' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
