pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "jenkins_ci_app"
        VITE_API = "http://13.127.156.48:3000"   // ✅ Update with your backend endpoint
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                echo '📦 Cloning repository...'
                git branch: 'main', url: 'https://github.com/Baansheeee/Assm3.git'
            }
        }

        stage('Clean Previous Containers') {
            steps {
                echo '🧹 Cleaning old containers and volumes...'
                sh '''
                    docker ps -aq --filter name=_ci | xargs -r docker rm -f || true
                    docker compose --file docker-compose.yml down --volumes --remove-orphans || true
                    docker system prune -af || true
                    docker volume prune -f || true
                '''
            }
        }

        stage('Build and Run Application') {
            steps {
                echo '🚀 Building and starting frontend/backend containers...'
                sh '''
                    export VITE_API=${VITE_API}
                    docker compose --file docker-compose.yml build --no-cache
                    docker compose --file docker-compose.yml up -d
                    sleep 15  # wait for services to be ready
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                echo '🔍 Listing running containers...'
                sh 'docker ps'
            }
        }

        stage('Application Health Check') {
            steps {
                echo '🩺 Checking if backend and frontend are accessible...'
                sh '''
                    for i in {1..12}; do
                        if curl -s http://localhost:4000 >/dev/null 2>&1; then
                            echo "✅ Backend is responding"
                            break
                        else
                            echo "⏳ Waiting for backend... ($i/12)"
                            sleep 5
                        fi
                    done

                    for i in {1..12}; do
                        if curl -s http://localhost:8085 >/dev/null 2>&1; then
                            echo "✅ Frontend is responding"
                            break
                        else
                            echo "⏳ Waiting for frontend... ($i/12)"
                            sleep 5
                        fi
                    done
                '''
            }
        }

        stage('Build Test Image') {
            steps {
                echo '🧪 Building Selenium test Docker image...'
                sh '''
                    docker build -t selenium_tests ./part1-tests
                '''
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo '🏃 Running Selenium tests...'
                sh '''
                    docker run --rm --network host selenium_tests
                '''
            }
        }

        stage('Publish Test Results') {
            steps {
                echo '📊 Publishing JUnit test results...'
                junit 'part1-tests/results.xml'
            }
        }
    }

    post {
        always {
            script {
                echo '🛑 Shutting down application containers...'
                sh 'docker compose --file docker-compose.yml down || true'

                echo '📧 Preparing email report...'
                sh 'git config --global --add safe.directory ${env.WORKSPACE}'
                def committer = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()

                def raw = sh(script: "grep -h '<testcase' part1-tests/results.xml || true", returnStdout: true).trim()

                int total = 0
                int passed = 0
                int failed = 0
                int skipped = 0
                def details = ""

                raw.split('\\n').each { line ->
                    line = line.trim()
                    if (!line) return

                    total++
                    def name = (line =~ /name="([^"]+)"/)[0][1]

                    if (line.contains("<failure")) {
                        failed++
                        details += "${name} — FAILED\\n"
                    } else if (line.contains("<skipped") || line.contains("</skipped>")) {
                        skipped++
                        details += "${name} — SKIPPED\\n"
                    } else {
                        passed++
                        details += "${name} — PASSED\\n"
                    }
                }

                def emailBody = """
Test Summary (Build #${env.BUILD_NUMBER})

Total Tests:   ${total}
Passed:        ${passed}
Failed:        ${failed}
Skipped:       ${skipped}

Detailed Results:
${details}
"""

                emailext(
                    to: committer,
                    subject: "Build #${env.BUILD_NUMBER} Test Results",
                    body: emailBody
                )
            }
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check Jenkins logs and email report.'
        }
    }
}
