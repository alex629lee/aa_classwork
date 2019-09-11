require_relative "piece"
class Board 

    def initialize
        @grid = Array.new(8) { Array.new(8) }
        @sentinel = NullPiece.instance
    end 


    def [](pos)
        x, y = pos 
        @grid[x][y]
    end 


    def []=(pos, val)
        x,y = pos 
        @grid[x][y] = val 
    end 


    # The Board class should have a #move_piece(start_pos, end_pos) method. 
    # This should update the 2D grid and also the moved piece's position. 
    # You'll want to raise an exception if:

    # there is no piece at start_pos or
    # the piece cannot move to end_pos.

    def move_piece(start_pos, end_pos) #move_piece(color, start_pos, end_pos) 
        piece = @grid[start_pos] 
        if start_pos.nil? 
            puts "Invalid starting position!"
        elsif !piece.valid_moves.include?(end_pos) 
            puts "Invalid end position!" 
        end 
        
        piece.pos = end_pos 
        @grid[end_pos] = piece 
        @grid[start_pos] = NullPiece.instance 
    end 


    # def valid_pos?(pos)
    #     if pos.nil? 
    #         puts "Invalid starting position!"
    #     elsif !piece.valid_moves.include?(pos) 
    #         puts "Invalid position!" 
    #     end 
    # end 


    def add_piece(piece, pos) 

    end 


    def checkmate?(color)

    end 


    def in_check?(color) 

    end 


    def find_king(color)

    end 


    def pieces

    end 


    def dup 

    end 


    def move_piece!(color, start_pos, end_pos)

    end 

end 