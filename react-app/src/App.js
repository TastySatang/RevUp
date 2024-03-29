import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import EventsPage from './pages/events';
import EventPage from './pages/event';
import Splash from './pages/splash';
import CreateEvent from './pages/CreateEvent';
import User from './components/User';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import CalendarComponent from './components/Calendar'

import Home from './pages/home';

import { authenticate } from './store/session';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <ScrollToTop>
                <NavBar />
                <Switch>
                    <Route path='/login' exact={true} component={LoginForm} />
                    <Route path='/sign-up' exact={true} component={SignUpForm} />
                    <Route path='/events' exact={true} component={EventsPage} />
                    <Route path='/events/new' exact={true} component={CreateEvent} />
                    <Route path='/events/:id' exact component={EventPage} />
                    <ProtectedRoute path='/users' exact={true} >
                        <UsersList />
                    </ProtectedRoute>
                    <ProtectedRoute path='/users/:userId' exact={true} >
                        <User />
                    </ProtectedRoute>
                    {/* <ProtectedRoute path='/home' exact={true} >
                        <Home />
                        <CalendarComponent />
                    </ProtectedRoute> */}
                    <Route path='/' exact={true} component={Splash} />
                </Switch>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default App;
