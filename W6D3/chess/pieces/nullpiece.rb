require_relative "piece"
class NullPiece < Piece 
    include Singleton
    attr_reader :color, :symbol 

    def initialize 
        @color = :none 
        @symbol = " "
    end 


    def moves 
        [] 
    end 

    def empty? 
        true 
    end 

end 