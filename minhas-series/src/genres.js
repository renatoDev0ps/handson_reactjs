import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Genres = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteGenre = id => {
    axios
      .delete('/api/genres/' + id)
      .then(res => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado)
      })
  }

  const renderLine = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <th className=''>
          <button type='button' className='btn btn-danger mr-1' onClick={() => deleteGenre(record.id)}>Delete</button>
          <Link to={'/genres/' + record.id} className='btn btn-warning'>Update</Link>
        </th>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Generos</h1>
        <div className='alert alert-warning' role='alert'>
          Você não possui generos criados.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Generos</h1>
      <Link to='/genres/new' className='btn btn-primary mb-1'>Novo Genero</Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderLine)}
        </tbody>
      </table>
    </div>
  )
}

export default Genres