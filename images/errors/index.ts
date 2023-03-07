type ErrorsSVGType = Record<string, string>

const errorsMap: ErrorsSVGType = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Error404Img: require('./404.svg').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Error500Img: require('./500.svg').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Error402Img: require('./500.svg').default
}
export default errorsMap
