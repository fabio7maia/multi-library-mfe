
    export type RemoteKeys = 'settingsModule' | 'settingsModule/' | 'settingsModule/api';
    type PackageType<T> = T extends 'settingsModule/api' ? typeof import('settingsModule/api') :T extends 'settingsModule/' ? typeof import('settingsModule/') :T extends 'settingsModule' ? typeof import('settingsModule') :any;