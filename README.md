
# API Benchmark CLI

A command-line tool for benchmarking APIs. This tool allows you to perform benchmarking tests on any API endpoint by sending multiple requests and analyzing the response times.

## Installation

To install the package globally, run the following command:

```bash
npm install -g api-bench-cli-mateus
```

## Usage

After installing the package, you can use it to benchmark an API. Here's an example of how to use it:

### Example

```bash
api-bench-cli-mateus https://jsonplaceholder.typicode.com/posts GET -r 5 -d 200
```

### Parameters:

- **url** (string): The URL of the API you want to benchmark.
- **method** (string): The HTTP method to use (GET, POST, etc.).
- **requests** (number): The number of requests to send.
- **delay** (number): The delay between requests in milliseconds.

### Returns:

The function returns an object with the following statistics:

- **avg** (number): The average response time in milliseconds.
- **min** (number): The minimum response time in milliseconds.
- **max** (number): The maximum response time in milliseconds.
- **p95** (number): The 95th percentile response time in milliseconds.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
