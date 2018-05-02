# giv
Giv Build Instructions
Technologies Needed:
| MySQL Server |
PostgresSQL Server |
• XCode or Android simulator
• Expo XDE
• Node
• NPM
• YARN Package Manager
• HapiGER NPM module
• React Native NPM module (create-react-native-app)
• Sequelize CLI NPM module
• Nodemon NPM module

Installation:
1. Clone the repository: git clone https://github.com/vjdhanota/giv.git
2. Create a MySQL database by the name of ‘givdb’ with no password
3. Run ‘yarn’ in terminal @ root level of repository and in ./client directory to install
dependencies
4. Run ‘nodemon server’ in root directory and in a new terminal, run ‘npm start’ in the
client directory
5. In the new terminal press ‘I’ or ‘a’ to bring up a new emulator
6. From here we can register a new user and begin using the app.
7. In order to gain functionality for the ‘likes’ recommendations, we must setup HapiGER.
8. Run the HapiGER server in a new terminal window using:
• hapiger --es pg --esoptions '{ "connection":"postgres://localhost/hapiger" }'
9. Create a new recommendation namespace in a new terminal window using:
• curl -X POST 'http://localhost:3456/namespace' -d'{ "namespace": "charities" }'

