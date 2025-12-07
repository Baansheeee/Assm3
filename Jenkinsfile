pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "jenkins_ci_app"
        VITE_API = "http://13.127.156.48:3000"  // Backend API endpoint for frontend
        TEST_IMAGE = "part1-tests:latest"
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                echo '📦 Cloning repository...'
                git branch: 'main', url: 'https://github.com/Baansheeee/Assm3.git'
            }
        }

        stage('Set Up Docker Environment') {
            steps {
                echo '⚙️ Checking Docker and Docker Compose...'
                sh '''
                    docker --version
                    if docker compose version >/dev/null 2>&1; then
                        echo "✅ Docker Compose v2 detected"
                    else
                        echo "⚠️ Installing Docker Compose plugin..."
                        apt-get update -y && apt-get install -y docker-compose-plugin
                    fi
                    docker compose version
                '''
            }
        }

        stage('Clean Previous Containers') {
            steps {
                echo '🧹 Cleaning up old containers and volumes...'
                sh '''
                    docker ps -aq --filter "name=_ci" | xargs -r docker rm -f || true
                    docker compose down --volumes --remove-orphans || true
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
                    docker compose build --no-cache
                    docker compose up -d
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
                echo '🩺 Waiting for backend and frontend to be accessible...'
                sh '''
                    for i in {1..12}; do
                        if curl -s http://localhost:4000 >/dev/null 2>&1; then
                            echo "✅ Backend is live"
                            break
                        else
                            echo "⏳ Waiting for backend... ($i/12)"
                            sleep 5
                        fi
                    done

                    for i in {1..12}; do
                        if curl -s http://localhost:8085 >/dev/null 2>&1; then
                            echo "✅ Frontend is live"
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
                echo '🐳 Building Selenium test image...'
                dir('part1-tests') {
                    sh 'docker build -t ${TEST_IMAGE} .'
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                echo '🧪 Running Selenium tests...'
                sh "docker run --rm --network=host -v ${WORKSPACE}/part1-tests:/app ${TEST_IMAGE}"
            }
        }

        stage('Publish Test Results') {
            steps {
                junit 'part1-tests/results.xml'
            }
        }
    }

    post {
        always {
            script {
                echo '🛑 Shutting down application containers...'
                sh 'docker compose down || true'

                echo '📧 Preparing email report...'

                // Get committer email
                sh 'git config --global --add safe.directory ${WORKSPACE}'
                def committer = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()

                // Parse pytest JUnit XML
                def raw = sh(script: "grep -h '<testcase' part1-tests/results.xml || true", returnStdout: true).trim()
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

        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check Jenkins logs and email report.'
        }
    }
}
