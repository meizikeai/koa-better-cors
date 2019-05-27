interface config {
  origin?: any
  methods?: string
}

declare function BetterCors(config?: config): null

export = BetterCors