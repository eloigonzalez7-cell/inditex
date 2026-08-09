# Security

## Episode HTML content

Episode descriptions from Apple Podcasts may contain raw HTML. The application renders that HTML so formatting is preserved, but **must sanitize it before injection** using DOMPurify.

Allowed outcome: safe markup for presentation (paragraphs, links, lists, emphasis).  
Disallowed: scripts, inline event handlers, and other executable content.

## Reporting

This is a challenge repository. If you discover an issue while reviewing, open a GitHub issue or contact the author directly.
