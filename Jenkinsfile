pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/PedroPivato/exercicio-api-usuarios.git'
            }
        }
                stage('Instalar dependencias') {
            steps {
               powershell 'npm install'
            }
        }
                stage('Subir ServeRest') {
            steps {
               powershell 'npm run cy:run-ci'
            }
        }

    }