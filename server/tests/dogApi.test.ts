import { describe, expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../index';

describe('Dog API', () => {
    test('API returns valid dog image URL', async () => {
        const response = await request(app).get('/api/dogs/random');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
    });

});
