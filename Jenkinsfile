pipeline {

    agent any

    environment {
        DOCKER_EXE = 'C:\\Users\\Anshika\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
        IMAGE_NAME = 'anshikaasthana/online-quiz:1.0'
        CONTAINER_NAME = 'online-quiz-container'
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
                echo 'Building Spring Boot application...'
                bat 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Selenium tests...'
                bat 'mvn test'
            }
        }

        stage('Docker Check') {
            steps {
                echo 'Checking Docker...'
                bat '"%DOCKER_EXE%" --version'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat '"%DOCKER_EXE%" build -t %IMAGE_NAME% .'
            }
        }

        stage('Docker Login & Push') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat 'echo %DOCKER_PASSWORD% | "%DOCKER_EXE%" login -u %DOCKER_USERNAME% --password-stdin'

                    bat '"%DOCKER_EXE%" push %IMAGE_NAME%'
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Starting Docker container...'

                bat '"%DOCKER_EXE%" rm -f %CONTAINER_NAME% 2>NUL || exit /B 0'

                bat '"%DOCKER_EXE%" run -d --name %CONTAINER_NAME% -p 8081:8081 %IMAGE_NAME%'
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying application...'

                bat 'timeout /t 10 /nobreak'

                bat 'curl -f http://localhost:8081/'

                echo '=========================================='
                echo 'ONLINE QUIZ APPLICATION IS RUNNING'
                echo 'http://localhost:8081'
                echo '=========================================='
            }
        }
    }

    post {
        success {
            echo '=========================================='
            echo 'PIPELINE SUCCESS'
            echo 'Docker image built and pushed successfully.'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'PIPELINE FAILED'
            echo 'Check the Console Output.'
            echo '=========================================='
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}