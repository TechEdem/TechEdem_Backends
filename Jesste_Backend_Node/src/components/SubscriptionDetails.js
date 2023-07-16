import React, { useEffect, useState } from 'react';

const SubscriptionDetails = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('');

  useEffect(() => {
    // Fetch subscription data from the backend
    fetch('http://localhost:8080/api/subscription/id')
      .then((response) => response.json())
      .then((data) => {
        setSubscriptionData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleSubscriptionTypeChange = (event) => {
    setSelectedSubscriptionType(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!subscriptionData) {
    return null;
  }

  return (
    <div>
      <h2>Subscription Details</h2>
      <p>Plan ID: {subscriptionData.planId}</p>
      <p>Customer ID: {subscriptionData.customerId}</p>
      <p>
        Subscription Type:
        <select value={selectedSubscriptionType} onChange={handleSubscriptionTypeChange}>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </p>
      <p>Price: {subscriptionData.price}</p>
      <p>Subscription Date: {subscriptionData.subscriptionDate}</p>
      <p>Users Allowed: {subscriptionData.usersAllowed}</p>
      <p>Plan Validity: {subscriptionData.planValidity}</p>
      <p>Next Renewal Date: {subscriptionData.nextRenewalDate}</p>
    </div>
  );
};

export default SubscriptionDetails;
