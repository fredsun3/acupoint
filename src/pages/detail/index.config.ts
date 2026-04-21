export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '穴位详情',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enableShareAppMessage: true
    })
  : {
      navigationBarTitleText: '穴位详情',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enableShareAppMessage: true
    }
