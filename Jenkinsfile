pipeline {
    agent any
    environment {
        // Docker-Konfiguration
        DOCKER_PATH = "/usr/local/bin/docker"
        DOCKER_USERNAME = 'leopetersberg'
        DOCKER_PASSWORD = credentials('DockerHubPasswortCredentialId')
        IMAGE_NAME = 'leopetersberg/counterfrontend'
        GIT_COMMIT_HASH = '' // Wird später festgelegt
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm // Holt den neuesten Code aus dem SCM (z.B. Git)
                script {
                    GIT_COMMIT_HASH = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    echo "Git Commit Hash: ${GIT_COMMIT_HASH}"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Baut das Docker-Image mit dem aktuellen Tag (z.B. 'latest')
                    sh "${DOCKER_PATH} build -t ${IMAGE_NAME}:${GIT_COMMIT_HASH} ."
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                script {
                    // Loggt sich bei Docker Hub ein
                    sh "${DOCKER_PATH} login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                }
            }
        }
        stage('Push Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                script {
                // Lädt das gebaute Image zu Docker Hub hoch
                sh "${DOCKER_PATH} push ${IMAGE_NAME}:${GIT_COMMIT_HASH}"
                }
            }
        }
        stage('Logout from Docker Hub') {
            steps {
                echo 'Logging out from Docker Hub...'
                script {
                    // Loggt sich von Docker Hub aus
                    sh "${DOCKER_PATH} logout"
                }
            }
        }
        stage('Update GitOps Repository') {
        steps {
            echo 'Authenticating to GitHub and updating GitOps repository with new Docker image tag...'
            script {
                // Entferne das Verzeichnis, falls es bereits existiert
                sh 'rm -rf CounterGitOps'
                // Klone das GitOps Repository, verwende das Token für die Authentifizierung
                sh "git clone https://leopetersberg:${GITHUB_TOKEN}@github.com/leopetersberg/CounterGitOps.git"
                dir('CounterGitOps') {
                    // Aktualisiere das Docker-Compose-File mit dem neuen Image-Tag
                    sh "sed -i '' 's|leopetersberg/counterfrontend:.*|leopetersberg/counterfrontend:${GIT_COMMIT_HASH}|' docker-compose.yaml"

                    sh "cat docker-compose.yaml"

                    // Füge Änderungen hinzu und committe sie
                    sh "git add docker-compose.yaml"
                    sh "git config user.email 'jenkins@example.com'"
                    sh "git config user.name 'Jenkins CI'"
                    sh "git commit -m 'Update frontend image tag to ${GIT_COMMIT_HASH}'"
                    // Push Änderungen zurück zum Repository unter Verwendung des Tokens
                    sh "git push https://${GITHUB_TOKEN}@github.com/leopetersberg/CounterGitOps.git master"
                }
            }
        }}
    }
    post {
        always {
            // Wird nach jeder Ausführung der Pipeline durchgeführt, unabhängig vom Ergebnis
            echo 'Cleaning up...'
        }
        success {
            // Nur bei erfolgreichem Durchlauf
            echo 'Build and push to Docker Hub succeeded.'
        }
        failure {
            // Nur wenn ein Fehler auftritt
            echo 'Build or push to Docker Hub failed.'
        }
    }
}