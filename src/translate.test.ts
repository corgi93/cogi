import * as path from 'path'
import { resolveApp } from './index'
import {
    getTransInfoFromPath,
    readLngTranslation,
    readTranslations
} from './translate'

describe('translate', () => {
    it('should return object as ITranslation ', () => {
        const transPath = path.join(
            process.cwd(),
            'test/locales/en/translations.json'
        )
        const transFile = {
            filename: 'file',
            lng: 'en',
            namespace: 'namespace',
            path: transPath
        }
        const result = readLngTranslation(transFile)
        expect(result).toEqual({
            keys: [
                'id',
                'password',
                'Product Name',
                'Product Price',
                'manufacturer',
                'discount',
                'date',
                'Product'
            ],
            translationFile: transFile
        })
    })

    it('should readTranslations() return correctly', () => {
        const fileInfo = [
            {
                filename: 'locales',
                lng: 'en',
                namespace: 'translation',
                path: path.join(
                    process.cwd(),
                    'test/locales/en/translations.json'
                )
            },
            {
                filename: 'locales',
                lng: 'ko',
                namespace: 'translation',
                path: path.join(
                    process.cwd(),
                    'test/locales/ko/translations.json'
                )
            }
        ]
        const read = readTranslations(fileInfo)
        expect(read).toEqual([
            {
                keys: [
                    'id',
                    'password',
                    'Product Name',
                    'Product Price',
                    'manufacturer',
                    'discount',
                    'date',
                    'Product'
                ],
                translationFile: {
                    filename: 'locales',
                    lng: 'en',
                    namespace: 'translation',
                    path: path.join(
                        process.cwd(),
                        'test/locales/en/translations.json'
                    )
                }
            },
            {
                keys: [
                    'id',
                    'password',
                    'Product Name',
                    'Product Price',
                    'manufacturer',
                    'discount',
                    'date',
                    'email'
                ],
                translationFile: {
                    filename: 'locales',
                    lng: 'ko',
                    namespace: 'translation',
                    path: path.join(
                        process.cwd(),
                        'test/locales/ko/translations.json'
                    )
                }
            }
        ])
    })

    it('should getTransInfoFromPath() return correctly', () => {
        const result = getTransInfoFromPath(resolveApp('test/locales'))
        expect(result).toEqual([
            {
                keys: [
                    'id',
                    'password',
                    'Product Name',
                    'Product Price',
                    'manufacturer',
                    'discount',
                    'date',
                    'Product'
                ],
                translationFile: {
                    filename: 'translations.json',
                    lng: 'en',
                    namespace: 'translations',
                    path: path.join(
                        process.cwd(),
                        'test/locales/en/translations.json'
                    )
                }
            },
            {
                keys: [
                    'id',
                    'password',
                    'Product Name',
                    'Product Price',
                    'manufacturer',
                    'discount',
                    'date',
                    'email'
                ],
                translationFile: {
                    filename: 'translations.json',
                    lng: 'ko',
                    namespace: 'translations',
                    path: path.join(
                        process.cwd(),
                        'test/locales/ko/translations.json'
                    )
                }
            }
        ])
    })
})
