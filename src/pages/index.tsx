import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <h1 onClick={() => {
        router.push('/home')
      }}>
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            <h1>
              欢迎来到
            </h1>
            <h1>
              软件创新实验室
            </h1>
          </h1>
          <p className="py-6">请遵守实验室规章制度, 并人脸打卡.</p>
          <button className="btn btn-primary">开始打卡</button>
        </div>
      </h1>
    </div>
  )
}
