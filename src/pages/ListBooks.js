import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from 'react-bootstrap-icons'
import Search from '../component/Search'
import '../App.css'
import { Button, Modal } from 'react-bootstrap'

function ListBooks(props) {
    const [state, setState] = useState({
        books: [],
        pages: 10,
        index: 1,
        lastPage: 0,
        open: false,
        selectBook: {},
    })
    let newUser = null
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function getBooksApi() {
        fetch('http://127.0.0.1:8000/api/book')
            .then((response) => response.json())
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        books: res.data,
                        lastPage: res.last_page,
                    }
                })
            })
    }

    useEffect(() => {
        getBooksApi()
    }, [])

    function handleChange(event) {
        newUser = event.target.value
    }

    function setNullUser() {
        newUser = null
        handleSubmit()
    }

    function ModalComponent() {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        {state.selectBook.userBorrowing ? (
                            <Button variant="primary" onClick={setNullUser}>
                                Return Book
                            </Button>
                        ) : (
                            <form className="col-12" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        User who is borrowing it
                                    </label>
                                    <input
                                        name="userBorrowing"
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        )}
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    function changePage(page) {
        fetch(`http://127.0.0.1:8000/api/book?page=${page}`)
            .then((response) => response.json())
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        books: res.data,
                        index: page,
                    }
                })
            })
    }

    function editBook(id) {
        props.history.push(`/book/${id}`)
    }

    function deleteBook(id) {
        fetch(`http://127.0.0.1:8000/api/book/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                changePage(state.index)
                alert('you want to delete this book?')
            })
    }

    function searchBook(e) {
        fetch(`http://127.0.0.1:8000/api/book/search/${e.target.value}`)
            .then((response) => response.json())
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        books: res,
                    }
                })
            })
    }

    function setSelectBook(book) {
        setState((prevState) => {
            return {
                ...prevState,
                selectBook: book,
            }
        })
    }

    function handleSubmit() {
        fetch(`http://127.0.0.1:8000/api/book/${state.selectBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                ...state.selectBook,
                userBorrowing: newUser,
            }),
        })
            .then((response) => response.json())
            .then(() => {})
        handleClose()
        changePage(state.index)
    }

    return (
        <div className="container mt-5">
            <ModalComponent />
            <Search handleChange={searchBook} />
            <div className="row">
                {state.books.map((book) => (
                    <div key={book.id} className="col-12 col-md-4 mb-4">
                        <div className="card ">
                            <img
                                src="https://www.esstudioediciones.com/blog/los-libros-en-espanol-mas-vendidos-de-la-historia.jpg"
                                className="card-img-top"
                            ></img>
                            <div className="card-body">
                                <p className="card-title">{`Name: ${book.name}`}</p>
                                <p className="card-autor">{`Author: ${book.author}`}</p>
                                <p className="card-autor">{`Publication date: ${book.publicationDate}`}</p>
                                <p className="card-autor">{`User Borrowing: ${book.userBorrowing ? book.userBorrowing : 'None' }`}</p>
                                {book.userBorrowing ? (
                                    <p
                                        className="text-danger text-right"
                                        onClick={() => {
                                            handleShow()
                                            setSelectBook(book)
                                        }}
                                    >
                                        <Button>
                                            Return
                                        </Button>
                                    </p>
                                ) : (
                                    <p
                                        className="text-primary text-right"
                                        onClick={() => {
                                            handleShow()
                                            setSelectBook(book)
                                        }}
                                    >
                                        <Button>
                                            Borrow
                                        </Button>
                                    </p>
                                )}
                            </div>
                            <div className="icons">
                                <Pencil onClick={() => editBook(book.id)} />
                                <Trash
                                    color="red"
                                    onClick={() => deleteBook(book.id)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav aria-label="Page">
                <ul className="pagination  navigation-bottom">
                    {state.index !== 1 && (
                        <li className="page-item">
                            <a
                                className="page-link"
                                aria-label="Previous"
                                onClick={() => changePage(state.index - 1)}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                    )}

                    <li className="page-item">
                        <a className="page-link">{state.index}</a>
                    </li>
                    {state.index !== state.lastPage && (
                        <li className="page-item">
                            <a
                                className="page-link"
                                aria-label="Next"
                                onClick={() => changePage(state.index + 1)}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default ListBooks
