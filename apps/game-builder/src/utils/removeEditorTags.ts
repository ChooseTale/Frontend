export function removeEditorTags(htmlString: string): string {
  return htmlString.replace(/<\/?(p|br|em|div|hr|blockquote)[^>]*>/g, "");
}
