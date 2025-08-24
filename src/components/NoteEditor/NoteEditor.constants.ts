import MarkdownIt from "markdown-it"
import { MarkdownParser } from "prosemirror-markdown"
import { MarkSpec, Schema } from "prosemirror-model"
import { listIsTight } from "./NoteEditor.helpers"

export const TYPING_TIMEOUT = 500;

const MD = MarkdownIt("commonmark", {html: false})
  // .use(require("markdown-it-wikilinks")({baseURL: "", relativeBaseURL: "", htmlAttributes: {
  //   "class": "internal-link",
  //   "rel": "nofollow",
  // }}))


/// Document schema for the data model used by CommonMark.
export const markdownSchema: Schema<"blockquote" | "image" | "text" | "paragraph" | "code_block" | "doc" | "horizontal_rule" | "heading" | "ordered_list" | "bullet_list" | "list_item" | "hard_break" | "internal_link", "link" | "code" | "em" | "strong">
= new Schema({
  nodes: {
    doc: {
      content: "block+"
    },

    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{tag: "p"}],
      toDOM() { return ["p", 0] }
    },

    blockquote: {
      content: "block+",
      group: "block",
      parseDOM: [{tag: "blockquote"}],
      toDOM() { return ["blockquote", 0] }
    },

    horizontal_rule: {
      group: "block",
      parseDOM: [{tag: "hr"}],
      toDOM() { return ["div", ["hr"]] }
    },

    heading: {
      attrs: {level: {default: 1}},
      content: "(text | image)*",
      group: "block",
      defining: true,
      parseDOM: [{tag: "h1", attrs: {level: 1}},
                 {tag: "h2", attrs: {level: 2}},
                 {tag: "h3", attrs: {level: 3}},
                 {tag: "h4", attrs: {level: 4}},
                 {tag: "h5", attrs: {level: 5}},
                 {tag: "h6", attrs: {level: 6}}],
      toDOM(node) { return ["h" + node.attrs.level, 0] }
    },

    code_block: {
      content: "text*",
      group: "block",
      code: true,
      defining: true,
      marks: "",
      attrs: {params: {default: ""}},
      parseDOM: [{tag: "pre", preserveWhitespace: "full", getAttrs: node => (
        {params: (node as HTMLElement).getAttribute("data-params") || ""}
      )}],
      toDOM(node) { return ["pre", node.attrs.params ? {"data-params": node.attrs.params} : {}, ["code", 0]] }
    },

    ordered_list: {
      content: "list_item+",
      group: "block",
      attrs: {order: {default: 1}, tight: {default: false}},
      parseDOM: [{tag: "ol", getAttrs(dom) {
        return {order: (dom as HTMLElement).hasAttribute("start") ? +(dom as HTMLElement).getAttribute("start")! : 1,
                tight: (dom as HTMLElement).hasAttribute("data-tight")}
      }}],
      toDOM(node) {
        return ["ol", {start: node.attrs.order == 1 ? null : node.attrs.order,
                       "data-tight": node.attrs.tight ? "true" : null}, 0]
      }
    },

    bullet_list: {
      content: "list_item+",
      group: "block",
      attrs: {tight: {default: false}},
      parseDOM: [{tag: "ul", getAttrs: dom => ({tight: (dom as HTMLElement).hasAttribute("data-tight")})}],
      toDOM(node) { return ["ul", {"data-tight": node.attrs.tight ? "true" : null}, 0] }
    },

    list_item: {
      content: "block+",
      defining: true,
      parseDOM: [{tag: "li"}],
      toDOM() { return ["li", 0] }
    },

    text: {
      group: "inline"
    },

    image: {
      inline: true,
      attrs: {
        src: {},
        alt: {default: null},
        title: {default: null}
      },
      group: "inline",
      draggable: true,
      parseDOM: [{tag: "img[src]", getAttrs(dom) {
        return {
          src: (dom as HTMLElement).getAttribute("src"),
          title: (dom as HTMLElement).getAttribute("title"),
          alt: (dom as HTMLElement).getAttribute("alt")
        }
      }}],
      toDOM(node) { return ["img", node.attrs] }
    },

    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{tag: "br"}],
      toDOM() { return ["br"] }
    },

    internal_link: {
      inline: true,
      group: "inline",
      attrs: {
        href: {},
        title: {default: null}
      },
      parseDOM: [{tag: "a[href].internal-link", getAttrs(dom) {
        return {href: (dom as HTMLElement).getAttribute("href"), title: dom.getAttribute("title")}
      }}],
      toDOM(node) { return ["a", {class: "internal-link"}, node.attrs, 0] }
    }
  },

  marks: {
    em: {
      parseDOM: [
        {tag: "i"}, {tag: "em"},
        {style: "font-style=italic"},
        {style: "font-style=normal", clearMark: m => m.type.name == "em"}
      ],
      toDOM() { return ["em"] }
    },

    strong: {
      parseDOM: [
        {tag: "strong"},
        {tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null},
        {style: "font-weight=400", clearMark: m => m.type.name == "strong"},
        {style: "font-weight", getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null}
      ],
      toDOM() { return ["strong"] }
    } as MarkSpec,

    link: {
      attrs: {
        href: {},
        title: {default: null}
      },
      inclusive: false,
      parseDOM: [{tag: "a[href]", getAttrs(dom) {
        return {href: (dom as HTMLElement).getAttribute("href"), title: dom.getAttribute("title")}
      }}],
      toDOM(node) { return ["a", node.attrs] }
    },

    code: {
      code: true,
      parseDOM: [{tag: "code"}],
      toDOM() { return ["code"] }
    }
  }
})


/// A parser parsing slightly extended [CommonMark](http://commonmark.org/),
/// without inline HTML, with internal links, and producing a document in the basic schema.
export const extendedMarkdownParser = new MarkdownParser(markdownSchema, MD, {
  blockquote: {block: "blockquote"},
  paragraph: {block: "paragraph"},
  list_item: {block: "list_item"},
  bullet_list: {block: "bullet_list", getAttrs: (_, tokens, i) => ({tight: listIsTight(tokens, i)})},
  ordered_list: {block: "ordered_list", getAttrs: (tok, tokens, i) => ({
    order: +tok.attrGet("start")! || 1,
    tight: listIsTight(tokens, i)
  })},
  heading: {block: "heading", getAttrs: tok => ({level: +tok.tag.slice(1)})},
  code_block: {block: "code_block", noCloseToken: true},
  fence: {block: "code_block", getAttrs: tok => ({params: tok.info || ""}), noCloseToken: true},
  hr: {node: "horizontal_rule"},
  image: {node: "image", getAttrs: tok => ({
    src: tok.attrGet("src"),
    title: tok.attrGet("title") || null,
    alt: tok.children![0] && tok.children![0].content || null
  })},
  hardbreak: {node: "hard_break"},
  internal_link: {node: "internal_link", getAttrs: tok => ({
    href: tok.attrGet("href"),
    title: tok.attrGet("title") || null
  })},

  em: {mark: "em"},
  strong: {mark: "strong"},
  link: {mark: "link", getAttrs: tok => ({
    href: tok.attrGet("href"),
    title: tok.attrGet("title") || null
  })},
  code_inline: {mark: "code", noCloseToken: true}
})

