require "byebug"

class Piece
  attr_reader :color

  def initialize(color, board, pos)
    # debugger
    @color = color
    @board = board
    @pos = pos
  end

  def valid_moves
  end

  def to_s
    symbol
  end

  def empty?
    false
  end

  def pos=(new_pos)
    @pos = new_pos
  end

  private

  def move_into_check?(end_pos)
  end
end
