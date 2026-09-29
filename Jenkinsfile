pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "anshikaasthana/online-quiz:1.0"
        DOCKER_EXE = "C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                bat 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'mvn test'
            }
        }

        stage('Package') {
            steps {
                echo 'Creating JAR file...'
                bat 'mvn package -DskipTests'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                bat """
                "${DOCKER_EXE}" --version
                "${DOCKER_EXE}" build -t ${DOCKER_IMAGE} .
                """
            }
        }

        stage('Docker Login & Push') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    bat """
                    echo %DOCKER_TOKEN% | "${DOCKER_EXE}" login -u %DOCKER_USER% --password-stdin
                    "${DOCKER_EXE}" push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container...'

                bat """
                "${DOCKER_EXE}" rm -f online-quiz-container
                "${DOCKER_EXE}" run -d --name online-quiz-container -p 8082:8081 ${DOCKER_IMAGE}
                """
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying application...'

                bat """
                timeout /t 10 /nobreak
                curl -I http://localhost:8082
                """
            }
        }
    }

    post {
        success {
            echo '''
            ==========================================
            PIPELINE SUCCESS
            Online Quiz Docker Deployment Completed
            ==========================================
            '''
        }

        failure {
            echo '''
            ==========================================
            PIPELINE FAILED
            Check Console Output
            ==========================================
            '''
        }
    }
}