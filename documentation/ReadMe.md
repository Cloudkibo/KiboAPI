# KiboAPI
Link to design document:
https://docs.google.com/document/d/1s055cdCOirIQxXDYIaNNuVzJQcKPbKJmBMVG1B0h8aU/edit#heading=h.9knfv8kthqgu

Description:
This project is about how we would be exposing our API for all three of our products to customers.

## Operations Guide (Production Only)

#### Setup Database

You should have MongoDB installed on your system.

#### Setup Nodejs and NPM

You should have Nodejs and NPM installed on your system.

#### Install Forever

To install forever run the following command:

    npm install forever -g

#### Install Git

    sudo apt-get update
    sudo apt-get install git

#### Clone

Now, clone the project:

    git clone https://github.com/Cloudkibo/KiboAPI/

#### Redirect the ports to our application ports
Run following two commands

    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443

Now on terminal, set the environment variables in /etc/environment.

    nano /etc/environment

We need to set the following variables: (Just copy paste and then change the values)

    NODE_ENV=production
    DOMAIN=<YOUR DOMAIN>
    MONGO_URI=<DATABASE STRING>

Now, run the following command to install dependencies:

    cd KiboAPI
    npm install               

After this, we can run the server by running the script deployment.sh.

    bash deployment.sh
