pipeline {
    agent any

    environment {
        DOCKER_PATH = 'C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin'
        DOCKER_IMAGE = 'anshikaasthana/online-quiz:1.0'
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

        stage('Docker Check') {
            steps {
                echo 'Checking Docker installation...'
                bat """
                    if not exist "%DOCKER_PATH%\\docker.exe" (
                        echo ERROR: docker.exe was not found.
                        exit /b 1
                    )

                    set "PATH=%DOCKER_PATH%;%PATH%"
                    docker --version
                """
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat """
                    set "PATH=%DOCKER_PATH%;%PATH%"
                    docker build -t %DOCKER_IMAGE% .
                """
            }
        }

        stage('Docker Login & Push') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    bat """
                        set "PATH=%DOCKER_PATH%;%PATH%"
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                        docker push %DOCKER_IMAGE%
                        docker logout
                    """
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container...'
                bat """
                    set "PATH=%DOCKER_PATH%;%PATH%"
                    docker rm -f online-quiz 2>nul
                    docker run -d --name online-quiz -p 8080:8080 %DOCKER_IMAGE%
                """
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying application container...'
                bat """
                    set "PATH=%DOCKER_PATH%;%PATH%"
                    timeout /t 10 /nobreak >nul
                    docker ps --filter "name=online-quiz"
                """
            }
        }
    }

    post {
        success {
            echo '=========================================='
            echo 'PIPELINE EXECUTED SUCCESSFULLY'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'PIPELINE FAILED'
            echo 'Check Console Output'
            echo '=========================================='
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
