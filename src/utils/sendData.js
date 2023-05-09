import { backend } from "../App.js";

function SendData(files, setLoading) {
  setLoading(true);
  const formData = new FormData();
  const appendFiles = (files, path = '') => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // This regex matches up to and including the first slash 
      // to remove the outermost folder name 
      formData.append('files[]', file, file.webkitRelativePath.replace(/^[^/\\]+[/\\]/, ''));
    }
  };
  appendFiles(files);
  fetch(`${backend}/upload`, {
    method: 'PUT',
    body: formData
  }).then(response => response.json())
  .then(data => {if(data.success) {
    console.log("Successful Upload");
    return true;
  }})
  .catch(error => console.log(error))
  .finally(() => setLoading(false));
}

export default SendData;