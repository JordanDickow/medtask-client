let apiUrl
const apiUrls = {
  production: 'https://serene-retreat-64737.herokuapp.com/',
  development: 'http://localhost:7165'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
