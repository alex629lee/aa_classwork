const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

$(() => {
  $("button.follow-toggle").each(function(index, button){
    new FollowToggle(button);
  });

  $("nav.user-search").each(function (index, nav) {
    new UsersSearch(nav);
  });
});
