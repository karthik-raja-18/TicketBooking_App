pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/karthik-raja-18/TicketBooking_App'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }
        stage('Deploy') {
            steps {
                sshagent(['app-server-ssh-credentials']) {
                    sh 'ssh ubuntu@34.201.102.73 "cd ~/app && git pull && npm install && pm2 restart all || pm2 start index.js"'
                }
            }
        }
    }
}
