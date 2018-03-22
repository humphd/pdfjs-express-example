let pdfjs = window.pdfjsLib;

let renderFirstPage = pdfDoc => {
  let canvas = document.getElementById("pdf-canvas");
  let ctx = canvas.getContext("2d");
  let scale = 1.0;
  let pageNum = 1;

  pdfDoc.getPage(pageNum).then(page => {
    let viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    page.render({
      canvasContext: ctx,
      viewport
    });
  });
};

var xhr = new XMLHttpRequest();
xhr.open("GET", "/pdf", true);
// NOTE: request binary data, see:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
xhr.responseType = "arraybuffer";
xhr.onload = function() {
  let binaryData = xhr.response;
  pdfjs.getDocument(binaryData).then(renderFirstPage);
};
xhr.send();
