To run server:
1. Open terminal and `cd` to the root project folder.
2. Run `chmod +x ./startup.sh`
3. Run `./startup.sh`
4. It will then ask you to input the enviroment variables, input the following:
  - NODE_ENV=`development`
  - USER=`admin`
  - HOST=`localhost`
  - PASSWORD=`Password2020!`
  - DATABASE=`booksloth`
5. Run `npm install`
6. Run `npm run migrate`
7. Run `npm start`
