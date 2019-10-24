const APIUtil = require("./api/api_util.js");

class FollowToggle{
  constructor(el){
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    
    this.$el.on('click', this.handleClick.bind(this));
    this.render();
  }

  render(){
    if (this.followState === "followed"){
      this.$el.text("Unfollow");
      this.$el.removeAttr("disabled");
    } else if (this.followState === "unfollowed") {
      this.$el.text("Follow");
      this.$el.removeAttr("disabled");
    } else if (this.followState === "unfollowing"){
      this.$el.attr("disabled", "disabled");
      this.$el.text("Unfollowing...");
    } else {
      this.$el.attr("disabled", "disabled");
      this.$el.text("Following...");
    }
  }

  handleClick(e) {
    const that = this;
    e.preventDefault();
    if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(that.userId).then(() => {
        that.followState = "unfollowed";
        that.render();
      });
    } else { 
      this.followState = "following";
      this.render();
      APIUtil.followUser(that.userId).then(() => {
        that.followState = "followed";
        that.render();
      });
    }
  }

}

module.exports = FollowToggle;
