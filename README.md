
## Setup the local development environment

1. Install AWS CLI
2. Install the AWS SAM CLI  ->  [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
Don't forget to install Docker, if not yet installed.

3. create an .env file like the following one:
    ```
   export AWS_PROFILE=default
   export ARTIFACT_STORE=axelra-interview-challenge-artifact-store
   export CLOUDFORMATION_NAME=axelra-interview-challenge
   export ENVIRONMENT=dev
   export API_HOST=google.com
   export API_PORT=80
   export MONGO_DB="<The mongoDB connection string which you received by Axelra>"
    ```

## Run the backend locally
Install node modules with. It will start a recursive install for every subfolder.

*AWS microservice currently work best (if not "only") with npm. So use npm instead of yarn to avoid conflicts.*

#### `npm install`

Important: Docker needs to be running.

#### Run on MacOS/Linux
#### `npm run dev`

#### Run on Windows *in Git Bash*
#### `source .env && npm run dev-windows`

## Manual deployment of a personal AWS Cloudformation Stack
(Not necessary for the challenge.)
1. Make sure the `.env` file exists:
    ```
   export AWS_PROFILE=default
   export ARTIFACT_STORE=axelra-interview-challenge-artifact-store
   export CLOUDFORMATION_NAME=axelra-interview-challenge
   export ENVIRONMENT=dev
   export API_HOST=google.com
   export API_PORT=80
   export MONGO_DB="<The mongoDB connection string which you received by Axelra>"
    ```
    
    If you haven't specified an AWS profile keep this env variable on 'default'.
    
2. Create an AWS account if you don't have one yet.
3. Add aws credentials to `~/.aws/credentials`
4. Add region and default output to `~/.aws/config`
    
5. Open the AWS console and create an S3 Bucket artifact store. Choose the name `axelra-test-artifact-store`, if you don't want to adjust the .env file above.
     
6. Build and deploy the cloudformation

    On MacOS/Linux:
    
    #### `npm run build-deploy`
    
    On Windows *in Git Bash*:
    
    #### `./build_and_deploy.sh`
    
    The template is packaged and the Cloudformation Stack is deployed to AWS.

## Other information

- Lamba functions still need *require* for importing files (e.g. `const util = require("util")`), do not use `import {util} from "util"`
