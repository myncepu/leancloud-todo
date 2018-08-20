import AV from 'leancloud-storage'

const APP_ID = 'xRp28ib4La5GhSklAG6StzkT-gzGzoHsz'
const APP_KEY = '25dbkMyW0oeCKYT6pGH2C5nn'

export default () => AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
