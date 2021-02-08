import groovy.transform.Field

def GIT_URL = "https://github.com/AhyeongLee/business-card-maker.git"
def GIT_BRANCH = "master"
def ECR_URL = "655733449393.dkr.ecr.ap-northeast-2.amazonaws.com/business-card-maker"

@Field def CONTAINER_PORT = 8080
@Field def NODE_VERSION = 15

def S3_BUCKET = "aylee-deploy"

@Field def REVISION = ""
def DEPLOYMENT_GROUP = "dev"

pipeline {
    agent any
    tools {nodejs "nodejs15"}
    environment {
        PATH = "$PATH"
    }
    stages {
        stage('Git Clone') {
            steps {
                script {
                    try {
                        git branch: "${GIT_BRANCH}", url: "${GIT_URL}", credentialsId: "github-sign-in"
                        env.gitCloneResult = true
                    } catch(Exception e) {
                        print(e)
                        cleanWs()
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }  
        stage('Webpack Build') {
            when {
                expression {
                    return env.gitCloneResult ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/
                }
            }           
            steps {            
                script {
                    try {
                        // create .env
                        createDotEnv()

                        sh "npm install"
                        sh "npm run build"
                        env.webpackBuildResult = true
                        
                    } catch(Exception e) {
                        print(e)
                        cleanWs()
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Dockerizing') {
            when {
                expression {
                    return env.webpackBuildResult ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/
                }
            }
            steps {
                script {
                    try {

                        sh "sudo cp -r public server/"
                        sh "sudo cp -r dist server/"

                        createDockerfile()

                        sh 'rm  ~/.dockercfg || true'
                        sh 'rm ~/.docker/config.json || true'

                        print('==== ECR Login ====')
                        sh "aws ecr get-login --region ap-northeast-2 --no-include-email | sh"

                        print('==== Docker Build ====')
                        sh "docker image build -t ${ECR_URL}:${BUILD_NUMBER} ."

                        print('==== Docker Push ====')
                        sh "docker push ${ECR_URL}:${BUILD_NUMBER}"

                        print('==== Docker Remove Image ====')
                        sh "docker image rm ${ECR_URL}:${BUILD_NUMBER}"

                        updateTaskDefinition()

                        env.dockerizingResult = true

                    } catch(Exception e) {
                        print(e)
                        cleanWs()
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                expression {
                    return env.dockerizingResult ==~ /(?i)(Y|YES|T|TRUE|ON|RUN)/
                }
            }
            steps {
                script {
                    try {
                        // appspec.yaml 생성 및 s3에 업로드
                        createAppspecAndUpload()
                        
                        def cmd = """
aws deploy create-deployment \
    --application-name ${JOB_NAME} \
    --deployment-config-name CodeDeployDefault.ECSAllAtOnce \
    --deployment-group-name ${DEPLOYMENT_GROUP} \
    --s3-location bucket=${S3_BUCKET},key=${JOB_NAME}/${DEPLOYMENT_GROUP}/appspec.yaml,bundleType=YAML | jq '.deploymentId' -r
                        """

                        def deploymentId = withAWS(credentials:"aws-access-key", region: 'ap-northeast-2') {
                            return executeAwsCliByReturn(cmd)
                        }
                        

                        cmd = "aws deploy get-deployment --deployment-id ${deploymentId} | jq '.deploymentInfo.status' -r"
                        def result = ""
                        timeout(unit: 'SECONDS', time: 600) {
                            while ("${result}" != "Succeeded") {
                                if ("${result}" == "Failed") {
                                    exit 1
                                }
                                result = withAWS(credentials:"aws-access-key", region: 'ap-northeast-2') {
                                    return executeAwsCliByReturn(cmd)
                                }
                                print("${result}")
                                sleep(15)
                            }
                        }

                    } catch(Exception e) {
                        print(e)
                        cleanWs()
                        currentBuild.result = 'FAILURE'
                    } finally {
                        cleanWs()
                    }
                }
            }
        }
    }
}

def updateTaskDefinition() {
    sh """
cat << EOF > taskDefinition.json

{
    "executionRoleArn": "arn:aws:iam::655733449393:role/ecsTaskExecutionRole",
    "containerDefinitions": [
        {
            "portMappings": [
                {
                    "hostPort": 0,
                    "protocol": "tcp",
                    "containerPort": 8080
                }
            ],
            "image": "655733449393.dkr.ecr.ap-northeast-2.amazonaws.com/business-card-maker:${BUILD_NUMBER}",
            "name": "card-maker-app"
        }
    ],
    "memory": "512",
    "taskRoleArn": "arn:aws:iam::655733449393:role/ecsTaskExecutionRole",
    "family": "aylee-task-definition",
    "requiresCompatibilities": [
        "EC2"
    ],
    "networkMode": "bridge",
    "cpu": "128"
}

EOF
    """

    def cmd = "aws ecs register-task-definition --cli-input-json file://${JENKINS_HOME}/workspace/${JOB_NAME}/taskDefinition.json | jq '.taskDefinition.revision' -r"
    def revision =withAWS(credentials:"aws-access-key", region: 'ap-northeast-2') {
        return executeAwsCliByReturn(cmd)
    }

    REVISION = "${revision}"
    
}

def createAppspecAndUpload() {
    sh """
cat << EOF > appspec.yaml
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: "arn:aws:ecs:ap-northeast-2:655733449393:task-definition/aylee-task-definition:${REVISION}"
        LoadBalancerInfo:
          ContainerName: "card-maker-app"
          ContainerPort: 8080
EOF
    """

    withAWS(credentials:"aws-access-key", region: 'ap-northeast-2') {
        sh "aws s3 cp appspec.yaml s3://aylee-deploy/business-card-maker/dev/appspec.yaml"   
    }
}

def createDotEnv() {
    def cmd = "aws secretsmanager get-secret-value --secret-id business-card-maker-env | jq '.SecretString' -r"
    def result = withAWS(credentials:"aws-access-key", region: 'ap-northeast-2') {
        return executeAwsCliByReturn(cmd)
    }
    
    print("${result}")
    def resultJson = readJSON text: "${result}"
    def envVariable = ""
    resultJson.each { key, value ->
        envVariable = "${envVariable}\n${key}= ${value}"
    }
    
    
    sh """
cat << EOF > .env
${envVariable}

EOF
    """
}

def createDockerfile() {
    sh"""
cat << EOF > Dockerfile
FROM node:${NODE_VERSION}

WORKDIR /home/server/

COPY server/. ./

RUN npm install

EXPOSE ${CONTAINER_PORT}
CMD [ "node", "index.js" ]

EOF
    """
}

def  executeAwsCliByReturn(cmd){
    return sh(returnStdout: true, script: cmd).trim()
}