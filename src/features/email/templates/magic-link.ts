export const magicLinkTemplate = (url: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign in to Portfolio</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 40px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }
          .header {
            margin-bottom: 32px;
            text-align: center;
          }
          .header h1 {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            margin: 0;
          }
          .content {
            margin-bottom: 32px;
            color: #4b5563;
          }
          .button-container {
            text-align: center;
            margin-bottom: 32px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background-color: #000000;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.2s;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #9ca3af;
          }
          .link-fallback {
            word-break: break-all;
            font-size: 12px;
            color: #9ca3af;
            margin-top: 24px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sign in</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Click the button below to sign in to your portfolio dashboard. This link will expire in 10 minutes.</p>
          </div>
          <div class="button-container">
            <a href="${url}" class="button">Sign in to Dashboard</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
