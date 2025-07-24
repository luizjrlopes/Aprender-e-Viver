/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Evita empacotar Handlebars no bundle do servidor
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals)
          ? config.externals
          : [config.externals]),
        "handlebars",
      ];
    }
    return config;
  },
};

module.exports = nextConfig;
