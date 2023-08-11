import { Autocomplete, Box, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBarangList, getNegaraList, getPelabuhanList } from './utils';

function App() {

  const [masterNegara, setMasterNegara] = useState([]);
  const [masterPelabuhan, setMasterPelabuhan] = useState([]);
  const [masterBarang, setMasterBarang] = useState([]);

  const [selectedNegara, setSelectedNegara] = useState({})
  const [selectedPelabuhan, setSelectedPelabuhan] = useState({})
  const [selectedBarang, setSelectedBarang] = useState({})

  const [harga, setHarga] = useState(0)

  const handleSetNegara = ( _, item ) => {
    setSelectedNegara(item);
    getPelabuhanList(item.id).then((data) =>{
      setMasterPelabuhan(data)
    })
  }
  
  const handleSetPelabuhan = ( _, item ) => {
    setSelectedPelabuhan(item);
    getBarangList(item.id).then((data) =>{
      setMasterBarang(data)
    })
  }

  const handleSetBarang = ( _, item ) => {
    setSelectedBarang(item);
  }

  const handleSetHarga = (e) => {
    if (e.target.value === "") {
      setHarga(0);
    } else if (isNaN(e.target.value.replace(/\./g, ""))) {
      setHarga(harga);
    } else {
      setHarga(e.target.value.replace(/\./g, ""));
    }
  }

  useEffect(() => {
    getNegaraList().then((data) => {
      setMasterNegara(data);
    })
  }, [])

  return (
    <Paper elevation={3} sx={{padding: 2, width: '30%'}}>
      <Stack spacing={2}>
        <Box>
          <Typography variant='body1'>NEGARA</Typography>
          <Autocomplete
            disablePortal
            options={masterNegara || []}
            getOptionLabel={(option) => option?.negara}
            renderInput={(params) => <TextField {...params} placeholder='Pilih negara' />}
            onChange={handleSetNegara}
          />
        </Box>
        <Box>
          <Typography variant='body1'>PELABUHAN</Typography>
          <Autocomplete
            disablePortal
            options={masterPelabuhan || []}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} placeholder='Pilih pelabuhan' />}
            onChange={handleSetPelabuhan}
          />
        </Box>
        <Box>
          <Typography variant='body1'>BARANG</Typography>
          <Autocomplete
            disablePortal
            options={masterBarang}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} placeholder='Pilih barang' />}
            onChange={handleSetBarang}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{marginTop: 1}}
            disabled
            value={selectedBarang?.description}
          />
        </Box>
        <Box>
          <Typography variant='body1'>DISKON</Typography>
          <TextField
            fullWidth
            required
            variant='outlined'
            disabled
            value={selectedBarang?.tarif ? selectedBarang?.tarif + ' %' : 0}
          />
        </Box>
        <Box>
          <Typography variant='body1'>HARGA</Typography>
          <TextField
            fullWidth
            required
            variant='outlined'
            placeholder='Masukkan harga'
            onChange={handleSetHarga}
            value={Number(harga).toLocaleString("id-ID")}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
            }}
          />
        </Box>
        <Box>
          <Typography variant='body1'>TOAL</Typography>
          <TextField
            fullWidth
            required
            variant='outlined'
            disabled
            value={selectedBarang?.tarif ? Number(harga*selectedBarang?.tarif).toLocaleString("id-ID") : 0}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
            }}
          />
        </Box>
      </Stack>
    </Paper>
  )
}

export default App
