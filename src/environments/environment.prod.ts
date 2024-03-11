import { IContentfulEnvs } from 'src/app/shared/contentful'

export const environment = {
    production: true,
    contentful: {
        env: IContentfulEnvs.production,
        space: 'v00lofp5qjmx',
        accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
        host: 'cdn.contentful.com',
    },
}
