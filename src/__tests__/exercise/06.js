// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  let setReturnValue
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  function useMockCurrentPosition() {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  act(() => {
    setReturnValue([fakePosition])
  })
  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
