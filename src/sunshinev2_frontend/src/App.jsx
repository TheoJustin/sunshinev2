import { useState } from 'react';
import { sunshinev2_backend } from 'declarations/sunshinev2_backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';

function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   sunshinev2_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-teal-50'>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section> */}
    </div>
  );
}

export default App;
