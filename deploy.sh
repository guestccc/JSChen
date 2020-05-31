#!/usr/bin/env sh
# yarn
# yarn build

# 确保脚本抛出遇到的错误
set -e

echo "blog.jschen.cc" > blog/.vuepress/dist/CNAME

rm -rf deploy
mkdir deploy
cd deploy
# git clone git@github.com:guestccc/guestccc.github.io.git
git init 
git remote add origin git@github.com:guestccc/guestccc.github.io.git
# rm -rf `ls |egrep -v '(.git)'`
cp -rf ../blog/.vuepress/dist/* .
git add .
git commit -m 'update'
git push -f origin master

cd ../
rm -rf deploy