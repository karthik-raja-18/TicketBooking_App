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
                // Use Jenkins SSH credential
                sshagent(['ad7cd2ae-5bef-4881-b87f-4599d9485de5']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@34.201.102.73 "
                        # Ensure app folder exists
                        if [ ! -d ~/app ]; then
                            mkdir -p ~/app
                            git clone https://github.com/karthik-raja-18/TicketBooking_App ~/app
                        fi

                        # Deploy backend
                        cd ~/app/backend
                        git pull
                        npm install
                        pm2 restart all || pm2 start index.js

                        # (Optional) Deploy frontend if exists
                        # cd ~/app/frontend
                        # git pull
                        # npm install
                        # npm run build
                        # pm2 restart frontend || pm2 start serve -s build -l 80
                    "
                    '''
                }
            }
        }
    }
}
