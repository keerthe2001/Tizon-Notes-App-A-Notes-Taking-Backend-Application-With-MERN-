import React from 'react'
import DisplayNotes from './DisplayNotes'
import AddNotes from './AddNotes'

export default function Home() {
    return (
        <>
            <div className='container my-3'>
                <AddNotes/>
            </div>
            <div className='container'>
                <h2>
                    Display Notes
                </h2>
                
            <div className='row my-3'>
                <DisplayNotes/>
            </div>
            </div>
        </>
    )
}
