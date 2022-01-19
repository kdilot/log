# Next with NextAuth

### NextAuth 소셜로그인 적용 테스트

- Kakao
- Google

## Installation and Usage

### Package

dependencies

- create-next-app (설치된 next 버전 v12.0.7, node 버전 최소 v14.17.0)
- next-auth
- @emotion/react, @emotion/styled (css 스타일링을 위함)

devDependencies

- @types/next-auth
- @emotion/babel-plugin (css 스타일링을 위함)

### 개발자센터 등록

`Kakao`, `Google` 개발자 센터에 등록후 Redirect URI 설정

- `http://localhost:3010/api/auth/callback/{social}`

### .env

PORT 3010 으로 테스트를 진행

```ts
NEXT_PUBLIC_KAKAO_CLIENT_ID=카카오 클라이언트 아이디
NEXT_PUBLIC_KAKAO_CLIENT_SECRET=비밀키라고 되어있으나 아무 string 값 입력
NEXT_PUBLIC_GOOGLE_CLIENT_ID=구글 클라이언트 아이디
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=구글 pwd 키
NEXTAUTH_URL=http://localhost:3010
```

### [..nextauth].ts

파일경로 : `api -> auth -> 생성`

```ts
import NextAuth from "next-auth";
import KakaoProviders from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { NextApiHandler } from "next";

const nextAuth: NextApiHandler = (req, res) => NextAuth(req, res, options);

const options = {
  providers: [
    KakaoProviders({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};
export default nextAuth;
```

### \_app.tsx

NextAuth session 추가

```ts
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
```

### index.tsx

```ts
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
...
const Home: NextPage = () => {
  const { data }: SessionProps = useSession();

  if (data) {
    return (
      <Wrapper style={{ flexDirection: "column" }}>
        <div>Signed in as {data?.user?.email}</div>
        <Button onClick={() => signOut()} data-type="signout">
          Sign out
        </Button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Button onClick={() => signIn("google")} data-type="google">
        Google Sign in
      </Button>
      <Button onClick={() => signIn("kakao")} data-type="kakao">
        Kakao Sign in
      </Button>
    </Wrapper>
  );
};
```

### .babelrc

@emotion/babel-plugin 설치시

```typescript
{
	"presets":["next/babel"],
	"plugins":["@emotion"]
}
```

## Comment

- 기본적인 테스트만 진행해서 로그인 후 session 저장 및 해당 상태에 따라 보여지는 정보만 작업
- 추가 테스트가 필요한 부분
  - DB로 성공된 결과정보 등록
  - 성공 실패에 따른 라우팅 처리
