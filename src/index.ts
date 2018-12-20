import chalk from 'chalk'
import path from 'path'
import { getInfo, IInfo } from './ast'
import { getFiles, readData } from './files'
import { getTransInfoFromPath, ITranslation } from './translate'

const root = process.cwd()
export const resolveApp = (destination: string) => {
    return path.resolve(root, destination)
}
const srcPath = resolveApp('src')
const localesPath = resolveApp('locales')

// noinspection JSUnusedGlobalSymbols
export async function main() {
    for (const file of getFiles(srcPath)) {
        const data = await readData(file)
        const infos = getInfo(file, data)
        const translations = getTransInfoFromPath(localesPath)
        const results = getErrorsFrom(infos, translations)

        for (const result of results) {
            console.error(chalk.red(result))
        }
    }
}

export function getErrorsFrom(
    infos: IInfo[],
    translations: ITranslation[]
): string[] {
    const validationArray: string[] = []
    const set = new Set()

    for (const info of infos) {
        for (const translation of translations) {
            let hasKey: boolean = false
            for (const key of translation.keys) {
                if (info.key === key) {
                    hasKey = true
                }
            }
            set.add(hasKey)

            if (set.has(false)) {
                const relativeFilePath = path.relative(
                    process.cwd(),
                    info.filename
                )
                const relativeJSONPath = path.relative(
                    process.cwd(),
                    translation.translationFile.path
                )
                validationArray.push(
                    `'${relativeFilePath}' : can't find '${
                        info.key
                    }' from '${relativeJSONPath}'`
                )
            }
        }
    }
    return validationArray
}
