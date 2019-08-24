import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class EditMedicine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: {
        doctor: '',
        prescribed: '',
        description: '',
        dueDate: ''

      }
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books/${this.props.match.params.id}`)
      .then(res => this.setState({ book:
    res.data.book }))
      .catch(console.error)
  }

handleChange = event => {
  const updatedField = {
    [event.target]: event.target.value
  }
  const editedMedicine = Object.assign(this.state.medicine, updatedField)

  this.setState({ medicine: editedMedicine })
}

handleSubmit = event => {
  event.preventDefault()
  axios({
    url: `${apiUrl}/medicines/${this.props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    },
    data: { medicine: this.state.medicine }
  })
    .then(() => this.props.history.push(`/medicines/
      ${this.state.medicine._id}`))
    .then(() => this.props.alert('Your Medicine has been updated', 'successs'))
    .catch(() => this.props.alert('Lol.'))
}
render () {
  const { medicine } = this.state
  return (

    <Form>

      <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId="name">

          <Form.Label>Medicine Name</Form.Label>

          <Form.Control
            type="text" placeholder="Name"
            name="name"
            onChange={this.handleChange}
            value={medicine.name}

          />

        </Form.Group>
        <Form.Group controlId="doctor">

          <Form.Label>Doctor</Form.Label>

          <Form.Control

            type="text"

            placeholder="Docotor"

            name="docotor"

            onChange={this.handleChange}

            value={medicine.doctor}

          />

        </Form.Group>
        <Form.Group controlId="prescribed">

          <Form.Label>Prescribed</Form.Label>

          <Form.Control

            type="date"

            placeholder="prescribed"

            name="prescribed"

            onChange={this.handleChange}

            value={medicine.prescribed}

          />

        </Form.Group>

        <Form.Group controlId="description">

          <Form.Label>Description</Form.Label>

          <Form.Control

            type="text"

            placeholder="description"

            name="description"

            onChange={this.handleChange}

            value={medicine.description}

          />

        </Form.Group>
        <Form.Group controlId="dueDate">

          <Form.Label>Due Date</Form.Label>

          <Form.Control

            type="date"

            placeholder="dueDate"

            name="dueDate"

            onChange={this.handleChange}

            value={medicine.dueDate}

          />

        </Form.Group>
        <Button variant="primary" type="submit">
    Submit

        </Button>
      </Form>
    </Form>
  )
}
}

export default withRouter(EditMedicine)