pipeline {

    agent any

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
                bat '"C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe" build -t anshikaasthana/online-quiz:1.0 .'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {

                    bat '''
                    echo %DOCKER_TOKEN% | "C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe" login -u %DOCKER_USERNAME% --password-stdin
                    "C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe" push anshikaasthana/online-quiz:1.0
                    '''
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Running Docker container...'

                bat '''
                "C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe" rm -f online-quiz-container 2>nul
                "C:\\Users\\Anshika\\AppData\\Local\\Programs\\Docker\\DockerDesktop\\resources\\bin\\docker.exe" run -d --name online-quiz-container -p 8081:8081 anshikaasthana/online-quiz:1.0
                '''
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying Online Quiz Application...'

                bat '''
                timeout /t 10 /nobreak
                curl -I http://localhost:8081
                '''
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo 'PIPELINE SUCCESSFUL!'
            echo 'Online Quiz Docker image pushed.'
            echo 'Application is running on port 8081.'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'PIPELINE FAILED - CHECK CONSOLE OUTPUT'
            echo '======================================'
        }
    }
}