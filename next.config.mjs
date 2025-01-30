// /** @type {import("next").NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["localhost"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//         port: ""
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         port: ""
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         port: ""
//       },
//       {
//         protocol: "https",
//         hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
//         port: ""
//       }
//     ]
//   }
// };

// export default nextConfig;


/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: ""
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/', // If a user visits the root
        destination: '/auth/login', // Redirect them to the sign-in page
        permanent: false, // This is a temporary redirect
      },
     
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/old-page', // When accessing /old-page
  //       destination: '/new-page', // Rewrites to /new-page without changing the URL in the browser
  //     },
  //     {
  //       source: '/api/old-api-endpoint',
  //       destination: '/api/new-api-endpoint', // API route rewrite
  //     }
  //   ];
  // },
};

export default nextConfig;
