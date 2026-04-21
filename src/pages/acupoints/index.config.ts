export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '穴位库',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    })
  : {
      navigationBarTitleText: '穴位库',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }
