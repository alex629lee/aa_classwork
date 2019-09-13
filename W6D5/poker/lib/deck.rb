require_relative "card"
class Deck

    def self.all_cards
        cards_set = [] 
        Card.suits.each do |suit| 
            Card.values.each do |value| 
                cards_set << Card.new(suit, value) 
            end 
        end 
        cards_set
    end


    attr_reader :cards 

    def initialize(cards = Deck.all_cards)
        @cards = cards
    end

    def take(n) 
      raise "not enough cards" if n > cards.length
      cards.shift(n)
    end 

    def shuffle
      @cards.shuffle!
    end 


end 