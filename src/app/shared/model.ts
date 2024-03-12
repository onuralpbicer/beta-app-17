export interface ListPage {
    name: string
    items: Array<{ link: string; id: string }>
}

export enum ISyncStatus {
    Initial = 'Initial',
    Checking = 'Checking',
    Syncing = 'Syncing',
    Success = 'Success',
    Failure = 'Failure',
}
