# Electron with React(Vite)

### electron 실행 환경 구성

- vite로 build
- mac os 기준으로 테스트

## Installation and Usage

### react (typescript, vite)

install

```ts
yarn create vite (react-ts 선택)
yarn
```

package.json 코드수정

```ts
"scripts": {
...
  "dev": "vite --port 7000",
...
}
```

### electron

install

```ts
yarn add concurrently cross-env
yarn add -D electron electron-builder
```

package.json 코드수정

```
"main": "public/main.js",
"homepage": "./",
```

```
"scripts : {
  "electron:dev": "vite --port 7000",
  "electron:serve": "concurrently \"cross-env BROWSER=none yarn electron:dev\" \"VITE_ELECTRON_START_URL=http://localhost:7000 electron .\"",
  "electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js"
}
```

```
"build": {
  "extends": null,
  "appId": "com.example.electron",
  "files": [
    "dist/**/*",
    "build/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "directories": {
    "buildResources": "assets"
  }
},
```

vite.config.js 수정

```
// 기본 vite는 dist로 설정되어 있으나 electron build시 경로가 겹쳐서 vite build 경로를 dist => build로 변경
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "build",
  },
});
```

public/main.js

```
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
  });

  const startUrl =
    process.env.VITE_ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
  win.loadURL(startUrl);
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

### electron 실행

```
electron:serve // 실행
electron:build // build
```

## Comment

- vite로 build 후 electron 실행파일 생성하는 속도가 확실히 cra로 build 보다 빠름
- electron으로 실행파일 생성시 기본 용량이 생각보다 높음 (vite 기준 약 400mb)
- next step
  - electron 자체로 제공하는 기능 활용해봐야 함 (ex. 설정 등)
  - react 라우팅 처리시 brower 방식은 안되는 것으로 알아서 hash 방식을 고려
  - 버전을 업데이트 할 때 매번 파일을 배포하는 형태가 아닌 방식도 사용하는지 조사 (electron 자체 기능의 변경이 필요할시 매번 실행파일 재배포가 필요할 것으로 예상)
