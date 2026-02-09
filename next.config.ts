import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "rawpaper-media.s3.us-west-2.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "www.biobizz.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "www.mars-hydro.com", pathname: "/**" },
      { protocol: "https", hostname: "www.daabrands.com", pathname: "/**" },
      { protocol: "https", hostname: "www.eloroverde.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
