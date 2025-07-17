import DOMPurify from 'dompurify';

export function sanitizeEmailBody(body: string): string {
  const clean = DOMPurify.sanitize(body, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
  return clean.replace(/<div><br><\/div>/g, '<p></p>');
}

export function collapseQuotedText(element: HTMLElement): void {
  const quotes = element.querySelectorAll('blockquote');
  quotes.forEach(quote => {
    const btn = document.createElement('button');
    btn.textContent = 'Show quoted text';
    btn.className = 'text-sm text-muted-foreground hover:text-foreground';
    btn.onclick = () => quote.classList.toggle('hidden');
    quote.classList.add('hidden');
    quote.parentNode?.insertBefore(btn, quote.nextSibling);
  });
}
