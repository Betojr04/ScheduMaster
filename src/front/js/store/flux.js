const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            isAuthenticated: false,
            userData: null,
            authToken: null,
            loginError: null,
            registerError: null
        },
        actions: {
            registerUser: async (userDetails) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userDetails)
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Registration error:', errorData);
                        setStore({ registerError: errorData.message || 'Registration failed. Please try again.' });
                    }
                     else {
                        setStore({ registerError: 'Registration failed. Please try again.' });
                    }
                } catch (error) {
                    console.error('Error during registration:', error);
                    setStore({ registerError: error.message });
                }
            },

            loginUser: async (credentials) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('User logged in:', data);
                        setStore({ isAuthenticated: true, userData: data.user, authToken: data.token, loginError: null });
                    } else {
                        setStore({ loginError: 'Invalid credentials. Please try again.' });
                    }
                } catch (error) {
                    console.error('Error during login:', error);
                    setStore({ loginError: error.message });
                }
            },

            logoutUser: () => {
                setStore({ isAuthenticated: false, userData: null, authToken: null });
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
