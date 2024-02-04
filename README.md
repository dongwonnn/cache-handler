## next.js shared cache example with Redis

프론트엔드(Next.js), 백엔드(JSON-server), 그리고 모의 데이터를 활용한 DB 파이프라인 구성 프로젝트입니다.

### Redis 연결
local 세팅

> brew install redis
>
> brew services start redis

### cache handler 세팅
```typescript
const nextConfig = {
  /*
   * 1. new Map()을 이용한 cache handler
   * 2. redis를 이용한 cache handler
   * 3. neshca를 이용한 cache handler
   * */
  // cacheHandler: require.resolve("./cache-handler-custom.js"),
  // cacheHandler: require.resolve('./cache-handler-redis.js'),
  // cacheHandler: require.resolve('./cache-handler-neshca.js'),

  // disabled file system memory
  cacheMaxMemorySize: 0,

};

module.exports = nextConfig;
```


## instance 실행
### 단일 instance 실행

> npm run instance:single

![스크린샷 2024-02-05 오전 12 34 20](https://github.com/dongwonnn/next-shared-cache-example/assets/59330828/1ceb696b-f856-4e02-b866-ff502a466e46)

### 멀티 instance 실행

> npm run instance:multi

![스크린샷 2024-02-05 오전 12 34 26](https://github.com/dongwonnn/next-shared-cache-example/assets/59330828/30e0170e-65e1-483d-a831-db0291c1849c)
