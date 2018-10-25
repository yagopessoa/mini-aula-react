import React, { Component } from 'react'

export default class Hello extends Component {
    render(){

        const { title } = this.props

        return(
            <div>
                Hello {title}!
            </div>
        )
    }
}