import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const UpdateSeries = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data)
        const genres = res.data.data
        const found = genres.find(value => data.genre === value.name)
        if(found) {
          setGenreId(found.id)
        }
      })
  }, [data])

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'centre',
    backgroundRepeat: 'no-repeat'
  }

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }
  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })  
  }
  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }
  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSuccess(true)
      })
  }
  if (success) {
    return <Redirect to='/series'/>
  }
  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-wieght-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status === 'ASSISTIDO' && <Badge className='mr-1' color='success'>Assistido</Badge> }
                  { data.status === 'PARA_ASSISTIR' && <Badge className='mr-1' color='warning'>Para Assistir</Badge> }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='container'>
        <button className='btn btn-primary mt-2' onClick={() => setMode('EDIT')}>Update</button>
      </div>

      {
        mode === 'EDIT' &&
        <div className='container'>
          <h1>Editar Série</h1>
          <button className='btn btn-primary mt-2' onClick={() => setMode('INFO')}>Cancel</button>
          <form>
            <div className='form-group'>
              <label htmlFor='nome'>Nome da Série</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='nome' aria-describedby='nameHelp' placeholder='Nome da Série'/>          
            </div>
            <div className='form-group'>
              <label htmlFor='nome'>Comentários</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='nome' aria-describedby='nameHelp' placeholder='Comentários da Série'/>          
            </div>
            <div className='form-group'>
              <label htmlFor='nome'>Gêneros</label>
              <select className='form-control mb-2' onChange={onChangeGenre} value={genreId}>
                { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
              </select>
            </div>
            <div className='form-check'>
              <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
              <label className='form-check-label' htmlFor='assistido'>
                Assitido
              </label>
            </div>
            <div className='form-check mb-2'>
              <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIR'} name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')}/>
              <label className='form-check-label' htmlFor='paraAssistir'>
                Para Assistir
              </label>
            </div>
            <button type='button' className='btn btn-primary' onClick={save}>Save</button>
          </form>
        </div>
      }
    </div>
  )
}

export default UpdateSeries