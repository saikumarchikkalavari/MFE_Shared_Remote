# CI/CD Setup Guide for Jenkins

This guide explains how to set up and run the unit tests in Jenkins CI/CD pipeline for the MFE_SharedRemote project.

## ✅ Yes, Your Tests Will Work in Jenkins!

The unit tests are fully compatible with Jenkins CI/CD. The configuration has been enhanced to support:
- Headless test execution
- CI-friendly reporting (JUnit XML, Cobertura)
- Parallel execution
- Coverage thresholds
- Proper exit codes

---

## Prerequisites

### Jenkins Setup
1. **Jenkins Version:** 2.300+ recommended
2. **Required Plugins:**
   - NodeJS Plugin
   - Pipeline Plugin
   - JUnit Plugin
   - Code Coverage API Plugin
   - HTML Publisher Plugin
   - Git Plugin

### Node.js Configuration
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Add NodeJS installation:
   - Name: `NodeJS-18`
   - Version: 18.x or higher
   - Install automatically: ✅

---

## Configuration Files Added/Updated

### 1. Enhanced Jest Configuration (`host/jest.config.js`)

**New Features:**
```javascript
// CI-friendly coverage reports
coverageReporters: ['text', 'lcov', 'cobertura', 'html']

// JUnit XML reporter for Jenkins
reporters: [
  'default',
  ['jest-junit', {
    outputDirectory: 'coverage',
    outputName: 'junit.xml'
  }]
]

// Coverage thresholds
coverageThreshold: {
  global: {
    branches: 50,
    functions: 50,
    lines: 50,
    statements: 50
  }
}

// Test timeout and verbosity
testTimeout: 10000
verbose: true
```

### 2. New NPM Scripts (`host/package.json`)

```json
{
  "scripts": {
    "test:ci": "jest --ci --coverage --maxWorkers=2 --silent",
    "test:ci:report": "jest --ci --coverage --maxWorkers=2 --coverageReporters=cobertura --coverageReporters=lcov --coverageReporters=text"
  }
}
```

**Key Flags:**
- `--ci`: Optimizes for CI environments
- `--coverage`: Generates coverage reports
- `--maxWorkers=2`: Limits parallel workers (prevents resource issues)
- `--silent`: Reduces output verbosity

### 3. Added Dependency

```json
"jest-junit": "^16.0.0"
```

Install it by running:
```bash
cd host
npm install
```

---

## Jenkinsfile Options

Two Jenkinsfiles are provided:

### Option 1: Windows Jenkins (`Jenkinsfile`)
- Uses `bat` commands
- For Windows-based Jenkins agents

### Option 2: Linux/Unix Jenkins (`Jenkinsfile.linux`)
- Uses `sh` commands
- For Linux/Unix-based Jenkins agents

---

## Pipeline Stages

### 1. **Checkout**
- Checks out code from Git repository

### 2. **Install Dependencies**
- Installs npm packages for host, shared, and remote modules
- Uses `npm ci` for clean, reproducible installs

### 3. **Lint & Type Check** (Parallel)
- Type checks TypeScript code
- Ready for ESLint when configured

### 4. **Run Tests** ⭐
- Executes all unit tests
- Generates coverage reports in multiple formats:
  - **JUnit XML** (`coverage/junit.xml`) - For test results
  - **Cobertura XML** (`coverage/cobertura-coverage.xml`) - For coverage metrics
  - **LCOV** (`coverage/lcov.info`) - For detailed coverage
  - **HTML** (`coverage/index.html`) - For visual coverage report

### 5. **Build** (Parallel)
- Builds host, shared, and remote applications

### 6. **Archive Artifacts**
- Archives build outputs for deployment

### 7. **Quality Gate**
- Validates coverage thresholds
- Can fail build if quality standards not met

---

## Test Reports in Jenkins

After pipeline execution, you'll see:

### 1. **Test Results Trend**
- Graph showing pass/fail trends over time
- Click on build → **Test Results**

### 2. **Code Coverage Report**
- Visual HTML coverage report
- Click on build → **Test Coverage Report**

### 3. **Coverage Metrics**
- Cobertura coverage plugin shows:
  - Line coverage
  - Branch coverage
  - Method coverage
  - Package-level breakdown

---

## Setting Up Jenkins Job

### Method 1: Pipeline from SCM

1. **Create New Item:**
   - Name: `MFE_SharedRemote_Tests`
   - Type: Pipeline

2. **Configure Pipeline:**
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: `https://github.com/saikumarchikkalavari/MFE_Shared_Remote.git`
   - Branch: `*/main`
   - Script Path: 
     - Windows: `Jenkinsfile`
     - Linux: `Jenkinsfile.linux`

3. **Save and Build**

### Method 2: Multibranch Pipeline

1. **Create Multibranch Pipeline**
2. **Add Git source**
3. **Jenkins will auto-detect Jenkinsfile**

---

## Running Tests Locally (CI Mode)

Test the CI configuration locally before pushing to Jenkins:

```bash
# Navigate to host directory
cd host

# Install jest-junit
npm install

# Run tests in CI mode
npm run test:ci

# Run tests with full reports
npm run test:ci:report

# Check generated reports
ls coverage/
```

**Expected Output:**
```
coverage/
├── cobertura-coverage.xml   # For Jenkins coverage plugin
├── junit.xml                 # For Jenkins test results
├── lcov.info                 # LCOV coverage data
├── lcov-report/              # HTML coverage report
│   └── index.html
└── index.html                # Main coverage report
```

---

## Troubleshooting

### Issue 1: Tests Fail in Jenkins but Pass Locally

**Solution:**
- Ensure `NODE_ENV=test` is set
- Check node version matches local environment
- Review test timeout settings

### Issue 2: Coverage Reports Not Generated

**Solution:**
- Verify `jest-junit` is installed
- Check file permissions in Jenkins workspace
- Ensure coverage directory exists

### Issue 3: Build Times Out

**Solution:**
- Increase timeout in `options` section
- Reduce `maxWorkers` in test:ci script
- Check for hanging tests

### Issue 4: Node/NPM Not Found

**Solution:**
- Configure NodeJS in Global Tool Configuration
- Ensure tool name matches Jenkinsfile (`NodeJS-18`)
- Restart Jenkins after configuration changes

---

## Coverage Thresholds

Current thresholds (can be adjusted in `jest.config.js`):

```javascript
coverageThreshold: {
  global: {
    branches: 50,    // 50% branch coverage
    functions: 50,   // 50% function coverage
    lines: 50,       // 50% line coverage
    statements: 50   // 50% statement coverage
  }
}
```

**If tests fail to meet thresholds:**
- Jest will exit with error code
- Jenkins build will fail
- Coverage report will show gaps

---

## Best Practices

### 1. Run Tests Before Pushing
```bash
npm run test:ci
```

### 2. Check Coverage Locally
```bash
npm run test:coverage
open coverage/index.html  # macOS/Linux
start coverage/index.html # Windows
```

### 3. Keep Tests Fast
- Use `--maxWorkers=2` in CI
- Mock external dependencies
- Avoid network calls

### 4. Monitor Trends
- Track test count over time
- Watch for decreasing coverage
- Fix flaky tests immediately

---

## Jenkins Pipeline Notifications (Optional)

Add to `post` section in Jenkinsfile:

```groovy
post {
    success {
        emailext(
            subject: "✅ Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "All tests passed! Coverage report available at: ${env.BUILD_URL}Test_Coverage_Report/",
            recipientProviders: [developers(), requestor()]
        )
    }
    failure {
        emailext(
            subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Tests failed. Check: ${env.BUILD_URL}console",
            recipientProviders: [developers(), requestor()]
        )
    }
}
```

---

## Integration with Other Tools

### SonarQube Integration
Add to Jenkinsfile after tests:
```groovy
stage('SonarQube Analysis') {
    steps {
        script {
            def scannerHome = tool 'SonarScanner'
            withSonarQubeEnv('SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }
    }
}
```

### Slack Notifications
```groovy
post {
    always {
        slackSend(
            channel: '#builds',
            message: "Build ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        )
    }
}
```

---

## Summary

✅ **Tests are CI-ready with:**
- JUnit XML reports for test results
- Cobertura XML for coverage metrics  
- HTML reports for visualization
- Proper exit codes for pass/fail
- Optimized for headless execution
- Parallel execution support
- Coverage thresholds enforcement

✅ **Jenkinsfile provides:**
- Complete CI/CD pipeline
- Parallel builds
- Artifact archival
- Quality gates
- Cleanup after execution

✅ **What happens when you push to GitHub:**
1. Jenkins detects changes
2. Checks out code
3. Installs dependencies
4. Runs all 73 tests
5. Generates coverage reports
6. Publishes results to Jenkins UI
7. Archives build artifacts
8. Sends notifications (if configured)

---

## Next Steps

1. **Install jest-junit:**
   ```bash
   cd host
   npm install
   ```

2. **Test CI scripts locally:**
   ```bash
   npm run test:ci:report
   ```

3. **Set up Jenkins job** using provided Jenkinsfile

4. **Configure webhooks** in GitHub to trigger builds

5. **Monitor first build** and adjust as needed

---

**Last Updated:** January 29, 2026  
**Project:** MFE_SharedRemote  
**Test Count:** 73 passing tests (Button: 28, DateSelector: 34, DataGrid: 11)
