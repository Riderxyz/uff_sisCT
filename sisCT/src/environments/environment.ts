export const environment = {
  production: false,
  govBrAuth: {
    authUrl: 'https://sso.acesso.gov.br/authorize',
    tokenUrl: 'https://sso.acesso.gov.br/token',
    clientId: 'seu-client-id', // Substitua pelo client ID fornecido pelo gov.br
    redirectUri: 'http://localhost:4200/auth/callback',
    responseType: 'code',
    scope: 'openid email profile'
  },
  apiUrl: 'http://localhost:3000/api' // URL da sua API backend
};