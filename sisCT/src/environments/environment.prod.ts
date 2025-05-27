export const environment = {
  production: true,
  govBrAuth: {
    authUrl: 'https://sso.acesso.gov.br/authorize',
    tokenUrl: 'https://sso.acesso.gov.br/token',
    clientId: 'seu-client-id', // Substitua pelo client ID fornecido pelo gov.br
    redirectUri: 'https://seu-dominio.gov.br/auth/callback', // URL de produção
    responseType: 'code',
    scope: 'openid email profile'
  },
  apiUrl: 'https://seu-dominio.gov.br/api' // URL da sua API backend em produção
};