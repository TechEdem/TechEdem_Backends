import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcPaypal, faCcMastercard, faCcDiscover } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";
import './Payments.css';

const Payments = () => {

  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [method, setMethod] = useState('');
  const [intent, setIntent] = useState('sale');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Create a payload object with the form data
    const payloads = {
      price,
      currency,
      method,
      intent,
      description,
    };

    // Make a POST request to the Java backend
    fetch('http://localhost:8080/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloads),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the Java backend
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return (
      <div className='payimage'>
          <form className='payform' onSubmit={handleSubmit}>
            <h3 className='payhead'>Payment</h3>
            <label className='paylay'>Accepted Cards</label>
            <div className='paylog'>
              <FontAwesomeIcon icon={faCcVisa} style={{ color: 'navy'}} />
              <FontAwesomeIcon icon={faCcPaypal} style={{ color: 'blue'}} />
              <FontAwesomeIcon icon={faCcMastercard} style={{ color: 'red'}} />
              <FontAwesomeIcon icon={faCcDiscover} style={{ color: 'orange'}} />
            </div>
            <div className='paydiv'>
              <label className='paylabel' htmlFor='price'>Total</label>
              <input className='payinput' type='number' id='price' name='price' value={price} onChange={(event) => setPrice(event.target.value)} />
            </div>
            <div className='paydiv'>
              <label className='paylabel' htmlFor='currency'>Currency</label>
              <input className='payinput' type='text' id='currency' name='currency' placeholder='Enter Currency' value={currency} onChange={(event) => setCurrency(event.target.value)} />
            </div>
            <div className='paydiv'>
              <label className='paylabel' htmlFor='method'>Payment Method</label>
              <select className='payinput' id='method' name='method' value={method} onChange={(event) => setMethod(event.target.value)} >
                <option value="">Select Payment Method</option>
                <option value='visa'>Visa</option>
                <option value='paypal'>Paypal</option>
                <option value='mastercard'>Mastercard</option>
                <option value='discover'>Discover</option>
              </select>
            </div>
            <div className='paydiv'>
              <label className='paylabel' htmlFor='intent'>Intent</label>
              <input className='payinput' type='text' id='intent' name='intent' value={intent} onChange={(event) => setIntent(event.target.value)} />
            </div>
            <div className='paydiv'>
              <label className='paylabel' htmlFor='description'>Payment Description</label>
              <input className='payinput' type='text' id='description' name='description' value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className='paydiv'>
              <button className='paybutton' type='submit'>Send</button>
            </div>

          </form>
        </div>  
    );
}

export default Payments;