import React from 'react'

function Search({ handleChange }) {
    return (
        <form className="row mb-5">
            <div className="col-12 col-md-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </form>
    )
}

export default Search
