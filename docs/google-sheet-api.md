# Google Sheet API

nextjs 에서 google sheet v4 사용하기

## Installation and Usage

### 사전준비

Google Cloud Platform 설정

```ts
1. GCP 접속 (로그인 or 계정 생성)
2. IAM 및 관리자 - 서비스 계정 - [서비스 계정 만들기]
3. 생성된 계정 접속
	- 세부정보 - [서비스 계정 사용]
	- 키 - [키 추가 - 새 키 만들기] - JSON 생성
	- JSON 파일 내 private_key, client_email 복사
```

구글 Sheet 생성

```ts
1. Sheet 생성
2. 공유 - [client_email] 권한 추가
3. Sheet 접속
4. https://docs.google.com/spreadsheets/d/[sheet_id]/edit#gid=[sheet_range] sheet 정보 복사
```

### packages

```ts
yarn add googleapis
```

### sheet API

시트의 첫 줄은 컬럼명으로 사용 (ex id, name, address)

```ts
import { google } from "googleapis";

const target = ["https://www.googleapis.com/auth/spreadsheets"];
const jwt = new google.auth.JWT(
  client_email,
  "",
  (private_key || "").replace(/\\n/g, "\n"),
  target
);
const sheets = google.sheets({ version: "v4", auth: jwt });

// GET
try {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheet_id,
    range: sheet_range,
  });
  const rows = response.data.values;

  if (rows.length) {
    return rows
      .map((row) => ({
        id: row[0],
        name: row[1],
        address: row[2],
      }))
      .slice(1); // 첫 데이터는 컬럼 데이터라 제외
  }
  return [];
} catch (err) {
  console.log(err);
}

// UPDATE
// 전체 데이터를 삭제하고 전체 데이터를 재등록
try {
  const base = ["id", "name", "address"];
  const values =
    list?.map((data) => {
      return [data.id, data.name, data.address];
    }) || [];

  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheet_id,
    range: sheet_range,
  });

  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: sheet_id,
    range: sheet_range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [base, ...values],
    },
  });
} catch (err) {
  console.error(err);
}
```
