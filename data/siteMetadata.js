/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'ml.lucasdellabella.com',
  author: 'Lucas Della Bella',
  headerTitle: 'ml.lucasdellabella',
  description: `A minimal sub-site to hold all of my ML-related notes, experiments, and projects. 
    All posts conclude with an interactive widget for readers to play with the resulting model.`,
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://www.ml.lucasdellabella.com',
  siteLogo: '/static/images/main.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'dellabella.lucas@gmail.com',
  github: 'https://github.com/lucasdellabella',
  linkedin: 'https://www.linkedin.com/in/lucasdellabella/',
  locale: 'en-US',
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
}

module.exports = siteMetadata
