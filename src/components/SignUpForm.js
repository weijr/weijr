import React from 'react'
import { Link } from "react-router-dom";
import { Grid, Header, Form, Message, Button, Segment } from 'semantic-ui-react'

const SignUpForm = (props) => (
  <div className='login-form'>
    <style>
    {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
    </style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          Sign Up Below
        </Header>
        <Form onSubmit={props.onSubmit} size='large'>
          <Segment stacked>
          <Form.Input
              fluid
              icon='globe'
              iconPosition='left'
              placeholder='User Name'
              name="username"
            />
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name="email"
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
            />

            <Button type='submit' color='black' fluid size='large'>Sign Up</Button>
          </Segment>
        </Form>
        <Message>
          Already Have An Account? <Link to='/'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default SignUpForm;