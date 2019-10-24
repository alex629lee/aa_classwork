const APIUtil = require("./api/api_util.js");

// class FollowToggle {

class UsersSearch {
  constructor(el) {

    this.$el = $(el);
    this.$query = this.$el.find('input[name=query]');
    this.$ul = this.$el.find('.users');

    this.$query.on('input', this.handleInput.bind(this));
  }

  handleInput(e){
    APIUtil.searchUsers(this.$query.val()).then(result => this.renderResults(result));
  }

  renderResults(result){
    this.$ul.empty();
    const that = this;
    console.log(result);
    result.forEach(res => {
      let $li = $("<li></li>");
      let $a = $("<a></a>");
      let $button = $("<button></button>")
        .attr("data-user-id", `${res.id}`)
        .attr("data-initial-follow-state", `${res.followState}`)
        .attr("class", "follow-toggle");
      $a.attr(`href`, `/users/${res.id}`).text(`${res.username}`);
      $li.append($a);
      $li.append($button);
      that.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;