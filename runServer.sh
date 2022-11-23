#!/usr/bin/env

# node version 18.7.0 doesnt work with prisma, so running this file will downgrade 
  # the terminal upon execution.

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
echo -n "Switching from node "
node -v
nvm use 16.17
nodemon server/dist/index.js