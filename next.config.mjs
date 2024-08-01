/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
          {
            source: '/llm/:path*',
            destination:
              process.env.NODE_ENV === 'development'
                ? 'http://127.0.0.1:5328/llm/:path*'
                : '/llm/',
          },
        ]
      },
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
