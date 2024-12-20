// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176

// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server.
// The CLI will eventually stop passing in HOST, so we can remove this workaround after the next major release.
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL || process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

// Optional: Log environment variables for debugging
console.log('HOST:', process.env.HOST);
console.log('SHOPIFY_APP_URL:', process.env.SHOPIFY_APP_URL);

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // Ignore hidden files (like .env, .git)
  ignoredRouteFiles: ["**/.*"],

  // Specify the directory where your app resides
  appDirectory: "app",

  // Specify the server module format (CommonJS in this case)
  serverModuleFormat: "cjs",

  // Enable future features (can be expanded in future as needed)
  future: {},

  // Ensure correct port setup during development
  dev: { port: process.env.HMR_SERVER_PORT || 8002 },

  // You can add custom configurations if needed (e.g., custom loaders, plugins)
  // This part can be expanded if necessary for your app
};
