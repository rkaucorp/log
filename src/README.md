## Installation Process

npm init -y

// tsc typescript compiler
// ts-node without compiling typescript code

npm i ts-node typescript tsc nodemon express

npm i @types/express

## tsconfig

tsc --init

## compile code

tsc

## pm2 process

sudo pm2 start dist/server.js -i 6

sudo pm2 log

## loadtest

loadtest -n 300 http://localhost:4000/api/student

## profiling

node --prof dist/server.js

profile.txt
node --prof-process isolate-0x4d59600-56250-v8.log > profiler.txt
