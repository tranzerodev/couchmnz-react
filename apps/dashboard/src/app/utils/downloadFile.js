
import axios from '../../auth/AxiosInstance';

export const downloadFileWithAuth = (url, filename) => {
  axios({
    url,
    method: 'GET',
    responseType: 'blob'
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });
};
