import { MetadataRoute } from 'next';

// This function generates the content for your robots.txt file.
// It's part of Next.js's built-in SEO features for the App Router.
export default function robots(): MetadataRoute.Robots {
  return {
    // The 'rules' array allows you to define different sets of rules
    // for various user agents or a default for all.
    rules: [
      {
        // Specify the user-agent to whom these rules apply.
        // '*' means these rules apply to all web crawlers.
        userAgent: '*',

        // Define the paths that crawlers are allowed to access.
        // 'allow: /' means all paths are generally allowed by default.
        allow: ['/'],

        // Define the paths that crawlers are NOT allowed to access.
        // This is crucial for directories like admin panels, private data, or temporary files.
        disallow: [
          '/admin/',         // Prevent crawling of the admin dashboard and its sub-pages
          '/private-data/',  // Prevent crawling of sensitive or private user data
          '/temp/',          // Prevent crawling of temporary files or directories
          // Add more disallow paths as needed, e.g.:
          // '/api/*',        // If you want to block all API routes from being indexed
          // '/*.json$',      // To block all files ending with .json
        ],
        // You can also specify a crawl-delay for this specific user agent if necessary,
        // though this is less common and might not be supported by all crawlers.
        // crawlDelay: 10,
      },
      // You can add more rule objects here for different user agents, e.g.:
      // {
      //   userAgent: 'Googlebot',
      //   allow: ['/public/'],
      //   disallow: ['/old-content/']
      // }
    ],

  
    sitemap: 'https://batokrafting.com/',
  };
}
