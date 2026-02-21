import { describe, expect, test, vi, beforeEach, afterEach } from "vitest"
import { getDogImage } from "../controllers/dogController"
import * as dogService from "../services/dogService"

vi.mock("../services/dogService")

const createMockRequest = () => {
    const req: any = {}
    return req
}

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe("dogController.getDogImage", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    test("Return dog image successfully", async () => {
        const req = createMockRequest()
        const res = createMockResponse()
        const payload = {
            imageUrl: "http://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            status: "success"
        }
        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload)

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: payload
        })
    })

})