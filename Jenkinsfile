pipeline {

    agent any

    environment {
        DOCKER = 'C:\\Users\\Anshika\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
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
                echo 'Building project...'
                bat 'mvn clean compile'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging Spring Boot application...'
                bat 'mvn package -DskipTests'
            }
        }

        stage('Selenium Test') {
            steps {
                echo 'Running Selenium tests...'
                bat 'mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat '"%DOCKER%" build -t anshikaasthana/online-quiz:1.0 .'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image...'
                bat '"%DOCKER%" push anshikaasthana/online-quiz:1.0'
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container...'
                bat '"%DOCKER%" stop online-quiz-container || exit /b 0'
                bat '"%DOCKER%" rm online-quiz-container || exit /b 0'
                bat '"%DOCKER%" run -d --name online-quiz-container -p 8081:8081 anshikaasthana/online-quiz:1.0'
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying Docker container...'
                bat '"%DOCKER%" ps'
            }
        }
    }

    post {

        success {
            echo '========================================'
            echo 'PIPELINE COMPLETED SUCCESSFULLY'
            echo '========================================'
        }

        failure {
            echo '========================================'
            echo 'PIPELINE FAILED - CHECK CONSOLE OUTPUT'
            echo '========================================'
        }
    }
}