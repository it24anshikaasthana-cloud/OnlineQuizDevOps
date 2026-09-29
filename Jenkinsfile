pipeline {

    agent any

    environment {
        DOCKER_PATH = 'C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building Online Quiz Application...'
                bat 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Maven Tests...'
                bat 'mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                bat '''
                set "PATH=%DOCKER_PATH%;%PATH%"
                docker --version
                docker build -t anshikaasthana/online-quiz:1.0 .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Logging in to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    bat '''
                    set "PATH=%DOCKER_PATH%;%PATH%"

                    echo %DOCKER_TOKEN% | docker login -u %DOCKER_USERNAME% --password-stdin

                    docker push anshikaasthana/online-quiz:1.0
                    '''
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Starting Online Quiz Docker container...'

                bat '''
                set "PATH=%DOCKER_PATH%;%PATH%"

                docker rm -f online-quiz-container 2>nul

                docker run -d --name online-quiz-container -p 8081:8081 anshikaastana/online-quiz:1.0
                '''
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying application...'

                bat '''
                timeout /t 10 /nobreak
                curl -I http://localhost:8081
                '''
            }
        }
    }

    post {
        success {
            echo '''
========================================
PIPELINE SUCCESSFUL!
Online Quiz application deployed.
Docker image pushed successfully.
========================================
'''
        }

        failure {
            echo '''
========================================
PIPELINE FAILED
Check the Console Output.
========================================
'''
        }
    }
}