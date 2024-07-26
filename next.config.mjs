/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns:[
            {
                hostname:"utfs.io"
            }
        ]
    },
    webpack: (config) => {
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
          ...config.resolve.alias,
          sharp$: false,
          'onnxruntime-node$': false,
        };
        return config;
      },
    experimental:{
        serverActions:{
            allowedOrigins:["localhost:3000"]
        },
        outputFileTracingIncludes: {
            '/*': ['./cache/**/*'],
          },
    }
};
export const runtime = "nodejs"; // default
export default nextConfig;
