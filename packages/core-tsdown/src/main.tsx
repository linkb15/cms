import UsersPage from '@/routes/users';
import { Link, Route, Router, Switch } from 'wouter';

export function CMSPage() {
  return (
    <Router ssrPath="/cms" base="/cms">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/inbox">Inbox</Link>
      <Link to="/users/john">John</Link>

      <Route path="/about">About Us</Route>

      <Switch>
        <Route path="/about">About Us 2</Route>
        <Route path="/inbox">
          <InboxPage />
        </Route>

        <Route path="/users/:name">
          <UsersPage />
        </Route>

        <Route>404: No such page!</Route>
      </Switch>
    </Router>
  );
}

const InboxPage = () => {
  return <div>InboxPage</div>;
};
