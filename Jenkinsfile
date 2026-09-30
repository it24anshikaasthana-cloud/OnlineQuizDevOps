pipeline {

    agent any

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

                powershell '''
                    $app = Start-Process `
                        -FilePath "java" `
                        -ArgumentList @(
                            "-jar",
                            "target\\online-quiz-devops-1.0.0.jar",
                            "--server.port=8081"
                        ) `
                        -PassThru

                    try {

                        Write-Host "Starting application..."

                        $ready = $false

                        for ($i = 0; $i -lt 30; $i++) {

                            try {

                                Invoke-WebRequest `
                                    -Uri "http://localhost:8081" `
                                    -UseBasicParsing `
                                    -TimeoutSec 2 | Out-Null

                                $ready = $true

                                Write-Host "Application is running."

                                break

                            } catch {

                                Start-Sleep -Seconds 1
                            }
                        }

                        if (-not $ready) {
                            throw "Application did not start on port 8081."
                        }

                        Write-Host "Running Selenium tests..."

                        mvn test "-Dapp.url=http://localhost:8081"

                        if ($LASTEXITCODE -ne 0) {
                            exit $LASTEXITCODE
                        }

                    }
                    finally {

                        Write-Host "Stopping test application..."

                        Stop-Process `
                            -Id $app.Id `
                            -Force `
                            -ErrorAction SilentlyContinue
                    }
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

                powershell '''
                    Write-Host "Checking deployed application..."

                    $ok = $false

                    for ($i = 0; $i -lt 30; $i++) {

                        try {

                            $response = Invoke-WebRequest `
                                -Uri "http://localhost:8081" `
                                -UseBasicParsing `
                                -TimeoutSec 2

                            if ($response.StatusCode -eq 200) {

                                $ok = $true

                                Write-Host "Application is running successfully."

                                break
                            }

                        } catch {

                            Start-Sleep -Seconds 1
                        }
                    }

                    if (-not $ok) {
                        throw "Application is not responding on port 8081."
                    }
                '''
            }
        }
    }

    post {

        always {

            junit testResults:
                'target/surefire-reports/*.xml',
                allowEmptyResults: true
        }

        success {

            echo 'DEVOPS PIPELINE COMPLETED SUCCESSFULLY'
        }

        failure {

            echo 'DEVOPS PIPELINE FAILED - CHECK CONSOLE OUTPUT'
        }
    }
}
