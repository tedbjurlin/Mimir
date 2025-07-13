# Mimir

> [!Warning]
> This project is a first draft. It is entirely likely that I will start over from scratch several times as Mimir develops.

Mimir is an opinionated note-taking and writing application designed to seamlessly merge the processes of learning and creating. By integrating writing, from small ideas to academic papers, into a web of personal notes and references, Mimir empowers you to understand how everything you think about is connected.

This application is inspired by knowledge management systems like Obsidian and Zettelkasten, but extends them by enabling the user to link their notes to their long form writing.

## Three Types of Notes

Following my own note-taking practices, Mimir is structured around three distinct types of notes: reference, concept, and thought.

Each reference note represents a single piece of reference material. This could be a book, a movie, a talk, etc. A reference note contains all of the insights and information taken from this piece of reference material.

Over time, these reference notes get processed into concept notes. Each concept note contains a single atomic concept. This facilitates the ability to create a dense network of links between notes. Concept notes should be purely concepts taken from the outside world, such as facts or theories.

On the other hand, thought notes are for personal thoughts and ideas. These notes don't have titles, and are encouraged to be short and succinct. The are loosely designed after the Zettelkasten system. Ideally, longer and more complex ideas should be expanded upon as writings, rather than as thought notes.

## Writings

Writings are the other half of the Mimir system. They are any kind of long form wriitng that the user is producing. Mimir will support Markdown, LaTeX, and Typst for long form writings.

In order to further facilitate networked thinking, Mimir enables users to create links in both directions between notes and writings. In notes, this can be done through simple hyperlinks. On the writing side, links will be tracked seperately by Mimir so they don't interfere with the document.

## Project Goals

- Note-taking
  - [ ] Linking between all three types of notes.
  - [ ] Clear and obvious user interface for each style of note.
  - [ ] Ability to define templates for each style of note.
  - [ ] Allowing both Typst and Markdown as note languages.
- Writing
  - [ ] Markdown support.
  - [ ] Typst support.
  - [ ] LaTeX support.
  - [ ] Tracking links from documents to notes or other documents.