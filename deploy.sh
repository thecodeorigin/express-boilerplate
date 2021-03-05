#!/bin/bash

#replace this with the path of your project on the VPS
cd ~/express-api-base

#pull from the branch
git pull origin master

# followed by instructions specific to your project that you used to do manually
yarn
export PATH=~/.npm-global/bin:$PATH
source ~/.profile

pm2 restart express_api_prod