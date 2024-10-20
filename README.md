# capstone-social-media-app
Repository for cs595 capstone project.

## Initial setup
Ensure you have the packages required for running scripts
```
npm i -g nodemon
```

## Update your packages upon checking out a new branch
```
cd .\client\
npm ci
cd ..\server\
npm ci
```

## Start development
Running the application locally requires 2 terminal windows to be open and running. Commands start at repo root folder.

Termainal 1  --  react application:
```
cd .\client\
npm run start
```

Termainal 2  --  express server:
```
cd .\server\
npm run dev
```

## Build for production
```
cd .\client\
npm run build
mv build ..\server\
```
## imports for react
npm install react-router-dom
npm install react-calendar
npm install lucide-react
npm install axios
