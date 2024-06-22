import COS from 'cos-js-sdk-v5'

export const cos = new COS({
  SecretId: import.meta.env.VITE_COS_SECRET_ID,
  SecretKey: import.meta.env.VITE_COS_SECRET_KEY
})

/**
 * 获取文件预览地址
 * @param key 文件 key 地址
 */
export function getCosObjectUrl(key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const bucket = import.meta.env.VITE_COS_BUCKET
    const region = import.meta.env.VITE_COS_REGION

    if (!bucket || !region) {
      console.error('Bucket or region is not defined in environment variables')
      reject('Bucket or region is not defined in environment variables')
      return
    }

    cos.getObjectUrl(
      {
        Bucket: bucket, // 填写自己的 bucket，必须字段
        Region: region, // 存储桶所在地域，必须字段
        Key: key, // 存储在桶里的对象键（例如：1.jpg，a/b/test.txt），必须字段
        Sign: true
      },
      function (err: any, data: any) {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve(data.Url)
      }
    )
  })
}
