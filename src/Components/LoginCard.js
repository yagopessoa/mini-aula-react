import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Homepage from './Homepage'

const styles = {
    card: {
        width: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    title: {
        marginBottom: 32,
    },
    button: {
        marginTop: 48,
    }
}

const auth = {
    user: 'fog',
    password: '1234'
}

export default class LoginCard extends Component {

    state = {
        user: '',
        password: '',
        authenticated: true
    }

    handleLogin = () => {
        const { user, password } = this.state

        if(user===auth.user && password===auth.password){
            this.setState({ authenticated: true })
            console.log("Logou!!")
        } else console.log("Usuario ou senha inválidos...")
    }

    render(){
        const { card, title, button } = styles
        const { user, password, authenticated } = this.state

        if(authenticated) return (
            <Homepage />
        )
        return(
            <Card style={card} >
                <Typography variant="headline" style={title}>
                    Fellowship of the Game
                </Typography>

                <TextField
                    id="user-input"
                    label="Usuário"
                    placeholder="Digite seu usuário"
                    margin="normal" 
                    value={user}
                    onChange={newValue => this.setState({ user: newValue.target.value })}
                />

                <TextField
                    id="standard-password-input"
                    label="Senha"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={newValue => this.setState({ password: newValue.target.value })}
                />

                <Button 
                    variant="contained" 
                    color="primary" 
                    style={button} 
                    onClick={this.handleLogin}
                >
                    Entrar
                </Button>
            </Card>
        )
    }
}