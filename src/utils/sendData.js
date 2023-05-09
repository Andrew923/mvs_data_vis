import { backend } from "../App.js";

async function SendData(files, setLoading) {
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
  let success = false;
  await fetch(`${backend}/upload`, {
    method: 'PUT',
    body: formData
  }).then(response => response.json())
  .then(data => {success = data.success})
  .catch(error => console.log(error))
  .finally(() => setLoading(false));
  return success;
}

export default SendData;