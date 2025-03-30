export interface BenchmarkOptions {
    url: string;
    method: string;
    requests: number;
    delay: number;
  }
  
  export interface BenchmarkResult {
    status: number;
    responseTime: number;
  }