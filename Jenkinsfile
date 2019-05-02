node('nodejs') {

  stage('Cloning the repo') {
        checkout scm
  }
  stage('install') {
    sh 'echo hello there.. test update PR, another test'
    sh 'npm install'
  }
}
