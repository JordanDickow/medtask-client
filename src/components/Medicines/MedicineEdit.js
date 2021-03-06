import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'

class EditMedicine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      medicine: {
        name: '',
        doctor: '',
        prescribed: '',
        description: '',
        dueDate: ''

      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/medicines/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { medicine: this.state.medicine }
    })
  }

handleChange = event => {
  const updatedField = {
    [event.target.name]: event.target.value.name
  }
  const editedMedicine = Object.assign(this.state.medicine, updatedField)
  this.setState({ medicine: updatedField })

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
    .then(res => this.setState({
      medicine: res.data.medicine,
      updated: true
    }))
    .then(() => this.props.history.push(`/medicines/
      ${this.state.medicine._id}`))
    .then(() => this.props.alert('Your Medicine has been updated', 'success'))
    .catch(() => this.props.alert('Please check all fields and try again.'))
}

render () {
  const { updated } = this.state
  const { handleChange, handleSubmit } = this
  if (updated) {
    return <Redirect to={
      {
        pathname: `/medicines/${this.props.match.params.id}`,
        state: {
          msg: 'Medicine has been updated!'
        }
      }
    }/>
  }
  return (

    <Form onSubmit={this.handleSubmit}>

      <Form.Group controlId="name">

        <Form.Label>Medicine Name</Form.Label>

        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          handleChange={handleChange}
          handleSubmit={handleSubmit}

        />

      </Form.Group>
      <Form.Group controlId="doctor">

        <Form.Label>Doctor</Form.Label>

        <Form.Control

          type="text"

          placeholder="Doctor"

          name="doctor"

          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

      </Form.Group>
      <Form.Group controlId="prescribed">

        <Form.Label>Prescribed</Form.Label>

        <Form.Control

          type="date"

          placeholder="Prescribed"

          name="prescribed"

          handleChange={handleChange}
          handleSubmit={handleSubmit}

        />

      </Form.Group>

      <Form.Group controlId="description">

        <Form.Label>Description</Form.Label>

        <Form.Control

          type="text"

          placeholder="Description"

          name="description"

          handleChange={handleChange}
          handleSubmit={handleSubmit}

        />

      </Form.Group>
      <Form.Group controlId="dueDate">

        <Form.Label>Due Date</Form.Label>

        <Form.Control

          type="date"

          placeholder="dueDate"

          name="dueDate"

          handleChange={handleChange}
          handleSubmit={handleSubmit}

        />

      </Form.Group>
      <Button variant="primary" type="submit">
    Submit

      </Button>
    </Form>
  )
}
}

export default withRouter(EditMedicine)
