import React from 'react'
import Rithmic from 'rithmic'

import EventInput from './EventInput'

export default ({ schemaId, states, transitions, methods = {} }) => {

  const methodNames = Object.keys(methods)

  const send = () => Rithmic.send({
    event: 'SCHEMA:CREATE_TRANSITION',
    payload: { id: schemaId }
  })

  return <div className="TransitionDetails">
    <div className="tools">
      <button onClick={send}>
        Create Transition
      </button>
    </div>
    <table>
      <tbody>
        <tr>
          <th>Event</th>
          <th>Source</th>
          <th>Target</th>
          <th>Method</th>
        </tr>
        {
          transitions.map(({ event, source, target, method }, index) => <tr>
            <td>
              <EventInput
                value={event}
                onChange={value => Rithmic.send({
                  event: 'SCHEMA:TRANSITION:SET_EVENT',
                  payload: { id: schemaId, index, event: value }
                })}
              />
            </td>
            <td>
              <select
                value={source}
                onChange={e => Rithmic.send({
                  event: 'SCHEMA:TRANSITION:SET_SOURCE',
                  payload: { id: schemaId, index, source: e.target.value }
                })}
              >
                {
                  states.map(({ id }) => <option>
                    { id }
                  </option>)
                }
              </select>
            </td>
            <td>
              <select
                value={target}
                onChange={e => Rithmic.send({
                  event: 'SCHEMA:TRANSITION:SET_TARGET',
                  payload: { id: schemaId, index, target: e.target.value }
                })}
              >
                {
                  states.map(({ id }) => <option>
                    { id }
                  </option>)
                }
              </select>
            </td>
            <td>
              <select
                value={method}
                onChange={e => Rithmic.send({
                  event: 'SCHEMA:TRANSITION:SET_METHOD',
                  payload: { id: schemaId, index, methodName: e.target.value }
                })}
              >
                <option></option>
                {
                  methodNames.map(methodName => <option>
                    { methodName }
                  </option>)
                }
              </select>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  </div>

}