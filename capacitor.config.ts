import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.betamuhendislik.asset.app',
    appName: 'beta-app',
    webDir: 'dist/beta-app/browser',
    server: {
        androidScheme: 'https',
    },
}

export default config
