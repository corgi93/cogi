import * as fs from 'fs'
import * as path from 'path'

export function translationPath(localesRoot: string): IFileInfo[] {
    const lngFiles = fs.readdirSync(localesRoot)
    const locales: IFileInfo[] = []

    for (const lngFile of lngFiles) {
        const nsPath = path.join(localesRoot, lngFile)
        const nsFiles = fs.readdirSync(nsPath)

        for (const nsFile of nsFiles) {
            const namespace = /([\w]{0,100})\.json/g
            if (nsFile.match(namespace)) {
                const totalPath = path.join(localesRoot, lngFile, nsFile)
                locales.push({
                    filename: nsFile,
                    lng: lngFile,
                    namespace: nsFile.split('.')[0],
                    path: totalPath
                })
            }
        }
    }
    return locales
}

interface IFileInfo {
    lng: string
    namespace: string
    filename: string
    path: string
}

export interface ITranslation {
    translationFile: IFileInfo
    keys: string[]
}

export function readTranslations(fileInfos: IFileInfo[]): ITranslation[] {
    const transList = []
    for (const transInfo of fileInfos) {
        const translation = readLngTranslation(transInfo)
        transList.push(translation)
    }
    return transList
}

export function readLngTranslation(fileInfo: IFileInfo): ITranslation {
    const readFile = fs.readFileSync(fileInfo.path)
    const data = JSON.parse(readFile.toString('utf-8'))
    const containKeys = []

    for (const dataKey in data) {
        if (!data.hasOwnProperty(dataKey)) {
            continue
        }

        containKeys.push(dataKey)
    }

    return { translationFile: fileInfo, keys: containKeys }
}

export function getTransInfoFromPath(localeRoot: string): ITranslation[] {
    const fileInfos = translationPath(localeRoot)
    return readTranslations(fileInfos)
}
