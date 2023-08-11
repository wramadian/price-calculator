function getNegaraList() {
  return new Promise((resolve, reject) => {
    const apiUrl = 'https://financed.4netps.co.id/ujian/negaras';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data dari API:', data);
        resolve(data); // Menggunakan resolve saat data berhasil diambil
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error); // Menggunakan reject saat terjadi kesalahan
      });
  });
}

function getPelabuhanList(idNegara) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'https://financed.4netps.co.id/ujian/pelabuhans';
    const filter = encodeURIComponent(JSON.stringify({
      where: {
        negaraId: idNegara
      }
    }));
  
    const urlWithFilter = `${apiUrl}?filter=${filter}`;
  
    fetch(urlWithFilter)
      .then(response => {
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data.');
        }
        return response.json();
      })
      .then(data => {
        resolve(data); // Menggunakan resolve saat data berhasil diambil
      })
      .catch(error => {
        reject(error); // Menggunakan reject saat terjadi kesalahan
      });
  });
}

function getBarangList(idPelabuhan) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'https://financed.4netps.co.id/ujian/barangs';
    const filter = encodeURIComponent(JSON.stringify({
      where: {
        pelabuhanId: idPelabuhan
      }
    }));
  
    const urlWithFilter = `${apiUrl}?filter=${filter}`;
  
    fetch(urlWithFilter)
      .then(response => {
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat mengambil data.');
        }
        return response.json();
      })
      .then(data => {
        resolve(data); // Menggunakan resolve saat data berhasil diambil
      })
      .catch(error => {
        reject(error); // Menggunakan reject saat terjadi kesalahan
      });
  });
}

export {
  getNegaraList,
  getPelabuhanList,
  getBarangList
}