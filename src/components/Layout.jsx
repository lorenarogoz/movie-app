import {Outlet, NavLink} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className='App'>
            <div className='container'>
                <Header />

                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to='/'
                                end
                                state={{resetFilters: true}}
                                className={({isActive}) =>
                                    isActive ? 'active' : undefined
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/watchlist'
                                className={({isActive}) =>
                                    isActive ? 'active' : undefined
                                }
                            >
                                WatchList
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
