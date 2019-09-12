
require_relative "display"
require_relative "board"

class Game
  def initialize
    @board = Board.new
    @display = Display.new(@board)
    # @players = {
    #     white: ,
    #     black:
    # }

  end
end
