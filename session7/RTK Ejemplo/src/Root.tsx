import { Provider } from 'react-redux';
import App from './App';
import store from './features/store';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;