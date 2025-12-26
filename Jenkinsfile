pipeline {
    agent any
    
    environment {
        DOCKERHUB_USERNAME = 'yug02'
        DOCKERHUB_REGISTRY = 'docker.io'
        
        // Image names
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/quantedge-backend:latest"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/quantedge-frontend:latest"
        DASHBOARD_IMAGE = "${DOCKERHUB_USERNAME}/quantedge-dashboard-new:latest"
        
        // Build args for React apps
        REACT_APP_BACKEND_URL = 'http://localhost:3002'
        REACT_APP_DASHBOARD_URL = 'http://localhost:3001'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Docker Login') {
            steps {
                echo 'Logging into Docker Hub...'
                script {
                    
                    withCredentials([usernamePassword(credentialsId: 'yug02-dockerhub', passwordVariable: 'password', usernameVariable: 'username')]) {
                        
                        bat """
                            echo %password% | docker login %DOCKERHUB_REGISTRY% -u %username% --password-stdin
                        """
                    }
                }
            }
        }
        
        stage('Build and Push Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            echo 'Building backend image...'
                            bat """
                                docker build -t ${BACKEND_IMAGE} -f backend/Dockerfile ./backend
                            """
                            
                            echo 'Pushing backend image to Docker Hub...'
                            bat "docker push ${BACKEND_IMAGE}"
                            
                            echo "Backend image pushed: ${BACKEND_IMAGE}"
                        }
                    }
                }
                
                stage('Build Dashboard') {
                    steps {
                        script {
                            echo 'Building dashboard-new image...'
                            bat """
                                docker build -t ${DASHBOARD_IMAGE} --build-arg REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} -f dashboard-new/Dockerfile ./dashboard-new
                            """
                            
                            echo 'Pushing dashboard-new image to Docker Hub...'
                            bat "docker push ${DASHBOARD_IMAGE}"
                            
                            echo "Dashboard image pushed: ${DASHBOARD_IMAGE}"
                        }
                    }
                }
                
                stage('Build Frontend') {
                    steps {
                        script {
                            echo 'Building frontend image...'
                            bat """
                                docker build -t ${FRONTEND_IMAGE} --build-arg REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} --build-arg REACT_APP_DASHBOARD_URL=${REACT_APP_DASHBOARD_URL} -f frontend/Dockerfile ./frontend
                            """
                            
                            echo 'Pushing frontend image to Docker Hub...'
                            bat "docker push ${FRONTEND_IMAGE}"
                            
                            echo "Frontend image pushed: ${FRONTEND_IMAGE}"
                        }
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    echo 'Cleaning up local images...'
                    bat """
                        docker rmi ${BACKEND_IMAGE} ${FRONTEND_IMAGE} ${DASHBOARD_IMAGE} 2>nul || echo Images cleaned up or not found
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! All images built and pushed to Docker Hub.'
            echo "Backend: ${BACKEND_IMAGE}"
            echo "Frontend: ${FRONTEND_IMAGE}"
            echo "Dashboard: ${DASHBOARD_IMAGE}"
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
        always {
            script {
                // Logout from Docker Hub
                bat "docker logout ${DOCKERHUB_REGISTRY} 2>nul || echo Logout completed"
            }
        }
    }
}

