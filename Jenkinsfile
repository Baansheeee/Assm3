pipeline {
    agent any

    environment {
        WORKSPACE = "${env.WORKSPACE}"
        VITE_API = "http://13.127.156.48:3000"
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                echo '📦 Cloning repository...'
                git url: 'https://github.com/Baansheeee/Assm3.git', branch: 'main'
            }
        }

        stage('Clean Previous Containers') {
            steps {
                echo '🧹 Cleaning old containers and volumes...'
                sh '''
                    docker ps -aq --filter name=_ci | xargs -r docker rm -f
                    docker-compose down --volumes --remove-orphans || true
                    docker system prune -af
                    docker volume prune -f
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
                        curl -s http://localhost:4000 && break || echo "Waiting for backend... ($i/12)"
                        sleep 5
                    done
                    for i in {1..12}; do
                        curl -s http://localhost:8085 && break || echo "Waiting for frontend... ($i/12)"
                        sleep 5
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
                    docker run --rm -v ${WORKSPACE}/part1-tests:/tests --network host selenium/standalone-chrome \
                        bash -c "pip install pytest && pytest /tests/tests --junitxml=/tests/results.xml -v"
                '''
            }
        }

        stage('Publish Test Results') {
            steps {
                echo '📊 Publishing test results...'
                junit 'part1-tests/results.xml'
            }
        }
    }

    post {
        always {
            echo '🛑 Shutting down application containers...'
            sh 'docker-compose down || true'
        }
        failure {
            echo '❌ Pipeline failed. Check Jenkins logs and email report.'
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
    }
}
