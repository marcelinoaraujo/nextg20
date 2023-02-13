import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:8000'//,
    // proxy:
    //   {
    //     host: 'arrays200.sefaz.pe.gov.br',
    //     port: 8080,
    //     auth: {
    //       username: 'marcelino.araujo',
    //       password: 'MMAiron@0001'
    //     }
    //   }    
});