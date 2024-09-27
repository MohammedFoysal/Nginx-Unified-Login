import express from 'express';
import config from './config';
import nunjucks from 'nunjucks';

const app = express();

app.use(express.json());
app.use(express.urlencoded())

const { port, appName, serviceOne } = config;

app.use((req, res, next) => {
  next();
})

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/login', (req, res) => {
  console.log(`GET /login on Auth Server - ${new Date()}`);

  return res.render('index.html', {
    appName
  })
});

app.post('/login', (req, res) => {
  console.log(`POST /login on Auth Server - ${new Date()}`);

  if (req.body.username === 'admin' && req.body.password === 'admin') {
    res.cookie('auth_token', 'exampleToken', { 
      domain: '.hub.test', // Set cookie for the entire domain, including subdomains
      path: '/',               // Make it accessible for all paths
      httpOnly: false,          // Prevent access via JavaScript (secure)
      secure: false             // Only send over HTTPS (ensure you are using HTTPS)
    });

    return res.status(200).redirect(serviceOne);
  }

  return res.status(401).send('Failed login')
});

app.get('/auth_check', (req, res) => {
  console.log(`GET /auth_check on Auth Server - ${new Date()}`);

  const authHeader = req.headers.authorization;
  const split = authHeader.split('Bearer ')

  if (!split[1]) {
    return res.status(401).send('WRONG')
  }

  console.log(`Auth header found: ${split[1]}`)
  return res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
})

