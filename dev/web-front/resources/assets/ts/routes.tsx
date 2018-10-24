import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './share/Layout';
import { WeddingDress } from './components/WeddingDress/Index';
// import { WeddingInvitation } from './components/WeddingInvitation/Index';

const WeddingAlbum = () => (
    <div>
        <h2>WeddingAlbum</h2>
    </div>
);

const WeddingVenue = () => (
    <div>
        <h2>WeddingVenue</h2>
    </div>
);

const WeddingRing = () => (
    <div>
        <h2>WeddingRing</h2>
    </div>
);

const WeddingCar = () => (
    <div>
        <h2>WeddingCar</h2>
    </div>
);

const Booking = () => (
    <div>
        <h2>Booking</h2>
    </div>
);

export const Routes = () => (
    <Router>
        <Layout>
            <Route exact={true} path='/' component={WeddingDress} />
            <Route path='/wedding-dress' component={WeddingDress} />
            <Route path='/wedding-album' component={WeddingAlbum} />
            <Route path='/wedding-invitation' component={WeddingDress} />
            <Route path='/wedding-venue' component={WeddingVenue} />
            <Route path='/wedding-ring' component={WeddingRing} />
            <Route path='/wedding-car' component={WeddingCar} />
            <Route path='/booking' component={Booking} />
        </Layout>
    </Router>
);

