import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { getRandomDogImage } from "../services/dogService";

describe("dogService.getRandomDogImage", () => {
    beforeEach(() => {
        global.fetch = vi.fn()
    })

    afterEach(() => {
        vi.clearAllMocks()
        vi.restoreAllMocks()
    })

    test("Fetch dog image from API successfully", async () => {
        const mockData = {
            message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            status: "success"
        }

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async() => mockData
        } as Response)

        const result = await getRandomDogImage()

        expect(result).toEqual({imageUrl: mockData.message, status: "success"})
        expect(fetch).toHaveBeenCalledOnce()
    })

    test("Call is rejected", async () => {
       vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500
       } as Response)

        await expect(getRandomDogImage()).rejects.toThrow(
            "Failed to fetch dog image: Dog API returned status 500"
        )
    })

})
