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
    const validation: string[] = []

    for (const info of infos) {
        for (const translation of translations) {
            let hasKey: boolean = false
            for (const key of translation.keys) {
                if (key === info.key) {
                    hasKey = true
                }
            }

            if (!hasKey) {
                const filename = info.filename
                const transPath = translation.translationFile.path
                const relativeFile = path.relative(process.cwd(), filename)
                const relativeJSON = path.relative(process.cwd(), transPath)
                const errorMessage = `'${relativeFile}' : can't find '${
                    info.key
                }' from '${relativeJSON}'`

                validation.push(errorMessage)
            }
        }
    }
    return validation
}
