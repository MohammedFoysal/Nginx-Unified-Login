# Unified Auth

Protect multiple apps across subdomains by a single login screen in nginx

## How it works

1. Use nginx to proxy all calls from serviceone to an auth service using auth_request module.
2. Auth service checks if the user has an Authorization header, if they do it returns a http 200 which signals nginx to proceed to serviceone
3. If they don't have an Authorization header it redirects to auth service's login screen.
4. after the user logs in, it sets a cookie (shared between subdomains) and redirects to serviceone
5. when nginx next gets to the auth proxy it sets the auth header from the cookie, receives a http status 200 from auth service and successfully gets to serviceone.

## Setup

1. place the entries in /etc/hosts

```
127.0.0.1       serviceone.hub.test
127.0.0.1       auth.hub.test
```

2. Run containers

```BASH
docker-compose up
```

3. Access <http://serviceone.hub.test>
