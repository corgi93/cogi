const spawn = require('cross-spawn')
const expect = require('expect.js')

process.chdir('test')
console.log(process.cwd())

let result = ''
function out(cmd) {
    const child = spawn(cmd)
    child.stdout.on('data', function(data) {
        console.log(result)
    })

    child.stderr.on('data', function(data) {
        result = result.concat(data)
        console.error('Error! ' + data)
    })

    child.on('close', function(code) {
        console.log('child process exited with code ' + code)
        expect(result.replace(/\\/g, '/').replace(/\n/g, ' ').trim()).to.be(`
            'src/exam/dk/novo.ts' : can't find 'register' from 'locales/en/translations.json'
            'src/exam/dk/novo.ts' : can't find 'register' from 'locales/ko/translations.json'
            'src/exam/dk/novo.ts' : can't find 'id' from 'locales/en/translations.json'
            'src/exam/dk/novo.ts' : can't find 'id' from 'locales/ko/translations.json'
            'src/exam.ts' : can't find 'Product' from 'locales/ko/translations.json'
            'src/exam.ts' : can't find 'discount' from 'locales/en/translations.json'
            'src/exam.ts' : can't find 'discount' from 'locales/ko/translations.json'
            'src/locale/i18n.ts' : can't find '@@recursive@@' from 'locales/en/translations.json'
            'src/locale/i18n.ts' : can't find '@@recursive@@' from 'locales/ko/translations.json'
        `.replace(/\s{4}/g, '').trim()
        )
    })
}
out('../bin/cogi')
