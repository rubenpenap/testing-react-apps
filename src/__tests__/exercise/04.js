// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm({password: 'abc'})
  const submitButton = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(
    screen.getByRole('textbox', {
      name: /username/i,
    }),
    username,
  )
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
})

/*
eslint
  no-unused-vars: "off",
*/
