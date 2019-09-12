require_relative "references"
require "byebug"

class Board
  attr_reader :grid

  def initialize
    @grid = Array.new(8) { Array.new(8) }
    reset_board
  end

  def reset_board
    [:white, :black].each do |color|
      fill_back_row(color)
      fill_pawns_row(color)
    end

    # fill nil spots with NullPiece instances
    @grid.each_with_index do |row, i|
      row.each_with_index do |col, j|
        pos = [i, j]
        self[pos] = NullPiece.instance if self[pos].nil?
      end
    end
  end

  def fill_back_row(color)
    row = (color == :white ? 0 : 7)

    col = 0
    while col <= 7
      pos = [row, col]
      if col == 0
        self[pos] = Rook.new(color, self, pos)
      elsif col == 1
        self[pos] = Knight.new(color, self, pos)
      elsif col == 2
        self[pos] = Bishop.new(color, self, pos)
      elsif col == 3
        self[pos] = Queen.new(color, self, pos)
      elsif col == 4
        self[pos] = King.new(color, self, pos)
      elsif col == 5
        self[pos] = Bishop.new(color, self, pos)
      elsif col == 6
        self[pos] = Knight.new(color, self, pos)
      elsif col == 7
        self[pos] = Rook.new(color, self, pos)
      end
      col += 1
    end
  end

  def fill_pawns_row(color)
    row = (color == :white ? 1 : 6)

    (0..7).each do |col|
      pos = [row, col]
      self[pos] = Pawn.new(color, self, pos)
    end
  end

  def [](pos)
    x, y = pos
    @grid[x][y]
  end

  def []=(pos, val)
    x, y = pos
    @grid[x][y] = val
  end

  def move_piece(start_pos, end_pos)
    piece = self[start_pos]
    if start_pos.nil?
      puts "Invalid starting position!"
    elsif !piece.valid_moves.include?(end_pos)
      puts "Invalid end position!"
    end

    piece.pos = end_pos
    self[end_pos] = piece
    self[start_pos] = NullPiece.instance
  end

  def valid_pos?(pos)
    pos.all? { |coord| coord.between?(0, 7) }
  end

  def empty?(pos)
    self[pos] == NullPiece.instance
  end

  def add_piece(piece, pos)
  end

  def checkmate?(color)
  end

  def in_check?(color)
    pos = find_king(color)
    #--------------- STOPPED HERE (PART TWO PHASE FOUR) -----------------
  end

  def find_king(color)
    king = @grid.flatten.find { |p| p.color == color && p.is_a?(King) }
    king.pos
  end

  def pieces
  end

  def dup
  end

  def move_piece!(color, start_pos, end_pos)
  end
end
