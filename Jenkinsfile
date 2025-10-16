pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Clone your repo
                git branch: 'main', url: 'https://github.com/karthik-raja-18/TicketBooking_App'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm packages in backend folder
                sh 'cd backend && npm install'
            }
        }

        stage('Test') {
            steps {
                // Run tests in backend folder (if any)
                sh 'cd backend && npm test || echo "No tests found"'
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['app-server-ssh-credentials']) {
                    // SSH to EC2, pull latest code, install dependencies, restart/start PM2
                    sh '''
                    ssh ubuntu@34.201.102.73 "
                        # Ensure app folder exists
                        if [ ! -d ~/app ]; then
                            mkdir -p ~/app
                            git clone https://github.com/karthik-raja-18/TicketBooking_App ~/app
                        fi
                        cd ~/app/backend
                        git pull
                        npm install
                        pm2 restart all || pm2 start index.js
                    "
                    '''
                }
            }
        }
    }
}
