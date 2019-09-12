module Slideable
  HORIZONTAL_DIRS = [
    [0, 1],
    [0, -1],
  ]

  VERTICAL_DIRS = [
    [1, 0],
    [-1, 0],
  ]

  DIAGONAL_DIRS = [
    [1, -1],
    [1, 1],
    [-1, -1],
    [-1, 1],
  ]

  def horizontal_dirs
    return HORIZONTAL_DIRS
  end

  def diagonal_dirs
    return DIAGONAL_DIRS
  end

  def vertical_dirs
    return VERTICAL_DIRS
  end

  def moves
    moves = []
    move_dirs.each do |dx, dy|
      moves += grow_unblocked_moves_in_dir(dx, dy)
    end
    moves
  end

  def grow_unblocked_moves_in_dir(dx, dy)
    moves = []
    loop do
      pos = [pos.first + dx, pos.last + dy]

      if !board.valid_pos?(pos)
        break
      end

      if board.empty?(pos)
        moves << pos
      else
        if board[pos].color != color
          moves << pos
        end
        break
      end
    end
    moves
  end
end
