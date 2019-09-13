require "deck" 

describe "Deck" do 
    subject(:all_cards) { Deck.all_cards }

    describe "::all_cards" do 
      it "returns an array of length 52" do
        expect(all_cards.count).to eq(52) 
      end
    end 

    subject(:deck) { Deck.new }

    describe "#initialize" do 
        it "initializes an instance of Deck" do 
            expect(deck).to be_a(Deck)
        end 

        it "creates an instance variable @cards and sets it with 52 cards" do
            expect(deck.cards.count).to eq(52)
        end 
    end 

    describe "#take(n)" do 
        subject(:cards) { deck.cards }

        it "removes cards from the deck" do
            expect(cards.count).to eq(52)
            deck.take(2) 
            expect(cards.count).to eq(50)
        end    
      
        it "returns an array of n cards" do 
            expect(deck.take(2).length).to eq(2)
        end 

        it "raises an error when taking more cards than are in deck" do 
            expect{deck.take(60)}.to raise_error("not enough cards")
        end 
    end
     

    describe '#shuffle!' do
        subject(:cards) { deck.cards }
        let(:cards1) {deck.cards.dup}
        let(:cards2) {deck.shuffle}
        it "should mutate the card's array" do 
            expect(cards1).not_to eq (cards2)
        end

        
        it "should shuffle the deck" do
            expect(cards1[0...5]).not_to eq(cards2[0...5]) #  { deck.shuffle[0...5] }
        end
    end

end 
