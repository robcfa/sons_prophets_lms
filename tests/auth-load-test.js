import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Test users data - replace with your actual test data
const users = new SharedArray('users', function() {
  return [
    { email: 'test1@example.com', password: 'testpass123' },
    { email: 'test2@example.com', password: 'testpass123' },
    { email: 'test3@example.com', password: 'testpass123' },
    // Add more test users as needed
  ];
});

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp-up to 20 users
    { duration: '1m', target: 50 },    // Stay at 50 users
    { duration: '2m', target: 100 },   // Ramp-up to 100 users
    { duration: '30s', target: 0 },    // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // Less than 1% error rate
    login_duration: ['p(95)<1000'],    // 95% of login requests under 1s
  },
};

export default function () {
  const user = users[__VU % users.length];
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
  
  // Test login endpoint
  const loginRes = http.post(`${baseUrl}/api/auth/login`, {
    email: user.email,
    password: user.password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: { name: 'login' },
  });

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.token !== undefined;
      } catch (e) {
        return false;
      }
    },
    'login response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  // If login successful, test protected endpoints
  if (loginRes.status === 200) {
    let token;
    try {
      const loginData = JSON.parse(loginRes.body);
      token = loginData.token;
    } catch (e) {
      console.error('Failed to parse login response');
    }

    if (token) {
      // Test protected dashboard endpoint
      const dashboardRes = http.get(`${baseUrl}/api/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        tags: { name: 'dashboard' },
      });

      check(dashboardRes, {
        'dashboard status is 200': (r) => r.status === 200,
        'dashboard response time < 500ms': (r) => r.timings.duration < 500,
      });

      // Test profile endpoint
      const profileRes = http.get(`${baseUrl}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        tags: { name: 'profile' },
      });

      check(profileRes, {
        'profile status is 200': (r) => r.status === 200,
        'profile has user data': (r) => {
          try {
            const body = JSON.parse(r.body);
            return body.user !== undefined;
          } catch (e) {
            return false;
          }
        },
      });
    }
  }

  // Simulate user think time
  sleep(1);
}

// Custom metric for login duration
import { Trend } from 'k6/metrics';
export const loginDuration = new Trend('login_duration');

// Setup function to run before the test
export function setup() {
  console.log('Starting authentication load test...');
  console.log(`Base URL: ${__ENV.BASE_URL || 'http://localhost:3000'}`);
  console.log(`Test users: ${users.length}`);
}

// Teardown function to run after the test
export function teardown() {
  console.log('Authentication load test completed.');
}