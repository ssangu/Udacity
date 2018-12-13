# Project : Log Analysis

This project contains the code for generating reports by running queries on the database named
"news" which contains the following tables
    - authors
    - articles
    - log

The project reports the following data
    - Most popular articles of all time
    - Most popular authors of all time
    - Days on which more than 1% of requests resulted in errors

## Installation

### Python
You may require to install python for running this project if you don't have one already.

You can install python from [here](https://www.python.org/downloads/).

Install the python3 version.

### Vagrant

To install Vagrant follow this [link](https://classroom.udacity.com/courses/ud197/lessons/3423258756/concepts/14c72fe3-e3fe-4959-9c4b-467cf5b7c3a0).
Follow the instructions under the following sections of the above link:
    - Install Vagrant
    - Download the VM configuration
    - Start the virtual machine
    - Logging in

Inside the VM, change directory to `/vagrant`.

## Execution
Download the data for the database [here](https://d17h27t6h515a5.cloudfront.net/topher/2016/August/57b5f748_newsdata/newsdata.zip).

You will need to unzip this file after downloading it. The file inside is called `newsdata.sql`. Put this file into the vagrant directory, which is shared with your virtual machine.

To load the data, cd into the `/vagrant` directory and run the command 

`$ psql -d news -f newsdata.sql`

Save the files of this project also under the above vagrant directory.

Open your terminal application and cd to the `/vagrant` directory where you have stored the project file `report.py` and then run the following command

`$ python3 report.py`


