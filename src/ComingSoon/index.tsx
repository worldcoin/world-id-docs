import { Layout } from 'Layout'
import { memo } from 'react'

export const ComingSoon = memo(function ComingSoon() {
  return (
    <Layout title="Coming soon">
      <div className="text-center">
        <h3>This page currently on redisign</h3>
        <p>You can visit later when we done 🙏</p>
      </div>
    </Layout>
  )
})
