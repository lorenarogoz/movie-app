import ReactDOM from 'react-dom/client';

import {Provider} from 'react-redux';
import {store} from './store/store';

import App from './App.jsx';
import './index.css';

store.subscribe(() => {
    try {
        localStorage.setItem(
            'watchlist',
            JSON.stringify(store.getState().watchlist),
        );
    } catch {}
});

const entryPoint = document.getElementById('root');
ReactDOM.createRoot(entryPoint).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
