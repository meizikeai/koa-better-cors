interface originFunc {
  (any): boolean;
}

interface config {
  credentials?: boolean
  expose?: string[]
  headers?: string[]
  maxAge?: string | number
  methods?: string
  origin?: string | boolean | originFunc
}

declare function BetterCors(config?: config): null

export = BetterCors
