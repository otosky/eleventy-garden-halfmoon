#!/bin/bash
#
# Copies notes from an Obsidian vault to 11ty project structure.

clear_example_notes() {
  rm -rf ./notes/*.md
}

copy_notes_from_vault() {
  find "$1" -name \*.md -exec cp {} ./notes \;
}

move_index_to_repo_root() {
  cp ./notes/index.md ./
}

main() {
  clear_example_notes
  copy_notes_from_vault "$1"
  move_index_to_repo_root
}

main "$1"
