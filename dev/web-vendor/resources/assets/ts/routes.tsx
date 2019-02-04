import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import indexRoutes from "./routes/index";


export const Routes = () => (
    <Router >
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
        
    </Router> 
);

