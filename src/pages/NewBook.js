import React, { useEffect, useState } from 'react'
import '../App.css'

function NewBook(props) {
    const [state, setState] = useState({ category: [], book: {} })

    function getCategoryApi() {
        fetch('http://127.0.0.1:8000/api/category')
            .then((response) => response.json())
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        category: res,
                    }
                })
            })
    }

    function getBookInformation(id) {
        fetch(`http://127.0.0.1:8000/api/book/${id}`)
            .then((response) => response.json())
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        book: {
                            ...res,
                        },
                    }
                })
            })
    }

    useEffect(() => {
        getCategoryApi()
        if (props.match.params.id !== 'new') {
            getBookInformation(props.match.params.id)
        }
    }, [])

    function handleSubmit(event) {
        if (props.match.params.id !== 'new') {
            createEdit(props.match.params.id)
        } else {
            createBook()
        }
        props.history.push(`/`)
        event.preventDefault()
        event.stopPropagation()
    }

    function createBook() {
        fetch('http://127.0.0.1:8000/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ...state.book,
                category_id: state.category.filter(
                    (e) => e.name === state.book.category
                )[0].id,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                alert('book created')
            })
    }

    function createEdit(id) {
        fetch(`http://127.0.0.1:8000/api/book/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ...state.book,
                category_id: state.category.filter(
                    (e) => e.name === state.book.category
                )[0].id,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                alert('book edit')
            })
    }

    function handleChange(event) {
        setState((prevState) => {
            return {
                ...prevState,
                book: {
                    ...prevState.book,
                    [event.target.name]: event.target.value,
                },
            }
        })
    }
    return (
        <div className="container mt-5">
            {props.match.params.id !== 'new' ? (
                <h4 className="text-center">Edit book</h4>
            ) : (
                <h4 className="text-center">Create new book</h4>
            )}

            <div className="row justify-content-center">
                <form className="col-12 col-md-6" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            value={state.book.name ? state.book.name : ''}
                            name="name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            value={state.book.author ? state.book.author : ''}
                            name="author"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            name="category"
                            value={
                                state.book.category ? state.book.category : ''
                            }
                            type="text"
                            className="form-control"
                            list="categoryOptions"
                            onChange={handleChange}
                            required
                        />
                        <datalist id="categoryOptions">
                            {state.category.map((item, key) => (
                                <option key={key} value={item.name} />
                            ))}
                        </datalist>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Publication date</label>
                        <input
                            type="date"
                            value={
                                state.book.publicationDate
                                    ? state.book.publicationDate
                                    : ''
                            }
                            name="publicationDate"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            User who is borrowing it
                        </label>
                        <input
                            value={
                                state.book.userBorrowing
                                    ? state.book.userBorrowing
                                    : ''
                            }
                            name="userBorrowing"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-primary">
                        {props.match.params.id !== 'new' ? 'Edit' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewBook
