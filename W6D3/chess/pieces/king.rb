require_relative "piece"
require_relative "../modules/stepable.rb"
class King < Piece
  include Stepable 

  def symbol
    '♔'.colorize(color)
  end 

  def move_diffs 
    diagonals + straight_steps 
  end 
end

