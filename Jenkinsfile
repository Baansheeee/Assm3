pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "jenkins_ci_app"
        VITE_API = "http://13.127.156.48:3000" // Replace with your backend API endpoint
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
                    echo "🔍 Removing existing CI containers if any..."
                    docker ps -aq --filter name=_ci | xargs -r docker rm -f || true

                    echo "🔍 Bringing down any docker-compose project..."
                    docker-compose down --volumes --remove-orphans || true

                    echo "🧼 Pruning unused images, networks, and volumes..."
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

                    docker-compose build --no-cache
                    docker-compose up -d
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
                    echo "⏳ Waiting up to 60s for backend and frontend to respond..."
                    for i in {1..12}; do
                      if curl -s http://localhost:4000 >/dev/null 2>&1; then
                        echo "✅ Backend is responding on port 4000"
                        break
                      else
                        echo "⏳ Waiting for backend... ($i/12)"
                        sleep 5
                      fi
                    done

                    for i in {1..12}; do
                      if curl -s http://localhost:8085 >/dev/null 2>&1; then
                        echo "✅ Frontend is responding on port 8085"
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
                echo '🐍 Building Selenium test image...'
                sh '''
                    docker build -t part1-tests-image ./part1-tests
                '''
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo '🧪 Running Selenium tests...'
                sh '''
                    docker run --rm --network host part1-tests-image
                '''
            }
        }

        stage('Publish Test Results') {
            steps {
                echo '📄 Publishing test results...'
                junit 'part1-tests/results.xml'
            }
        }
    }

    post {
        always {
            script {
                echo '🛑 Shutting down application containers...'
                sh 'docker-compose down || true'

                echo '📧 Preparing email report...'
                sh "git config --global --add safe.directory ${env.WORKSPACE}"
                def committer = sh(
                    script: "git log -1 --pretty=format:'%ae'",
                    returnStdout: true
                ).trim()

                // Parse pytest JUnit XML
                def raw = sh(
                    script: "grep -h '<testcase' part1-tests/results.xml || true",
                    returnStdout: true
                ).trim()

                int total = 0
                int passed = 0
                int failed = 0
                int skipped = 0
                def details = ""

                raw.split('\n').each { line ->
                    line = line.trim()
                    if (!line) return

                    total++
                    def name = (line =~ /name="([^"]+)"/)[0][1]

                    if (line.contains("<failure")) {
                        failed++
                        details += "${name} — FAILED\n"
                    } else if (line.contains("<skipped") || line.contains("</skipped>")) {
                        skipped++
                        details += "${name} — SKIPPED\n"
                    } else {
                        passed++
                        details += "${name} — PASSED\n"
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
    }
}
