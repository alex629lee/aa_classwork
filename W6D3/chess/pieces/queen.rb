require_relative "piece"
require_relative "../modules/slideable.rb"
class Queen < Piece
    include Slideable


    def symbol
    '♛'.colorize(color)
    end

    def move_dirs
        horizontal_dirs + vertical_dirs + diagonal_dirs
    end
end