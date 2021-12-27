import express from 'express'

const app = express()

// It is important that the full path is specified here
app.get('/.well-known', function(res) {
  const { info } = [{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target" : { "namespace": "android_app", "package_name": "com.example.ithink",
                 "sha256_cert_fingerprints": ["3E:A9:BC:59:A0:C2:9E:52:F1:19:C2:33:4B:F7:72:B9:13:45:C2:E3:20:1A:F5:5B:36:2B:7B:95:1E:85:98:4E"] }
  }]

  res.send(info)
})

export default app