import { getFiles } from './files'
import { resolveApp } from './index'

describe('files test', () => {
    it('should return getFiles() correctly', () => {
        const testPath = resolveApp('test')
        expect(getFiles(testPath)).toEqual([
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\exam\\ab.ts',
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\exam\\dk\\novo.ts',
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\exam.ts',
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\exam.tsx',
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\locale\\i18n.ts',
            'C:\\Users\\JINI\\workspace\\cogi\\test\\src\\subdir\\router.ts'
        ])
    })
})
