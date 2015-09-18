import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

let userId = getQueryParams(document.location.search).user || "55fc4b2578eff2810e417cf3";

React.render(
  <Relay.RootContainer
    Component={User}
    //TODO Update userId
    route={new AppHomeRoute({userId: userId})}
  />,
  document.getElementById('root')
);




function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}