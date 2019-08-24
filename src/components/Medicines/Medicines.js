import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Layout from '../Layout'

class Medicines extends Component {
  constructor (props) {
    super(props)
    this.state = {
      medicines: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/medicines`)
      .then(res => this.setState({ medicines: res.data.medicines }))
      .catch(console.error)
  }

  render () {
    const { medicine } = this.state
    const { user } = this.props

    const medicinesArray = medicine.map(book => (
      <ListGroup.Item
        key={medicine._id}
        action
        as={Link}
        to={`/medicines/${medicine._id}`}
      >
        {medicine.title}
      </ListGroup.Item>
    ))

    return (
      <Layout>
        <h3 className="d-flex justify-content-between">Medicine{user && <Button href="#createmedicine">Add your Medicine</Button>}</h3>
        <ListGroup>
          {medicinesArray}
        </ListGroup>
      </Layout>
    )
  }
}

export default Medicines
