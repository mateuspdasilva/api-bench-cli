import { runBenchmark } from "../../src/services/benchmarkService";

describe("runBenchmark", () => {
    it("should return valid response metrics", async () => {
        const result = await runBenchmark({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "GET",
            requests: 5,
            delay: 100,
        });

        if (result !== null) {
            expect(result).toHaveProperty("avg");
            expect(result).toHaveProperty("min");
            expect(result).toHaveProperty("max");
            expect(result).toHaveProperty("p95");

            expect(typeof result.avg).toBe("number");
            expect(typeof result.min).toBe("number");
            expect(typeof result.max).toBe("number");
            expect(typeof result.p95).toBe("number");
        } else {
            throw new Error("The response is null.");
        }
    });

    it("should return invalid URL error", async () => {
        await expect(runBenchmark({
            url: "https://invalid-url-test-12345.com",
            method: "GET",
            requests: 3,
            delay: 100,
        })).rejects.toThrow("Error while testing API");
    });
});
