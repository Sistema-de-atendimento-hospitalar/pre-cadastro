#!/bin/bash

npm run build:prod
echo 'sucesso ao buildar a aplicação'

docker build -t stefbitt/paciente-service-web .
echo 'sucesso ao buildar a imagem docker'

docker tag stefbitt/paciente-service-web:latest 251839969735.dkr.ecr.us-east-2.amazonaws.com/paciente-service-web:latest
echo 'criado tag da imagem'

aws ecr get-login-password | docker login --username AWS --password-stdin 251839969735.dkr.ecr.us-east-2.amazonaws.com    
echo 'sucesso login'

docker push 251839969735.dkr.ecr.us-east-2.amazonaws.com/paciente-service-web:latest
echo 'sucesso push'

