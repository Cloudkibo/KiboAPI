## Operations Guide (Production Only)

#### Setup Database

You should have MongoDB installed on your system.

#### Install Forever

To install forever run the following command:

    npm install forever -g
    
#### Install Git

    sudo apt-get update
    sudo apt-get install git

#### Clone

Now, clone the project:

    git clone https://github.com/Cloudkibo/KiboPush/

#### Redirect the ports to our application ports
Run following two commands

    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443

Now on terminal, set the environment variables in /etc/environment.

    nano /etc/environment
    
We need to set the following variables: (Just copy paste and then change the values)

    NODE_ENV=production
    SESSION_SECRET=<YOUR KEY>
    FACEBOOK_ID=<YOUR FB ID>
    FACEBOOK_SECRET=<YOUR FB SECRET>
    DOMAIN=<YOUR DOMAIN>
    DB_SCHEMA=<YOUR DB NAME>
    DB_USER=<YOUR DB USER>
    DB_PASSWORD=<YOUR DB PASSWORD>
    DB_HOST=localhost
    DB_PORT=3306
    

Now, run the following command to install dependencies:

    npm install
   
After this, we can run the server by running the script kibo_script.

    ./kibo_script
    
