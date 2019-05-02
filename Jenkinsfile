node('nodejs') {

  stage('Cloning the repo') {
        checkout scm
  }
  stage('install') {
    sh 'echo hello there.. test PR'
    sh 'npm install'
  }
}
