pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "anshikaasthana/online-quiz:1.0"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Spring Boot application...'
                bat 'mvn clean compile'
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
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                    bat 'docker push %DOCKER_IMAGE%'
                }
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo 'ONLINE QUIZ DEVOPS PIPELINE SUCCESS'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'PIPELINE FAILED - CHECK CONSOLE OUTPUT'
            echo '======================================'
        }
    }
}