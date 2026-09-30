pipeline {

    agent any

    tools {
        maven 'Maven-3.9.16'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean compile'
            }
        }

        stage('Package') {
            steps {
                bat 'mvn package -DskipTests'
            }
        }

        stage('Selenium Test') {
            steps {
                bat '''
                    echo Starting Online Quiz application...

                    start "OnlineQuizApp" /B java -jar target\\online-quiz-devops-1.0.0.jar --server.port=8081

                    echo Waiting for application...

                    :waitloop
                    curl -s http://localhost:8081 > nul

                    if %ERRORLEVEL% EQU 0 goto appready

                    timeout /t 1 /nobreak > nul
                    goto waitloop

                    :appready
                    echo Application is ready!

                    echo Running Selenium tests...

                    mvn -q test "-Dapp.url=http://localhost:8081"

                    if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

                    echo Selenium tests completed successfully.
                '''
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t online-quiz:%BUILD_NUMBER% .'
            }
        }

        stage('Docker Push') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat 'echo %DOCKER_PASSWORD%| docker login -u %DOCKER_USERNAME% --password-stdin'

                    bat 'docker tag online-quiz:%BUILD_NUMBER% %DOCKER_USERNAME%/online-quiz:%BUILD_NUMBER%'

                    bat 'docker push %DOCKER_USERNAME%/online-quiz:%BUILD_NUMBER%'

                    bat 'docker logout'
                }
            }
        }

        stage('Deploy') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat 'docker pull %DOCKER_USERNAME%/online-quiz:%BUILD_NUMBER%'

                    bat 'docker rm -f online-quiz-app 2>nul || exit /b 0'

                    bat 'docker run -d --name online-quiz-app -p 8081:8080 %DOCKER_USERNAME%/online-quiz:%BUILD_NUMBER%'
                }
            }
        }

        stage('Verify') {
            steps {
                bat '''
                    echo Checking deployed application...

                    timeout /t 5 /nobreak > nul

                    curl -f http://localhost:8081

                    if %ERRORLEVEL% NEQ 0 (
                        echo Application verification failed.
                        exit /b 1
                    )

                    echo Application is running successfully.
                '''
            }
        }
    }

    post {

        always {
            junit(
                testResults: 'target/surefire-reports/*.xml',
                allowEmptyResults: true
            )
        }

        success {
            echo '=============================================='
            echo 'DEVOPS PIPELINE COMPLETED SUCCESSFULLY'
            echo '=============================================='
        }

        failure {
            echo '=============================================='
            echo 'DEVOPS PIPELINE FAILED - CHECK CONSOLE OUTPUT'
            echo '=============================================='
        }
    }
}