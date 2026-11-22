import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const c = { bg: '#1f1f1f', fg: '#eeeeee', line: '#888888' };
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    background: c.bg, textColor: c.fg, lineColor: c.line,
    primaryColor: c.bg, primaryTextColor: c.fg, primaryBorderColor: c.line,
    secondaryColor: c.bg, secondaryTextColor: c.fg, secondaryBorderColor: c.line,
    tertiaryColor: c.bg, tertiaryTextColor: c.fg, tertiaryBorderColor: c.line,
    actorBkg: c.bg, actorBorder: c.line, actorTextColor: c.fg, actorLineColor: c.line,
    signalColor: '#aaaaaa', signalTextColor: c.fg,
    noteBkgColor: '#4a4d4e', noteBorderColor: '#4a4d4e', noteTextColor: c.fg,
    labelBoxBkgColor: c.bg, labelBoxBorderColor: c.line, labelTextColor: c.fg, loopTextColor: c.fg,
    activationBkgColor: '#333333', activationBorderColor: c.line, sequenceNumberColor: c.fg,
  },
});

const blocks = document.querySelectorAll('pre code.language-mermaid');
if (blocks.length) {
  blocks.forEach((code) => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = code.textContent;
    code.parentElement.replaceWith(div);
  });
  await mermaid.run();
  document.querySelectorAll('.mermaid svg').forEach((svg) => {
    svg.removeAttribute('style');
    window.svgPanZoom(svg, { zoomEnabled: true, minZoom: 0.5, maxZoom: 5, zoomScaleSensitivity: 0.5,
      mouseWheelZoomEnabled: true, dblClickZoomEnabled: true, panEnabled: true, fit: true, center: true, controlIconsEnabled: true });
  });
}
