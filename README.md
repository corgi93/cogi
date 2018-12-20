# cogi
cogi is a simple JSON lint tool written by TypeScript
If you have a lot of keys in JSON file, it can cause a mistake
(To make a typo or to add a wrong key value)
this lint tool will catch these errors


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
