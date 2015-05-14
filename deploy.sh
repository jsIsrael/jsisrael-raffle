#!/bin/bash
echo "Starting deployment"
echo "Target: gh-pages branch"

TEMP_DIRECTORY="/tmp/__temp_static_content"
DIST_DIRECTORY="dist"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}

mkdir $TEMP_DIRECTORY || exit 1
cp -r $DIST_DIRECTORY/* $TEMP_DIRECTORY || exit 1
cp .gitignore $TEMP_DIRECTORY || exit 1


echo -e "Adding token remote"
git remote add origin_token $ORIGIN_URL_WITH_CREDENTIALS > /dev/null 2>&1
echo -e "Fetching token remote"
git fetch origin_token > /dev/null 2>&1
echo -e "Checking out gh-pages"
git checkout -b gh-pages --track origin_token/gh-pages
echo "Done"

echo "Removing old static content"
git rm -rf . || exit 1

echo "Copying newly generated static content"
cp -r $TEMP_DIRECTORY/* . || exit 1
cp $TEMP_DIRECTORY/.gitignore . || exit 1

echo "Pushing new content to $ORIGIN_URL"
git config user.name "Travis-CI" || exit 1
git config user.email "travis@jsisrael.com" || exit 1

git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT after building Travis build $TRAVIS_BUILD_NUMBER" || exit 1

echo -e "Pushing commit"
git push -q origin_token gh-pages > /dev/null 2>&1

echo "Cleaning up temp files"
rm -Rf $TEMP_DIRECTORY

echo "Deployed successfully."
exit 0
