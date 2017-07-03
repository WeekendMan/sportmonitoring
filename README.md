Run on the test/product server:

1. Download the files from the "dist" folder to the root folder of the project;
1. Open the terminal / CMD;
2. Go to the project folder;
3. Run command node server.js {{ API URL }} {{ port }}
API URL (string, required) - URL to API. It has to be set in the format http://some/url/ with the slash at the end.
port (number, optional, 80 - default) - which port server has to use. You can skip this parameter and server will choose 80 port.

Building the project requires installed node.js.
