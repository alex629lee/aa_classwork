module Slideable
  
    HORIZONTAL_DIRS = [ 
                        [0, 1],
                        [0,-1]
    ]

    VERTICAL_DIRS = [
                        [1, 0],
                        [-1,0]
    ]

    DIAGONAL_DIRS = [
                        [1,-1],
                        [1, 1],
                        [-1,-1],
                        [-1, 1]
    ]

    # def horizontal_dirs 
    # end 

    # def diagonal_dirs 
    # end 





    # Should return an array of places a Piece can move to.
    # The Slideable module can implement #moves, but it needs to know what
    # directions a piece can move in (diagonal, horizontally/vertically, both).

    # Classes that include the module Slideable (Bishop/Rook/Queen) will need
    # to implement a method #move_dirs, which #moves will use.

    # Classes that include Slideable in particular need the Board so they
    # know to stop sliding when blocked by another piece. 
    def moves 

    end 



    



    def move_dirs #(overwritten by subclass)

    end 

    def grow_unblocked_moves_in_dir(dx, dy)

    end 

end