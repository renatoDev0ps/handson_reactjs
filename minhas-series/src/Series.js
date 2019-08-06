import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteSeries = id => {
    axios
      .delete('/api/series/' + id)
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
          <button type='button' className='btn btn-danger mr-1' onClick={() => deleteSeries(record.id)}>Delete</button>
          <Link to={'/series/' + record.id} className='btn btn-warning'>Update</Link>
        </th>
      </tr>
    )
  }

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link to='/series/new' className='btn btn-primary mb-1'>Nova Séries</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui séries para assistir.
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link to='/series/new' className='btn btn-primary mb-1'>Nova Séries</Link>
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

export default Series