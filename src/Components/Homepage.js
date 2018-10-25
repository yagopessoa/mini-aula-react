import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import firebase from 'firebase'
import firebaseConfig from '../firebase'
firebase.initializeApp(firebaseConfig)
var database = firebase.database()

export default class Homepage extends Component {
    state = {
        isLoading: true,
        itens: [],
        votes: [],
    }

    componentWillMount(){
        fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => response.json())
        .then(parsedJSON => {
            this.setState({
                itens: parsedJSON.results
            })
        }).catch(err => console.log(err))

        database.ref().on('value', (snapshot) => {
            this.setState({ votes: snapshot.val(), isLoading: false })
        })
    }

    handleVote = (name) => {
        database.ref().once('value', (snapshot) => {
            const votes = snapshot.val()
            if(!votes[name]){
                database.ref(name).set(1)
            } else {
                database.ref(name).set( votes[name]+1 )
            }
        })
    }

    renderList() {
        return this.state.itens.map(item => 
            <ListItem button key={item.name} onClick={() => this.handleVote(item.name)}>
                <ListItemText 
                    primary={item.name} 
                    secondary={(this.state.votes[item.name]) ? 'Likes: '+this.state.votes[item.name] : 'Likes: 0'}
                />
            </ListItem>
        )
    }

    render(){
        const { isLoading } = this.state

        if(isLoading) return <CircularProgress style={{color: '#FFF'}} />
        return(
            <div style={{width: '100%', paddingTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                Lista de Pokémons
                <div className="home-page">
                    <List style={{maxHeight: 500, overflowY: 'auto'}} >
                        {this.renderList()}
                    </List>
                </div>
            </div>
        )
    }
}