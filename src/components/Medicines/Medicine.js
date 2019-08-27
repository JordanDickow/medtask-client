import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { Link, withRouter } from 'react-router-dom'

class Medicine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      medicine: {
        name: '',
        doctor: '',
        prescribed: '',
        description: '',
        dueDate: '',
        owner: ''
      }
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/medicines/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
        const dateObj = new Date(res.data.medicine.prescribed)
        const doneObj = new Date(res.data.medicine.dueDate)
        console.log(dateObj)
        const formattedDate = dateObj.toLocaleDateString(undefined, options)
        const newDate = doneObj.toLocaleDateString(undefined, options)
        console.log(res.data.medicine)
        this.setState({
          medicine: {
            ...res.data.medicine,
            prescribed: formattedDate,
            dueDate: newDate
          }
        })
      })
      .catch(console.error)
  }

  render () {
    console.log(`${this.props.user.token}`)
    const { medicine } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button className="mr-2" variant="danger">Delete</Button>
        <Link to={`/medicines/${this.props.match.params.id}/edit`}>Edit</Link>
      </div>
    )

    return (
      <div>
        <h3>Your Medicine</h3>
        <h4>Name: {medicine.name}</h4>
        <p>Doctor: {medicine.doctor}</p>
        <p>Prescribed: {medicine.prescribed}</p>
        <p>Description: {medicine.description}</p>
        <p>Due Date: {medicine.dueDate}</p>
        {user && user._id === medicine.owner ? ownerButtons : <p>{user ? 'You don\'t own this book' : 'Sign in to edit your books'}</p>}
      </div>
    )
  }
}

export default withRouter(Medicine)
