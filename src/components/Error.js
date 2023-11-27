import React from 'react'
import { useRouteError } from 'react-router-dom'

function Error() {
    const error= useRouteError();

  return (
    <div>
        <h2>{error?.error?.message}</h2>
    <h3>{error?.statusText}{": "}{error?.status}</h3>
    </div>
  )
}

export default Error