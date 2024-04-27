// utils/HttpService.js
const axios = require('axios');

class HttpService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Interceptors can be added here if needed, for example, to handle authentication tokens
        this.client.interceptors.request.use(config => {
            // Logic to add authentication token or other headers
            return config;
        }, error => {
            return Promise.reject(error);
        });

        this.client.interceptors.response.use(response => {
            // Handle global response logging or processing here
            return response;
        }, error => {
            return Promise.reject(error);
        });
    }

    get(url, params = {}) {
        return this.client.get(url, { params });
    }

    post(url, data = {}) {
        return this.client.post(url, data);
    }

    put(url, data = {}) {
        return this.client.put(url, data);
    }

    delete(url, params = {}) {
        return this.client.delete(url, { params });
    }
}

module.exports = HttpService;