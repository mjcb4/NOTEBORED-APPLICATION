# NOTEBORED-APPLICATION
I. Wherever you like on your local computer, create a root project folder, call it whatever you like, we chose the project title: "NOTEBORED", this parent folder with serve as a main project directory for storing the projects frontend and backend folders
  II. From the Github repository, download "notebored-client" and "notebored-server" folders, but keep them somewhere locally on your computer seperate from your main project directory created in step 1
  III. Open a new VS/VSC window, or a different preferred code editor program window, using the root "NOTEBORED" project directory folder you created, so that you can open terminal windows for the new project (or use your computers terminal window and navigate to this folder)
    IV. Make sure you have the necessary general repositories installed for your init implementation:
        --> The necessary functional repositories you will need are: npm AND Node.js 
         V. To check if you already have Node.js and npm installed, use any terminal window to run the following commands: 
	     --> "node -v"   AND   "npm -v"  (dont include parenthesis)
         VI. If these resources are not already installed, go to this link for downloading the tools: 
	     --> "https://nodejs.org/en/download/"
         VII. Once Node.js is installed on your machine, ensure youve completed proper installation of Node.js and npm by using any terminal window to run the same following commands:
	     -->   "node -v"   AND   "npm -v"  (dont include parenthesis)
		--> If installed correctly, the terminal window should display the currently installed version for each item

FOR FRONTEND:
   1. Continue in the currently open terminal window (or open a new terminal window) using the root "NOTEBORED" main project directory folder
   
       2A. If you have already installed the "create-react-app" repo globally in the past, by already previously installing it through npm with the command:
	    --> "npm install -g create-react-app" (dont include parenthesis),
	      --> Then it is recommended that you uninstall the old package instantiated from npm first before installing the npx version. 
	       To uninstall your existing npm version and then reinstall the new npx version: use the current terminal window to run these commands: 
	        --> "npm uninstall -g create-react-app"   THEN   "npx create-react-app notebored-client" (dont include parenthesis)
   
       2B. If you have never installed create-react-app before, you can install the repo from the current terminal window by running this command:
	    --> "npx create-react-app notebored-client" (dont include parenthesis)
   
   3. After finishing the npx installation method previously mentioned and described in 2A or 2B, there will be a newly generated child folder found in your "NOTEBORED" main project directory that is called "notebored-client"
       --> (This folder will contain all of the necessary components for a default react app)
	Within this newly generated "notebored-client" folder, you can delete the following files from the /src directory as they arent used in the project implementation:
	 --> "App.css"  "App.test.js"  "logo.svg"  "serviceWorker.js"  "setupTests.js"

   4. Install all the necessary dependency repositories into the new react-client application, ensuring that you can view these dependencies in the "package.json" file after installation 
     5. Using the terminal window, from the root "NOTEBORED" project folder, navigate a "layer" deeper into the project file structure to the child "notebored-client" folder by running this command:
	  --> "cd notebored-client" (dont include parenthesis)
     6. Using the terminal window, from the child "notebored-client" project folder, install or update the necessary dependancy repositories into the react-client application using the npm installer by running this command:
	  --> "npm i axios formik react-dom react-router-dom react-scripts yup" (dont include parenthesis)

   7. Once all repos are finished installing into the projects node_modules, you can combine the newly created default react-client application you have generated and integrate it with the code from the Github repository that you downloaded locally in earlier step II,
	The applicable files/folders for the frontend react application section of the project can be found within the "noteboard-client" folder that you previously downloaded from the Github repository and stored locally in another location
     8. Add all the files/folders from your locally stored "notebored-client" (not the one you created) into the "notebored-client" folder section of the react application (that you generated):
	--> This can be done through copying + pasting all the files/folders into the directory using the file manager or dragging/dropping them into the newly created "notebored-client" project folder that you generated as part of your react application
	--> The files to be added to your react application are: "App.js"  "index.js"  "index.css" 
	--> The folders to be added to your react application are: "components"  "context"  "pages"  "services"  "styles"
   9. To start the client application, first you must edit the package.json file by opening the package.json file from within the current "noteboard-client" directory in an editing window and add the following proxy JSON field "proxy" that you can enter on line 5 directly after the "private" field found on line 4:
	--> "proxy": "http://localhost:4000", (Include parenthesis this time!) 
	   --> Make sure to include all necessary parenthesis this time, and also make sure to put a comma directly after the proxy quote at the end of the line as you will be adding a new object to the JSON file
	      --> The package.json files lines 4 and 5 should read exactly as follows:  4-->   "private": true,         5--> "proxy": "http://localhost:4000",
   9. Finally, to run the client application, go to a seperate terminal window from where you are running the server backend application, navigate to the "notebored-client" file directory as your path, and run this command:
	--> "npm start" (dont include parenthesis)

FOR BACKEND:
   1. Open a new terminal window from the root project folder
   2. In that terminal window, navigate into the child "notebored-server" folder using command --> "cd notebored-server" (dont include parenthesis)
   3. Now in that terminal window, initialize a new Node.js server for the projects backend implementation and create a package.json file by running the command --> "npm init -y" (dont include parenthesis)
   4. Install all the necessary dependency repositories into the new backend react-server application, ensuring that you can view these dependencies in the "package.json" file after installation 
     5. Using the terminal window, from the child "notebored-server" project folder, install or update the necessary dependancy repositories into the react-server application using the npm installer by running this command:
	  --> "npm i bcryptjs cors dotenv express express-validator http-proxy-middleware jsonwebtoken mongodb mongoose" (dont include parenthesis)

   6. Once all repos are finished installing into the projects node_modules, you can combine the newly created default react-server application you have generated and integrate it with the code from the Github repository that you downloaded locally in earlier step II,
	The applicable files/folders for the backend react application section of the project can be found within the "noteboard-server" folder that you previously downloaded from the Github repository and stored locally in another location
     7. Add all the files/folders from your locally stored "notebored-server" (not the one you created) into the "notebored-server" folder section of the react application (that you generated):
	--> This can be done through copying + pasting all the files/folders into the directory using the file manager or dragging/dropping them into the newly created "notebored-client" project folder that you generated as part of your react application
	--> The files to be added to your server application are: "server.js"  ".env"  
	--> The folders to be added to your server application are: "CONTROLLERS"  "MODELS"  "ROUTES"  "UTILITIES"
   8. To start the server application, first you must edit the package.json file by opening the package.json file from within the current "noteboard-server" directory in an editing window and add the following script to the "scripts" JSON field found on line 6:
	--> "start": "node server.js" (Include parenthesis this time!) 
	   --> Make sure to include all necessary parenthesis this time, and also make sure to put a comma directly after the data quote of the previous script as you will be adding a new script to the object list
	      --> The package.json files lines 7 and 8 should read exactly as follows:  7-->   "test": "echo \"Error: no test specified\" && exit 1",         8--> "start": "node server.js"  
   9. Finally, to run the server application, go to a seperate terminal window from where you are running the react-client frontend application, navigate to the "notebored-server" file directory as your path, and run this command:
	--> "npm start" (dont include parenthesis)
