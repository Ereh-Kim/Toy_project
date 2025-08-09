#!/bin/bash
echo "Git 자동 배포 시작: $(date)"

cd ~/srv/Toy_project || exit

git reset --hard HEAD
git pull origin Develop
npm install

chmod +x node_modules/.bin/nodemon
chmod +x node_modules/.bin/concurrently

pm2 restart foodscriptsrv

echo "배포완료: $(date)"

