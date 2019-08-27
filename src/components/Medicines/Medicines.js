import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Layout from '../Layout'
//  creates new Medicines class in order to get all created itmes
class Medicines extends Component {
  constructor (props) {
    super(props)
    this.state = {
      //  sets state to an empty array of items
      medicines: []
    }
  }
  //  makes GET Request to respond with array of created items
  componentDidMount () {
    axios({
      url: `${apiUrl}/medicines`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    //  if successful fill empty state with an array of medicine data
      .then(res => this.setState({
        medicines: res.data.medicines
      }))
    //  or else throw an error
      .catch(console.error)
  }

  render () {
    //  deconstruct medicines and set value to this state
    const { medicines } = this.state
    // deconstruct user and   set  value to props
    const { user } = this.props
    //  create a medicinesArray and have it  return all  medicine items as items in a list
    const medicinesArray = medicines.map(medicine => (
      <ListGroup.Item
        key = {medicine._id}
        action as = {Link}
        to = {`/medicines/${medicine._id}`} >
        {medicine.name}
      </ListGroup.Item>
    ))

    return (
      // return  the medicines array with a button that routes to /createmedicine
      <Layout >
        <h3 className = "d-flex justify-content-between" > Your Medicine {user && < Button href = "#createmedicine" > Add your Medicine < /Button>}</h3 >
        <ListGroup > {medicinesArray} </ListGroup> </Layout>)
  }
}

export default Medicines
