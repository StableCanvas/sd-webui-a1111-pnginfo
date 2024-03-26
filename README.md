# sd-webui-a1111-pnginfo
pnginfo reader/parser for a1111/webui

# usage
```ts
import { PNGInfo } from '@stable-canvas/sd-webui-a1111-pnginfo';
const $image = /** <img /> ; base64_str ; Blob ; File ...  */ ; 
const pnginfo = new PNGInfo($image);
const params = await pnginfo.getParams();
console.log(params);
```

# todos
- [ ] more formats support
- [ ] support utf8 prompt (exifr problem)
