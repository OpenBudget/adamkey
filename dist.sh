#!/bin/sh

git stash
git checkout -b temp-deploy

npm run build-app
git add temp/
git commit -m deploy-gh-pages
git subtree push --prefix temp origin gh-pages
rm -rf temp/

git checkout master
git branch -D temp-deploy
git stash apply
