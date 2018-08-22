import variable from './../variables/platform'

export default (variables = variable) => {
  const logoTextTheme = {
    'textContent': {
      fontSize: variables.fontSizeLogo,
      fontFamily: variables.fontFamily,
      color: variables.brandPrimary,
    }
  }

  return logoTextTheme
}
