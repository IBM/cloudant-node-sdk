cd test/resources
tar cvf secrets.tar auth.js # more files can be added here if necessary
cd ../..
travis encrypt-file test/resources/secrets.tar
