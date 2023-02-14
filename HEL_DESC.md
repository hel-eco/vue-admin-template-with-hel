
## 提供方改造

### 安装相关包
npm i hel-lib-proxy hel-dev-utils typescript@4.8 rollup@2 rollup-plugin-typescript rollup-plugin-terser shx

### 下沉入口文件
将原来的 `src/main.js` 内容复制到 `src/loadApp.js` 里

### 新增模块暴露目录
新增 `src/entrance` 目录作为统一暴露模块的出口目录

### 新增模块名描述文件
新增 `src/configs/subApp.js` 文件描述模块名

### 改造 `main.js`
引入 `hel-lib-proxy` 包，做分流控制

### 构建层引入模块描述文件
根目录引入 `subApp.js` 文件，对接 `hel-dev-utils`，供构建工具的`vue.config.js`文件使用，主要改动有
- `vue.config.js`里修改 publicPath、distDir、output.jsonpFunction、externals
- `public/index.html` 引入cdn vue
- `package.json` 启动命令里声明 PORT，对齐 publicPath 里的端口号
- 复制 https://github.com/hel-eco/hel-tpl-remote-vue-comp/tree/master/scripts 三个文件到 `scripts` 目录下
- `package.json` 新增命令 `build`用于构建hel包，可参考 https://github.com/hel-eco/hel-tpl-remote-vue-comp/blob/master/package.json 直接复制
- `package.json` 新增 `files` 表示npm发布要提交的文件范围

### 发布
npm run build
npm publish


## 使用方使用

### 懒加载
<Hamburger />

```ts
export default {
  components: {
    Hamburger: defineAsyncComponent(async () => {
      const comps = await preFetchLib("lib-zhangbb");
      return comps.Hamburger;
    }),
  },
};
```

### 预加载 
原入口文件下沉，然后加载远程模块，参考 https://github.com/hel-eco/hel-demo-use-remote-vue3-comp/blob/main/src/main.ts
```ts
await preFetchLib('lib-zhangbb')
```

然后安装`lib-zhangbb`, 其他地方可import 静态导入模块
```ts
import { Hamburger } from 'lib-zhangbb';
```