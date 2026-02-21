import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import { Request, Response } from 'express';
import * as dogController from '../controllers/dogController';

vi.mock('../controllers/dogController')

describe('dogRoutes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    })


    test('GET /api/dogs/random returns dog image', async () => {

        const mockData = {
            "success": true,
            "data": {
                "imageUrl": "http://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
                "status": "success"
            }
        }
        
        vi.mocked(dogController.getDogImage).mockImplementation(
            async(req: Request, res: Response) => {
                res.status(200).json(mockData)
            }
        )

        const res = await request(app).get('/api/dogs/random');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockData);
    });

    test('GET /api/dogs/random returns 500 internal error', async () => {
        vi.mocked(dogController.getDogImage).mockImplementation(
            async(req: Request, res: Response) => {
                res.status(500).json({"success": false, "error": "Failed to fetch dog image: Network error"})
            }
        );

        const res = await request(app).get('/api/dogs/random');

        expect(res.status).toBe(500);
        expect(res.body.error).toBeDefined();
    });
});
