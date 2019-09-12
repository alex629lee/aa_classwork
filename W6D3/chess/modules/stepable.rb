module Stepable
  
    DIAGONALS = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    STRAIGHT_STEPS = [[-1, 0], [0, -1], [0, 1], [1, 0]] 

    KNIGHT_STEPS = [
     [-2, -1],
     [-1, -2],
     [-2, 1],
     [-1, 2],
     [1, -2],
     [2, -1],
     [1, 2],
     [2, 1]
]

    def diagonals 
        DIAGONALS
    end 

    def straight_steps
        STRAIGHT_STEPS
    end 

    def knight_steps 
        KNIGHT_STEPS 
    end 

    def moves 
        moves_arr = [] 

        move_diffs.each do |(dx, dy)| 
            pos = [pos.first+dx, pos.last+dy]

            if !board.valid_pos?(pos) 
                next 
            elsif board.empty?(pos)
                moves << pos 
            elsif board[pos].color != color 
                moves << pos 
            end 
        end 
        moves_arr 
    end 

    
    # private 
    # def move_diffs 

    # end 

end