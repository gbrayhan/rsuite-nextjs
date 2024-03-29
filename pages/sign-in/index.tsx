import React from 'react'
import { Button, Divider, Form, IconButton, Loader, Panel, Stack } from 'rsuite'
import GithubIcon from '@rsuite/icons/legacy/Github'
import FacebookIcon from '@rsuite/icons/legacy/Facebook'
import GoogleIcon from '@rsuite/icons/legacy/Google'
import WechatIcon from '@rsuite/icons/legacy/Wechat'
import Brand from '../../components/Brand'
import Link from 'next/link'
import useSignIn, { type FormValues, model } from '@/hooks/pages/sign-in/SignIn'

const SignIn = (): React.ReactElement => {
  const { formValue, setFormValue, formRef, handleSubmit, loadingAuth } = useSignIn()
  return (
      <div>
          <Stack
              justifyContent="center"
              alignItems="center"
              direction="column"
              style={{
                height: '100vh'
              }}
          >
              <Brand/>
              <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>
                  <p style={{ marginBottom: 10 }}>
                      <span className="text-muted">New Here? </span>{' '}
                      <Link href="/sign-up"> Create an Account</Link>
                  </p>

                  <Form fluid
                        ref={formRef}
                        onChange={(value, event) => { setFormValue(value as FormValues) }}
                        formValue={formValue}
                        model={model}>
                      <Form.Group>
                          <Form.ControlLabel>Email address</Form.ControlLabel>
                          <Form.Control name="email"/>
                      </Form.Group>
                      <Form.Group>
                          <Form.ControlLabel>
                              <span>Password</span>
                              <a style={{ float: 'right' }}>Forgot password?</a>
                          </Form.ControlLabel>
                          <Form.Control name="password" type="password"/>
                      </Form.Group>
                      <Form.Group>
                          <Stack spacing={6} divider={<Divider vertical/>}>
                              <Button onClick={handleSubmit} appearance="primary">Sign in</Button>
                              <Stack spacing={6}>
                                  <IconButton icon={<WechatIcon/>} appearance="subtle"/>
                                  <IconButton icon={<GithubIcon/>} appearance="subtle"/>
                                  <IconButton icon={<FacebookIcon/>} appearance="subtle"/>
                                  <IconButton icon={<GoogleIcon/>} appearance="subtle"/>
                              </Stack>
                          </Stack>
                      </Form.Group>
                  </Form>
              </Panel>
          </Stack>
          {(Boolean(loadingAuth)) && <Loader backdrop center size="lg" content="loading" vertical/>}
      </div>

  )
}

export default SignIn
