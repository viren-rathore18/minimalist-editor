const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const wordCountDisplay = document.getElementById('word-count');
const toggleThemeButton = document.getElementById('toggle-theme');
const downloadButton = document.getElementById('download');

// Load saved content
editor.value = localStorage.getItem('content') || '';
updatePreview();

// Auto-save content to local storage
editor.addEventListener('input', () => {
  localStorage.setItem('content', editor.value);
  updateWordCount();
  updatePreview();
});

// Update word and character count
function updateWordCount() {
  const text = editor.value.trim();
  const words = text.length > 0 ? text.split(/\s+/).length : 0;
  const characters = text.length;
  wordCountDisplay.textContent = `Words: ${words} | Characters: ${characters}`;
}

// Update preview with rendered KaTeX
function updatePreview() {
  preview.innerHTML = editor.value;
  try {
    renderMathInElement(preview, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]
    });
  } catch (error) {
    console.error('KaTeX rendering error:', error);
  }
}

// Initial count and preview update
updateWordCount();

// Toggle dark mode
toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Download content as a text file
downloadButton.addEventListener('click', () => {
  const blob = new Blob([editor.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.txt';
  a.click();
});

function updatePreview() {
  const rawContent = editor.value;
  const markedContent = marked.parse(rawContent);
  preview.innerHTML = markedContent;

  // Render KaTeX after Markdown
  try {
    renderMathInElement(preview, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]
    });
  } catch (error) {
    console.error('KaTeX rendering error:', error);
  }
}
