/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}${
    process.env.VERCEL_URL
  }`,
  generateRobotsTxt: true,
};
