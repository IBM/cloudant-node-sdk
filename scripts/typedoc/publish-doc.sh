#!/usr/bin/env bash

set -e

# Store GIT properties in vars
GIT_COMMIT=$(git rev-parse --short HEAD)
GIT_REPO=$(git remote get-url origin)

# Use SDK version as tag from Jenkins env vars
TAG_NAME=$NEW_SDK_VERSION

# Create documentation
printf ">>>>> Generate new documentation\n"
./scripts/typedoc/generate_typedoc.sh

# Clone gh-pages branch
printf ">>>>> Publishing typedoc for release build: repo=%s branch=%s build_num=%s job_name=%s\n" ${GIT_REPO} ${BRANCH_NAME} ${BUILD_NUMBER} ${JOB_NAME}
printf ">>>>> Cloning repository's gh-pages branch into directory 'gh-pages'\n"
git clone --branch=gh-pages https://github.com/IBM/cloudant-node-sdk.git gh-pages

printf ">>>>> Finished cloning...\n"

pushd gh-pages

# Semantic version pattern is copied from Semantic Versioning Specification 2.0.0:
# Author: Tom Preston-Werner
# License: Creative Commons ― CC BY 3.0 https://creativecommons.org/licenses/by/3.0/
# Source: https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
# Change: Reduced the reg-exp to match only: <major>.<minor>.<patch>
if [[ $TAG_NAME =~ ^(0|[1-9][[:digit:]]*)\.(0|[1-9][[:digit:]]*)\.(0|[1-9][[:digit:]]*)$ ]]; then
# Create a new directory for this tag_name and copy the aggregated typedocs there, if it's a tagged release.
  printf "\n>>>>> Copying aggregated typedocs to new tagged-release directory: %s\n" ${BRANCH_NAME}
  rm -rf docs/${TAG_NAME}
  mkdir -p docs/${TAG_NAME}
  cp -rf ../apidocs/* docs/${TAG_NAME}

  printf "\n>>>>> Generating gh-pages index.html...\n"
  ../scripts/typedoc/generate-index-html.sh > index.html

  # Update the 'latest' symlink to point to this directory
  pushd docs
  rm -f latest
  ln -s ./${TAG_NAME} latest
  printf "\n>>>>> Updated 'docs/latest' symlink:\n"
  ls -l latest
  popd

  printf "\n>>>>> Committing new typedoc...\n"
  git add -f .
  git commit -m "Typedoc for release ${TAG_NAME} (${GIT_COMMIT})"
  git push -f origin gh-pages

  popd

  printf "\n>>>>> Published typedoc for release build: repo=%s branch=%s build_num=%s job_name=%s\n" ${GIT_REPO} ${BRANCH_NAME} ${BUILD_NUMBER} ${JOB_NAME}
else
  printf "\n>>>>> Failed to publish typedoc for release build: TAG_NAME does not follow Semantic Version pattern\n"
fi
