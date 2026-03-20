import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        rtl={false}
        pauseOnHover={false}
        theme="light"
      />
      <AppRouter />
    </div>
  )
}

export default App;