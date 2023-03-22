import React from 'react'
import ReactDOM from 'react-dom/client'
import PatientFormApp from './PatientFormApp'
import './index.css'

document.title = 'RCC Demo'

ReactDOM.createRoot(document.getElementById('root')).render(
    <PatientFormApp input='data/patient-data.json'/>
)
