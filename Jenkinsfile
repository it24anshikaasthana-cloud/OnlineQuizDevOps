stage('Docker Push') {
    steps {
        echo 'Logging in to Docker Hub...'

        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )
        ]) {
            bat '''
                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                docker push anshikaasthana/online-quiz:1.0
            '''
        }
    }
}