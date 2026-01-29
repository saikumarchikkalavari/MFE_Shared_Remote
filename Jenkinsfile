pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18' // Configure this in Jenkins Global Tool Configuration
    }
    
    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies - Host') {
            steps {
                dir('host') {
                    echo 'Installing Host dependencies...'
                    bat 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Shared') {
            steps {
                dir('shared') {
                    echo 'Installing Shared dependencies...'
                    bat 'npm ci'
                }
            }
        }
        
        stage('Install Dependencies - Remote') {
            steps {
                dir('remote') {
                    echo 'Installing Remote dependencies...'
                    bat 'npm ci'
                }
            }
        }
        
        stage('Lint & Type Check') {
            parallel {
                stage('Lint Host') {
                    steps {
                        dir('host') {
                            echo 'Linting Host...'
                            // Uncomment when eslint is configured
                            // bat 'npm run lint'
                        }
                    }
                }
                stage('Type Check Host') {
                    steps {
                        dir('host') {
                            echo 'Type checking Host...'
                            bat 'npx tsc --noEmit'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                dir('host') {
                    echo 'Running unit tests...'
                    bat 'npm run test:ci:report'
                }
            }
            post {
                always {
                    // Publish test results
                    junit(
                        allowEmptyResults: true,
                        testResults: 'host/coverage/junit.xml'
                    )
                    
                    // Publish coverage reports
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'host/coverage',
                        reportFiles: 'index.html',
                        reportName: 'Test Coverage Report',
                        reportTitles: 'Coverage Report'
                    ])
                    
                    // Publish Cobertura coverage
                    publishCoverage(
                        adapters: [
                            coberturaAdapter('host/coverage/cobertura-coverage.xml')
                        ],
                        sourceFileResolver: sourceFiles('STORE_ALL_BUILD')
                    )
                }
            }
        }
        
        stage('Build') {
            parallel {
                stage('Build Host') {
                    steps {
                        dir('host') {
                            echo 'Building Host application...'
                            bat 'npm run build'
                        }
                    }
                }
                stage('Build Shared') {
                    steps {
                        dir('shared') {
                            echo 'Building Shared library...'
                            bat 'npm run build'
                        }
                    }
                }
                stage('Build Remote') {
                    steps {
                        dir('remote') {
                            echo 'Building Remote application...'
                            bat 'npm run build'
                        }
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts(
                    artifacts: '**/dist/**/*',
                    fingerprint: true,
                    allowEmptyArchive: true
                )
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    echo 'Checking quality gate...'
                    // Add quality gate checks here
                    // Example: Check if test coverage meets threshold
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed.'
            cleanWs(
                deleteDirs: true,
                patterns: [
                    [pattern: 'node_modules/**', type: 'INCLUDE'],
                    [pattern: '.npm/**', type: 'INCLUDE']
                ]
            )
        }
        success {
            echo 'Build succeeded!'
            // Add notifications (email, Slack, etc.)
        }
        failure {
            echo 'Build failed!'
            // Add failure notifications
        }
        unstable {
            echo 'Build is unstable!'
        }
    }
}
