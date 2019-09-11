require_relative "piece"
class Queen < Piece
    include Slideable


    def symbol 
        "Q" 
    end 

end