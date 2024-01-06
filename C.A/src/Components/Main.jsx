import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "../App.css"
//Imports
const Main = (props) => {
 //Setinng the useState
  const [products, setProducts] = useState([]);

//Useeffect for the fetching
  useEffect(() => {
    fetch('https://reactnd-books-api.udacity.com/books', {
      headers: {
        Authorization: 'whatever-you-want',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.books);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    
  }, [products]);
  //FilterFunctiom
  const NewProdus = products.filter((book) =>
  book.title.toLowerCase().includes(props.setSubmit.search.toLowerCase())
);

// console.log(props.setSubmit.search);

return (
  <div className='mains'>
    {props.setSubmit.Submit ? " " : <><h1>👋 Hello User! 🎉</h1>  <h1 className='h1'>Please Do signup for the content <Link to={"/Form"}>Signup</Link></h1></>}

      <div className='books'  style={{
   filter:props.setSubmit.Submit ? "Blur(0px)" : "Blur(4px)",
  }}>
        {NewProdus.map((book, index) => (
            <div key={index} className='main'>
              <div className='book'>
                <img src={book.imageLinks.thumbnail} alt='' />
                <h3>{book.title}</h3>
                <div className='rating'>
                  {book.averageRating == null ? (
                    <p>4 ⭐</p>
                  ) : (
                    <p>{book.averageRating}⭐</p>
                  )}
                  <p>Free</p>
                </div>
                {props.setSubmit.Submit ? <a href={book.previewLink} target='blank'>
                  <button>Preview</button>
                </a> :  <button>Preview</button>}
                
                <div className='bottom'>
                  <p>{book.authors[0]}</p>
                  <p>{book.publishedDate}</p>
                  <p>{book.publisher}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      
       
      
    </div>
  );
};

export default Main;

