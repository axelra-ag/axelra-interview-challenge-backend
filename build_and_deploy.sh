source ./.env

STACK_NAME=$CLOUDFORMATION_NAME-$ENVIRONMENT

echo "Packaging stack"
aws --profile $AWS_PROFILE cloudformation package \
  --template-file apigateway_template.yaml \
  --output-template-file apigateway_outputtemplate.yaml \
  --s3-bucket $ARTIFACT_STORE

echo "Deploying stack to $STACK_NAME"
aws --profile $AWS_PROFILE cloudformation deploy \
  --template-file apigateway_outputtemplate.yaml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides \
  Environment=$ENVIRONMENT \
  ApiHost=$API_HOST \
  ApiPort=$API_PORT