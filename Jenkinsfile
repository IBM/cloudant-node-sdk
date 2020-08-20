#!groovy

pipeline {
  agent {
    label 'sdks-executor'
  }
  options {
    skipDefaultCheckout()
  }
  environment {
    GH_CREDS = credentials('github-token')
  }
  stages {
    stage('Checkout') {
      steps {
        script {
          defaultInit()
          applyCustomizations()
          checkoutResult = checkout scm
          commitHash = "${checkoutResult.GIT_COMMIT[0..6]}"
          sh """
            git config user.email 'ricellis@users.noreply.github.com'
            git config user.name 'cloudant-sdks-automation'
            git config credential.username '${env.GH_CREDS_USR}'
            git config credential.helper '!f() { echo password=\$GH_CREDS_PSW; echo; }; f'
          """
        }
      }
    }
    stage('QA') {
      steps {
        withEnv(['DOCKER_HOST=',
          'SERVER_AUTH_TYPE=basic',
          'SERVER_URL=http://127.0.0.1:5984',
          'SERVER_USERNAME=admin',
          'SERVER_PASSWORD=password',
          'WIREMOCK_URL=http://127.0.0.1:8080',
          'WIREMOCK_PORT=8080'
        ]) {
          sh './scripts/setup_couch.sh'
          sh './scripts/setup_wiremock.sh'
          runTests()
        }
      }
    }
    stage('Publish[staging]') {
      environment {
        STAGE_ROOT = 'https://na.artifactory.swg-devops.com/artifactory/api/'
      }
      steps {
        bumpVersion(true)
        publishStaging()
      }
    }
    stage('Publish[repository]') {
      when {
        beforeAgent true
        allOf {
          // Publish master branch, but not on the version update commit after just publishing
          branch 'master'
          not {
            changelog 'Update version.*'
          }
        }
      }
      steps {
        // Throw away any temporary version changes used for stage/test
        sh 'git reset --hard'
        bumpVersion(false)
        // Push the version bump and release tag
        sh 'git push --tags origin HEAD:master'
        publishPublic()
      }
    }
  }
}

def libName
def commitHash
def bumpVersion
def customizeVersion

void defaultInit() {
  // Default to using bump2version
  bumpVersion = { isDevRelease ->
    newVersion = getNextVersion(isDevRelease)
    doVersionBump(isDevRelease, newVersion)
  }

  doVersionBump = { isDevRelease, newVersion, allowDirty ->
    sh "bump2version --new-version ${newVersion} ${allowDirty ? '--allow-dirty': ''} ${isDevRelease ? '--no-commit' : '--tag --tag-message "Release {new_version}"'} patch"
  }

  getNextVersion = { isDevRelease ->
    // Identify what the next patch version is
    patchBumpedVersion = sh returnStdout: true, script: 'bump2version --list --dry-run patch | grep new_version=.* | cut -f2 -d='
    // Now the customized new version
    return getNewVersion(isDevRelease, patchBumpedVersion)
  }

  // Default no-op implementation to use semverFormatVersion
  customizeVersion = { semverFormatVersion ->
    semverFormatVersion
  }
}

String getNewVersion(isDevRelease, version) {
  wipVersion = ''
  if (isDevRelease) {
    // Add uniqueness and build metadata to dev build versions
    wipVersion = "${version.trim()}-dev${currentBuild.startTimeInMillis}+${commitHash}.${currentBuild.number}"
  } else {
    wipVersion = "${version.trim()}"
  }
  // Customize with lang specific requirements
  return customizeVersion(wipVersion)
}

// Language specific implementations of the methods:
// applyCustomizations()
// runTests()
// publishStaging()
// publishPublic()
// + other customizations
void applyCustomizations() {
  libName = 'node'
  bumpVersion = { isDevRelease ->
    // Get the dependencies
    sh 'npm install'
    // Update to the next patch version
    sh "npm version ${isDevRelease ? '--no-git-tag-version' : '-m "Update version -> %s"'} patch"
    if (isDevRelease) {
      // For a dev release append the metadata
      patchBumpedVersion = sh returnStdout: true, script: 'jq -r .version package.json'
      sh "npm version --allow-same-version --no-git-tag-version ${getNewVersion(isDevRelease, patchBumpedVersion)}"
    }
  }
}

void runTests() {
  sh 'npm install'
  sh 'npm test'
}

void publishStaging() {
  withCredentials([usernamePassword(credentialsId: 'artifactory', passwordVariable: 'NPM_PASS', usernameVariable: 'NPM_USER')]) {
    // For local artifactory the email is the same as the user
    withEnv(["NPM_EMAIL=${env.NPM_USER}", "NPM_REGISTRY=${env.STAGE_ROOT}npm/cloudant-sdks-npm-virtual"]) {
      sh """
        npm install --no-save npm-cli-login
        ./node_modules/.bin/npm-cli-login
      """
      publishNpm()
    }
  }
}

void publishPublic() {
  withEnv(['NPM_REGISTRY=https://registry.npmjs.org']) {
    withCredentials([string(credentialsId: 'npm-mail', variable: 'NPM_EMAIL'),
                   usernamePassword(credentialsId: 'npm-creds', passwordVariable: 'NPM_TOKEN', usernameVariable: 'NPM_USER')]) {
      // Create an .npmrc file
      sh "echo '//registry.npmjs.org/:_authToken=\${NPM_TOKEN}' > .npmrc"
      publishNpm()
    }
  }
}

void publishNpm() {
  // Note trailing slash is important for matching .npmrc entries
  // npm-cli-login always adds a trailing slash, so we don't use one in the NPM_REGISTRY var
  sh "npm publish dist --registry ${env.NPM_REGISTRY}/"
}

