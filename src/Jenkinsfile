pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                bat 'npx vercel --prod --yes --token=%VERCEL_TOKEN%'
            }
        }
    }
}




// pipeline{
//     agent any

//     environment{
//         VERCEL_TOKEN = credentials('vercel_token')
//     }

//     stages{
//         stage('install'){
//             steps {
//                 bat 'npm install'
//             }
//         }
//         stage('Test'){
//             steps {
//                 bat 'Skipping test - no test script found '
//             }
//         }
//         stage('Buil'){
//             steps {
//                 bat 'npm run build'
//             }
//         }
//         stage('Deploy'){
//             steps {
//                 bat 'npx vercel --prod --yes --token=%VERCEL_TOKEN%'
//             }
//         }
//     }
// }