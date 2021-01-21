import compress from 'compress-base64';

function Base64 (files, nombre, setLibro) {

  var value = files
  const reader = new FileReader();
  reader.readAsDataURL(value[0]);
  reader.onload = () => {
      var fileInfo = {
          name: value.name,
          type: value.type,
          size: Math.round(value.size / 1000) + ' kB',
          base64: reader.result,
          file: value,
      }
      compress(fileInfo.base64, {
        width: 400,
        type: 'image/png', // default
        max: 200, // max size
        min: 20, // min size
        quality: 0.8
      }).then( result => { 
        setLibro(nombre,result);
      });
  }
}

export default Base64;