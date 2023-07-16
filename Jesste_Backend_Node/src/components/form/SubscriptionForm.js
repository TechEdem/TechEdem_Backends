import { useState } from "react";
import './Subscription.css';
import { useNavigate } from 'react-router-dom';


const SubscriptionForm = () => {
 
    const [subscriptionType, setSubscriptionType] = useState('');
    const navigate = useNavigate();

    const handleSubscriptionTypeChange = (event) => {
        const { value } = event.target;
        setSubscriptionType(value);

    };


    const handleSubmit = (event) => {
        event.preventDefault();

            //Construct the payload for subscription creation
            const payload = {
                // customerId,
                subscriptionType
                // usersAllowed,
                // price,
                // planValidity
                // subscriptionDate,
                // nextRenewalDate,
                // price,
                
            };

            // Call the backend API to save the subscription data
            fetch('http://localhost:8080/api/subscription/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
              .then((response) => response.json())
              .then((data) => {
                //Handle susccess response
                console.log('Subscription created:', data);
                // Navigate to the payment page on successful registration
                navigate('/pay');
              })
              .catch((error) => {
                //Handle error
                console.error('Error creating subscription:', error);
              });
        }


    return (
        <div className="form-container">
            <h2 style={{color:"black"}}>Choose Your Plan</h2>
            <form onSubmit={handleSubmit}> 
                <div className="subscription-card">
                <input type="radio" id="basic" name="subscriptionType" value="basic" checked={subscriptionType === "basic"} onChange={(event) => handleSubscriptionTypeChange(event)}/>
                <label htmlFor="basic">
                    <h3>Basic</h3>
                    <p>GHS100./mo.</p>
                    <p>Good video quality. Watch in 720p (HD). Downloads available. Watch on your TV, computer, mobile phone, and tablet.</p>
                    <ul>
                        <li>Three users allowed</li>
                        <li>Watch all you want.</li>
                        <li>Enjoy recommendations just for you.</li>
                        <li>Change or cancel your plan anytime.</li>
                    </ul>
                </label>
                    
                </div>

                <div className="subscription-card">
                <input type="radio" id="standard" name="subscriptionType" value="standard" checked={subscriptionType === "standard"} onChange={(event) => handleSubscriptionTypeChange(event)}/>
                    <label htmlFor="standard">
                        <h3>Standard</h3>
                        <p>GHS150.00/mo.</p>
                        <p>Good video quality. Watch in 720p (HD). Downloads available. Watch on your TV, computer, mobile phone, and tablet.</p>
                        <ul>
                            <li>Four users allowed</li>
                            <li>Watch all you want.</li>
                            <li>Enjoy recommendations just for you.</li>
                            <li>Change or cancel your plan anytime.</li>
                        </ul>
                    </label>
                </div>

                <div className="subscription-card">
                <input type="radio" id="premium" name="subscriptionType" value="premium" checked={subscriptionType === "premium"} onChange={(event) => handleSubscriptionTypeChange(event)}/>
                    <label htmlFor="premium">
                        <h3>Premium</h3>
                        <p>GHS200./mo.</p>
                        <p>Good video quality. Watch in 720p (HD). Downloads available. Watch on your TV, computer, mobile phone, and tablet.</p>
                        <ul>
                            <li>Five users allowed</li>
                            <li>Watch all you want.</li>
                            <li>Enjoy recommendations just for you.</li>
                            <li>Change or cancel your plan anytime.</li>
                        </ul>
                    </label>
                </div>
                <button className="sub-button" type="submit">Subscribe</button>
            </form>

        </div>
    );
}

export default SubscriptionForm;