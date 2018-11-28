import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './share/Layout';
import { Feedback } from './components/Feedback/Index';
import { ViewDetailFeedback } from './components/Feedback/ViewDetail';
import { StaffScreen } from './components/Staff/Index';
import { ProductScreen } from './components/Product/Index';

export const Routes = () => (
    <Router>
        <Layout>
            <Route exact={true} path='/' />
            <Route path='/staff' component={StaffScreen} />
            <Route path='/product' component={ProductScreen} />
            <Route path='/feedback' exact={true} component={Feedback} />
            <Route path='/feedback/:id' exact={true} component={ViewDetailFeedback} />
        </Layout>
    </Router>
);

