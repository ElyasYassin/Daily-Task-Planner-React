// Importing action types from a file containing constants
import actionTypes from '../constants/actionTypes';

// Retrieving environment variables
const env = process.env;


// Action creator for user login
function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN, // Dispatches an action of type USER_LOGGEDIN
        username: username // Passes the username as payload
    }
}

// Action creator for fetching tasks
export function fetchTasks() {
    return dispatch => {
      return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log(response)
        return response.json();
      })
      .then(tasks => {
        // Dispatch an action to store the fetched tasks
        dispatch(tasksFetched(tasks));
        return tasks; // Return the fetched tasks for further handling if needed
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        throw error; // Rethrow the error for handling in the component
      });
    };
  }
  
  // Action creator for storing fetched tasks
  function tasksFetched(tasks) {
    return {
      type: actionTypes.TASKS_FETCHED,
      tasks
    };
  }

// Action creator for user logout
function logout() {
    return {
        type: actionTypes.USER_LOGOUT // Dispatches an action of type USER_LOGOUT
    }
}

// Action creator for submitting login credentials
export function submitLogin(data) {
    console.log(env.REACT_APP_API_URL)
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signin`, { // Sends POST request to sign in endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // Converts data to JSON and sends it in the request body
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText); // Throws an error if response is not OK
            }
            return response.json(); // Parses response JSON
        }).then((res) => {
            localStorage.setItem('username', data.username); // Stores username in local storage
            localStorage.setItem('token', res.token); // Stores token from response in local storage
            dispatch(userLoggedIn(data.username)); // Dispatches USER_LOGGEDIN action
        })
    }
}

// Action creator for submitting registration data
export function submitRegister(data) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/signup`, { // Sends POST request to sign up endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // Converts data to JSON and sends it in the request body
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText); // Throws an error if response is not OK
            }
            return response.json(); // Parses response JSON
        }).then((res) => {
            dispatch(submitLogin(data)); // Dispatches login action
        })
    }
}

// Action creator for submitting a task
export function submitTask(data) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/tasks`, { // Sends POST request to tasks endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // Converts data to JSON and sends it in the request body
            mode: 'cors'
        }).then((response) => {
            console.log(response)
            if (!response.ok) {
                throw Error(response.statusText); // Throws an error if response is not OK
            }
            return response.json(); // Parses response JSON
        }).catch((e) => console.log(e)); // Logs any errors
    }
}

// Action creator for Generating task recommendations
export function TaskRecommendations(data) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/tasks/recommendation`, { // Sends POST request to tasks endpoint
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data }), 
            mode: 'cors'
        }).then((response) => {
            
            if (!response.ok) {
                throw Error(response.statusText); // Throws an error if response is not OK
            }
            return response.json();       
        }).catch((e) => console.log(e)); // Logs any errors
    }
}

// Action creator for logging out the user
export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username'); // Removes username from local storage
        localStorage.removeItem('token'); // Removes token from local storage
        dispatch(logout()); // Dispatches logout action
    }
}
