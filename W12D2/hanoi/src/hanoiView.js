class HanoiView {

  constructor (game, $el) {
    this.$el = $el; 
    this.game = game; 
    this.setupTowers();
    this.bindEvents();
    this.render();
    this.startTower = null;
  }

  setupTowers() {
    for (let i = 1; i < 4; i++) {
      let $ul = $("<ul>");
      $ul.attr("pos", i);
      for (let j = 1; j < 4; j++) {
        let $li = $("<li>");
        $li.attr("pos", [i,j]);  // setting attribute: attr(name, value);
        $ul.append($li);
      }
      this.$el.append($ul);
    }
    console.log(this.game.towers);
  }

  bindEvents() {
    this.$el.on("click", "ul", event => {
      console.log($(event.currentTarget))
      let $currentTarget = $(event.currentTarget);
      this.clickTower($currentTarget);
    })
  }

  clickTower(target) {
    let pos = target.attr("pos"); 
    console.log(pos-1);
    if (this.startTower === null) {
      this.startTower = pos-1;
      target.addClass("checked");
    } else {
      let endTower = pos-1;
      this.game.move(this.startTower, endTower);
      console.log(this.game.towers);
      this.startTower = null;
      this.render();
    }
  }

  render() {
    let towers = this.game.towers;
    console.log(this.game.towers);
    let $lis = $("li");

    $lis.each(function(index, value) {
      let $el = $(value);
      if ($el.hasClass("disc-1")) {
        $el.removeClass("disc-1");
      } else if ($el.hasClass("disc-2")) {
        $el.removeClass("disc-2");
      } else if ($el.hasClass("disc-3")) {
        $el.removeClass("disc-3");
      } 
    })

    $("ul").each(function(index, value) {
      let $tower = $(value);
      if ($tower.hasClass("checked") && !this.startPos) {
        $tower.removeClass("checked");
      }
    })

    $lis.each(function(index, value) {
      let pos = $(value).attr("pos");
      let i = parseInt(pos[0]);
      let j = parseInt(pos[2]);
      if (towers[i-1].includes(j)) {
        $(value).addClass(`disc-${j}`)
      }
    }); 

    if (this.game.isWon()) {
      alert("YOU WIN :)");
    }
  }
}

module.exports = HanoiView;