# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Deployment

* Signup on AWS
* Launch instance
* chmod 400 <secret>.pem
* ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
* Install Node version 16.17.0
* Git clone
* nginx installation
     * sudo apt update
     * sudo apt install nginx
     * sudo systemctl start nginx
     * sudo systemctl enable nginx
* Frontend
    * npm install → dependencies install
    * npm run build
    * Copy code from dist(build files) to /var/www/html/
    * sudo scp -r dist/* /var/www/html/
    * Enable port :80 of your instances in the ec2-> secruity group ->inbound rules
* Backend
    * updated DB password
    * allowed ec2 instance public IP on mongodb server
    * npm install pm2 -g
    * pm2 start npm --name "devTinder-backend" -- start
    * Enable port :3000 of your instances in the ec2-> secruity group ->inbound rules
    * pm2 logs
    * pm2 list, pm2 flush Name , pm2 stop Name, pm2 delete Name
    * config nginx `sudo nano /etc /nginx/sites-available/default`
    * Modify the BASE_URL in the frontend to 'api/'
* Nginx Configuration 
    * config nginx `sudo nano /etc/nginx/sites-available/default`
    *
        server_name : PUBLIC_IP of instance;
    
        location /api/ {
            proxy_pass http://PUBLIC_IP:3000; # Pass the request to the Node.js app
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    * after editing congif gile - restart nginx -> sudo systemctl restart nginx
      
