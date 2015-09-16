import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

let userId = getQueryParams(document.location.search).user || "55f901fe0b0232dc0fde8530";
console.log(userId);

React.render(
  <Relay.RootContainer
    Component={User}
    //TODO Update userId
    route={new AppHomeRoute({userId: "55f901fe0b0232dc0fde8530"})}
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