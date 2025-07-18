module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/login',
        'http://localhost:3000/register',
        'http://localhost:3000/course-catalog',
        'http://localhost:3000/learner-dashboard',
        'http://localhost:3000/community-forum'
      ],
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          width: 375,
          height: 667,
          deviceScaleRatio: 2,
          mobile: true,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Skip PWA and SEO audits for auth pages
        skipAudits: [
          'installable-manifest',
          'apple-touch-icon',
          'maskable-icon',
          'pwa-cross-browser',
          'pwa-page-transitions',
          'pwa-each-page-has-url',
          'service-worker',
          'works-offline',
          'viewport',
          'without-javascript',
          'meta-description',
          'document-title',
          'html-has-lang',
          'crawlable-anchors',
          'robots-txt',
          'hreflang',
          'canonical',
          'structured-data'
        ],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        
        // Specific performance audits
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        
        // Accessibility audits
        'color-contrast': ['error', { minScore: 1 }],
        'heading-order': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],
        'button-name': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'form-field-multiple-labels': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        
        // Best practices
        'uses-https': ['error', { minScore: 1 }],
        'no-vulnerable-libraries': ['warn', { minScore: 1 }],
        'charset': ['error', { minScore: 1 }],
        'doctype': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};