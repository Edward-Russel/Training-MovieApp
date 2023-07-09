import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import routes from './routes';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </>
  );
};

export default App;
