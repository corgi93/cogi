import program from 'commander'
import { main } from './index'

program
    .version('0.0.3')
    .description('this is ts-lint tool for detect mistake in i18n')
    .action(() => {
        main()
    })
    .parse(process.argv)
