type ErrorsSVGType = Record<string, string>

const errorsMap: ErrorsSVGType = {
  Error404Img: require('./404.svg').default,
  Error500Img: require('./500.svg').default,
  Error402Img: require('./500.svg').default

}
export default errorsMap
