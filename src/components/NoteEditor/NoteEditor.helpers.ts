import { Token } from "markdown-it/index.js"

export function listIsTight(tokens: readonly Token[], i: number) {
  while (++i < tokens.length)
    if (tokens[i].type != "list_item_open") return tokens[i].hidden
  return false
}