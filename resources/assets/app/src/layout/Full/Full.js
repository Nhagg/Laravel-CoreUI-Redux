import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar/';
import { Breadcrumb } from '../components/Breadcrumb/';
import Aside from '../components/Aside/';
import Footer from '../components/Footer/';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '../../features/users';
import { TagsList } from '../../features/settings';
import { DataExplorer } from '../../features/data-explorer';
import { PathBar } from '../../features/data-explorer';
import { SchemaExplorer } from '../../features/schema-explorer/components';
import { Startup } from '../../features/startup';
import { Dashboard } from '../../features/dashboard';

class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <Startup/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        {/* <PathBar></PathBar> */}
                        <div style={styles.seperator}></div>
                        { this.props.breadcrumbBarVisible ? <Breadcrumb/> : null }
                        <Container fluid>
                            <Switch>
                                <Route path="/login" name="Login" component={Login}/>
                                <Route path="/dashboard" name="Login" component={Dashboard}/>
                                <Route path="/tags/list"     name="Login" component={TagsList}/>
                                <Route path="/data-explorer" name="Data Explorer" component={DataExplorer}/>
                                <Route path="/schema-explorer" name="Schema Explorer" component={SchemaExplorer}/>

                                <Redirect from="/" to="/dashboard"/>

                            </Switch>
                            { /* Toast config ---------------------------- */ }
                            <ToastContainer position="bottom-right"
                                        hideProgressBar
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnVisibilityChange
                                        draggable
                                        pauseOnHover/>
                        </Container>
                    </main>
                    <Aside/>
                </div>
                <Footer/>
            </div>
        );
    }
}


const styles = {
    seperator: {
        paddingTop : "5px"
    }
}

function _mapStateToProps(state) {
    const LAYOUT_STATE             = 'features/layout';
    return {
        breadcrumbBarVisible : state[ LAYOUT_STATE ].breadcrumbBarVisible
    };
}
export default connect(_mapStateToProps)( Full );
