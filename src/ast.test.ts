import * as fs from 'fs'
import * as path from 'path'
import ts from 'typescript'
import { getInfo, visit } from './ast'
import { readData } from './files'
import { getErrorsFrom, resolveApp } from './index'
import { getTransInfoFromPath } from './translate'

describe('AST extract', () => {
    it('should be extract keyValue', () => {
        const examPath =
            'C:\\Users\\JINI\\workspace\\novo\\cogi\\test\\src\\exam\\ab.ts'
        const data: any[] = []
        const stream = fs.createReadStream(examPath)
        stream.on('data', chunk => {
            data.push(chunk)
        })

        stream.on('end', () => {
            const sourceFile = ts.createSourceFile(
                'test.ts',
                Buffer.concat(data).toString(), // stream to string data
                ts.ScriptTarget.Latest,
                true
            )
            expect(visit(sourceFile, 'test.ts')).toEqual([
                { column: 0, filename: 'test.ts', key: 'date', line: 0 }
            ])
        })
    })

    it('should read data return correctly ', async () => {
        const filePath = path.join(process.cwd(), 'test/src/exam/ab.ts')
        const data = await readData(filePath)
        expect(data).toEqual("// t('ab Keys')\n" + "t('date')\n")
    })

    it('should getInfo return correctly', () => {
        const code = `t('date')\n t('Product')`
        expect(getInfo('test', code)).toEqual([
            { column: 0, filename: 'test', key: 'date', line: 0 },
            { column: 0, filename: 'test', key: 'Product', line: 0 }
        ])
    })
})

describe('index test', () => {
    it('should getErrorFrom() return perfect message when no errors', () => {
        const code = `t('date')\n t('Product Name')`
        const infos = getInfo('test.ts', code)
        const localesPath = resolveApp(path.join(process.cwd(), 'test/locales'))
        expect(getErrorsFrom(infos, getTransInfoFromPath(localesPath))).toEqual(
            []
        )
    })

    it('should getErrorFrom() return errors when key is wrong', () => {
        const code = `t('date')\n t('Product')\n t('dueDate')`
        const infos = getInfo('test.ts', code)
        const localesPath = resolveApp(path.join(process.cwd(), 'test/locales'))
        expect(getErrorsFrom(infos, getTransInfoFromPath(localesPath))).toEqual(
            [
                "'test.ts' : can't find 'Product' from 'test\\locales\\ko\\translations.json'",
                "'test.ts' : can't find 'dueDate' from 'test\\locales\\en\\translations.json'",
                "'test.ts' : can't find 'dueDate' from 'test\\locales\\ko\\translations.json'"
            ]
        )
    })
})
