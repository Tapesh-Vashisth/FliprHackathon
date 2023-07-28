import React from 'react'
import queue from '../../helper/queue'
import { useAppSelector } from '../../app/hooks'

function Notification() {
  const notifications = useAppSelector((state) => state.notification);

  return (
    notifications.alerts.length > 0
    ?
    <div style = {{position: "absolute", width: "40%", height: 200, backgroundColor: "red", top: 0, right: 0}}>
        
    </div>
    :
    null
  )
}

export default Notification