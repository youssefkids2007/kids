# KeyboardAuth Demo (PHP)

A small demo website and API route for your **own** project. It does not connect to or reproduce any third-party service.

## Files

- `index.php` — demo web page
- `assets/style.css` — styling
- `assets/app.js` — browser-side request
- `api/mayhem/KeyboardAuth/index.php` — API handler
- `.htaccess` and `router.php` — route handling
- `Dockerfile` — container hosting setup

## Run locally

Install PHP 8.1+ and open a terminal in this folder.

Linux/macOS:
```bash
DEMO_AUTH_TOKEN='replace-with-a-long-random-demo-token' php -S 127.0.0.1:8000 router.php
```

PowerShell:
```powershell
$env:DEMO_AUTH_TOKEN = "replace-with-a-long-random-demo-token"
php -S 127.0.0.1:8000 router.php
```

Then visit http://127.0.0.1:8000. Enter the same demo token you set in the terminal.

The API path is `/api/mayhem/KeyboardAuth`. The frontend uses POST JSON so the token is not placed in the URL. The handler intentionally does not accept tokens through `?auth=`.

## Host it online

Use a PHP-capable host or a Docker host. One straightforward option is Railway with a GitHub repository and the included `Dockerfile`.

1. Create a GitHub repository and upload these project files.
2. In Railway, create a project and deploy from that repository.
3. Add an environment variable named `DEMO_AUTH_TOKEN` in the Railway service settings. Use a long, unique random value; do not commit it to GitHub.
4. Deploy and open the public domain Railway provides.
5. Test the page, then submit the form using your demo token.

If your host does not detect the Dockerfile automatically, choose its Dockerfile deployment option. Keep the token in environment settings, never in frontend JavaScript or source control.

## API behavior

- `POST /api/mayhem/KeyboardAuth` with `Content-Type: application/json` and body `{"auth":"..."}`.
- Returns JSON with `authenticated: true` on success.
- Returns `401` for an incorrect token, `400` for malformed input, and `503` if the server token has not been configured.
- Other methods return `405`.

## Security notes

This is a learning demo, not a complete production identity system. Use HTTPS, rate limiting, logging that excludes secrets, and a proper user/session system for a real service. Avoid putting authentication secrets in query strings because URLs can be saved in browser history, server logs, and analytics. Only test systems you own or have permission to assess.
