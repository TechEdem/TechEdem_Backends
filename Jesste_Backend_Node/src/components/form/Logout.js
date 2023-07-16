import { useHistory } from 'react-router-dom';

function Logout(props){

    const history = useHistory();

    function handleLogout() {
        //make HTTP request to logout endpoint
        fetch("http://localhost:8080/api/customer/logout", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${props.token}`,
            },
        })
        .then(response => {
            //handle response
            if (response.ok){
                //clear user session and redirect to login page
                props.setToken(null);
                history.push('/login');
            } else {
                //logout failed, handle error
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            //handle error
            console.error(error);
            // show error message to user
            window.alert('Logout failed. Please try again.');
        });
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;