# cogi
cogi is a simple JSON lint tool written by TypeScript
If you have a lot of keys in JSON file, it can cause a mistake
(To make a typo or to add a wrong key value)
this lint tool will catch these errors


It searches all directories and files in the src directory to detect ts and tsx files and perform AST analysis.


Compares the argument value of the translation function t () extracted from AST with the key value of JSON files.


### Installation
```bash
npm install cogi
```

### Usage
```bash
cd test
cogi
```

- provided API
```typescript
import { getInfo, IInfo } from './ast'
import { getFiles, readData } from './files'
import { getTransInfoFromPath, ITranslation } from './translate'
```

### CLI
```bash
Usage: cogi [options]

this is ts-lint tool for detect mistake in i18n

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```
