const imgToBase64 = (src) => {
  const img = new Image();

  img.crossOrigin = 'Anonymous';
  img.src = src;
  
  let dataURL = '';

  img.onload = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 80;
    canvas.width = 80;
    ctx?.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL();
  };

  return dataURL;
}

module.exports = imgToBase64;
