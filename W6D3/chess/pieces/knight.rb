require_relative "piece"
require_relative "../modules/stepable.rb"

class Knight < Piece
  include Stepable

  def symbol 
    '♞'.colorize(color)
  end 

  def move_diffs
    knight_steps
  end 
end