# LINE-Group-Bot

# Deployments
### Option 1: Install new SSL certificates
 - Start the docker-compose file
```bash
docker-compose up --build -d nginx
```
 - Install certbot
```bash
sudo apt -y install certbot
```
 - Run certbot
```bash
sudo certbot certonly --webroot -w ./nginx/certbot/www \
  --config-dir ./nginx/certbot/conf \
  --logs-dir ./nginx/certbot/logs \
  --work-dir ./nginx/certbot/work \
  --email {youremail@example.com} --agree-tos --no-eff-email \
  -d {yourdomain.com} 
```
 - Uncomment the `nginx.conf` file and replace the domain name with your domain name
```
    ...

    # server {
    #     listen 443 ssl;
    #     server_name {yourdomain.com};

    #     ssl_certificate /etc/letsencrypt/live/{yourdomain.com}/fullchain.pem;
    #     ssl_certificate_key /etc/letsencrypt/live/{yourdomain.com}/privkey.pem;

    #     location /bot/ {
    #         proxy_pass http://line-bot:3000;
    #         proxy_set_header Host $host;
    #         proxy_set_header X-Real-IP $remote_addr;
    #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto $scheme;
    #     }

    #     location /ff/ {
    #         proxy_pass http://liff-service:3001;
    #         proxy_set_header Host $host;
    #         proxy_set_header X-Real-IP $remote_addr;
    #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto $scheme;
    #     }
    # }
    
    ...
```
 - Restart the docker-compose file
```bash
docker-compose down
docker-compose up
```

### Option 2: Use existing SSL certificates
 - Uncomment the `nginx/nginx.conf` file and replace the domain name with your domain name
```nginx.conf
events {}
    ...
    # server {
    #     listen 443 ssl;
    #     server_name {yourdomain.com};

    #     ssl_certificate /etc/letsencrypt/live/{yourdomain.com}/fullchain.pem;
    #     ssl_certificate_key /etc/letsencrypt/live/{yourdomain.com}/privkey.pem;

    #     location /bot/ {
    #         proxy_pass http://line-bot:3000;
    #         proxy_set_header Host $host;
    #         proxy_set_header X-Real-IP $remote_addr;
    #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto $scheme;
    #     }

    #     location /ff/ {
    #         proxy_pass http://liff-service:3001;
    #         proxy_set_header Host $host;
    #         proxy_set_header X-Real-IP $remote_addr;
    #         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #         proxy_set_header X-Forwarded-Proto $scheme;
    #     }
    # }
    ...
```
 - Edit the `docker-compose.yml` file, replace `{path to your SSL certificates}` with the path to your SSL certificates and `{path to webroot}` with the path to the webroot 
```docker-compose.yml
version: '3.7'
    ...
  nginx:
    ...
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - {path to webroot}:/var/www/certbot:ro
      - {path to your SSL certificates}:/etc/letsencrypt:ro
    ...
```
 - Start the docker-compose file
```bash
docker-compose up
```