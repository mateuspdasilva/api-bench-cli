import axios from "axios";
import { BenchmarkOptions, BenchmarkResult } from "../interfaces/benchmarkInterfaces";

export async function runBenchmark(options: BenchmarkOptions) {
  const { url, method, requests, delay } = options;
  const times: number[] = [];
  const results: BenchmarkResult[] = [];

  try {
    new URL(url);
  } catch (e) {
    throw new Error("URL inválida");
  }

  console.log(`🔎 Benchmarking API: ${url}`);
  console.log(`📌 Sending ${requests} requests with ${delay}ms interval\n`);

  for (let i = 0; i < requests; i++) {
    const start = performance.now();
    try {
      const response = await axios({ method, url });
      const responseTime = performance.now() - start;

      times.push(responseTime);
      results.push({ status: response.status, responseTime });

      console.log(`✅ [${i + 1}/${requests}] Status: ${response.status}, Time: ${responseTime.toFixed(2)}ms`);
    } catch (error: any) {
        throw new Error("Error while testing API");
    }

    if (i < requests - 1) await new Promise((res) => setTimeout(res, delay));
  }

  return calculateStatistics(times);
}

function calculateStatistics(times: number[]) {
  if (times.length === 0) return null;

  const min = Math.min(...times);
  const max = Math.max(...times);
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  const p95 = times.sort((a, b) => a - b)[Math.floor(times.length * 0.95)];

  return { min, max, avg, p95 };
}
