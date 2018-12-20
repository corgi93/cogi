import * as fs from 'fs'
import * as path from 'path'

export function getFiles(dirPath: string): string[] {
    const readPath: string[] = fs.readdirSync(dirPath)
    const arrFiles: string[] = []
    const extensionFile = /\./g
    const tsFileRegex = /\.ts(x)?/g

    for (const dirORFile of readPath) {
        const fullPath = path.join(dirPath, dirORFile)

        if (!dirORFile.match(extensionFile)) {
            const files = getFiles(fullPath)
            arrFiles.push(...files)
        } else if (dirORFile.match(tsFileRegex)) {
            arrFiles.push(fullPath)
        }
    }
    return arrFiles
}

export function readData(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data.toString('utf-8'))
        })
    })
}
