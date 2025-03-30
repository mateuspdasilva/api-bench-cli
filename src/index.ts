#!/usr/bin/env node

import { Command } from "commander";
import { runBenchmark } from "./services/benchmarkService";

const app = new Command();

app
  .name("api-bench-cli-mateus")
  .description("A simple tool for benchmarking APIs")
  .version("1.0.0")
  .helpOption("-h, --help", "Displays help about CLI app");

app
  .argument("<url>", "API URL to be tested")
  .argument("<method>", "HTTP Method (GET, POST, etc.)")
  .option("-r, --requests <number>", "Number of requests to be send (default: 1)", "1")
  .option("-d, --delay <ms>", "Interval between requests in milliseconds (deafult: 100)", "100")
  .action(async (url, method, options) => {
    const benchmarkOptions = {
      url,
      method,
      requests: parseInt(options.requests, 10),
      delay: parseInt(options.delay, 10),
    };

    const results = await runBenchmark(benchmarkOptions);

    if (results) {
        console.log("\n📊 Statistics:");
        console.log(`- Average time: ${results.avg.toFixed(2)}ms`);
        console.log(`- Minimum time: ${results.min.toFixed(2)}ms`);
        console.log(`- Maximum time: ${results.max.toFixed(2)}ms`);
        console.log(`- 95th Percentile: ${results.p95.toFixed(2)}ms`);
    }
  });

app.parse();
