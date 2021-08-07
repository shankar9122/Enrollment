import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import StudentList from './components/StudentList';
import EnrolmentForm from './components/EnrolmentForm';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={StudentList} />
          <Route path="/add-student" component={EnrolmentForm} />
          <Route path="/update/:id" component={EnrolmentForm} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
