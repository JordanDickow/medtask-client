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
    axios(`${apiUrl}/medicines/${this.props.match.params.id}`)
      .then(res => {
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
        const dateObj = new Date(res.data.medicine.prescribed.dueDate)
        const formattedDate = dateObj.toLocaleDateString(undefined, options)
        console.log(res.data.medicine)
        this.setState({
          medicine: {
            ...res.data.medicine,
            prescribed: formattedDate,
            dueDate: formattedDate
          }
        })
      })
      .catch(console.error)
  }

  render () {
    const { medicine } = this.state
    const { user } = this.props
    const ownerButtons = (
      <div>
        <Button className="mr-2" variant="danger">Delete</Button>
        <Link to={`/medicines/${this.props.match.params.id}/edit`}></Link>
        <Button className="edit" variant="primary">Edit</Button>
      </div>
    )

    return (
      <div>
        <h3>Book Details</h3>
        <h4>Title: {medicine.title}</h4>
        <p>Author: {medicine.author}</p>
        <p>First Published: {medicine.firstPublished}</p>
        <p>Original Language: {medicine.originalLanguage}</p>
        <p>Owner: {medicine.owner}</p>
        {user && user._id === medicine.owner ? ownerButtons : <p>{user ? 'You don\'t own this book' : 'Sign in to edit your books'}</p>}
      </div>
    )
  }
}

export default withRouter(Medicine)
