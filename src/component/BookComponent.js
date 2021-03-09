import React from 'react'
import { Pencil, Trash } from 'react-bootstrap-icons'

function BookComponent(book, deleteBook, editBook) {
    return (
        <div key={book.id} className="col-12 col-md-4 mb-4">
            <div className="card ">
                <img
                    src="https://www.esstudioediciones.com/blog/los-libros-en-espanol-mas-vendidos-de-la-historia.jpg"
                    className="card-img-top"
                ></img>
                <div className="card-body">
                    <p className="card-title">{book.title}</p>
                    <p className="card-autor">{`Author: ${book.author}`}</p>
                    <p className="card-autor">{`Publication date: ${book.publicationDate}`}</p>
                    <p className="card-autor">{`User Borrowing: ${book.userBorrowing}`}</p>
                </div>
                <div className="icons">
                    <Pencil onClick={() => editBook(book.id)} />
                    <Trash color="red" onClick={() => deleteBook(book.id)} />
                </div>
            </div>
        </div>
    )
}

export default BookComponent
