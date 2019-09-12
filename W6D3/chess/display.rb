require "colorize"
require_relative "cursor"
require_relative "board"

class Display
  attr_reader :board, :cursor

  def initialize(board)
    @board = board
    @cursor = Cursor.new([0, 0], board)
  end

  def render
    system("clear")
    puts "_____________________________"
    board.grid.each_with_index do |row, i|
      pieces = row.map.with_index do |piece, j|
        if [i, j] == @cursor.cursor_pos
          piece.to_s.colorize(background: :red)
        else
          piece.to_s
        end
      end
      puts pieces.join(" | ")
    end
    puts "_____________________________"
  end
end

d = Display.new(Board.new)
loop do
  d.render
  d.cursor.get_input
end
