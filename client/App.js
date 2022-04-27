
import React from 'react'



import Navbar from './components/Navbar'
import Routes from './Routes'
//import auth from './store/auth';


const App = () => {

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}
// const mapState = (state) => {
//   return {
//     //isLoggedIn: !!state.auth.id,
//     userInfo: state.auth,
//   };
// };

export default App
