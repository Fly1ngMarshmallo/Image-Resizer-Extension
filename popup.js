document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('file');
    const files = fileInput.files;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const format = document.getElementById('format').value;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        const image = new Image();
        image.src = reader.result;
        image.onload = function() {
          
            const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          
          const data = canvas.toDataURL(format);
          
          const link = document.createElement('a');
          link.download = `${file.name.split('.')[0]}_resized.${format.split('/')[1].split(';')[0]}`;
          link.href = data;
          link.click();
        };
      };
    }
  });
  