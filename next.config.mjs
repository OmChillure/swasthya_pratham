/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns:[
            {
                hostname:"utfs.io"
            }
        ]
    },
    experimental:{
        serverActions:{
            allowedOrigins:["localhost:3000"]
        }
    }
};

export default nextConfig;
