export const webviewHtml = `
<html>
  <head>
    <style>
      body {
        background: white !important;
        color: black !important;
      }
    </style>
  </head>
  <body>
    <h1>TS Error Colorizer</h1>
    <div id="output"></div>

    <script>
      const input = <REPLACE>;
      console.info('input', input);

      const lines = input.split("\\n");
      const outputEl = document.createElement("div");

      const regex = /(.+?)('.+?')(.+?)('.+)/;

      for (const line of lines) {
        const lineEl = document.createElement("div");
        outputEl.appendChild(lineEl);
        lineEl.style.marginTop = "20px";

        const parts = line.split(regex);
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          const partEl = document.createElement("div");
          lineEl.appendChild(partEl);
          partEl.style.marginLeft = (10 * i) + "px";
          const contentEl = document.createElement("span");
          partEl.appendChild(contentEl);
          contentEl.textContent = part;
          if (part.startsWith("'")) contentEl.style.backgroundColor = "yellow";
        }
      }

      document.getElementById("output").innerHTML = outputEl.innerHTML;
    </script>
  </body>
</html>
`;
