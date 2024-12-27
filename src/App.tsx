import { useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import pb from './services/pocketbase';
import './App.css'
import Dart from "./components/dart/DartMain";


function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Validate session on app load
    const checkSession = async () => {
      try {
        const user = pb.authStore.record;
        if (user) {
          // Attempt to refresh session
          await pb.collection('users').authRefresh();
        } 
      } catch (error) {
        console.error('Session validation failed:', error);
        pb.authStore.clear(); // Clear invalid session
      }
    };

    checkSession();
  }, []);

//  if (!isAuthenticated) {
//    return <div>Please log in.</div>; // Replace with your login component
//  }
//<div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
//</div>
  return (
      <Dart />
  )
}

export default App
