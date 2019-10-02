
## Setup the local development environment

1. Install AWS CLI
2. Install the AWS SAM CLI  ->  [https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
Don't forget to install Docker, if not yet installed.

3. create an .env file like the following one:
    ```
    export AWS_PROFILE=default
    export ARTIFACT_STORE=axelra-test-artifact-store
    export CLOUDFORMATION_NAME=axelra-test
    export ENVIRONMENT=dev
    export API_HOST=google.com
    export API_PORT=8080
    ```

## Run the Backend locally
Install node modules with. It will start a recursive install for every subfolder.

####`npm install`

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
   export ARTIFACT_STORE=axelra-test-artifact-store
   export CLOUDFORMATION_NAME=axelra-test
   export ENVIRONMENT=dev
   export API_HOST=google.com
   export API_PORT=8080
    ```
    
    If you haven't specified an AWS profile keep this env variable on 'default'.
    
2. add aws credentials to `~/.aws/credentials`
3. add region and default to `~/.aws/config`
    
4. Open the AWS console and create a S3 Bucket artifact store
    
    Choose the name axelra-test-artifact-store, if you don't want to adjust the .env file above.
     
5. On MacOS/Linux:
    
    #### `npm run build-deploy`
    
    On Windows *in Git Bash*:
    
    #### `./build_and_deploy.sh`
    
    The template is built and the Cloudformation Stacks is deployed to AWS.

## Other information

- Lamba functions still need *require* for importing files (e.g. `const util = require("util")`), do not use `import {util} from "util"`
