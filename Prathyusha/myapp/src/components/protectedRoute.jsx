import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../App';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [token] = useContext(store);

    return (
        <Route
            {...rest}
            render={(props) => {
                return token ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
};

export default ProtectedRoute;
