import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import Layout from '../Layout'

class CreateMedicine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: {
        doctor: '',
        prescribed: '',
        description: '',
        dueDate: ''
      },
      createdMedicineId: null
    }
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedMedicine = Object.assign(this.state.book, updatedField)
    this.setState({ medicine: editedMedicine })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/medicines`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { medicine: this.state.medicine }
    })
      .then(res => this.setState({ createdMedicineId: res.data.medicine._id }))
      .then(() => this.props.alert('You created a new medicne', 'success'))
      .catch(console.error)
  }

  render () {
    const { createdMedicineId, medicine } = this.state

    if (createdMedicineId) {
      return <Redirect to={`/medicines/${createdMedicineId}`} />
    }

    return (
      <Layout>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
              value={medicine.name}
            />
          </Form.Group>
          <Form.Group controlId="doctor">
            <Form.Label>Doctor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doctor"
              name="doctor"
              onChange={this.handleChange}
              value={medicine.doctor}
            />
          </Form.Group>
          <Form.Group controlId="prescribed">
            <Form.Label>Prescribed</Form.Label>
            <Form.Control
              type="date"
              placeholder="Prescribed"
              name="prescribed"
              onChange={this.handleChange}
              value={medicine.prescribed}
            />
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                onChange={this.handleChange}
                value={medicine.description}
              />
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date
                  <Form.Control
                    type="date"
                    placeholder="dueDate"
                    name="dueDate"
                    onChange={this.handleChange}
                    value={medicine.description}
                  />
                </Form.Label>
              </Form.Group>
              <Button variant="primary" type="submit">
        Submit
              </Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </Layout>

    )
  }
}

export default CreateMedicine
