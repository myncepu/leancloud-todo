import variable from './../variables/platform'

export default (variables = variable) => {
  const logoTextTheme = {
    'textContent': {
      fontWeight: '700',
      fontSize: variables.fontSizeLogo,
      fontFamily: variables.fontFamily,
      color: variables.brandPrimary,
    }
  }

  return logoTextTheme
}
