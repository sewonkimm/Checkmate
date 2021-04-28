pipeline {
    agent none 
    options { skipDefaultCheckout(true)}
    stages {
        stage('git pull') {
            agent any 
            steps {
                checkout scm
            }
        }
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t frontend:latest ./frontend'
				sh 'docker build -t backend:latest ./backend'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=frontend -q \
        | xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=backend -q \
		| xargs --no-run-if-empty docker container stop'

                sh 'docker container ls -a -f name=frontend -q \
        | xargs -r docker container rm'
				sh 'docker container ls -a -f name=backend -q \
		| xargs -r docker container rm'

                sh 'docker run -d --name backend \
                -p 8197:8197 \
                -v /home/ubuntu/files/:/files \
                --network checkmate backend:latest'
                sh 'docker run -d --name frontend \
                -p 80:80 \
                -p 443:443 \
                -v /home/ubuntu/sslkey/:/var/jenkins_home/workspace/jenkins_test/sslkey/ \
                --network checkmate \
                frontend:latest'
            }
        }
    }
}
