pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/PedroPivato/exercicio-api-usuarios.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Subir ServeRest e Executar testes') {
            steps {
                bat 'set NO_COLOR=1 && npm run cy:run-ci'
            }
        }
    }
}